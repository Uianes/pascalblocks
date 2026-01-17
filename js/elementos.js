//Pegar todos os elementos do CSS.
var a = window.document.getElementById('program')
var b = window.document.getElementById('usescrt')
var c = window.document.getElementById('begin')
var c0 = window.document.getElementById('end0')
var d = window.document.getElementById('end1')
var e = window.document.getElementById('end2')
var f = window.document.getElementById('variaveis')
var g = window.document.getElementById('novavar')
var h = window.document.getElementById('novovalorvar')
var i = window.document.getElementById('entrada')
var j = window.document.getElementById('saida')
var k = window.document.getElementById('entradaDados')
var l = window.document.getElementById('igualdade')
var m = window.document.getElementById('diferenca')
var n = window.document.getElementById('maior')
var o = window.document.getElementById('menor')
var p = window.document.getElementById('nao')
var q = window.document.getElementById('ee')
var r = window.document.getElementById('ou')
var s = window.document.getElementById('dv')
var t = window.document.getElementById('aspas')
var u = window.document.getElementById('apostrofe')
var v = window.document.getElementById('pontoevirgula')
var w = window.document.getElementById('virgula')
var x = window.document.getElementById('mod')
var y = window.document.getElementById('parentese1')
var z = window.document.getElementById('parentese2')
var a1 = window.document.getElementById('clrscr') 
var b1 = window.document.getElementById('saidacomvar')
var c1 = window.document.getElementById('sqr')
var d1 = window.document.getElementById('sqrt')
var e1 = window.document.getElementById('condicionalsimples')
var g1 = window.document.getElementById('condicionalsenao')
var h1 = window.document.getElementById('condicionalcase')
var i1 = window.document.getElementById('caseopcao')
var j1 = window.document.getElementById('enquanto')
var l1 = window.document.getElementById('repita')
var m1 = window.document.getElementById('until')
var n1 = window.document.getElementById('para')
var p1 = window.document.getElementById('btn')
// btn2 removido; agora usamos lixeira drag'n'drop
var q1 = null
var trashBin = window.document.getElementById('trashBin')
var r1 = window.document.getElementById('btnDownload')
var t1 = window.document.getElementById('btnSimular')
var u1 = window.document.getElementById('btnValidar')
var s1 = window.document.getElementById('senaose')

// ------------------------------
// Responsividade (melhor em mobile)
// ------------------------------
// O header (#TextoCentral) é position:fixed e pode variar de altura (por exemplo,
// quando os botões do topo quebram linha em telas menores). Para o layout não
// "pular" nem cortar conteúdo, atualizamos a CSS var --header-height dinamicamente.
function atualizarAlturaHeader(){
    var header = document.getElementById('TextoCentral');
    if(!header) return;
    document.documentElement.style.setProperty('--header-height', header.offsetHeight + 'px');
}

// Debounce simples para resize
var _tResize = null;
window.addEventListener('resize', function(){
    if(_tResize) clearTimeout(_tResize);
    _tResize = setTimeout(atualizarAlturaHeader, 80);
});

// Atualiza no carregamento
window.addEventListener('load', atualizarAlturaHeader);
// E também logo no início (caso o load demore)
atualizarAlturaHeader();