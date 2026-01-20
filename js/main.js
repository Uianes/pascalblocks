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
const blockCondicionalSimples =
  window.document.getElementById('condicionalsimples');
const blockCondicionalSenao =
  window.document.getElementById('condicionalsenao');
const blockCondicionalCase = window.document.getElementById('condicionalcase');
const blockCaseOpcao = window.document.getElementById('caseopcao');
const blockEnquanto = window.document.getElementById('enquanto');
const blockRepita = window.document.getElementById('repita');
const blockUntil = window.document.getElementById('until');
const blockPara = window.document.getElementById('para');
const btnGerar = window.document.getElementById('btn');
const trashBin = window.document.getElementById('trashBin');
const btnDownload = window.document.getElementById('btnDownload');
const btnSimular = window.document.getElementById('btnSimular');
const btnValidar = window.document.getElementById('btnValidar');
const btnLimpar = window.document.getElementById('btnLimpar');
const blockSenaoSe = window.document.getElementById('senaose');

import {
  checkWorkspaceEmptyState,
  limparWorkspace,
  undo,
  redo,
  initHistory,
} from './modules/workspace.js';
import { wireDnD } from './modules/dnd.js';
import * as block_actions from './modules/block_actions.js';
import { generateCodePreview, baixarCodigo } from './modules/code_generator.js';
import { abrirSimulador } from './modules/simulator.js';
import { abrirValidacao } from './modules/validator.js';
import {
  exportBlocksToXml,
  importBlocksFromXml,
} from './modules/import_export.js';

const importFileInput = window.document.getElementById('importFileInput');

for (const action in block_actions) {
  window[action] = block_actions[action];
}

blockProgram.addEventListener('click', block_actions.program);
blockUsesCrt.addEventListener('click', block_actions.usescrt);
blockBegin.addEventListener('click', block_actions.begin);
blockEndProgram.addEventListener('click', block_actions.end0);
blockEnd.addEventListener('click', block_actions.end1);
blockEndIf.addEventListener('click', block_actions.end2);
blockVariaveis.addEventListener('click', block_actions.variaveis);
blockNovaVar.addEventListener('click', block_actions.novavar);
blockNovoValorVar.addEventListener('click', block_actions.novovalor);
blockEntrada.addEventListener('click', block_actions.entrada);
blockSaida.addEventListener('click', block_actions.saida);
blockEntradaDados.addEventListener('click', block_actions.entradaDados);
opIgualdade.addEventListener('click', block_actions.igualdade);
opDiferenca.addEventListener('click', block_actions.diferenca);
opMaior.addEventListener('click', block_actions.maior);
opMenor.addEventListener('click', block_actions.menor);
opNao.addEventListener('click', block_actions.nao);
opE.addEventListener('click', block_actions.ee);
opOu.addEventListener('click', block_actions.ou);
opDivisao.addEventListener('click', block_actions.dv);
symAspas.addEventListener('click', block_actions.aspas);
symApostrofo.addEventListener('click', block_actions.apostrofe);
symPontoEVirgula.addEventListener('click', block_actions.pontoevirgula);
symVirgula.addEventListener('click', block_actions.virgula);
opMod.addEventListener('click', block_actions.mod);
symParenteseEsq.addEventListener('click', block_actions.parentese1);
symParenteseDir.addEventListener('click', block_actions.parentese2);
fnClrscr.addEventListener('click', block_actions.clrscr);
fnSaidaComVar.addEventListener('click', block_actions.saidacomvar);
fnSqr.addEventListener('click', block_actions.sqr);
fnSqrt.addEventListener('click', block_actions.sqrt);
blockCondicionalSimples.addEventListener(
  'click',
  block_actions.condicionalsimples
);
blockCondicionalSenao.addEventListener('click', block_actions.condicionalsenao);
blockCondicionalCase.addEventListener('click', block_actions.condicionalcase);
blockCaseOpcao.addEventListener('click', block_actions.caseopcao);
blockEnquanto.addEventListener('click', block_actions.enquanto);
blockRepita.addEventListener('click', block_actions.repita);
blockUntil.addEventListener('click', block_actions.until);
blockPara.addEventListener('click', block_actions.para);
blockSenaoSe.addEventListener('click', block_actions.condicionalsenaose);

