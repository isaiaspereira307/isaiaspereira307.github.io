---
layout: post
title:  "Guia Completo: Servidor PostgreSQL Seguro com Podman no Ubuntu"
date:   2026-01-22 14:17:00 +0000
categories: [DevOps, Segurança, Banco de Dados]
---

A segurança de bancos de dados é uma das preocupações mais críticas em ambientes de produção. Neste artigo, vou compartilhar um guia completo e prático para configurar um servidor PostgreSQL altamente seguro usando Podman no Ubuntu, abordando desde a containerização até a implementação de múltiplas camadas de segurança.

Este setup é ideal para equipes que precisam gerenciar ambientes separados (homologação e produção) com máxima segurança, incluindo SSL/TLS, autenticação robusta, auditoria completa e backup automatizado.

**O que você vai aprender:**
- Configuração de PostgreSQL em containers Podman isolados
- Implementação de SSL/TLS com certificados personalizados
- Autenticação SCRAM-SHA-256 e controle de acesso
- Auditoria e monitoramento de conexões
- Backup automático e proteção contra ataques
- Gerenciamento de múltiplos ambientes (homolog/prod)

## 1. Preparação do Ambiente Ubuntu

Antes de começar, vamos preparar o servidor com as configurações essenciais de segurança e as ferramentas necessárias.

### 1.1 Atualização do Sistema
```bash
sudo apt update && sudo apt upgrade -y
```

### 1.2 Configuração do Firewall (UFW)

O firewall é nossa primeira linha de defesa. Vamos configurá-lo para permitir apenas o tráfego essencial:
```bash
sudo apt install ufw -y
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp  # SSH
sudo ufw allow 5432/tcp  # PostgreSQL (ajustar conforme necessário)
sudo ufw enable
```

> **Nota de Segurança**: Em produção, considere restringir o acesso à porta 5432 apenas a IPs específicos usando `sudo ufw allow from IP_ADDRESS to any port 5432`.

### 1.3 Instalação do Podman

Podman oferece vantagens significativas sobre Docker em termos de segurança, incluindo execução rootless e melhor isolamento:
```bash
sudo apt install -y podman
```

### 1.4 Criação de Usuário Dedicado

Seguindo o princípio do menor privilégio, vamos criar um usuário específico para gerenciar o PostgreSQL:
```bash
sudo useradd -m -s /bin/bash postgres-admin
sudo usermod -aG sudo postgres-admin
```

## 2. Estrutura de Diretórios e Permissões

Uma estrutura bem organizada facilita a manutenção e melhora a segurança. Vamos criar diretórios separados para cada ambiente:

```bash
# Criar estrutura para dados persistentes
sudo mkdir -p /opt/postgresql/{data,config,logs,backup}
sudo mkdir -p /opt/postgresql/data/{homolog,prod}

# Definir permissões (UID 999 é o padrão do PostgreSQL no container)
sudo chown -R 999:999 /opt/postgresql/data
sudo chown -R 999:999 /opt/postgresql/logs
sudo chmod 700 /opt/postgresql/data/{homolog,prod}
```

> **Importante**: O UID 999 é o padrão do usuário postgres dentro do container oficial PostgreSQL. Se você usar uma imagem diferente, verifique o UID correto com `podman run --rm postgres:16 id postgres`.

## 3. Configuração de Segurança do PostgreSQL

Agora vamos configurar o PostgreSQL com parâmetros otimizados para segurança e auditoria.

### 3.1 Arquivo de Configuração para Homologação
```bash
sudo nano /opt/postgresql/config/postgresql-homolog.conf
```

Adicione:
```conf
# Conexões e autenticação
listen_addresses = '*'
port = 5432
max_connections = 100

# Segurança SSL/TLS
ssl = on
ssl_cert_file = '/var/lib/postgresql/certs/server.crt'
ssl_key_file = '/var/lib/postgresql/certs/server.key'
ssl_ca_file = '/var/lib/postgresql/certs/ca.crt'
ssl_prefer_server_ciphers = on
ssl_ciphers = 'HIGH:MEDIUM:+3DES:!aNULL'

# Logs de auditoria
logging_collector = on
log_directory = '/var/log/postgresql'
log_filename = 'postgresql-homolog-%Y-%m-%d.log'
log_statement = 'all'
log_connections = on
log_disconnections = on
log_duration = on
log_line_prefix = '%t [%p]: [%l-1] user=%u,db=%d,app=%a,client=%h '

# Performance e segurança
shared_buffers = 256MB
work_mem = 4MB
maintenance_work_mem = 64MB
password_encryption = scram-sha-256
```

