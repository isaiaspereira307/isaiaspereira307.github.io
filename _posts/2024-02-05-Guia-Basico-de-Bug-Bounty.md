---
layout: post
title:  "Guia Básico de Bug Bounty: Dominando Comandos Essenciais"
date:   2024-02-05 20:03:36 +0000
categories: BugBounty Tecnologia
---

O mundo do bug bounty é vasto e repleto de oportunidades para aqueles dispostos a explorar e identificar vulnerabilidades em sistemas e aplicações web. Para ser bem-sucedido nesta jornada, é essencial dominar uma variedade de ferramentas e técnicas que podem ajudar a descobrir, verificar e reportar eficientemente falhas de segurança. Este artigo é um recurso indispensável para caçadores de recompensas digitais, oferecendo um compêndio de comandos e procedimentos para otimizar sua busca por bugs.

Começaremos com a identificação de Firewalls de Aplicações Web (WAFs) usando `Wafw00f`, uma etapa crucial para entender as defesas que você pode estar enfrentando. A seguir, detalharemos a enumeração de subdomínios com `Subfinder`, uma técnica fundamental para mapear o perímetro digital de um alvo. A varredura de URLs com `gau` e a busca por parâmetros com ferramentas como `katana` e `waybackurls` são passos subsequentes para descobrir vetores de ataque potenciais.

Este guia também abordará a filtragem e teste de URLs para vulnerabilidades comuns, como SQL Injection (SQLi) e Cross-Site Scripting (XSS), usando ferramentas poderosas como `gf` e `SQLMap`. Além disso, discutiremos a identificação de oportunidades de Subdomain Takeover com `Nmap` e a enumeração de diretórios com `Dirb` e `Gobuster`, duas técnicas que podem revelar pontos de entrada negligenciados.

Para os testes mais finos e direcionados, ferramentas como `Nuclei` oferecem a capacidade de realizar verificações automatizadas contra uma ampla gama de vulnerabilidades conhecidas, enquanto `nuclearpond` e `shadowclone` facilitam a automação e o gerenciamento de tarefas em larga escala.

Este artigo é mais do que um simples tutorial; é um mapa para o sucesso no bug bounty, projetado para ajudar você a navegar pelo complexo ecossistema de segurança cibernética com confiança e competência. Seja você um novato ansioso por aprender ou um veterano procurando aprimorar suas habilidades, as informações aqui contidas são um recurso valioso na sua caixa de ferramentas de segurança cibernética.

### Verificação de WAF com Wafw00f

**Objetivo:** Identificar qual firewall de aplicação web (WAF) está protegendo um site. Isso é crucial, pois o WAF pode bloquear tentativas de exploração de vulnerabilidades e é importante saber como contorná-lo ou testá-lo de maneira eficiente.

```bash
echo "Verificando o WAF com Wafw00f."
wafw00f "$target"
```

- **Comando Explicado:** 
  - `echo "Verificando o WAF com Wafw00f."` simplesmente imprime uma mensagem para informar o usuário sobre o que o script está fazendo neste momento.
  - `wafw00f "$target"` executa a ferramenta `wafw00f`, passando a variável `$target` como argumento. Esta variável deve conter o domínio ou endereço IP que você deseja verificar. `wafw00f` tentará detectar e identificar a presença de um WAF por meio de várias técnicas de fingerprinting.

### Enumeração de Subdomínios com Subfinder

**Objetivo:** Descobrir subdomínios de um domínio alvo, aumentando a superfície de ataque potencial para exploração.

```bash
cat targets.txt | subfinder -silent -all | httprobe | anew domains
```

- **Comando Explicado:**
  - `cat targets.txt` lê a lista de domínios alvo de um arquivo chamado `targets.txt`.
  - `subfinder -silent -all` usa Subfinder para buscar subdomínios de forma silenciosa (sem logs desnecessários) e de maneira abrangente (usando todas as fontes disponíveis).
  - `httprobe` verifica quais subdomínios estão ativamente servindo conteúdo web (HTTP/HTTPS).
  - `anew domains` adiciona os subdomínios descobertos a um arquivo chamado `domains`, evitando duplicidades.

### Filtragem de URLs com Possíveis Falhas de SQLi