btnGerar.addEventListener('click', generateCodePreview);
if (typeof btnSimular !== 'undefined' && btnSimular)
  btnSimular.addEventListener('click', abrirSimulador);
if (typeof btnValidar !== 'undefined' && btnValidar)
  btnValidar.addEventListener('click', abrirValidacao);
if (typeof btnLimpar !== 'undefined' && btnLimpar)
  btnLimpar.addEventListener('click', limparWorkspace);

if (typeof importFileInput !== 'undefined' && importFileInput) {
  importFileInput.addEventListener('change', handleImportFile);
}

const btnAcoes = window.document.getElementById('btnAcoes');
const dropdownAcoes = window.document.getElementById('dropdownAcoes');

if (btnAcoes && dropdownAcoes) {
  btnAcoes.addEventListener('click', function (event) {
    dropdownAcoes.classList.toggle('show');
    event.stopPropagation();
  });

  const btnDownloadDropdown = dropdownAcoes.querySelector('#btnDownload');
  const btnExportDropdown = dropdownAcoes.querySelector('#btnExport');
  const btnImportDropdown = dropdownAcoes.querySelector('#btnImport');

  if (btnDownloadDropdown)
    btnDownloadDropdown.addEventListener('click', baixarCodigo);
  if (btnExportDropdown)
    btnExportDropdown.addEventListener('click', downloadPasBlockFile);
  if (btnImportDropdown)
    btnImportDropdown.addEventListener('click', () => importFileInput.click());

  window.addEventListener('click', function (event) {
    if (!event.target.closest('.dropdown')) {
      if (dropdownAcoes.classList.contains('show')) {
        dropdownAcoes.classList.remove('show');
      }
    }
  });
}

wireDnD();
checkWorkspaceEmptyState();
initHistory();

// Botões de Undo/Redo
const btnUndo = window.document.getElementById('btnUndo');
const btnRedo = window.document.getElementById('btnRedo');

if (btnUndo) btnUndo.addEventListener('click', undo);
if (btnRedo) btnRedo.addEventListener('click', redo);

// Atalhos de teclado para Undo/Redo
window.addEventListener('keydown', function (event) {
  // Ignora se estiver digitando em um input ou textarea
  if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
    return;
  }
  
  // Ctrl+Z ou Cmd+Z para Undo
  if ((event.ctrlKey || event.metaKey) && event.key === 'z' && !event.shiftKey) {
    event.preventDefault();
    undo();
  }
  
  // Ctrl+Y ou Ctrl+Shift+Z ou Cmd+Shift+Z para Redo
  if ((event.ctrlKey || event.metaKey) && (event.key === 'y' || (event.key === 'z' && event.shiftKey))) {
    event.preventDefault();
    redo();
  }
});

function downloadPasBlockFile() {
  const xmlContent = exportBlocksToXml();
  const filename = 'meu_programa.pas_block';

  const blob = new Blob([xmlContent], { type: 'text/xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  setTimeout(function () {
    URL.revokeObjectURL(url);
  }, 500);
}

function handleImportFile(event) {
  const file = event.target.files[0];
  if (!file) {
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    const xmlString = e.target.result;
    importBlocksFromXml(xmlString);
  };
  reader.readAsText(file);
}

function atualizarAlturaHeader() {
  const header = document.getElementById('TextoCentral');
  if (!header) return;
  document.documentElement.style.setProperty(
    '--header-height',
    header.offsetHeight + 'px'
  );
}

let _tResize = null;
window.addEventListener('resize', function () {
  if (_tResize) clearTimeout(_tResize);
  _tResize = setTimeout(atualizarAlturaHeader, 80);
});

window.addEventListener('load', atualizarAlturaHeader);
atualizarAlturaHeader();
