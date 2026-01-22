---
layout: post
title:  "Por que o uso de Exceptions pode ser considerado uma 'Gambiarra' na sua Codebase?"
date:   2026-01-21 14:37:00 +0000
categories: [Desenvolvimento, Boas Práticas, Arquitetura de Software]
---

## Introdução

No mundo do desenvolvimento de software, existem padrões que se tornam tão onipresentes que raramente paramos para questioná-los. O uso de **Exceptions (Exceções)** para controle de fluxo é um deles. No entanto, será que "jogar um erro" toda vez que algo não sai como o esperado é realmente a melhor prática?

Neste artigo, exploramos por que o uso indiscriminado de exceções pode degradar a performance, dificultar a leitura do código e por que você deveria reservar o `throw` apenas para o que é verdadeiramente... excepcional.

---

## 1. O Custo Oculto da Performance

Muitos desenvolvedores acreditam que exceções são "gratuitas" em termos de processamento, mas isso não é verdade, especialmente em ambientes como o **Node.js**.

O motor V8 utiliza um compilador JIT (como o TurboFan) para otimizar o código em tempo de execução. Se uma função sempre retorna um tipo consistente (como uma `string` ou um `number`), o motor gera um código de máquina altamente otimizado para aquele cenário.

Quando você dispara uma exceção em um fluxo que deveria ser comum (como um usuário não encontrado), ocorre uma **desotimização**. O motor precisa interromper o fluxo otimizado para lidar com a pilha de erro (*stack trace*), o que custa ciclos de CPU valiosos. Se o seu sistema lida com milhares de requisições por segundo, esse "pequeno" custo se torna um gargalo real.

## 2. Controle de Fluxo Obscuro

O código ideal deve ser lido como um livro: de cima para baixo, de forma linear. Quando usamos `if/else`, loops ou retornos diretos, o fluxo de controle é explícito.

As exceções introduzem um **controle de fluxo obscuro**. Ao disparar um erro, você cria um "salto" no código. Se não houver um `try/catch` no nível imediato, o erro subirá para a próxima camada, e para a próxima, até ser capturado (ou derrubar a aplicação).

Isso torna a depuração um pesadelo:

* Para onde foi esse erro?
* Quem é o responsável por tratá-lo?
* O estado da aplicação foi limpo corretamente antes do salto?

## 3. Vazamento de Abstrações (Abuse of Layers)

Uma boa arquitetura preza pela separação de camadas (Controller, Service, Repository). O uso excessivo de exceções frequentemente causa o **vazamento de abstrações**.

Imagine que sua camada de banco de dados (Repository) dispara uma exceção de "Registro Não Encontrado". Se a camada de serviço não capturar isso, o erro chega ao Controller. O Controller, por sua vez, acaba tendo que conhecer detalhes internos do banco de dados para decidir se deve retornar um HTTP 404 ou 500.

Neste cenário, a "gambiarra" de uma camada vaza para a outra, criando um acoplamento invisível e perigoso.

## 4. Erro de Negócio vs. Exceção Técnica

Este é o ponto crucial: **"Not Found" não é um erro, é um estado previsto.**

Precisamos diferenciar o que é um comportamento esperado do sistema do que é uma falha catastrófica:

* **Casos Previstos (Não use Exceptions):**
* Usuário digitou e-mail inválido.
* Produto não encontrado no estoque.
* Login ou senha incorretos.
* Parâmetros de busca vazios.
* *Tratamento:* Use retornos explícitos (`null`, `boolean`, ou objetos de erro).


* **Casos Excepcionais (Use Exceptions):**
* O banco de dados está fora do ar (Connection Refused).
* Falha de hardware ou falta de memória.
* Erro de parsing em um JSON que *deveria* estar íntegro.
* Dados corrompidos que violam a integridade lógica.



**A regra de ouro é:** Se algo acontece todos os dias e faz parte da regra de negócio, não é uma exceção.

## 5. Alternativas Práticas: O Caminho da Previsibilidade

Como substituir as exceções por um código mais limpo?

### Union Types e Retornos Nulos

Em vez de lançar um erro quando um usuário não existe, retorne `User | null`. Isso força o chamador da função a verificar se o valor existe antes de usá-lo, tornando o fluxo explícito e seguro.

### O Padrão Go-lang (Tuplas)

Inspirado na linguagem Go, você pode retornar uma tupla ou objeto contendo o resultado e o erro:
`const [user, error] = await userRepository.find(id);`
Isso elimina a necessidade de blocos `try/catch` espalhados e mantém o tratamento de erro próximo de onde ele ocorre.

### Validação Antecipada

Use ferramentas como **Zod** para validar esquemas de dados logo na entrada (Controller). Se os dados estão errados, você trata isso como uma falha de validação comum, e não como uma exceção técnica que explode no meio da lógica de negócio.

---

## Conclusão

Mudar a mentalidade de "jogar erros" para "retornar estados" exige disciplina, mas o resultado é um software muito mais robusto, fácil de testar e performático. Reserve as **Exceptions** para o que elas realmente são: situações raras e imprevistas que impedem a continuação da execução.

Para o resto? Use a lógica, use tipos e mantenha seu fluxo de controle sob luz do dia.

---

## Exemplos Práticos: Comparando Abordagens

### 1. A Abordagem "Gambiarra" (Usando Exceptions para lógica comum)

