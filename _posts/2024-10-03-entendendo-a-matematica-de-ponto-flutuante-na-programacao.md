---
layout: post
title:  "Entendendo a Matemática de Ponto Flutuante na Programação"
date:   2024-10-03 14:37:00 +0000
categories: Programação Tecnologia
---

Se você já se deparou com a situação em que `0.1 + 0.2 != 0.3` em seu código, não se preocupe—sua linguagem de programação não está com problemas. Esse comportamento ocorre devido à forma como os computadores lidam com a matemática de ponto flutuante. Vamos explorar por que isso acontece e ver exemplos em várias linguagens de programação.

## Por que isso acontece?

Os computadores, em sua essência, armazenam apenas números inteiros de forma nativa. Números decimais (ou de ponto flutuante) precisam ser representados de forma especial na memória, e essa representação não é perfeitamente precisa. Para entender por que isso acontece, precisamos pensar em como os números são representados em diferentes bases.

Em um sistema de base-10 (o que usamos no dia a dia), frações podem ser representadas de forma exata se seus denominadores forem divisíveis pelos fatores primos de 10, que são 2 e 5. Isso explica por que frações como 1/2, 1/4 e 1/5 são representadas de forma limpa, enquanto outras, como 1/3 ou 1/7, se tornam dízimas periódicas.

Os computadores, no entanto, usam um sistema binário (base-2), no qual apenas frações com potências de 2 no denominador podem ser representadas de forma exata. Isso significa que números como 1/2 ou 1/4 são traduzidos perfeitamente, mas números como 1/10 (que é `0.1` em base-10) resultam em dízimas periódicas no sistema binário. Quando realizamos operações com esses números, os erros de precisão se acumulam, e obtemos resultados que diferem levemente do que esperamos em base-10.

Por exemplo, `0.1 + 0.2` em binário gera uma dízima periódica e, quando convertida de volta para a representação em base-10, vemos pequenas imprecisões. Isso explica por que expressões como `0.1 + 0.2` às vezes não resultam exatamente em `0.3`.

## Exemplos em várias linguagens

Aqui estão alguns exemplos de como diferentes linguagens de programação lidam com a matemática de ponto flutuante para a expressão `0.1 + 0.2`:

### Go

Em Go, você pode notar a diferença entre como os floats são manipulados diretamente e quando são formatados.

```go
package main
import "fmt"

func main() {
  fmt.Println(.1 + .2) // 0.3
  var a float64 = .1
  var b float64 = .2
  fmt.Println(a + b) // 0.30000000000000004
  fmt.Printf("%.54f\n", .1 + .2) // 0.299999999999999988897769753748434595763683319091796875
}
```

### Java

Em Java, ocorre um comportamento semelhante ao trabalhar com números de ponto flutuante.

```java
System.out.println(.1 + .2); // 0.30000000000000004
System.out.println(.1F + .2F); // 0.3
```

### Python 3

As operações padrão com floats em Python também refletem as limitações de precisão de ponto flutuante, mas a linguagem oferece bibliotecas para cálculos decimais exatos.

```python
print(.1 + .2) # 0.30000000000000004
.1 + .2 # 0.30000000000000004
float(decimal.Decimal('.1') + decimal.Decimal('.2')) # 0.3
float(fractions.Fraction('0.1') + fractions.Fraction('0.2')) # 0.3
```

### Rust

Rust, com seu sistema de tipos, oferece mais controle, mas também exibe o mesmo comportamento com números de ponto flutuante.

```rust
extern crate num;
use num::rational::Ratio;

fn main() {
  println!("{}", 0.1 + 0.2); // 0.30000000000000004
  println!("{}", 0.1_f32 + 0.2_f32); // 0.3
  println!("1/10 + 2/10 = {}", Ratio::new(1, 10) + Ratio::new(1, 5)); // 1/10 + 2/10 = 3/10
}
```

## Conclusão

Compreender a precisão dos números de ponto flutuante ajuda a explicar por que certos resultados na programação são levemente diferentes do que esperamos. Essa limitação se deve à maneira como os computadores manipulam as representações binárias de números decimais. Estar ciente disso permite que você gerencie e mitigue problemas de precisão em seu código, utilizando bibliotecas ou técnicas adequadas às suas necessidades específicas.