**Objetivo:** Filtrar as URLs coletadas que podem conter parâmetros vulneráveis a injeções SQL, uma vulnerabilidade comum que permite a um atacante executar comandos SQL arbitrários no banco de dados de um site.

```sh
echo "Pegando URLs com possível falha de SQLi."
cat "$output_dir/urls.txt" | gf sqli | tee "$output_dir/sqli.txt"
```

- **Comando Explicado:**
  - `cat "$output_dir/urls.txt"` lê as URLs coletadas de um arquivo dentro do diretório especificado pela variável `$output_dir`.
  - `gf sqli` usa a ferramenta `gf` com o padrão `sqli` para filtrar URLs que podem ser vulneráveis a SQL Injection.
  - `tee "$output_dir/sqli.txt"` cria um novo arquivo que contém apenas as URLs suspeitas de serem vulneráveis a SQLi.

### Teste de SQLi com SQLMap

**Objetivo:** Automatizar a detecção e exploração de possíveis injeções SQL nas URLs filtradas, utilizando uma das ferramentas mais poderosas para este propósito.

```sh
echo "Iniciando teste de SQLi com SQLMap."
cat "$output_dir/sqli.txt" | xargs -I % sqlmap -u % --batch --dbs --level 5 --risk 3 --output-dir="$output_dir/sqlmap_results"
```

- **Comando Explicado:**
  - `cat "$output_dir/sqli.txt"` lê as URLs suspeitas de serem vulneráveis a SQLi.
  - `xargs -I %` pega cada URL lida e a insere no comando seguinte, substituindo o símbolo `%`.
  - `sqlmap -u % --batch --dbs --level 5 --risk 3` executa sqlmap na URL especificada, com parâmetros que definem o nível de profundidade da verificação (`--level 5`), o risco das cargas de teste (`--risk 3`), e a opção `--batch` para evitar interações manuais, buscando automaticamente por bancos de dados.
  - `--output-dir="$output_dir/sqlmap_results"` especifica o diretório onde os resultados serão salvos, facilitando a revisão posterior das vulnerabilidades encontradas.

### Enumeração de Diretórios com Dirb e Gobuster

A enumeração de diretórios é uma técnica fundamental no bug bounty e nos testes de penetração, pois permite descobrir arquivos e diretórios escondidos em um site que podem conter informações sensíveis, pontos de entrada para vulnerabilidades ou páginas não intencionadas para acesso público.

#### Enumeração de Diretórios com Dirb

**Objetivo:** Usar Dirb para automatizar a busca por diretórios e arquivos ocultos em websites, utilizando uma lista de palavras-chave comuns.

```sh
echo "Iniciando enumeração de diretórios com Dirb."
dirb "http://$target" /usr/share/wordlists/dirb/common.txt -o "$output_dir/dirb_output.txt"
```

- **Comando Explicado:**
  - `echo "Iniciando enumeração de diretórios com Dirb."` simplesmente informa ao usuário que o processo de enumeração de diretórios está começando.
  - `dirb "http://$target"` executa o Dirb contra o URL especificado na variável `$target`. Substitua `"$target"` pelo domínio que você deseja testar.
  - `/usr/share/wordlists/dirb/common.txt` especifica o caminho para a lista de palavras padrão do Dirb, que contém palavras-chave comuns usadas para encontrar diretórios e arquivos.
  - `-o "$output_dir/dirb_output.txt"` direciona a saída do comando para um arquivo no diretório especificado, permitindo uma revisão fácil dos resultados.

#### Enumeração de Diretórios com Gobuster

**Objetivo:** Utilizar Gobuster, uma ferramenta rápida de força bruta HTTP, para encontrar diretórios e arquivos escondidos em um site, usando uma abordagem similar à do Dirb.

```sh
echo "Iniciando enumeração de diretórios com Gobuster."
gobuster dir -u "http://$target" -w /usr/share/wordlists/dirb/common.txt -o "$output_dir/gobuster_output.txt"
```

- **Comando Explicado:**
  - `echo "Iniciando enumeração de diretórios com Gobuster."` avisa o usuário sobre o início da enumeração com Gobuster.
  - `gobuster dir` inicia o Gobuster em seu modo de busca por diretórios.
  - `-u "http://$target"` define a URL base para a enumeração. A variável `$target` deve ser substituída pelo domínio específico a ser testado.
  - `-w /usr/share/wordlists/dirb/common.txt` aponta para a lista de palavras usada na tentativa de descoberta. Esta opção especifica o mesmo arquivo de lista de palavras que o Dirb usa, promovendo uma cobertura de teste consistente.
  - `-o "$output_dir/gobuster_output.txt"` define o arquivo de saída onde os resultados da enumeração serão salvos, facilitando a análise posterior.