Neste exemplo, usamos uma exceção para tratar um caso que é perfeitamente esperado: um usuário não ser encontrado no banco de dados.

#### **Python**

```python
def buscar_usuario(id):
    usuario = db.find(id)
    if not usuario:
        # Erro: Usando exception para algo previsto
        raise Exception("Usuário não encontrado") 
    return usuario

# Onde o código é chamado:
try:
    user = buscar_usuario(10)
except Exception as e:
    print(f"Lógica de negócio desviada: {e}")

```

#### **JavaScript (Node.js)**

```javascript
function buscarUsuario(id) {
    const usuario = db.find(id);
    if (!usuario) {
        // Erro: Interrompe o fluxo da aplicação sem necessidade técnica
        throw new Error("Usuário não encontrado");
    }
    return usuario;
}

// Onde o código é chamado:
try {
    const user = buscarUsuario(10);
} catch (error) {
    console.log("Fluxo interrompido por uma exceção de negócio.");
}

```

**Problema:** O código interrompe o fluxo normal para algo que não é excepcional, criando overhead desnecessário.

### 2. A Abordagem Recomendada: Retornos Explícitos

Quando o usuário não existe, retornamos um valor que representa essa ausência (`None`/`null`). Isso é mais performático, explícito e fácil de ler.

#### **Python**

```python
def buscar_usuario(id) -> dict | None:
    return db.find(id) # Retorna None se não encontrar

user = buscar_usuario(10)

if user:
    print(f"Olá, {user['nome']}")
else:
    # Tratamento explícito e linear
    print("Usuário não existe. Redirecionando para cadastro...")

```

#### **JavaScript**

```javascript
function buscarUsuario(id) {
    return db.find(id) || null;
}

const user = buscarUsuario(10);

if (user) {
    console.log(`Olá, ${user.nome}`);
} else {
    // Fluxo de controle claro e sem "pulos" de camadas
    console.log("Usuário não encontrado.");
}

```

**Vantagem:** Fluxo linear, sem saltos de camadas, tratamento explícito e performance otimizada.

### 3. A Abordagem Avançada: Result Pattern (Estilo Go/Rust)

Esta é a forma mais robusta e explícita. Você retorna tanto o resultado quanto o erro simultaneamente, ideal para quando precisa comunicar *por que* algo falhou sem disparar uma exception.

#### **Python (Usando Tuplas)**

```python
def buscar_assinatura(user_id):
    user = db.find(user_id)
    if not user:
        return None, "Usuário inexistente"
    if not user.tem_assinatura:
        return None, "Assinatura expirada"
    
    return user.assinatura, None

# Uso explícito:
assinatura, erro = buscar_assinatura(10)

if erro:
    print(f"Falha na validação: {erro}")
else:
    print(f"Status: {assinatura.status}")

```

#### **JavaScript (Usando Objetos)**

```javascript
function buscarAssinatura(userId) {
    const user = db.find(userId);
    
    if (!user) {
        return { data: null, error: "Usuário inexistente" };
    }
    if (!user.temAssinatura) {
        return { data: null, error: "Assinatura expirada" };
    }

    return { data: user.assinatura, error: null };
}

// Uso explícito:
const { data, error } = buscarAssinatura(10);

if (error) {
    console.error(`Aviso: ${error}`);
} else {
    console.log(`Assinatura ativa até: ${data.validade}`);
}

```

**Benefício:** Separação clara entre dados e erros, tornando impossível ignorar falhas acidentalmente.

---

## Comparação das Abordagens

| Aspecto | Com Exceptions | Com Retornos Explícitos |
|---------|---------------|------------------------|
| **Performance** | Overhead significativo (desotimização JIT) | Otimizado pelo compilador |
| **Legibilidade** | Fluxo obscuro com saltos de camada | Fluxo linear e previsível |
| **Manutenção** | Difícil rastrear onde erros são tratados | Tratamento explícito e local |
| **Tipo de uso** | Falhas técnicas inesperadas | Estados esperados do negócio |

---

## Conclusão Final

Mudar a mentalidade de "jogar erros" para "retornar estados" exige disciplina, mas transforma radicalmente a qualidade do código. Um software que usa exceptions apenas para situações verdadeiramente excepcionais é:

✅ **Mais performático** - Evita overhead de stack traces desnecessários  
✅ **Mais legível** - O fluxo de controle é explícito e linear  
✅ **Mais testável** - Casos de erro são tratados como cidadãos de primeira classe  
✅ **Mais manutenível** - Não há vazamento de abstrações entre camadas  

**A regra de ouro:** Se acontece todos os dias e faz parte da lógica de negócio, não é uma exceção. Trate como um retorno normal.

### Aplicando no Dia a Dia

Comece pequeno:
1. Identifique exceções que são disparadas para validações de negócio
2. Refatore uma função por vez para retornar tipos união (`User | null`) ou tuplas
3. Use ferramentas de validação como **Zod** (JS) ou **Pydantic** (Python) na entrada
4. Reserve `throw`/`raise` apenas para falhas técnicas irrecuperáveis

Seu código (e sua equipe) agradecerão.

---

### Referências e Recursos Adicionais

- [Go Error Handling Best Practices](https://go.dev/blog/error-handling-and-go)
- [Rust Result Type Documentation](https://doc.rust-lang.org/std/result/)
- [TypeScript Union Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types)

---

*Artigo publicado em 21 de janeiro de 2026*
