---
layout: post
title:  "Instalando e Configurando Autopsy: Um Guia Passo a Passo"
date:   2024-02-13 23:07:00 +0000
categories: Forense Tecnologia Linux
---

Autopsy é uma ferramenta forense digital de código aberto que permite aos investigadores analisar volumes de dados e descobrir pistas cruciais em casos envolvendo computadores e dispositivos digitais. Este guia detalha o processo de instalação e configuração do Autopsy em sistemas Ubuntu.

### Pré-Requisitos

Antes de começar, assegure-se de ter os seguintes pré-requisitos:

- Acesso ao terminal do Ubuntu.
- Permissões de superusuário (root) para instalar pacotes.
- Conexão à internet para baixar arquivos.
- Java Development Kit (JDK) instalado no sistema.

### Passo 1: Baixar o Sleuth Kit e suas Dependências

Para começar, você precisará baixar o Sleuth Kit e suas dependências. Execute os seguintes comandos no terminal:

```bash
wget -c https://github.com/sleuthkit/sleuthkit/releases/download/sleuthkit-4.12.1/sleuthkit-java_4.12.1-1_amd64.deb

wget "https://raw.githubusercontent.com/sleuthkit/autopsy/develop/linux_macos_install_scripts/install_prereqs_ubuntu.sh"
chmod +x install_prereqs_ubuntu.sh
./install_prereqs_ubuntu.sh
```

Isso irá baixar o Sleuth Kit e instalar todas as dependências necessárias para o Autopsy.

### Passo 2: Instalar o Sleuth Kit

Agora, instale o Sleuth Kit usando o pacote .deb baixado:

```bash
sudo apt update
sudo apt install ./sleuthkit-java_4.12.1-1_amd64.deb
```

Isso garantirá que o Sleuth Kit esteja corretamente instalado em seu sistema.

### Passo 3: Baixar e Instalar o Autopsy

Para instalar o Autopsy, siga estas etapas:

1. Baixe a versão mais recente do Autopsy do [link oficial](https://github.com/sleuthkit/autopsy/releases).
2. Execute os seguintes comandos no terminal:

```bash
wget "https://raw.githubusercontent.com/sleuthkit/autopsy/develop/linux_macos_install_scripts/install_application.sh"
chmod +x install_application.sh
./install_application.sh -z ~/Downloads/autopsy-4.21.0.zip -i ~/autopsy -j /usr/lib/jvm/java-1.17.0-openjdk-amd64
```

Substitua o caminho do arquivo ZIP com o local onde você baixou o arquivo do Autopsy, e ajuste o caminho do JDK de acordo com sua instalação.

### Passo 4: Executar o Autopsy

Para executar o Autopsy, utilize o seguinte comando:

```bash
~/autopsy/bin/autopsy --nosplash
```

Este comando iniciará o Autopsy sem a tela de inicialização.

### Conclusão

Agora você instalou com sucesso o Autopsy em seu sistema Ubuntu. Esta ferramenta poderosa está pronta para ajudá-lo na análise forense digital, permitindo que você investigue e descubra informações cruciais em casos envolvendo computadores e dispositivos digitais. Lembre-se de seguir as melhores práticas ao lidar com dados sensíveis e em caso de investigação legal, consulte sempre um profissional qualificado.