Ambas as ferramentas, Dirb e Gobuster, são essenciais para a descoberta de conteúdo oculto que pode não ser encontrado através da navegação normal ou dos mecanismos de busca. A escolha entre uma ou outra depende da preferência pessoal, da performance em diferentes cenários ou da necessidade específica de recursos exclusivos de cada ferramenta. A prática comum é utilizar ambas em diferentes etapas do teste de penetração para garantir uma cobertura abrangente.

### Usando Nmap para Identificação de Vulnerabilidades

O Nmap (Network Mapper) é uma ferramenta de código aberto usada para exploração de rede e auditoria de segurança. Neste contexto, vamos detalhar o uso do Nmap para identificar possíveis casos de Subdomain Takeover e explorar outras vulnerabilidades comuns em aplicações web.

#### Identificando Subdomain Takeover com Nmap

**Objetivo:** Utilizar o Nmap para identificar vulnerabilidades específicas que podem indicar a possibilidade de um Subdomain Takeover, um ataque onde o agressor toma controle de um subdomínio que aponta para recursos não existentes ou externos mal configurados.

```sh
echo "Identificando Subdomain Takeover com Nmap."
nmap -Pn -p80,443 --script=http-vuln-cve2017-1001000 --script-args=http-vuln-cve2017-1001000.domains="$target" -oA "$output_dir/nmap_subdomain_output" "$target"
```

- **Comando Explicado:**
  - `echo "Identificando Subdomain Takeover com Nmap."` informa ao usuário sobre a ação em execução.
  - `nmap -Pn` inicia o Nmap com a opção de não pingar o alvo, útil quando o alvo bloqueia pacotes ICMP.
  - `-p80,443` especifica as portas a serem verificadas, focando nas portas padrão para HTTP e HTTPS.
  - `--script=http-vuln-cve2017-1001000` utiliza um script NSE específico para testar uma vulnerabilidade conhecida (neste caso, uma CVE específica) que pode ser explorada para Subdomain Takeover.
  - `--script-args=http-vuln-cve2017-1001000.domains="$target"` passa argumentos para o script, especificando o domínio alvo.
  - `-oA "$output_dir/nmap_subdomain_output"` salva a saída em todos os formatos disponíveis (normal, XML, e s|<script kiddie>) no diretório especificado, facilitando a análise posterior.

#### Explorando Outras Vulnerabilidades Comuns

**Objetivo:** Realizar uma varredura mais ampla para identificar uma variedade de vulnerabilidades comuns em aplicações web.

```sh
nmap -v -sS -sV -O -D RND:30 -Pn -p 80,443 --script=http-vuln*,http-enum,http-title,http-unsafe-output-escaping,http-sql-injection,http-xssed "<alvo>"
```

- **Comando Explicado:**
  - `nmap -v` aumenta a verbosidade do Nmap, fornecendo mais detalhes durante a execução.
  - `-sS` realiza uma varredura SYN, que é rápida e menos intrusiva, pois não estabelece uma conexão completa.
  - `-sV` tenta determinar a versão dos serviços rodando nas portas abertas.
  - `-O` ativa a detecção de sistema operacional.
  - `-D RND:30` usa 30 proxies de decoy para ofuscar a origem da varredura, tornando mais difícil para o alvo identificar o atacante real.
  - `-Pn` assume que o alvo está online, útil para evitar bloqueios de ICMP.
  - `-p 80,443` especifica novamente as portas para HTTP e HTTPS.
  - `--script=http-vuln*,http-enum,http-title,http-unsafe-output-escaping,http-sql-injection,http-xssed` utiliza uma série de scripts NSE para testar uma ampla gama de vulnerabilidades web, incluindo enumeração de diretórios, injeção SQL e Cross-Site Scripting (XSS).
  - `"<alvo>"` deve ser substituído pelo domínio ou IP específico a ser testado.

