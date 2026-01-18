import { codigo } from './workspace.js';

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function normalizarLinhaPas(l) {
  return String(l || '')
    .replace(/<br\s*\/?\s*>/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function gerarFontePascal() {
  var flat = (codigo || []).map(normalizarLinhaPas).filter(Boolean).join(' ');
  flat = String(flat || '')
    .replace(/\s+/g, ' ')
    .trim();

  if (!flat) {
    flat = [
      'program MeuPrograma;',
      'uses crt;',
      'begin',
      "writeln('Olá!');",
      'end.',
    ].join(' ');
  }

  var out = '';
  var inStr = false;
  var word = '';
  var lastWord = '';

  function flushWord(nextCh) {
    if (!word) return;
    out += word;
    lastWord = word.toLowerCase();

    var kw = {
      var: 1,
      begin: 1,
      repeat: 1,
      then: 1,
      do: 1,
      of: 1,
      else: 1,
      end: 1,
    };

    if (kw[lastWord]) {
      if (nextCh && nextCh !== ';' && nextCh !== '.') {
        if (out[out.length - 1] !== '\n') out += '\n';
      }
    }
    word = '';
  }

  for (var i = 0; i < flat.length; i++) {
    var ch = flat[i];

    if (ch === "'") {
      if (inStr && flat[i + 1] === "'") {
        out += "''";
        i++;
        continue;
      }
      flushWord(ch);
      inStr = !inStr;
      out += ch;
      continue;
    }

    if (!inStr) {
      if (/[A-Za-z0-9_]/.test(ch)) {
        word += ch;
        continue;
      }

      flushWord(ch);

      if (ch === ';') {
        out += ';\n';
        continue;
      }

      if (ch === '.') {
        out += '.';
        if (lastWord === 'end') out += '\n';
        continue;
      }

      if (/\s/.test(ch)) {
        var last = out[out.length - 1] || '';
        if (last === ' ' || last === '\n' || last === '\t') continue;
        out += ' ';
        continue;
      }

      out += ch;
      continue;
    }

    out += ch;
  }

  flushWord('');

  out = out.replace(/[ \t]+\n/g, '\n');
  out = out.replace(/\n{3,}/g, '\n\n');

  return out.trim() + '\n';
}

function sugerirNomeArquivoPas() {
  var fonte = (codigo || []).join(' ');
  var m = fonte.match(/\bprogram\s*([A-Za-z0-9_]+)/i);
  var nome = m && m[1] ? m[1] : 'codigo';
  return nome + '.pas';
}

function baixarCodigo() {
  var conteudo = gerarFontePascal();
  var nomeArquivo = sugerirNomeArquivoPas();

  var blob = new Blob([conteudo], { type: 'text/plain;charset=utf-8' });
  var url = URL.createObjectURL(blob);

  var a = document.createElement('a');
  a.href = url;
  a.download = nomeArquivo;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  setTimeout(function () {
    URL.revokeObjectURL(url);
  }, 500);
}

function generateCodePreview() {
  var pre = gerarFontePascal();
  var el = document.getElementById('blocos2');
  if (!el) return;
  el.innerHTML = '<pre class="pb-code-preview">' + escapeHtml(pre) + '</pre>';
}

export {
  gerarFontePascal,
  baixarCodigo,
  generateCodePreview,
  escapeHtml,
  normalizarLinhaPas,
};
