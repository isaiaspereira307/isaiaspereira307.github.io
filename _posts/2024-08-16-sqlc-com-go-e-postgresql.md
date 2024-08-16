---
layout: post
title:  "Usando sqlc com Go e PostgreSQL"
date:   2024-08-15 16:27:00 +0000
categories: GO Sqlc PostgreSQL Tecnologia
---

O **sqlc** é uma ferramenta poderosa para desenvolvedores Go que preferem escrever consultas SQL manualmente, mas desejam manter a segurança de tipos e a simplicidade no código. Este tutorial guiará você através do processo de instalação e uso do sqlc com Go e PostgreSQL, desde a configuração inicial até a geração de código.

## O que é o sqlc?

O **sqlc** gera código Go a partir de consultas SQL, proporcionando segurança de tipos e uma maneira eficiente de interagir com bancos de dados. Ele permite que você escreva SQL diretamente em seus arquivos e, em seguida, usa esse SQL para gerar tipos e funções Go, eliminando a necessidade de ORMs complexos.

## Pré-requisitos

Antes de começar, certifique-se de ter o seguinte instalado:

- Go (versão 1.16 ou superior)
- PostgreSQL
- sqlc

## Instalação do sqlc

Primeiro, instale o sqlc. Você pode fazer isso diretamente no seu ambiente Go usando o seguinte comando:

```bash
go install github.com/kyleconroy/sqlc/cmd/sqlc@latest
```

Esse comando instala a última versão do sqlc.

## Configuração do Projeto

Vamos criar um novo projeto Go para demonstrar o uso do sqlc com PostgreSQL.

1. **Inicialize o Módulo Go**

   Crie um novo diretório para o seu projeto e inicialize um módulo Go:

   ```bash
   mkdir go-sqlc-example
   cd go-sqlc-example
   go mod init go-sqlc-example
   ```

2. **Configuração do Banco de Dados**

   Vamos configurar um banco de dados PostgreSQL para este exemplo. Certifique-se de que o PostgreSQL esteja instalado e rodando.

   Crie um novo banco de dados chamado `todos`:

   ```sql
   CREATE DATABASE todos;
   ```

   Em seguida, crie uma tabela `todos` para armazenar nossas tarefas:

   ```sql
   CREATE TABLE todos (
       id SERIAL PRIMARY KEY,
       title TEXT NOT NULL,
       description TEXT
   );
   ```

3. **Escrevendo o Arquivo de Configuração do sqlc**

   Crie um arquivo de configuração `sqlc.yaml` na raiz do seu projeto:

   ```yaml
   version: "1"
   packages:
     - name: "db"
       path: "internal/db"
       queries: "queries/"
       schema: "schema.sql"
       engine: "postgresql"
   ```

   Este arquivo define onde o sqlc buscará suas consultas SQL e o esquema do banco de dados. Ele também define onde o código Go gerado será salvo.

4. **Escrevendo o Esquema do Banco de Dados**

   Crie um arquivo `schema.sql` no diretório raiz e adicione o esquema do banco de dados:

   ```sql
   CREATE TABLE todos (
       id SERIAL PRIMARY KEY,
       title TEXT NOT NULL,
       description TEXT
   );
   ```

5. **Escrevendo Consultas SQL**

   Crie um diretório chamado `queries` e adicione suas consultas SQL. Por exemplo, `queries/todos.sql`:

   ```sql
   -- name: ListTodos :many
   SELECT id, title, description FROM todos;

   -- name: GetTodo :one
   SELECT id, title, description FROM todos WHERE id = $1;

   -- name: CreateTodo :one
   INSERT INTO todos (title, description) VALUES ($1, $2) RETURNING id, title, description;
   ```

   Cada consulta é precedida por um comentário que define o nome da função Go que será gerada e o tipo de retorno esperado (`:many` para múltiplos resultados, `:one` para um único resultado).

## Gerando Código Go

Agora que tudo está configurado, podemos usar o sqlc para gerar o código Go correspondente às nossas consultas SQL.

1. **Gerando o Código**

   No terminal, execute o comando:

   ```bash
   sqlc generate
   ```

   Este comando gera código Go no diretório especificado (`internal/db` neste caso), criando funções com segurança de tipos que correspondem às consultas SQL que você escreveu.

2. **Usando o Código Gerado**

   Aqui está um exemplo de como você pode usar o código gerado em sua aplicação Go:

   ```go
   package main

   import (
       "context"
       "database/sql"
       "fmt"
       "log"

       "go-sqlc-example/internal/db"

       _ "github.com/lib/pq"
   )

   func main() {
       // Conectar ao banco de dados PostgreSQL
       connStr := "postgresql://user:password@localhost:5432/todos?sslmode=disable"
       dbConn, err := sql.Open("postgres", connStr)
       if err != nil {
           log.Fatal("failed to connect to the database:", err)
       }
       defer dbConn.Close()

       // Criar um novo repositório
       queries := db.New(dbConn)

       // Exemplo de inserção
       todo, err := queries.CreateTodo(context.Background(), db.CreateTodoParams{
           Title:       "Learn Go",
           Description: "Start by learning the basics of Go",
       })
       if err != nil {
           log.Fatal("failed to create todo:", err)
       }
       fmt.Printf("Created Todo: %+v\n", todo)

       // Exemplo de listagem
       todos, err := queries.ListTodos(context.Background())
       if err != nil {
           log.Fatal("failed to list todos:", err)
       }
       fmt.Printf("Todos: %+v\n", todos)
   }
   ```

   Esse código cria um novo `Todo`, lista todos os `Todos` e exibe os resultados. Observe como o sqlc facilita a interação com o banco de dados sem a necessidade de escrever código SQL diretamente no código Go.

## Conclusão

O **sqlc** é uma ferramenta incrível para desenvolvedores Go que preferem a simplicidade e o controle do SQL, mas não querem sacrificar a segurança de tipos e a eficiência do código. Com sqlc, você pode escrever consultas SQL otimizadas e obter a segurança de tipos do Go, tornando seu código mais seguro e fácil de manter.

Experimente sqlc no seu próximo projeto Go com PostgreSQL e aproveite o melhor dos dois mundos!