Esses comandos do Nmap são poderosos para identificar potenciais vulnerabilidades em sistemas e aplicações web, permitindo aos testadores de penetração e caçadores de bugs priorizar seus esforços nas áreas mais promissoras para exploração. É importante usar essas técnicas de maneira ética e com permissão, para evitar consequências legais e danos inadvertidos.

### Verificação de Falhas de XSS nas URLs

**Objetivo:** Filtrar URLs que possam ser vulneráveis a Cross-Site Scripting (XSS), uma vulnerabilidade de segurança que permite a um atacante injetar scripts maliciosos em conteúdo entregue a um usuário final, sem o conhecimento ou consentimento do usuário. XSS pode ser usado para uma variedade de ataques, incluindo roubo de sessões e defacement de sites.

#### Comando para Filtragem de XSS

```sh
echo "Pegando URLs com possível falha de XSS."
cat "$output_dir/urls.txt" | gf xss | tee "$output_dir/xss.txt"
```

- **Comando Explicado:**
  - `echo "Pegando URLs com possível falha de XSS."` informa ao usuário que o processo de identificação de URLs potencialmente vulneráveis a XSS está em andamento.
  - `cat "$output_dir/urls.txt"` lê o arquivo contendo as URLs coletadas anteriormente durante a fase de enumeração ou varredura. A variável `$output_dir` deve ser substituída pelo caminho do diretório onde o arquivo `urls.txt` está localizado.
  - `gf xss` é um comando que utiliza a ferramenta `gf` (Grep Framework) configurada com um conjunto de padrões para identificar URLs que podem conter parâmetros vulneráveis a ataques XSS. A ferramenta `gf` é altamente eficaz na filtragem rápida de dados baseados em padrões predefinidos, que neste caso são configurados para identificar possíveis vetores de XSS.
  - `tee "$output_dir/xss.txt"` é usado para escrever a saída do comando anterior em um arquivo chamado `xss.txt`, localizado no mesmo diretório de saída. O uso de `tee` permite que a saída seja tanto exibida na tela quanto escrita no arquivo simultaneamente, facilitando a revisão e análise posterior.

Este processo é uma parte crucial da identificação de vulnerabilidades de XSS durante um teste de penetração ou uma caça a bugs. Ao filtrar URLs que contêm potenciais vetores de ataque, os pesquisadores de segurança podem focar seus esforços em testar e validar a exploração de XSS de forma mais eficiente. É importante destacar que a identificação de URLs potencialmente vulneráveis é apenas o primeiro passo; uma análise e validação cuidadosas são necessárias para confirmar a presença de vulnerabilidades de XSS e desenvolver medidas de mitigação apropriadas.
    
### Verificações com Nuclei

**Objetivo:** Utilizar o Nuclei para realizar verificações automatizadas contra uma lista de URLs, identificando vulnerabilidades conhecidas com diferentes níveis de severidade. O Nuclei é uma ferramenta rápida e personalizável para scanner de vulnerabilidades, que permite aos usuários verificar e validar vulnerabilidades específicas usando templates.

#### Comando para Verificações com Nuclei

```sh
echo "Realizando verificações com Nuclei."
nuclei -l "$output_dir/urls.txt" -severity low,medium,high,critical  -o "$output_dir/nuclei_output.txt"
```

- **Comando Explicado:**
  - `echo "Realizando verificações com Nuclei."` serve como uma notificação para o usuário, indicando que o processo de verificação das URLs com o Nuclei está começando.
  - `nuclei -l "$output_dir/urls.txt"` instrui o Nuclei a ler a lista de URLs do arquivo especificado. Aqui, `$output_dir` deve ser substituído pelo caminho do diretório onde o arquivo `urls.txt` está localizado. Este arquivo contém as URLs coletadas e filtradas das etapas anteriores que estão prontas para serem testadas.
  - `-severity low,medium,high,critical` define os níveis de severidade das vulnerabilidades que o Nuclei deve procurar. Isso permite que o scanner foque em vulnerabilidades que vão desde baixa gravidade até crítica, garantindo que uma ampla gama de vulnerabilidades possa ser identificada durante a varredura.
  - `-o "$output_dir/nuclei_output.txt"` especifica o arquivo de saída onde os resultados da varredura serão salvos. Isso facilita a revisão e análise posterior dos resultados, permitindo que pesquisadores e analistas de segurança priorizem as vulnerabilidades baseando-se na severidade e no impacto potencial.