**Destaques da configuração:**
- **SSL obrigatório**: Todas as conexões devem usar criptografia
- **Auditoria completa**: Registra todas as operações, conexões e desconexões
- **SCRAM-SHA-256**: Método de criptografia de senha mais seguro que MD5
- **Logs detalhados**: Incluem timestamp, usuário, database e IP do cliente

### 3.2 Arquivo de Configuração para Produção
```bash
sudo nano /opt/postgresql/config/postgresql-prod.conf
```

Use configurações similares, ajustando port e log_filename.

### 3.3 Configuração de Autenticação (pg_hba.conf)

O arquivo `pg_hba.conf` controla quem pode acessar o banco de dados e como:
```bash
sudo nano /opt/postgresql/config/pg_hba-homolog.conf
```

```conf
# TYPE  DATABASE        USER            ADDRESS                 METHOD
local   all             postgres                                peer
hostssl all             all             0.0.0.0/0               scram-sha-256
hostssl all             all             ::/0                    scram-sha-256
host    all             all             127.0.0.1/32            scram-sha-256
```

**Explicação das regras:**
- `hostssl`: Exige conexão SSL/TLS
- `scram-sha-256`: Método de autenticação mais seguro
- `0.0.0.0/0` e `::/0`: Aceita conexões de qualquer IP (ajuste conforme necessário)

Repita para produção:
```bash
sudo cp /opt/postgresql/config/pg_hba-homolog.conf /opt/postgresql/config/pg_hba-prod.conf
```

## 4. Geração de Certificados SSL/TLS

A criptografia SSL/TLS é essencial para proteger dados em trânsito. Vamos criar nossa própria Autoridade Certificadora (CA) e certificados:

```bash
# Criar diretório para certificados
sudo mkdir -p /opt/postgresql/certs/{homolog,prod}

# Gerar certificados para HOMOLOG
cd /opt/postgresql/certs/homolog

# Chave privada da CA
sudo openssl genrsa -out ca.key 4096

# Certificado da CA
sudo openssl req -new -x509 -days 3650 -key ca.key -out ca.crt \
  -subj "/C=BR/ST=Ceara/L=Fortaleza/O=SuaEmpresa/CN=PostgreSQL-CA-Homolog"

# Chave privada do servidor
sudo openssl genrsa -out server.key 4096

# CSR do servidor
sudo openssl req -new -key server.key -out server.csr \
  -subj "/C=BR/ST=Ceara/L=Fortaleza/O=SuaEmpresa/CN=postgres-homolog"

# Assinar certificado do servidor
sudo openssl x509 -req -in server.csr -CA ca.crt -CAkey ca.key \
  -CAcreateserial -out server.crt -days 3650

# Ajustar permissões
sudo chown 999:999 server.key server.crt ca.crt
sudo chmod 600 server.key
sudo chmod 644 server.crt ca.crt

# Repetir para PROD
cd /opt/postgresql/certs/prod
# Execute os mesmos comandos acima, alterando "Homolog" para "Prod"
```

> **Dica de Produção**: Em ambientes empresariais, considere usar certificados emitidos por uma CA confiável como Let's Encrypt ou certificados internos da sua organização.

## 5. Criação dos Containers PostgreSQL

Agora vamos criar os containers isolados para cada ambiente. Note que usamos portas diferentes para facilitar o acesso.

### 5.1 Container de Homologação (porta 5432)
```bash
podman run -d \
  --name postgres-homolog \
  --restart=always \
  -e POSTGRES_PASSWORD='SenhaForteHomolog123!@#' \
  -e POSTGRES_INITDB_ARGS='--auth-host=scram-sha-256' \
  -e PGDATA=/var/lib/postgresql/data/pgdata \
  -v /opt/postgresql/data/homolog:/var/lib/postgresql/data:Z \
  -v /opt/postgresql/logs:/var/log/postgresql:Z \
  -v /opt/postgresql/config/postgresql-homolog.conf:/etc/postgresql/postgresql.conf:Z \
  -v /opt/postgresql/config/pg_hba-homolog.conf:/etc/postgresql/pg_hba.conf:Z \
  -v /opt/postgresql/certs/homolog:/var/lib/postgresql/certs:Z \
  -p 5432:5432 \
  --security-opt label=disable \
  docker.io/library/postgres:16 \
  -c config_file=/etc/postgresql/postgresql.conf \
  -c hba_file=/etc/postgresql/pg_hba.conf
```

**Parâmetros importantes:**
- `--restart=always`: Container reinicia automaticamente após reboot
- `-e POSTGRES_INITDB_ARGS`: Define SCRAM-SHA-256 como método padrão
- `:Z`: Flag do SELinux para contexto correto de volume
- Porta externa 5432 mapeada para porta interna 5432

