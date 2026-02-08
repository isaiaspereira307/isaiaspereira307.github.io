---
layout: post
title:  "Guia Prático: GPG + SSH para GitHub e GitLab"
date:   2026-01-31 14:17:00 -0300
categories: [Segurança, Git, Linux]
---

Este artigo descreve, de forma **concisa e prática**, como criar e configurar chaves **GPG** para:

* Assinar commits Git
* Autenticar SSH no GitHub e GitLab

O guia considera o cenário **sem YubiKey OpenPGP/PIV** (ex.: YubiKey apenas OTP), inclui **soluções para erros comuns**, **backup seguro** e **rotação de chaves quando expirarem**.

---

## 1. Pré‑requisitos

```bash
gpg --version
git --version
```

Recomendado:

* GnuPG >= 2.4
* Git >= 2.30

---

## 2. Criar a chave GPG principal (Master Key)

A chave principal será usada **apenas para certificação (C)**. As operações do dia a dia ficam em **subkeys**.

```bash
gpg --full-generate-key
```

Escolhas recomendadas:

* Tipo: **RSA and RSA**
* Tamanho: **4096 bits**
* Validade: **1 ano** (facilita rotação)
* Nome e email reais
* Proteja com uma senha forte

Verifique:

```bash
gpg --list-secret-keys --keyid-format=long
```

Saída esperada (exemplo):

```
sec  rsa4096/MASTER_ID  uso: SC
```

---

## 3. Criar subkeys (boas práticas)

### 3.1 Subkey de autenticação (SSH)

```bash
gpg --edit-key MASTER_ID
addkey
```

Escolhas:

* Tipo: **RSA (apenas de autenticação)** — opção 8
* Tamanho: 4096
* Validade: 1 ano

Resultado esperado:

```
ssb  rsa4096/SUBKEY_A  uso: A
```

### 3.2 Subkey de assinatura (Git commits)

Ainda no `--edit-key`:

```bash
addkey
```

Escolhas:

* Tipo: **RSA (apenas de assinar)** — opção 4
* Tamanho: 4096
* Validade: 1 ano

Resultado:

```
ssb  rsa4096/SUBKEY_S  uso: S
```

Finalize:

```bash
save
```

---

## 4. Usar GPG como SSH

### 4.1 Exportar a subkey de autenticação

```bash
gpg --export-ssh-key SUBKEY_A
```

Copie a chave gerada.

### 4.2 Configurar o agente SSH

Crie ou edite `~/.gnupg/gpg-agent.conf`:

```
enable-ssh-support
default-cache-ttl 600
max-cache-ttl 7200
```

Reinicie:

```bash
gpgconf --kill gpg-agent
gpgconf --launch gpg-agent
```

Adicione ao seu `~/.bashrc` ou `~/.zshrc`:

```bash
export GPG_TTY=$(tty)
export SSH_AUTH_SOCK=$(gpgconf --list-dirs agent-ssh-socket)
```

Recarregue o shell e teste:

```bash
source ~/.bashrc  # ou ~/.zshrc
ssh-add -L
```

A saída deve mostrar sua chave GPG no formato SSH.

---

## 5. Adicionar as chaves no GitHub e GitLab

### 5.1 Chave SSH (autenticação)

* **GitHub**: Settings → SSH and GPG Keys → New SSH key
* **GitLab**: Preferences → SSH Keys

Cole a chave SSH exportada do GPG (seção 4.1).

### 5.2 Chave GPG (assinatura de commits)

Exporte a chave pública:

```bash
gpg --armor --export MASTER_ID
```

* **GitHub**: Settings → SSH and GPG Keys → New GPG key
* **GitLab**: Preferences → GPG Keys

Cole a chave pública completa (incluindo `-----BEGIN PGP PUBLIC KEY BLOCK-----`).

---

## 6. Assinar commits Git com GPG

### 6.1 Configuração global

```bash
git config --global user.signingkey SUBKEY_S
git config --global commit.gpgsign true
git config --global gpg.program gpg
```

### 6.2 Teste

```bash
git commit -m "Commit assinado"
```

Verifique:

```bash
git log --show-signature
```

---

## 7. Erros comuns e soluções

### ❌ "gpg failed to sign the data"

```bash
export GPG_TTY=$(tty)
```

Adicione ao `~/.bashrc`, `~/.zshrc` ou `config.fish`.

---

### ❌ SSH não usa GPG

Confirme:

```bash
echo $SSH_AUTH_SOCK
```

Se estiver vazio, exporte novamente o socket do `gpg-agent`.

---

### ❌ GitHub mostra "Unverified"

* Confirme que o **email do commit** é o mesmo da UID GPG
* Verifique se o email está verificado no GitHub/GitLab
* Confirme que a **chave pública GPG** foi adicionada (seção 5.2)
* Verifique a chave usada:

```bash
git config --global user.signingkey
```

---

## 8. Backup seguro das chaves (ESSENCIAL)

### 8.1 Exportar tudo (offline)

```bash
gpg --export-secret-keys --armor MASTER_ID > master-secret.asc
gpg --export-secret-subkeys --armor MASTER_ID > subkeys-secret.asc
gpg --export --armor MASTER_ID > public.asc
```

### 8.2 Backup recomendado

* Pendrive criptografado (LUKS)
* Armazenamento offline
* Nunca deixar em nuvem sem criptografia forte

---

## 9. Rotação e renovação de chaves expiradas

### 9.1 Estender validade

```bash
gpg --edit-key MASTER_ID
expire
```

Escolha nova data e salve.

---

### 9.2 Criar novas subkeys (recomendado)

```bash
gpg --edit-key MASTER_ID
addkey
```

Crie novas subkeys **A** e **S**, atualize:

* GitHub / GitLab (SSH)
* Git config (signingkey)

Subkeys antigas podem ser revogadas.

---

## 10. Uso de YubiKey apenas OTP (observação importante)

YubiKey **somente OTP**:

* ❌ Não armazena chaves GPG
* ❌ Não assina commits
* ❌ Não autentica SSH

Uso recomendado:

* ✅ 2FA no GitHub e GitLab

---

## 11. Resumo dos comandos essenciais

```bash
# Listar chaves
gpg --list-secret-keys --keyid-format=long

# Exportar chave SSH
gpg --export-ssh-key SUBKEY_A

# Exportar chave pública GPG
gpg --armor --export MASTER_ID

# Testar assinatura
echo "teste" | gpg --clearsign

# Testar SSH via GPG
ssh -T git@github.com
```

---

## 12. Conclusão

Este setup fornece:

* Assinatura criptográfica de commits verificável
* Autenticação SSH segura via GPG
* Rotação e backup adequados das chaves
* Separação de responsabilidades (master key + subkeys)

Tudo isso **sem depender de hardware OpenPGP**, mantendo um padrão profissional e auditável.

---

## Referências

* [GnuPG Manual](https://gnupg.org/documentation/manuals/gnupg/)
* [GitHub - Signing commits](https://docs.github.com/en/authentication/managing-commit-signature-verification)
* [GitLab - GPG Signed Commits](https://docs.gitlab.com/ee/user/project/repository/signed_commits/gpg.html)

