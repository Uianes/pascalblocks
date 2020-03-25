//Transformar cada DIV em um botão
a.addEventListener('click', program)
b.addEventListener('click', usescrt)
c.addEventListener('click', begin)
d.addEventListener('click', end1)
e.addEventListener('click', end2)
f.addEventListener('click', variaveis)
g.addEventListener('click', novavar)
h.addEventListener('click', novovalor)
i.addEventListener('click', entrada)
j.addEventListener('click', saida)
k.addEventListener('click', entradaDados)
l.addEventListener('click', igualdade)
m.addEventListener('click', diferenca)
n.addEventListener('click', maior)
o.addEventListener('click', menor)
p.addEventListener('click', nao)
q.addEventListener('click', ee)
r.addEventListener('click', ou)
s.addEventListener('click', dv)
t.addEventListener('click', aspas)
u.addEventListener('click', apostrofe)
v.addEventListener('click', pontoevirgula)
w.addEventListener('click', virgula)
x.addEventListener('click', mod)
y.addEventListener('click', parentese1)
z.addEventListener('click', parentese2)
a1.addEventListener('click', clrscr)
b1.addEventListener('click', saidacomvar)
c1.addEventListener('click', sqr)
d1.addEventListener('click', sqrt)
e1.addEventListener('click', condicionalsimples)
g1.addEventListener('click', condicionalsenao)
h1.addEventListener('click', condicionalcase)
i1.addEventListener('click', caseopcao)
j1.addEventListener('click', enquanto)
l1.addEventListener('click', repita)
m1.addEventListener('click', until)
n1.addEventListener('click', para)
p1.addEventListener('click', btn)
q1.addEventListener('click', btn2)
s1.addEventListener('click', condicionalsenaose)
let codigoHTML = []
let codigo = []
let controleVar = 0;
//Função de cada botão
function program(){
    var nome = window.prompt("Informe o nome do programa: ")
    codigo[codigo.length] = "Program"+String(nome)+";"
    codigoHTML[codigoHTML.length] = `<br><table><tr><th class='laranja'>Program ${nome};</th></tr>`
    document.getElementById('blocos1').innerHTML = codigoHTML.join(" ")
}
function usescrt(){
    codigo[codigo.length] = "uses crt;"
    codigoHTML[codigoHTML.length] = `<tr><th class='laranja'>uses crt;</th></tr>`
    document.getElementById('blocos1').innerHTML = codigoHTML.join(" ")
}
function begin(){
    codigo[codigo.length] = "begin"
    codigoHTML[codigoHTML.length] = `<tr><th class='laranja'>begin</th></tr>`
    document.getElementById('blocos1').innerHTML = codigoHTML.join(" ")
}
function end1(){
    codigo[codigo.length] = "end;"
    codigoHTML[codigoHTML.length] = `<tr><th class='laranja'>end;</th></tr>`
    document.getElementById('blocos1').innerHTML = codigoHTML.join(" ")
}
function end2(){
    codigo[codigo.length] = "end."
    codigoHTML[codigoHTML.length] = `<th class='laranja'>end.</th></table>`
    document.getElementById('blocos1').innerHTML = codigoHTML.join(" ")
}
function variaveis(){
    codigo[codigo.length] = "var"
    codigoHTML[codigoHTML.length] = `<tr><th class='verde'>var</th></tr>`
    document.getElementById('blocos1').innerHTML = codigoHTML.join(" ")
}
function novavar(){
    var nomevariavel = window.prompt("Informe o nome da variável:")
    var tipovar = window.prompt("Informe o tipo da variável:")
    codigo[codigo.length] = String(nomevariavel)+":"+String(tipovar)+";"
    codigoHTML[codigoHTML.length] = `<tr><th class='verde'> ${String(nomevariavel)} : ${String(tipovar)};</th></tr>`
    document.getElementById('blocos1').innerHTML = codigoHTML.join(" ")
}

