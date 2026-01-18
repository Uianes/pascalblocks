//Pegar todos os elementos do CSS.
const blockProgram = window.document.getElementById('program');
const blockUsesCrt = window.document.getElementById('usescrt');
const blockBegin = window.document.getElementById('begin');
const blockEndProgram = window.document.getElementById('end0');
const blockEnd = window.document.getElementById('end1');
const blockEndIf = window.document.getElementById('end2');
const blockVariaveis = window.document.getElementById('variaveis');
const blockNovaVar = window.document.getElementById('novavar');
const blockNovoValorVar = window.document.getElementById('novovalorvar');
const blockEntrada = window.document.getElementById('entrada');
const blockSaida = window.document.getElementById('saida');
const blockEntradaDados = window.document.getElementById('entradaDados');
const opIgualdade = window.document.getElementById('igualdade');
const opDiferenca = window.document.getElementById('diferenca');
const opMaior = window.document.getElementById('maior');
const opMenor = window.document.getElementById('menor');
const opNao = window.document.getElementById('nao');
const opE = window.document.getElementById('ee');
const opOu = window.document.getElementById('ou');
const opDivisao = window.document.getElementById('dv');
const symAspas = window.document.getElementById('aspas');
const symApostrofo = window.document.getElementById('apostrofe');
const symPontoEVirgula = window.document.getElementById('pontoevirgula');
const symVirgula = window.document.getElementById('virgula');
const opMod = window.document.getElementById('mod');
const symParenteseEsq = window.document.getElementById('parentese1');
const symParenteseDir = window.document.getElementById('parentese2');
const fnClrscr = window.document.getElementById('clrscr');
const fnSaidaComVar = window.document.getElementById('saidacomvar');
const fnSqr = window.document.getElementById('sqr');
const fnSqrt = window.document.getElementById('sqrt');
const blockCondicionalSimples = window.document.getElementById('condicionalsimples');
const blockCondicionalSenao = window.document.getElementById('condicionalsenao');
const blockCondicionalCase = window.document.getElementById('condicionalcase');
const blockCaseOpcao = window.document.getElementById('caseopcao');
const blockEnquanto = window.document.getElementById('enquanto');
const blockRepita = window.document.getElementById('repita');
const blockUntil = window.document.getElementById('until');
const blockPara = window.document.getElementById('para');
const btnGerar = window.document.getElementById('btn');
// btn2 removido; agora usamos lixeira drag'n'drop
const trashBin = window.document.getElementById('trashBin');
const btnDownload = window.document.getElementById('btnDownload');
const btnSimular = window.document.getElementById('btnSimular');
const btnValidar = window.document.getElementById('btnValidar');
const btnLimpar = window.document.getElementById('btnLimpar');
const blockSenaoSe = window.document.getElementById('senaose');

// ------------------------------
// Responsividade (melhor em mobile)
// ------------------------------
// O header (#TextoCentral) é position:fixed e pode variar de altura (por exemplo,
// quando os botões do topo quebram linha em telas menores). Para o layout não
// "pular" nem cortar conteúdo, atualizamos a CSS var --header-height dinamicamente.
function atualizarAlturaHeader() {
    const header = document.getElementById('TextoCentral');
    if (!header) return;
    document.documentElement.style.setProperty('--header-height', header.offsetHeight + 'px');
}

// Debounce simples para resize
let _tResize = null;
window.addEventListener('resize', function () {
    if (_tResize) clearTimeout(_tResize);
    _tResize = setTimeout(atualizarAlturaHeader, 80);
});

// Atualiza no carregamento
window.addEventListener('load', atualizarAlturaHeader);
// E também logo no início (caso o load demore)
atualizarAlturaHeader();