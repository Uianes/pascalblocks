# Pascal :: Blocks 🧩💻

**Pascal :: Blocks** é um ambiente educacional baseado em **programação em blocos**, voltado ao ensino de **Algoritmos e Lógica de Programação** utilizando a **linguagem Pascal** como referência sintática e semântica real.

O projeto foi desenvolvido com foco **didático**, buscando reduzir as barreiras iniciais no aprendizado de programação, sem abrir mão do rigor conceitual exigido por linguagens textuais tradicionais.

---
## Para acessar:

🔗 **Link 1**  
https://pascalblocks.netlify.app/

🔗 **Link 2**  
https://uianes.github.io/pascalblocks/

---

## 🎯 Objetivos do Projeto

- Facilitar o ensino de **lógica de programação** para iniciantes  
- Aproximar estudantes da **sintaxe real do Pascal**, evitando abstrações artificiais  
- Permitir a transição gradual entre **programação visual** e **programação textual**
- Servir como **ferramenta pedagógica**, **objeto de pesquisa** e **recurso educacional aberto**

---

## ✨ Principais Funcionalidades

### 🧱 Programação em Blocos
- Construção visual de algoritmos em Pascal
- Blocos para:
  - Estrutura de programa (`program`, `uses`, `var`, `begin`, `end`)
  - Entrada e saída (`readln`, `writeln`)
  - Operadores lógicos e aritméticos
  - Estruturas condicionais (`if`, `else`, `else if`)
  - Estruturas de repetição (`while`, `repeat until`, `for`)
  - Estrutura `case of`

### 🔀 Drag and Drop
- Arraste blocos para o workspace
- Reordene blocos livremente
- Exclua blocos arrastando para a **lixeira**

### 🧠 Validação Semântica
- Identifica erros comuns de iniciantes, como:
  - `end;` antes de `else`
  - Parênteses ou aspas desbalanceadas
  - Uso de variáveis não declaradas
- Mensagens pedagógicas, voltadas ao aprendizado

### ▶️ Simulador Passo a Passo
- Execução controlada do algoritmo
- Visualização do estado das variáveis
- Saída simulada (`writeln`)
- Ideal para **explicação em sala de aula**

### 💾 Exportação Real de Código
- Geração e download de arquivo **`.pas`**
- Código Pascal válido, compilável em FreePascal / Turbo Pascal

---

## 🧪 Exemplo de Uso

O aluno pode construir visualmente um algoritmo como:

```pascal
program Area;
uses crt;
var
  a, b, c, s, ar: real;
begin
  writeln('Forneça os lados do triângulo');
  readln(a);
  readln(b);
  readln(c);

  if (a < b + c) and (b < a + c) and (c < a + b) then
  begin
    s := (a + b + c) / 2;
    ar := sqrt(s * (s - a) * (s - b) * (s - c));
    writeln('Tem área ', ar);
  end
  else
    writeln('Não existe');
end.
```
---

## 📚 Produção Acadêmica e Divulgação

Este projeto **originou um artigo acadêmico** e já foi apresentado em eventos e espaços institucionais.

🔗 **Vídeo de apresentação do projeto**  
https://www.youtube.com/watch?app=desktop&v=kxUUM23Iq9Q

🔗 **Notícia institucional (IFFar – Campus Santo Augusto)**  
https://www.iffar.edu.br/noticias-sau/item/17275-iffar-%E2%80%93-campus-santo-augusto-%C3%A9-parceiro-na-realiza%C3%A7%C3%A3o-vi-senid

---

## 🏫 Contexto Educacional

O **Pascal :: Blocks** foi concebido e aplicado em contextos de:

- Ensino Básico
- Cursos Técnicos
- Licenciatura em Computação
- Formação de professores

Sendo especialmente útil em cenários onde estudantes apresentam **dificuldades iniciais com linguagens textuais**.

---

## 🛠️ Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript (Vanilla)
- Arquitetura **100% client-side** (sem dependência de servidor)

---

## 📄 Licença

Este projeto é distribuído como **Recurso Educacional Aberto**, podendo ser utilizado, adaptado e redistribuído para fins educacionais.

> Recomenda-se manter os créditos ao autor e ao projeto original.


---

## 🤝 Contribuições

Contribuições são bem-vindas!

Sugestões, melhorias pedagógicas, correções ou extensões do projeto podem ser feitas via **Issues** ou **Pull Requests**.

Contribuidores:
[Diego Breskovit](https://github.com/dbreskovit)