function entrada(){
    var texto = window.prompt("Deseja ler qual variável? ")
    codigo[codigo.length] = "Readln("+String(texto)+");"
    codigoHTML[codigoHTML.length] = `<tr><th class='azul'>Readln(${texto});</th></tr>`
    document.getElementById('blocos1').innerHTML = codigoHTML.join(" ")

}
function saida(){
    var texto = window.prompt("O que você deseja escrever: ")
    codigo[codigo.length] = "Writeln('"+String(texto)+"');"
    codigoHTML[codigoHTML.length] = `<tr><th class='azul'>Writeln('${texto}');</th></tr>`
    document.getElementById('blocos1').innerHTML = codigoHTML.join(" ")
}
function saidacomvar(){
    alert("Informe primeiramente o texto, feche a apóstrofe e adicione as suas variáveis separando por vírgulas. Não esqueça que você deve fechar as apóstrofes!")
    var texto = window.prompt("O que você deseja escrever: ")
    codigo[codigo.length] = "Writeln('"+String(texto)+");"
    codigoHTML[codigoHTML.length] = `<tr><th class='azul'>Writeln('${texto});</th></tr>`
    document.getElementById('blocos1').innerHTML = codigoHTML.join(" ")
}
function novovalor(){
    var valorvariavel = window.prompt("Qual o nome da variável que você deseja atribuir um valor?")
    var valor = window.prompt("Qual o valor que você deseja atribuir?")
    codigo[codigo.length] = String(valorvariavel)+":="+String(valor)+";"
    codigoHTML[codigoHTML.length] = `<tr><th class='verde'> ${String(valorvariavel)} := ${String(valor)};</th></tr>`
    document.getElementById('blocos1').innerHTML = codigoHTML.join(" ")
}
function entradaDados(){
    console.log(":=")
}
function igualdade(){
    console.log("=")
}
function diferenca(){
    console.log("<>")
}
function maior(){
    console.log(">")
}
function menor(){
    console.log("<")
}
function nao(){
    console.log("NOT")
}
function ee(){
    console.log("AND")
}
function ou(){
    console.log("OR")
}
function dv(){
    console.log("DIV")
}
function aspas(){
    console.log(`"`)
}
function apostrofe(){
    console.log(`'`)
}
function pontoevirgula(){
    console.log(";")
}
function virgula(){
    console.log(",")
}
function mod(){
    console.log("MOD")
}
function parentese1(){
    console.log("(")
}
function parentese2(){
    console.log(")")
}
function clrscr(){
    codigo[codigo.length] = "CLRSCR;"
    codigoHTML[codigoHTML.length] = `<tr><th class='cinza'>CLRSCR;</th></tr>`
    document.getElementById('blocos1').innerHTML = codigoHTML.join(" ")
}
function sqr(){
    var varquadrada = window.prompt("Em qual variável você deseja armazenar o valor ao quadrado?")
    codigo[codigo.length] = String(varquadrada)+" := SQR("+String(varquadrada)+");"
    codigoHTML[codigoHTML.length] = `<tr><th class='cinza'> ${varquadrada} := SQR(${varquadrada});</th></tr>`
    document.getElementById('blocos1').innerHTML = codigoHTML.join(" ")
}
function sqrt(){
    var raiz = window.prompt("Em qual variável você deseja armazenar o valor da raiz quadrada?")
    codigo[codigo.length] = String(raiz)+" := SQRT("+String(raiz)+");"
    codigoHTML[codigoHTML.length] = `<tr><th class='cinza'> ${raiz} := SQRT(${raiz});</th></tr>`
    document.getElementById('blocos1').innerHTML = codigoHTML.join(" ")
}
function condicionalsimples(){
    var condicao1 = window.prompt("Insira aqui a condição: ")
    codigo[codigo.length] = "IF ("+String(condicao1)+") THEN"
    codigoHTML[codigoHTML.length] = `<tr><th class='amarelo'>IF(${condicao1}) THEN</th></tr>`
    document.getElementById('blocos1').innerHTML = codigoHTML.join(" ")
}

function condicionalsenao(){
    codigo[codigo.length] = "Else"
    codigoHTML[codigoHTML.length] = `<tr><th class='amarelo'>ELSE</th></tr>`
    document.getElementById('blocos1').innerHTML = codigoHTML.join(" ")
}
function condicionalsenaose(){
    var condicao2 = window.prompt("Insira aqui a condição: ")
    codigo[codigo.length] = "Else if ("+String(condicao2)+") then"
    codigoHTML[codigoHTML.length] = `<tr><th class='amarelo'>ELSE IF(${condicao2}) THEN</th></tr>`
    document.getElementById('blocos1').innerHTML = codigoHTML.join(" ")
}
function condicionalcase(){
    var condicao3 = window.prompt("Insira aqui a variável para ser testada: ")
    codigo[codigo.length] = "Case "+String(condicao3)+" of"
    codigoHTML[codigoHTML.length] = `<tr><th class='amarelo'>CASE ${condicao3} OF</th></tr>`
    document.getElementById('blocos1').innerHTML = codigoHTML.join(" ")
}
function caseopcao(){
    var condicao4 = window.prompt("Insira aqui a condição:")
    codigo[codigo.length] = String(condicao4)+":"
    codigoHTML[codigoHTML.length] = `<tr><th class='amarelo'>${condicao4} :</th></tr>`
    document.getElementById('blocos1').innerHTML = codigoHTML.join(" ")
}
function enquanto(){
    var condicao = window.prompt("Insira aqui a condição:")
    codigo[codigo.length] = "WHILE ("+String(condicao)+") DO <br>"
    codigoHTML[codigoHTML.length] = `<tr><th class='laranja2'>While (${condicao}) do</th></tr>`
    document.getElementById('blocos1').innerHTML = codigoHTML.join(" ")
}
function repita(){
    codigo[codigo.length] = "Repeat <br>"
    codigoHTML[codigoHTML.length] = `<tr><th class='laranja2'>Repeat</th></tr>`
    document.getElementById('blocos1').innerHTML = codigoHTML.join(" ")
}
function until(){
    var condicao = window.prompt("Insira aqui a condição:")
    codigo[codigo.length] = "Until ("+String(condicao)+") <br>"
    codigoHTML[codigoHTML.length] = `<tr><th class='laranja2'>Until (${condicao})</th></tr>`
    document.getElementById('blocos1').innerHTML = codigoHTML.join(" ")
}
function para(){
    var condicao = window.prompt("Insira o valor inicial para o FOR:")
    var condicao2 = window.prompt("Insira o valor final para o FOR: ")
    codigo[codigo.length] = "For "+String(condicao)+"to "+String(condicao2)+" do <br>"
    codigoHTML[codigoHTML.length] = `<tr><th class='laranja2'>For ${condicao} to ${condicao2} do</th></tr>`
    document.getElementById('blocos1').innerHTML = codigoHTML.join(" ")
}
function ate(){
    console.log("to")
}
function btn(){
    document.getElementById('blocos2').innerHTML = "<br><br><br><br>"+codigo.join(" ").replace(/;/gi, '; <br>').replace(/THEN/gi, 'then <br>').replace(/OF/gi, 'OF <br>').replace(/begin/gi, ' begin<br>').replace(/(var)(?=(?:[^"]|"[^"]*")*$)/gi, 'var <br>')
}
function btn2(){
    codigo.pop()
    codigoHTML.pop()
    document.getElementById('blocos1').innerHTML = codigoHTML.join(" ")
}