### 5.2 Container de Produção (porta 5433)
```bash
podman run -d \
  --name postgres-prod \
  --restart=always \
  -e POSTGRES_PASSWORD='SenhaForteProd456!@#$' \
  -e POSTGRES_INITDB_ARGS='--auth-host=scram-sha-256' \
  -e PGDATA=/var/lib/postgresql/data/pgdata \
  -v /opt/postgresql/data/prod:/var/lib/postgresql/data:Z \
  -v /opt/postgresql/logs:/var/log/postgresql:Z \
  -v /opt/postgresql/config/postgresql-prod.conf:/etc/postgresql/postgresql.conf:Z \
  -v /opt/postgresql/config/pg_hba-prod.conf:/etc/postgresql/pg_hba.conf:Z \
  -v /opt/postgresql/certs/prod:/var/lib/postgresql/certs:Z \
  -p 5433:5432 \
  --security-opt label=disable \
  docker.io/library/postgres:16 \
  -c config_file=/etc/postgresql/postgresql.conf \
  -c hba_file=/etc/postgresql/pg_hba.conf
```

> **Atenção**: Produção usa porta **5433** externamente para evitar conflito com homologação.

## 6. Configuração de Serviços Systemd

Para garantir que os containers iniciem automaticamente após reinicializações do servidor, vamos criar serviços systemd:

### 6.1 Geração dos Serviços
```bash
# HOMOLOG
podman generate systemd --new --name postgres-homolog > /tmp/postgres-homolog.service
sudo mv /tmp/postgres-homolog.service /etc/systemd/system/

# PROD
podman generate systemd --new --name postgres-prod > /tmp/postgres-prod.service
sudo mv /tmp/postgres-prod.service /etc/systemd/system/

# Habilitar serviços
sudo systemctl daemon-reload
sudo systemctl enable postgres-homolog.service
sudo systemctl enable postgres-prod.service
```

Agora os containers iniciarão automaticamente quando o servidor for reiniciado.

## 7. Camadas Adicionais de Segurança

### 7.1 Proteção contra Ataques de Força Bruta (Fail2Ban)

O Fail2Ban monitora os logs e bloqueia IPs suspeitos automaticamente:
```bash
sudo apt install fail2ban -y
sudo nano /etc/fail2ban/jail.d/postgresql.conf
```

Adicione:
```ini
[postgresql]
enabled = true
port = 5432,5433
filter = postgresql
logpath = /opt/postgresql/logs/*.log
maxretry = 5
bantime = 3600
```

```bash
sudo systemctl restart fail2ban
```

Esta configuração bloqueia IPs após 5 tentativas de login falhadas por 1 hora.

### 7.2 Sistema de Backup Automatizado
```bash
sudo nano /opt/postgresql/backup/backup-script.sh
```

```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)

# Backup Homolog
podman exec postgres-homolog pg_dumpall -U postgres | gzip > /opt/postgresql/backup/homolog_$DATE.sql.gz

# Backup Prod
podman exec postgres-prod pg_dumpall -U postgres | gzip > /opt/postgresql/backup/prod_$DATE.sql.gz

# Manter apenas backups dos últimos 7 dias
find /opt/postgresql/backup -name "*.sql.gz" -mtime +7 -delete
```

```bash
sudo chmod +x /opt/postgresql/backup/backup-script.sh

# Adicionar ao crontab (backup diário às 2h)
sudo crontab -e
# Adicione: 0 2 * * * /opt/postgresql/backup/backup-script.sh
```

> **Importante**: Teste a restauração dos backups regularmente! Um backup não testado é tão útil quanto nenhum backup.

## 8. Gerenciamento de Usuários e Databases

Seguindo o princípio do menor privilégio, vamos criar usuários específicos com permissões limitadas.

### 8.1 Ambiente de Homologação
```bash
podman exec -it postgres-homolog psql -U postgres

-- Criar usuário de aplicação
CREATE USER app_homolog WITH PASSWORD 'SenhaApp123!@#';
CREATE DATABASE db_homolog OWNER app_homolog;

-- Criar usuário read-only
CREATE USER readonly_homolog WITH PASSWORD 'SenhaReadOnly123!';
GRANT CONNECT ON DATABASE db_homolog TO readonly_homolog;
\c db_homolog
GRANT USAGE ON SCHEMA public TO readonly_homolog;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO readonly_homolog;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO readonly_homolog;
```

**Tipos de usuários criados:**
- **app_homolog**: Usuário com permissões completas no database
- **readonly_homolog**: Usuário apenas para leitura (útil para relatórios e análises)

