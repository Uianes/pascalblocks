import {
  codigo,
  codigoHTML,
  pushBloco,
  pushToken,
  editarBloco,
  checkWorkspaceEmptyState,
  saveState,
} from './workspace.js';

var _dragFromIdx = null;
var _dragFromSidebarId = null;

function adicionarBlocoPorId(id, index) {
  // Esta função centraliza a criação de blocos para o drag-and-drop
  // A lógica é espelhada das funções de clique individuais.
  switch (id) {
    case 'program': {
      let nome = window.prompt('Informe o nome do programa: ') || '';
      nome = String(nome).trim();
      pushBloco(
        'program ' + nome + ';',
        'laranja',
        'program ' + nome + ';',
        index
      );
      break;
    }
    case 'usescrt':
      pushBloco('uses crt;', 'laranja', 'uses crt;', index);
      break;
    case 'begin':
      pushBloco('begin', 'laranja', 'begin', index);
      break;
    case 'end0':
      pushBloco('end', 'laranja', 'end', index);
      break;
    case 'end1':
      pushBloco('end;', 'laranja', 'end;', index);
      break;
    case 'end2':
      pushBloco('end.', 'laranja', 'end.', index);
      break;
    case 'variaveis':
      pushBloco('var', 'verde', 'var', index);
      break;
    case 'novavar': {
      const nomevariavel = window.prompt('Informe o nome da variável:');
      const tipovar = window.prompt('Informe o tipo da variável:');
      pushBloco(
        String(nomevariavel) + ': ' + String(tipovar) + ';',
        'verde',
        String(nomevariavel) + ' : ' + String(tipovar) + ';',
        index
      );
      break;
    }
    case 'novovalorvar': {
      const valorvariavel = window.prompt(
        'Qual o nome da variável que você deseja atribuir um valor?'
      );
      const valor = window.prompt('Qual o valor que você deseja atribuir?');
      pushBloco(
        String(valorvariavel) + ' := ' + String(valor) + ';',
        'verde',
        String(valorvariavel) + ' := ' + String(valor) + ';',
        index
      );
      break;
    }
    case 'entrada': {
      const texto = window.prompt('Deseja ler qual variável? ');
      pushBloco(
        'Readln(' + String(texto) + ');',
        'azul',
        'Readln(' + String(texto) + ');',
        index
      );
      break;
    }
    case 'saida': {
      const texto = window.prompt('O que você deseja escrever: ');
      pushBloco(
        "Writeln('" + String(texto) + "');",
        'azul',
        "Writeln('" + String(texto) + "');",
        index
      );
      break;
    }
    case 'saidacomvar': {
      alert(
        'Informe primeiramente o texto, feche a apóstrofe e adicione as suas variáveis separando por vírgulas. Não esqueça que você deve fechar as apóstrofes!'
      );
      const texto = window.prompt('O que você deseja escrever: ');
      pushBloco(
        "Writeln('" + String(texto) + ');',
        'azul',
        "Writeln('" + String(texto) + ');',
        index
      );
      break;
    }
    case 'clrscr':
      pushBloco('CLRSCR;', 'cinza', 'CLRSCR;', index);
      break;
    case 'sqr': {
      const varquadrada = window.prompt(
        'Em qual variável você deseja armazenar o valor ao quadrado?'
      );
      pushBloco(
        String(varquadrada) + ' := SQR(' + String(varquadrada) + ');',
        'cinza',
        String(varquadrada) + ' := SQR(' + String(varquadrada) + ');',
        index
      );
      break;
    }
    case 'sqrt': {
      const raiz = window.prompt(
        'Em qual variável você deseja armazenar o valor da raiz quadrada?'
      );
      pushBloco(
        String(raiz) + ' := SQRT(' + String(raiz) + ');',
        'cinza',
        String(raiz) + ' := SQRT(' + String(raiz) + ');',
        index
      );
      break;
    }
    case 'condicionalsimples': {
      const condicao1 = window.prompt('Insira aqui a condição: ');
      pushBloco(
        'IF (' + String(condicao1) + ') THEN',
        'amarelo',
        'IF (' + String(condicao1) + ') THEN',
        index
      );
      break;
    }
    case 'condicionalsenao':
      pushBloco('ELSE', 'amarelo', 'ELSE', index);
      break;
    case 'senaose': {
      const condicao2 = window.prompt('Insira aqui a condição: ');
      pushBloco(
        'ELSE IF (' + String(condicao2) + ') THEN',
        'amarelo',
        'ELSE IF (' + String(condicao2) + ') THEN',
        index
      );
      break;
    }
    case 'condicionalcase': {
      const condicao3 = window.prompt(
        'Insira aqui a variável para ser testada: '
      );
      pushBloco(
        'CASE ' + String(condicao3) + ' OF',
        'amarelo',
        'CASE ' + String(condicao3) + ' OF',
        index
      );
      break;
    }
    case 'caseopcao': {
      const condicao4 =
        window.prompt("Valor do CASE (ex: 1, 'a', 1..3):") || '';
      pushBloco(
        String(condicao4).trim() + ':',
        'amarelo',
        String(condicao4).trim() + ':',
        index
      );
      break;
    }
    case 'enquanto': {
      const condicao = window.prompt('Insira aqui a condição:');
      pushBloco(
        'WHILE (' + String(condicao) + ') DO',
        'laranja2',
        'WHILE (' + String(condicao) + ') DO',
        index
      );
      break;
    }
    case 'repita':
      pushBloco('REPEAT', 'laranja2', 'REPEAT', index);
      break;
    case 'until': {
      const condicao = window.prompt('Insira aqui a condição:') || '';
      pushBloco(
        'UNTIL (' + condicao.trim() + ');',
        'laranja2',
        'UNTIL (' + condicao.trim() + ');',
        index
      );
      break;
    }
    case 'para': {
      const variavel =
        window.prompt('Nome da variável de controle (ex: i):') || 'i';
      const inicio = window.prompt('Valor inicial (ex: 1):') || '1';
      const fim = window.prompt('Valor final (ex: 10):') || '10';
      pushBloco(
        'FOR ' +
          variavel.trim() +
          ' := ' +
          inicio.trim() +
          ' TO ' +
          fim.trim() +
          ' DO',
        'laranja2',
        'FOR ' +
          variavel.trim() +
          ' := ' +
          inicio.trim() +
          ' TO ' +
          fim.trim() +
          ' DO',
        index
      );
      break;
    }

    case 'entradaDados':
      pushToken(':=', index);
      break;
    case 'igualdade':
      pushToken('=', index);
      break;
    case 'diferenca':
      pushToken('<>', index);
      break;
    case 'maior':
      pushToken('>', index);
      break;
    case 'menor':
      pushToken('<', index);
      break;
    case 'nao':
      pushToken('NOT', index);
      break;
    case 'ee':
      pushToken('AND', index);
      break;
    case 'ou':
      pushToken('OR', index);
      break;
    case 'dv':
      pushToken('DIV', index);
      break;
    case 'mod':
      pushToken('MOD', index);
      break;
    case 'parentese1':
      pushToken('(', index);
      break;
    case 'parentese2':
      pushToken(')', index);
      break;
    case 'aspas':
      pushToken('"', index);
      break;
    case 'apostrofe':
      pushToken("'", index);
      break;
    case 'pontoevirgula':
      pushToken(';', index);
      break;
    case 'virgula':
      pushToken(',', index);
      break;

    default:
      console.warn('Bloco arrastado desconhecido:', id);
  }
}