O uso do Nuclei nesta fase é particularmente valioso por sua eficiência em escanear e identificar vulnerabilidades conhecidas em uma ampla gama de aplicações web, utilizando uma vasta biblioteca de templates. Isso permite uma detecção mais rápida e precisa de vulnerabilidades, economizando tempo e recursos durante o processo de bug bounty ou testes de penetração. Além disso, a capacidade de especificar níveis de severidade ajuda a priorizar as vulnerabilidades que necessitam de atenção imediata, otimizando o fluxo de trabalho de correção e mitigação.

### Utilizando Nuclearpond e Shadowclone para Automação em Bug Bounty

Estas ferramentas, Nuclearpond e Shadowclone, representam exemplos avançados de automação em atividades de bug bounty, otimizando o processo de teste e exploração de vulnerabilidades. Vamos detalhar o propósito e uso de cada comando.

#### Usando Nuclearpond

**Objetivo:** Nuclearpond é uma ferramenta de automação para executar tarefas em paralelo, especialmente útil para processar grandes conjuntos de dados, como URLs para testes de vulnerabilidades XSS, com eficiência.

```sh
nuclearpond run -l xss.txt -a $(echo -ne "-rl 1000 -c 50 -silent -severity medium,high,critical" | base64) -o cmd -b 2000 -c 10 -f nuclear-prod-bugbounty-function
```

- **Comando Explicado:**
  - `nuclearpond run` inicia a execução da ferramenta Nuclearpond.
  - `-l xss.txt` especifica a lista de entrada, neste caso, um arquivo chamado `xss.txt` que contém URLs potencialmente vulneráveis a ataques XSS.
  - `-a $(echo -ne "-rl 1000 -c 50 -silent -severity medium,high,critical" | base64)` define os argumentos para a função que será executada, neste caso, codificados em base64 para compatibilidade. Os argumentos ajustam a taxa de requisição (`-rl 1000`), o número de concorrência (`-c 50`), operação silenciosa (`-silent`), e a severidade das vulnerabilidades a serem testadas (`-severity medium,high,critical`).
  - `-o cmd` especifica que a saída será em formato de comando.
  - `-b 2000` define o burst rate, ou taxa de explosão, que limita o número de execuções por intervalo de tempo.
  - `-c 10` ajusta a concorrência, ou seja, quantas instâncias da tarefa serão executadas simultaneamente.
  - `-f nuclear-prod-bugbounty-function` especifica a função que será executada, adaptada para testes de bug bounty.

#### Usando Shadowclone

**Objetivo:** Shadowclone é uma ferramenta projetada para distribuir e paralelizar tarefas que normalmente seriam executadas de forma sequencial, como varreduras HTTP ou testes de vulnerabilidade, melhorando significativamente a eficiência e reduzindo o tempo total de execução.

```sh
python3 shadowclone.py -i domainsNew.txt --split 3000 -o httpxNb.txt -c "/go/bin/httpx -l {INPUT} "
python3 shadowclone.py -i domainsNew.txt --split 3000 -o httpxNb.txt -c "/go/bin/dalfox file {INPUT} "
```

- **Comandos Explicados:**
  - `python3 shadowclone.py` inicia a execução da ferramenta Shadowclone com Python 3.
  - `-i domainsNew.txt` indica o arquivo de entrada contendo os domínios a serem processados.
  - `--split 3000` divide o arquivo de entrada em partes menores, cada uma contendo no máximo 3000 linhas, para processamento paralelo.
  - `-o httpxNb.txt` define o arquivo de saída para os resultados.
  - `-c "/go/bin/httpx -l {INPUT} "` especifica o comando a ser executado para cada parte do arquivo dividido. No primeiro comando, `httpx` é usado para realizar varreduras rápidas HTTP(S) nas URLs fornecidas.
  - `-c "/go/bin/dalfox file {INPUT} "` no segundo comando, `dalfox` é utilizado para testar as URLs para vulnerabilidades XSS, processando cada arquivo dividido como entrada.

Estas ferramentas, Nuclearpond e Shadowclone, são exemplos de como a automação pode ser aplicada efetivamente em tarefas repetitivas e em larga escala no contexto de bug bounty, permitindo que pesquisadores de segurança se concentrem em aspectos mais complexos e criativos da caça aos bugs.