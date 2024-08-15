---
layout: post
title:  "Entendendo o Uso de Context no Go: Cancelando e Gerenciando Tarefas de Forma Eficiente"
date:   2024-08-15 18:30:00 +0000
categories: GO Tecnologia
---

O pacote `context` do Go é uma ferramenta poderosa para gerenciar o ciclo de vida de operações, especialmente em sistemas concorrentes e distribuídos. Ele permite que você controle o cancelamento de operações, estabeleça prazos e passe valores através de uma hierarquia de goroutines. Neste artigo, vamos explorar como o `context` pode ser usado na prática com dois exemplos ilustrativos.

## Exemplo 1: Cancelando uma Operação de Reserva de Hotel

Imagine que você está desenvolvendo um sistema para reservar hotéis. A operação pode demorar algum tempo, e você quer garantir que, caso algo aconteça (como o usuário cancelar a reserva), a operação seja interrompida. O `context.WithCancel` permite que você cancele a operação a qualquer momento.

Aqui está o código:

```go
package main

import (
	"context"
	"fmt"
	"time"
)

func main() {
	ctx := context.Background()
	ctx, cancel := context.WithCancel(ctx)
	defer cancel()

	go func() {
		time.Sleep(3 * time.Second)
		cancel() // Cancela o contexto após 3 segundos
	}()

	bookHotel(ctx)
}

func bookHotel(ctx context.Context) {
	select {
	case <-ctx.Done():
		fmt.Println("Tempo excedido")
	case <-time.After(5 * time.Second):
		fmt.Println("Hotel reservado")
	}
}
```

### Explicação do Código

- **Contexto de Cancelamento**: O contexto `ctx` é criado usando `context.Background()` e depois é envolvido com `context.WithCancel()`. Isso permite cancelar a operação quando necessário.
- **Goroutine de Cancelamento**: Uma goroutine é iniciada que espera 3 segundos antes de chamar `cancel()`, cancelando o contexto.
- **Função `bookHotel`**: Dentro da função, usamos um `select` para esperar que uma das duas coisas aconteça: ou o contexto é cancelado (`ctx.Done()`), ou o tempo necessário para a reserva do hotel (5 segundos) se completa. Se o contexto for cancelado antes, uma mensagem de "Tempo excedido" será exibida; caso contrário, "Hotel reservado" será impresso.

Este exemplo mostra como o `context` pode ser usado para cancelar operações assíncronas, como uma reserva de hotel, de forma segura e controlada.

## Exemplo 2: Cancelando uma Requisição HTTP

Agora, vejamos um cenário em um servidor web onde queremos cancelar uma requisição HTTP se ela demorar muito para ser processada. Isso pode ser importante para evitar que o servidor fique sobrecarregado com requisições pendentes.

Aqui está o código:

```go
package main

import (
	"fmt"
	"log"
	"net/http"
	"time"
)

func main() {
	http.HandleFunc("/", home)
	http.ListenAndServe(":8080", nil)
}

func home(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	log.Println("Servidor web iniciado")
	defer log.Println("Servidor web finalizado")

	select {
	case <-time.After(5 * time.Second):
		fmt.Println("Página carregada")
		w.Write([]byte("Página carregada"))
	case <-ctx.Done():
		log.Println("Request cancelada")
		http.Error(w, "Request cancelada", http.StatusRequestTimeout)
	}
}
```

### Explicação do Código

- **Contexto de Requisição**: Cada requisição HTTP carrega um contexto (`ctx := r.Context()`), que é automaticamente cancelado se a conexão for encerrada, por exemplo, pelo usuário fechando o navegador.
- **Processamento da Página**: O código tenta simular um tempo de processamento de 5 segundos para carregar a página. Se esse tempo for atingido, a página é carregada e uma resposta é enviada ao cliente.
- **Cancelamento de Requisição**: Se o contexto for cancelado antes que os 5 segundos se completem (por exemplo, o cliente desistiu da requisição), o `select` detecta isso e cancela a operação, respondendo com um erro `408 Request Timeout`.

Este exemplo ilustra como o `context` pode ser usado para gerenciar o ciclo de vida de requisições HTTP, cancelando operações que ultrapassam um determinado tempo ou são canceladas pelo cliente.

## Conclusão

O `context` em Go é uma ferramenta fundamental para o controle de fluxo e o gerenciamento do ciclo de vida de operações assíncronas. Com ele, você pode implementar facilmente mecanismos de cancelamento e deadlines, tornando seu código mais robusto e responsivo a mudanças de estado, como o cancelamento de operações ou requisições de longa duração. Seja em operações de rede, como requisições HTTP, ou em operações concorrentes, como a reserva de um hotel, o `context` é indispensável para construir aplicações eficientes e resilientes.