function wireDnD() {
  const ws = document.getElementById('blocos1');
  const sidebar = document.getElementById('lateral');
  const trash = document.getElementById('trashBin');

  if (ws && !ws._pbDblClickWired) {
    ws.addEventListener('dblclick', function (ev) {
      const targetElement = ev.target.closest('.pb-wblock');
      if (
        !targetElement ||
        targetElement.classList.contains('workspace-placeholder')
      ) {
        return;
      }

      const index = parseInt(targetElement.dataset.idx, 10);
      if (!isNaN(index)) {
        editarBloco(index);
      }
    });
    ws._pbDblClickWired = true;
  }

  if (ws && !ws._pbDndWired) {
    ws.addEventListener('dragstart', function (ev) {
      const t =
        ev.target && ev.target.closest ? ev.target.closest('.pb-wblock') : null;
      if (!t) return;
      _dragFromIdx = parseInt(t.dataset.idx, 10);
      _dragFromSidebarId = null;
      ev.dataTransfer.setData('text/plain', String(_dragFromIdx));
      ev.dataTransfer.effectAllowed = 'move';
    });

    ws.addEventListener('dragover', function (ev) {
      if (_dragFromIdx !== null || _dragFromSidebarId !== null) {
        ev.preventDefault();
        const t =
          ev.target && ev.target.closest
            ? ev.target.closest('.pb-wblock')
            : null;
        const els = ws.querySelectorAll('.pb-wblock');
        for (let i = 0; i < els.length; i++)
          els[i].classList.remove('pb-drop-target');
        if (t) t.classList.add('pb-drop-target');
      }
    });

    ws.addEventListener('dragleave', function () {
      const els = ws.querySelectorAll('.pb-wblock');
      for (let i = 0; i < els.length; i++)
        els[i].classList.remove('pb-drop-target');
    });

    ws.addEventListener('drop', function (ev) {
      ev.preventDefault();
      const targetElement =
        ev.target && ev.target.closest ? ev.target.closest('.pb-wblock') : null;
      if (targetElement) targetElement.classList.remove('pb-drop-target');

      const toIndex = targetElement
        ? parseInt(targetElement.dataset.idx, 10)
        : codigo.length;

      if (_dragFromIdx !== null) {
        const from = _dragFromIdx;
        if (from !== toIndex && from >= 0 && from < codigo.length) {
          const itemC = codigo.splice(from, 1)[0];
          const itemH = codigoHTML.splice(from, 1)[0];

          let effectiveTo = toIndex;
          if (toIndex > from) effectiveTo = toIndex - 1;
          effectiveTo = Math.max(0, Math.min(effectiveTo, codigo.length));

          codigo.splice(effectiveTo, 0, itemC);
          codigoHTML.splice(effectiveTo, 0, itemH);

          const elementToMove = itemH;
          const referenceNode = ws.children[effectiveTo];
          ws.insertBefore(elementToMove, referenceNode);

          const allBlocks = ws.querySelectorAll('.pb-wblock');
          for (let i = 0; i < allBlocks.length; i++) {
            allBlocks[i].dataset.idx = String(i);
          }
          saveState();
        }
      } else if (_dragFromSidebarId !== null) {
        adicionarBlocoPorId(_dragFromSidebarId, toIndex);
      }

      _dragFromIdx = null;
      _dragFromSidebarId = null;
    });

    ws.addEventListener('dragend', function () {
      _dragFromIdx = null;
      _dragFromSidebarId = null;
      const els = ws.querySelectorAll('.pb-wblock');
      for (let i = 0; i < els.length; i++)
        els[i].classList.remove('pb-drop-target');
    });

    ws._pbDndWired = true;
  }

  if (sidebar && !sidebar._pbDndWired) {
    sidebar.addEventListener('dragstart', function (ev) {
      const t =
        ev.target && ev.target.closest
          ? ev.target.closest('[draggable="true"]')
          : null;
      if (!t || !t.id) return;

      _dragFromSidebarId = t.id;
      _dragFromIdx = null;
      ev.dataTransfer.effectAllowed = 'copy';
    });
    sidebar.addEventListener('dragend', function () {
      _dragFromSidebarId = null;
    });
    sidebar._pbDndWired = true;
  }

  if (trash && !trash._pbDndWired) {
    trash.addEventListener('dragover', function (ev) {
      if (_dragFromIdx !== null) {
        ev.preventDefault();
        trash.classList.add('pb-trash--over');
        ev.dataTransfer.dropEffect = 'move';
      }
    });
    trash.addEventListener('dragleave', function () {
      trash.classList.remove('pb-trash--over');
    });
    trash.addEventListener('drop', function (ev) {
      if (_dragFromIdx === null) return;
      ev.preventDefault();

      if (_dragFromIdx >= 0 && _dragFromIdx < codigo.length) {
        codigo.splice(_dragFromIdx, 1);
        const elementoRemovido = codigoHTML.splice(_dragFromIdx, 1)[0];

        if (elementoRemovido && elementoRemovido.parentNode) {
          elementoRemovido.parentNode.removeChild(elementoRemovido);
        }

        const allBlocks = ws.querySelectorAll('.pb-wblock');
        for (let i = 0; i < allBlocks.length; i++) {
          allBlocks[i].dataset.idx = String(i);
        }
        checkWorkspaceEmptyState();
        saveState();
      }
      _dragFromIdx = null;
      trash.classList.remove('pb-trash--over');
    });
    trash._pbDndWired = true;
  }
}

export { wireDnD };
