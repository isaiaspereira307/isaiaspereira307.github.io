---
layout: post
title:  "Qutebrowser: Navegação Eficiente com o Teclado"
date:   2024-02-10 08:51:00 +0000
categories: VIM Tecnologia
---

O qutebrowser é um navegador web de código aberto, baseado em teclado e inspirado no editor de texto Vim. Com uma interface minimalista e controle total por meio de comandos de teclado, o qutebrowser oferece uma experiência de navegação rápida e eficiente para usuários que preferem evitar o uso do mouse. Desde abrir páginas e realizar buscas até gerenciar abas e favoritos, o qutebrowser permite uma navegação sem esforço, tornando-o uma escolha popular entre aqueles que buscam produtividade e controle completo enquanto navegam na web.

- `:open [url]` - Abre uma página web.
- `:open [termo de busca]` - Realiza uma busca usando o motor de busca padrão.
- `:reload` - Recarrega a página atual.
- `:close` - Fecha a aba atual.
- `:open -t [url]` - Abre uma nova aba com a URL especificada.
- `J` - Muda para a aba anterior.
- `K` - Muda para a próxima aba.
- `H` - Volta no histórico de navegação.
- `L` - Avança no histórico de navegação.
- `zi` - Aumenta o zoom na página.
- `zo` - Diminui o zoom na página.
- `yy` - Copia a URL da página atual para a área de transferência.
- `pp` - Cola a URL da área de transferência e vai para essa página.
- `P` - Cola a URL da área de transferência em uma nova aba e vai para essa página.
- `i` - Entra no modo de inserção para digitar em campos de texto na página.
- `Esc` - Sai do modo de inserção e volta ao modo normal.
- `/[termo de busca]` - Inicia uma busca por texto na página atual.
- `:quit` ou `:q` - Fecha o qutebrowser.

Aqui estão mais alguns comandos importantes do qutebrowser para expandir seu controle e eficiência na navegação:

- `:tab-next` ou `gt` - Move para a próxima aba.
- `:tab-prev` ou `gT` - Move para a aba anterior.
- `:tab-close` - Fecha a aba atual.
- `:tab-clone` - Clona a aba atual em uma nova aba.
- `:download` - Abre o gerenciador de downloads.
- `:bookmark-add` - Adiciona a página atual aos favoritos.
- `:bookmark-del` - Remove a página atual dos favoritos.
- `:bookmarks` - Abre a lista de favoritos.
- `:history` - Mostra o histórico de navegação.
- `:config-source` - Recarrega o arquivo de configuração.
- `:config-edit` - Abre o editor de configuração.
- `:set` - Altera uma configuração temporariamente (até o qutebrowser ser fechado).
- `:help` - Abre a ajuda do qutebrowser.
- `:adblock-update` - Atualiza as listas de bloqueio de anúncios.
- `:clear-cookies` - Limpa os cookies.
- `:quit --save` ou `:wq` - Sai do qutebrowser salvando a sessão atual.
- `o` - Abre uma nova URL na aba atual.
- `O` - Abre uma nova URL na aba atual, preenchendo o campo com a URL da página atual.
- `:session-save` - Salva a sessão atual.
- `:session-load` - Carrega uma sessão salva.
- `[[` ou `]]` - Navega entre elementos de navegação do site (como "Próxima página" ou "Página anterior") se disponível na página.
- `f` - Entra no modo de clique de teclado, permitindo clicar em links, botões e outros elementos da página usando o teclado.
- `F` - Similar ao `f`, mas abre o link em uma nova aba.
