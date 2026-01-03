---
layout: post
title:  "Cuidado: Como uma Regex mal escrita pode derrubar o seu servidor (ReDoS)"
date:   2026-01-03 18:37:00 +0000
categories: Segurança
---

Você sabia que uma simples validação de e-mail ou campo de formulário pode ser a "bomba-relógio" da sua aplicação? No mundo da programação, as **Expressões Regulares (Regex)** são ferramentas poderosas para manipulação de texto, mas, se mal utilizadas, podem abrir as portas para um ataque devastador: o **ReDoS (Regular Expression Denial of Service)**.

Neste artigo, vamos entender por que isso acontece e como você pode proteger seu código.

---

## O que é o Backtracking e por que ele é perigoso?

A maioria dos motores de Regex (utilizados em linguagens como Python, JavaScript, Ruby e PHP) utiliza um algoritmo de busca que realiza o chamado **backtracking**.

Quando você define um padrão com quantificadores aninhados (como `(a+)+$`), o motor tenta encontrar todas as combinações possíveis para validar a string. Se a entrada for válida, o processo é rápido. No entanto, se a entrada for quase idêntica ao padrão, mas falhar no último caractere, o motor entra em um ciclo exaustivo: ele volta atrás e tenta _todas_ as outras permutações possíveis antes de declarar que a string não corresponde.

### O Crescimento Exponencial

O problema é que esse esforço não cresce de forma linear, mas sim **exponencial**. No vídeo de Augusto Galego, vimos que uma string de apenas 30 caracteres pode levar segundos para ser processada. Imagine isso em um ambiente de produção:

- **No Node.js:** Como ele roda em uma única thread, o processamento da Regex trava o servidor inteiro para todos os usuários.
    
- **Em servidores multi-thread:** Um atacante pode enviar várias requisições simultâneas, esgotando a CPU e tirando o serviço do ar.
    

---

## Exemplos de Risco no Dia a Dia

Os cenários mais comuns para esse tipo de vulnerabilidade são campos de entrada de usuários que aceitam padrões complexos:

1. **Validação de E-mails:** Regex "mágicas" copiadas da internet que tentam cobrir todos os casos possíveis.
    
2. **URLs complexas:** Filtros de busca ou slugs de posts.
    
3. **Números de Telefone:** Formatações internacionais com múltiplos parênteses e espaços.

### Exemplos Perigosos vs Seguros

**❌ Perigoso - Backtracking exponencial:**
```javascript
// Validação de e-mail vulnerável a ReDoS
const perigosa = /^([a-zA-Z0-9]+)*@example\.com$/;
// Entrada maliciosa: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaab@example.com"
```

**✅ Seguro - Específico e simples:**
```javascript
// Validação básica e rápida
const segura = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
```

**❌ Perigoso - Quantificador aninhado:**
```javascript
const perigosa = /(a+)+$/;
```

**✅ Seguro - Evitar aninhamento:**
```javascript
const segura = /a+$/;
```

> **Nota:** Se você gerou sua Regex usando uma IA ou a copiou do Stack Overflow sem testar a performance com entradas maliciosas, você pode estar em risco.

---

## Como Proteger sua Aplicação

A boa notícia é que o ReDoS é evitável. Aqui estão as melhores práticas:

### 1. Seja Específico (Evite o `.*`)

O wildcard `.` (ponto) aceita qualquer caractere e é o maior vilão do backtracking excessivo. Sempre que possível, substitua-o por classes de caracteres específicas, como `[a-zA-Z0-9]`.

### 2. Use Âncoras

Sempre limite sua busca indicando o início (`^`) e o fim (`$`) da string. Isso evita que o motor tente encontrar o padrão em posições desnecessárias dentro do texto.

### 3. Utilize Grupos Atômicos

Se a sua linguagem suportar, use grupos atômicos. Eles impedem que o motor volte atrás para tentar outras combinações dentro daquele grupo uma vez que uma correspondência foi encontrada.

### 4. Não Reinvente a Roda

Para validações comuns como e-mail e CPF, utilize bibliotecas consagradas (como o `validator.js` ou similares na sua linguagem). Elas já foram testadas contra esses tipos de ataques.

---

## A Solução Definitiva: Timeouts

Mesmo com uma Regex bem escrita, erros podem acontecer. A defesa mais robusta é implementar um **limite de tempo (timeout)** para a execução.

Se o motor de Regex demorar mais do que, por exemplo, 200ms para validar uma string, a operação deve ser interrompida e um erro deve ser retornado. Isso garante que, mesmo sob ataque, seu servidor permaneça responsivo.

**Exemplo em JavaScript (Node.js):**
```javascript
const timeout = (promise, ms) => {
  return Promise.race([
    promise,
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Timeout')), ms)
    )
  ]);
};

const validarEmail = async (email) => {
  return await timeout(
    new Promise(resolve => {
      const valido = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
      resolve(valido);
    }),
    200 // 200ms de timeout
  );
};
```

**Exemplo em Python:**
```python
import signal
import re

def timeout_handler(signum, frame):
    raise TimeoutError("Regex timeout")

def validar_email(email, timeout_ms=200):
    signal.signal(signal.SIGALRM, timeout_handler)
    signal.alarm(timeout_ms // 1000 + 1)  # Converter para segundos
    try:
        pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        return re.match(pattern, email) is not None
    finally:
        signal.alarm(0)  # Cancelar o alarme
```

---

## Checklist de Segurança para sua Regex

- [ ] Evitei quantificadores aninhados como `(a+)+`?
- [ ] Usei âncoras `^` e `$` para limitar a busca?
- [ ] Substitui `.*` por classes de caracteres específicas?
- [ ] Testei com strings maliciosas de teste (ex: repetir 'a' 30+ vezes)?
- [ ] Implementei timeout para execução da Regex?
- [ ] Usei uma biblioteca consagrada para validações comuns?

## Conclusão

Regex é uma ferramenta excelente, mas exige responsabilidade. O ReDoS é uma vulnerabilidade silenciosa que pode escalar rapidamente de um pequeno bug para uma queda total de sistema. Ao escrever seu próximo padrão, lembre-se: **menos é mais, e segurança vem antes da elegância.**
