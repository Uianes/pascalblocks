import { gerarFontePascal } from './code_generator.js';
import { openModal, closeModal } from './modals.js';

function $(id) {
  return document.getElementById(id);
}

function abrirValidacao() {
  closeModal('simModal');
  validarEExibir();
  openModal('valModal');

  if (abrirValidacao._wired) return;
  var close = function () {
    fecharValidacao();
  };
  if ($('valClose')) $('valClose').addEventListener('click', close);
  if ($('valCloseBtn')) $('valCloseBtn').addEventListener('click', close);
  if ($('valRevalidar'))
    $('valRevalidar').addEventListener('click', validarEExibir);
  if ($('valCopiar'))
    $('valCopiar').addEventListener('click', function () {
      var t = ($('valReport') && $('valReport').textContent) || '';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(t);
      } else {
        window.prompt('Copie o relatório:', t);
      }
    });
  document.addEventListener('keydown', function (ev) {
    var m = $('valModal');
    if (!m || m.classList.contains('pb-hidden')) return;
    if (ev.key === 'Escape') close();
  });
  abrirValidacao._wired = true;
}

function fecharValidacao() {
  closeModal('valModal');
}

function validarEExibir() {
  var fonte = gerarFontePascal();
  var diags = validarFontePascal(fonte);

  var erros = diags.filter(function (d) {
    return d.sev === 'ERRO';
  }).length;
  var avisos = diags.filter(function (d) {
    return d.sev === 'AVISO';
  }).length;
  if ($('valResumo'))
    $('valResumo').textContent =
      (erros ? erros + ' erro(s)' : '0 erros') +
      (avisos ? ' • ' + avisos + ' aviso(s)' : '');

  var linhas = [];
  if (!diags.length) {
    linhas.push('✅ Nenhum problema encontrado nas regras básicas.');
  } else {
    diags.forEach(function (d) {
      var pos = d.line != null ? 'L' + d.line + ': ' : '';
      linhas.push(d.sev + ' ' + pos + d.msg);
    });
  }
  if ($('valReport')) $('valReport').textContent = linhas.join('\n');
}