### 8.2 Ambiente de Produção
```bash
podman exec -it postgres-prod psql -U postgres

-- Repetir comandos similares para produção
```

## 9. Monitoramento e Manutenção

### 9.1 Monitoramento de Logs
```bash
tail -f /opt/postgresql/logs/postgresql-homolog-*.log
```

Os logs incluem todas as queries executadas, conexões e erros. Use ferramentas como `grep` para filtrar eventos específicos:

```bash
# Buscar tentativas de login falhadas
grep "FATAL" /opt/postgresql/logs/*.log

# Ver todas as conexões
grep "connection authorized" /opt/postgresql/logs/*.log
```

### 9.2 Monitoramento de Conexões Ativas
```bash
podman exec postgres-homolog psql -U postgres -c "SELECT * FROM pg_stat_activity;"
```

### 9.3 Comandos Úteis de Manutenção

```bash
# Ver status dos containers
podman ps

# Verificar uso de recursos
podman stats postgres-homolog postgres-prod

# Acessar shell do container
podman exec -it postgres-homolog bash

# Ver logs do container
podman logs postgres-homolog --tail 100

# Reiniciar container
sudo systemctl restart postgres-homolog.service
```

## 10. Checklist de Segurança

- ✅ Firewall configurado (apenas portas necessárias abertas)
- ✅ SSL/TLS habilitado e obrigatório
- ✅ Autenticação SCRAM-SHA-256
- ✅ Usuários com senhas fortes
- ✅ Logs de auditoria completos
- ✅ Fail2Ban configurado
- ✅ Backup automático
- ✅ Containers isolados
- ✅ Permissões de arquivo restritas
- ✅ Certificados SSL válidos
- ✅ Separação de ambientes (homolog/prod)

**Configurações Recomendadas Adicionais:**
- 🔒 Configurar VPN para acesso remoto ao banco de dados
- 🔒 Implementar rotação automática de senhas
- 🔒 Habilitar auditoria pgAudit para compliance
- 🔒 Configurar replicação para alta disponibilidade
- 🔒 Monitorar métricas com Prometheus + Grafana

## Considerações Finais

Este guia implementa múltiplas camadas de segurança para PostgreSQL em containers Podman. A combinação de SSL/TLS, autenticação forte, auditoria completa, backup automatizado e proteção contra ataques cria um ambiente robusto e seguro.

### Quando Usar Esta Arquitetura

Esta configuração é ideal para:
- **Ambientes empresariais** que exigem conformidade e auditoria
- **Aplicações multi-tenant** que necessitam isolamento
- **Equipes DevOps** que precisam de ambientes separados e reproduzíveis
- **Projetos com dados sensíveis** que requerem criptografia end-to-end

### Próximos Passos

Para levar sua infraestrutura ao próximo nível, considere:
1. **Implementar replicação**: Configure réplicas read-only para distribuir carga
2. **Automatizar com Infrastructure as Code**: Use Ansible ou Terraform
3. **Monitoramento avançado**: Integre com Prometheus, Grafana ou Datadog
4. **Testes de recuperação**: Simule falhas e pratique restauração de backups
5. **Políticas de retenção**: Implemente backup incremental e arquivamento em cloud

### Recursos Adicionais

- [Documentação Oficial do PostgreSQL](https://www.postgresql.org/docs/)
- [Podman Security Best Practices](https://docs.podman.io/en/latest/markdown/podman-run.1.html#security-options)
- [PostgreSQL Security Checklist](https://www.postgresql.org/docs/current/security.html)

---

**Dúvidas ou sugestões?** Deixe um comentário ou entre em contato! Se este guia foi útil, compartilhe com sua equipe.

## Notas Importantes

## Notas Importantes

⚠️ **Senhas**: Todas as senhas de exemplo neste guia devem ser substituídas por senhas fortes e únicas em ambiente de produção. Use um gerenciador de senhas para armazená-las com segurança.

⚠️ **Portas**: HOMOLOG utiliza porta 5432, PROD utiliza 5433. Ajuste conforme sua arquitetura de rede.

⚠️ **Firewall**: Configure regras de firewall específicas por ambiente. Em produção, restrinja acesso apenas a IPs/redes autorizados.

⚠️ **Certificados**: Os certificados criados neste guia têm validade de 10 anos. Configure alertas para renovação antes do vencimento.

⚠️ **Backup**: Teste a restauração dos backups regularmente. Um backup não testado não é confiável.

⚠️ **Atualizações**: Mantenha o PostgreSQL e o sistema operacional atualizados para correção de vulnerabilidades.

---

*Artigo atualizado em 22 de janeiro de 2026*