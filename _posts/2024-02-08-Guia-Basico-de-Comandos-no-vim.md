---
layout: post
title:  "Guia Básico de Comandos no VIM"
date:   2024-02-08 21:03:36 +0000
categories: VIM Tecnologia
---

Este guia oferece uma seleção essencial de comandos do Vim, abrangendo desde navegação básica até edição avançada e gestão de arquivos, organizada para consulta rápida e aprendizado eficaz. Dominar esses comandos transformará sua eficiência no Vim, tornando a edição de texto rápida e intuitiva.

### Navegação
- `h`: Mover para esquerda.
- `l`: Mover para direita.
- `k`: Mover para cima.
- `j`: Mover para baixo.
- `H`: Cursor no topo da tela.
- `M`: Cursor no meio da tela.
- `L`: Cursor na base da tela.
- `0` ou `[HOME]`: Início da linha.
- `^`: Primeiro caractere não-branco da linha.
- `$`: Final da linha.
- `b`: Voltar por tokens.
- `w`: Avançar por tokens.
- `B`: Voltar por palavras.
- `W`: Avançar por palavras.
- `ctrl+u`: Metade da página para cima.
- `ctrl+d`: Metade da página para baixo.
- `G`: Ir para linha especificada (ex: `10G`).
- `#`: Ir para linha # especificada.
- `“`: Voltar para posição anterior.
- `)`: Início da próxima frase.
- `(`: Início da frase anterior.
- `}`: Início do próximo bloco de texto.
- `{`: Início do bloco de texto anterior.

### Edição
- `i`: Modo de inserção.
- `a`: Inserir texto após o cursor.
- `I`: Inserir no início da linha.
- `A`: Inserir no final da linha.
- `o`: Nova linha abaixo.
- `O`: Nova linha acima.
- `gf`: Abrir arquivo sob o cursor.
- `gi`: Reiniciar inserção no último ponto.
- `wq`: Salvar e sair.
- `q!`: Sair sem salvar.

### Movimento e Cópia
- `yy`: Copiar linha.
- `yw`: Copiar palavra.
- `y$`: Copiar até o final da linha.
- `v`: Selecionar caracteres.
- `V`: Selecionar linhas.
- `p`: Colar.
- `d`: Excluir texto selecionado.
- `dd`: Excluir linha.
- `dw`: Excluir palavra.
- `D`: Excluir até o final da linha.
- `d0`: Excluir até o início da linha.
- `dgg`: Excluir até o início do arquivo.
- `dG`: Excluir até o final do arquivo.
- `x`: Excluir caractere.
- `u`: Desfazer.
- `ctrl+r`: Refazer.
- `.`: Repetir última ação.

### Substituição e Pesquisa
- `r`: Substituir caractere.
- `R`: Modo substituição.
- `~`: Alternar caixa.
- `t[caractere]`: Selecionar até (não incluindo).
- `f[caractere]`: Selecionar até (incluindo).
- `i[caractere]`, `a[caractere]`: Selecionar dentro/ao redor de caracteres.
- `/`: Pesquisar.
- `/\c`: Pesquisar sem distinção de caixa.
- `?[pattern]`: Pesquisar para trás.
- `n`: Repetir pesquisa.
- `N`: Repetir pesquisa em direção oposta.
- `:%s/[pattern]/[replacement]/g`: Substituir globalmente sem confirmação.
- `:%s/[pattern]/[replacement]/gc`: Substituir globalmente com confirmação.
- `:s/[pattern]/[replacement]/g`: Substituir na linha atual.
- `:bufdo /[pattern]`: Pesquisar em todos os buffers.
- `:g/string/d`: Excluir todas as linhas contendo "string".

### Manipulação de Arquivos e Telas
- `:sp [filename]`: Dividir horizontalmente.
- `:vsp [filename]`: Dividir verticalmente.
- `:bn`, `:bp`: Próximo/anterior buffer.
- `:bd`: Fechar buffer.
- `:ls`: Listar buffers.
- `ctrl+ws`, `ctrl+wv`: Dividir janelas horizontal/verticalmente.
- `ctrl+ww`: Alternar janelas.
- `ctrl+wq`: Sair da janela.
- `ctrl+wh`, `ctrl+wl`, `ctrl+wj`, `ctrl+wk`: Mover cursor entre janelas.

### Trabalho com Guias
- `:tabnew`: Nova guia.
- `gt`:

 Próxima guia.
- `:tabfirst`, `:tablast`: Primeira/última guia.
- `tabm n(position)`: Reorganizar guias.
- `tabdo %s/foo/bar/g`: Executar comando em todas as guias.
- `:tab ball`: Abrir todos os arquivos em guias.
- `:new abc.txt`: Abrir novo arquivo em nova janela.

### Comandos Diversos
- `:w`: Salvar documento.
- `:q`: Sair da sessão.
- `:help [command]`: Ajuda sobre o comando.
- `:e [file]`: Abrir/editar arquivo.
- `:w [filename]`: Salvar como.
- `:stop`: Suspender sessão Vim.
- `:browse e`: Explorador de arquivos.
- `:%!fmt`: Alinhar arquivo.
- `!}fmt`: Alinhar desde o cursor.
- `:set autoindent`: Ativar autoindent.
