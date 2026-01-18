import { pushBloco, pushToken } from './workspace.js';

function program() {
  var nome = window.prompt('Informe o nome do programa: ') || '';
  nome = String(nome).trim();
  pushBloco('program ' + nome + ';', 'laranja', 'program ' + nome + ';');
}
function usescrt() {
  pushBloco('uses crt;', 'laranja', 'uses crt;');
}
function begin() {
  pushBloco('begin', 'laranja', 'begin');
}
function end0() {
  pushBloco('end', 'laranja', 'end');
}
function end1() {
  pushBloco('end;', 'laranja', 'end;');
}
function end2() {
  pushBloco('end.', 'laranja', 'end.');
}
function variaveis() {
  pushBloco('var', 'verde', 'var');
}
function novavar() {
  var nomevariavel = window.prompt('Informe o nome da variável:');
  var tipovar = window.prompt('Informe o tipo da variável:');
  pushBloco(
    String(nomevariavel) + ': ' + String(tipovar) + ';',
    'verde',
    String(nomevariavel) + ' : ' + String(tipovar) + ';'
  );
}

function entrada() {
  var texto = window.prompt('Deseja ler qual variável? ');
  pushBloco(
    'Readln(' + String(texto) + ');',
    'azul',
    'Readln(' + String(texto) + ');'
  );
}
function saida() {
  var texto = window.prompt('O que você deseja escrever: ');
  pushBloco(
    "Writeln('" + String(texto) + "');",
    'azul',
    "Writeln('" + String(texto) + "');"
  );
}
function saidacomvar() {
  alert(
    'Informe primeiramente o texto, feche a apóstrofe e adicione as suas variáveis separando por vírgulas. Não esqueça que você deve fechar as apóstrofes!'
  );
  var texto = window.prompt('O que você deseja escrever: ');
  pushBloco(
    "Writeln('" + String(texto) + ');',
    'azul',
    "Writeln('" + String(texto) + ');'
  );
}
function novovalor() {
  var valorvariavel = window.prompt(
    'Qual o nome da variável que você deseja atribuir um valor?'
  );
  var valor = window.prompt('Qual o valor que você deseja atribuir?');
  pushBloco(
    String(valorvariavel) + ' := ' + String(valor) + ';',
    'verde',
    String(valorvariavel) + ' := ' + String(valor) + ';'
  );
}
function entradaDados() {
  pushToken(':=');
}
function igualdade() {
  pushToken('=');
}
function diferenca() {
  pushToken('<>');
}
function maior() {
  pushToken('>');
}
function menor() {
  pushToken('<');
}
function nao() {
  pushToken('NOT');
}
function ee() {
  pushToken('AND');
}
function ou() {
  pushToken('OR');
}
function dv() {
  pushToken('DIV');
}
function aspas() {
  pushToken('"');
}
function apostrofe() {
  pushToken("'");
}
function pontoevirgula() {
  pushToken(';');
}
function virgula() {
  pushToken(',');
}
function mod() {
  pushToken('MOD');
}
function parentese1() {
  pushToken('(');
}
function parentese2() {
  pushToken(')');
}
function clrscr() {
  pushBloco('CLRSCR;', 'cinza', 'CLRSCR;');
}
function sqr() {
  var varquadrada = window.prompt(
    'Em qual variável você deseja armazenar o valor ao quadrado?'
  );
  pushBloco(
    String(varquadrada) + ' := SQR(' + String(varquadrada) + ');',
    'cinza',
    String(varquadrada) + ' := SQR(' + String(varquadrada) + ');'
  );
}
function sqrt() {
  var raiz = window.prompt(
    'Em qual variável você deseja armazenar o valor da raiz quadrada?'
  );
  pushBloco(
    String(raiz) + ' := SQRT(' + String(raiz) + ');',
    'cinza',
    String(raiz) + ' := SQRT(' + String(raiz) + ');'
  );
}
function condicionalsimples() {
  var condicao1 = window.prompt('Insira aqui a condição: ');
  pushBloco(
    'IF (' + String(condicao1) + ') THEN',
    'amarelo',
    'IF (' + String(condicao1) + ') THEN'
  );
}

function condicionalsenao() {
  pushBloco('ELSE', 'amarelo', 'ELSE');
}
function condicionalsenaose() {
  var condicao2 = window.prompt('Insira aqui a condição: ');
  pushBloco(
    'ELSE IF (' + String(condicao2) + ') THEN',
    'amarelo',
    'ELSE IF (' + String(condicao2) + ') THEN'
  );
}
function condicionalcase() {
  var condicao3 = window.prompt('Insira aqui a variável para ser testada: ');
  pushBloco(
    'CASE ' + String(condicao3) + ' OF',
    'amarelo',
    'CASE ' + String(condicao3) + ' OF'
  );
}
function caseopcao() {
  var condicao4 = window.prompt("Valor do CASE (ex: 1, 'a', 1..3):") || '';
  condicao4 = String(condicao4).trim();
  pushBloco(String(condicao4) + ':', 'amarelo', String(condicao4) + ':');
}
function enquanto() {
  var condicao = window.prompt('Insira aqui a condição:');
  pushBloco(
    'WHILE (' + String(condicao) + ') DO',
    'laranja2',
    'WHILE (' + String(condicao) + ') DO'
  );
}
function repita() {
  pushBloco('REPEAT', 'laranja2', 'REPEAT');
}
function until() {
  var condicao = window.prompt('Insira aqui a condição:') || '';
  condicao = String(condicao).trim();
  pushBloco(
    'UNTIL (' + condicao + ');',
    'laranja2',
    'UNTIL (' + condicao + ');'
  );
}
function para() {
  var variavel = window.prompt('Nome da variável de controle (ex: i):') || 'i';
  variavel = String(variavel).trim() || 'i';

  var inicio = window.prompt('Valor inicial (ex: 1):') || '1';
  var fim = window.prompt('Valor final (ex: 10):') || '10';

  inicio = String(inicio).trim();
  fim = String(fim).trim();

  pushBloco(
    'FOR ' + variavel + ' := ' + inicio + ' TO ' + fim + ' DO',
    'laranja2',
    'FOR ' + variavel + ' := ' + inicio + ' TO ' + fim + ' DO'
  );
}

export {
  program,
  usescrt,
  begin,
  end0,
  end1,
  end2,
  variaveis,
  novavar,
  entrada,
  saida,
  saidacomvar,
  novovalor,
  entradaDados,
  igualdade,
  diferenca,
  maior,
  menor,
  nao,
  ee,
  ou,
  dv,
  aspas,
  apostrofe,
  pontoevirgula,
  virgula,
  mod,
  parentese1,
  parentese2,
  clrscr,
  sqr,
  sqrt,
  condicionalsimples,
  condicionalsenao,
  condicionalsenaose,
  condicionalcase,
  caseopcao,
  enquanto,
  repita,
  until,
  para,
};