function validarFontePascal(fonte) {
  var lines = String(fonte || '')
    .replace(/\r/g, '')
    .split('\n');
  var diags = [];

  function add(sev, line, msg) {
    diags.push({ sev: sev, line: line, msg: msg });
  }

  function stripStr(s) {
    return String(s).replace(/'(?:''|[^'])*'/g, "''");
  }

  function getNextMeaningfulLine(startIndex) {
    let currentIndex = startIndex;
    while (currentIndex < lines.length) {
      const line = lines[currentIndex].trim();
      if (line) {
        return { line: line, index: currentIndex };
      }
      currentIndex++;
    }
    return null;
  }

  // 1) program / begin / end.
  var hasProgram = false;
  var hasBegin = false;
  var hasEndDot = false;
  for (var i = 0; i < lines.length; i++) {
    var raw = lines[i];
    var l = raw.trim();
    if (!l) continue;
    if (/^program\b/i.test(l)) hasProgram = true;
    if (/^begin\b/i.test(l)) hasBegin = true;
    if (/^end\.$/i.test(l)) hasEndDot = true;
  }
  if (!hasProgram) add('ERRO', null, 'Faltou a linha "program Nome;".');
  if (!hasBegin)
    add('ERRO', null, 'Faltou o "begin" para iniciar o bloco principal.');
  if (!hasEndDot)
    add('ERRO', null, 'Faltou o "end." para finalizar o programa.');

  // 2) balanceamento begin/end (aproximado)
  var stack = [];
  for (i = 0; i < lines.length; i++) {
    var s = stripStr(lines[i]).toLowerCase();
    // conta tokens begin/end fora de palavras
    var m;
    var reB = /\bbegin\b/g;
    while ((m = reB.exec(s))) stack.push({ t: 'begin', line: i + 1 });
    var reE = /\bend\b\s*[;\.]?/g;
    while ((m = reE.exec(s))) {
      if (stack.length) stack.pop();
      else add('ERRO', i + 1, '"end" sem "begin" correspondente.');
    }
  }
  if (stack.length) {
    add(
      'ERRO',
      stack[stack.length - 1].line,
      'Existe "begin" sem "end" correspondente.'
    );
  }

  // 3) seção var e variáveis declaradas
  var inVar = false;
  var declared = Object.create(null);
  var keywords = {
    program: 1,
    uses: 1,
    crt: 1,
    var: 1,
    begin: 1,
    end: 1,
    if: 1,
    then: 1,
    else: 1,
    while: 1,
    do: 1,
    for: 1,
    to: 1,
    downto: 1,
    repeat: 1,
    until: 1,
    case: 1,
    of: 1,
    writeln: 1,
    readln: 1,
    clrscr: 1,
    integer: 1,
    real: 1,
    char: 1,
    string: 1,
    boolean: 1,
    div: 1,
    mod: 1,
    not: 1,
    and: 1,
    or: 1,
    sqr: 1,
    sqrt: 1,
    true: 1,
    false: 1,
  };

  for (i = 0; i < lines.length; i++) {
    var l2 = lines[i].trim();
    if (!l2) continue;
    if (/^var\b/i.test(l2)) {
      inVar = true;
      continue;
    }
    if (/^begin\b/i.test(l2)) {
      inVar = false;
    }
    if (inVar) {
      // exemplo: x: integer;
      var d = l2.match(
        /^([A-Za-z_][A-Za-z0-9_]*)\s*:\s*([A-Za-z_][A-Za-z0-9_]*)\s*;$/
      );
      if (!d) {
        // var vazio ou sem ;
        if (/^var\b/i.test(l2)) continue;
        add(
          'AVISO',
          i + 1,
          'Declaração de variável fora do padrão "nome: tipo;".'
        );
      } else {
        var nm = d[1];
        if (declared[nm])
          add(
            'AVISO',
            i + 1,
            'Variável "' + nm + '" declarada mais de uma vez.'
          );
        declared[nm] = true;
      }
    }
  }

  // 4) ponto-e-vírgula básico
  for (i = 0; i < lines.length; i++) {
    var tline = lines[i].trim();
    if (!tline) continue;

    if (/^if\b.*then\s*;?$/i.test(tline)) {
    }

    if (/^program\b/i.test(tline)) {
      if (!/.;\s*$/.test(tline))
        add('ERRO', i + 1, 'A linha "program" deve terminar com ";".');
      continue;
    }
    if (/^uses\b/i.test(tline)) {
      if (!/.;\s*$/.test(tline))
        add('ERRO', i + 1, 'A linha "uses" deve terminar com ";".');
      continue;
    }
    if (/^var\b/i.test(tline)) {
      continue;
    }
    if (/^begin\b/i.test(tline)) {
      continue;
    }
    if (/^end\.$/i.test(tline)) {
      continue;
    }
    if (/^end;$/i.test(tline)) {
      continue;
    }
    if (/^(if\b|while\b|for\b|repeat\b|until\b|else\b|case\b)/i.test(tline)) {
      continue;
    }

    if (/:\s*[A-Za-z_][A-Za-z0-9_]*\s*;\s*$/.test(tline)) {
      continue;
    }

    // comandos comuns exigem ;
    if (/\b(:=|writeln\s*\(|readln\s*\(|clrscr\b)/i.test(tline)) {
      let nextMeaningfulLineIsElse = false;
      let nextMeaningful = getNextMeaningfulLine(i + 1);
      if (nextMeaningful) {
        const nextLine = nextMeaningful.line.toLowerCase();
        if (/^else\b/.test(nextLine)) {
          nextMeaningfulLineIsElse = true;
        }
      }

      if (!/.;\s*$/.test(tline) && !nextMeaningfulLineIsElse) {
        add('ERRO', i + 1, 'Faltou ";" no fim da instrução.');
      }
    }
  }

  // 5) parênteses e aspas balanceadas (por linha)
  for (i = 0; i < lines.length; i++) {
    var raw2 = lines[i];
    var s2 = stripStr(raw2);
    var bal = 0;
    for (var j = 0; j < s2.length; j++) {
      if (s2[j] === '(') bal++;
      if (s2[j] === ')') bal--;
    }
    if (bal !== 0)
      add('AVISO', i + 1, 'Parênteses parecem desbalanceados nesta linha.');

    var count = (raw2.match(/'/g) || []).length;
    if (count % 2 === 1)
      add('AVISO', i + 1, 'Aspas simples parecem desbalanceadas nesta linha.');
  }

  // 6) uso de variáveis não declaradas (aproximado)
  for (i = 0; i < lines.length; i++) {
    var line3 = stripStr(lines[i]);
    var tokens = line3.match(/\b[A-Za-z_][A-Za-z0-9_]*\b/g) || [];
    tokens.forEach(function (tok) {
      var low = tok.toLowerCase();
      if (keywords[low]) return;

      if (
        /:\s*\w/.test(line3) &&
        new RegExp('^\s*' + tok + '\s*:', 'i').test(line3)
      )
        return;
      if (!declared[tok]) {
        if (/^program\b/i.test(lines[i])) return;
        add(
          'AVISO',
          i + 1,
          'Possível uso de variável não declarada: "' + tok + '".'
        );
      }
    });
  }

  var seen = Object.create(null);
  diags = diags.filter(function (d) {
    var k = d.sev + '|' + (d.line || '') + '|' + d.msg;
    if (seen[k]) return false;
    seen[k] = 1;
    return true;
  });

  return diags;
}

export { abrirValidacao, fecharValidacao };
