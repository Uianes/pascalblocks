let codigoHTML = [];
let codigo = [];

// Sistema de histórico para Undo/Redo
const MAX_HISTORY = 50;
let history = [];
let historyIndex = -1;
let isRestoring = false;

function saveState() {
  if (isRestoring) return;
  
  // Remove estados futuros se estivermos no meio do histórico
  if (historyIndex < history.length - 1) {
    history = history.slice(0, historyIndex + 1);
  }
  
  // Salva o estado atual (código e classes dos blocos)
  const state = codigo.map((code, i) => ({
    code: code,
    className: codigoHTML[i] ? codigoHTML[i].className : 'pb-wblock',
    label: codigoHTML[i] ? codigoHTML[i].textContent : code
  }));
  
  history.push(JSON.stringify(state));
  
  // Limita o tamanho do histórico
  if (history.length > MAX_HISTORY) {
    history.shift();
  } else {
    historyIndex++;
  }
  
  updateUndoRedoButtons();
}

function canUndo() {
  return historyIndex > 0;
}

function canRedo() {
  return historyIndex < history.length - 1;
}

function undo() {
  if (!canUndo()) return;
  
  historyIndex--;
  restoreState(history[historyIndex]);
  updateUndoRedoButtons();
}

function redo() {
  if (!canRedo()) return;
  
  historyIndex++;
  restoreState(history[historyIndex]);
  updateUndoRedoButtons();
}

function restoreState(stateJson) {
  isRestoring = true;
  
  const state = JSON.parse(stateJson);
  const workspace = document.getElementById('blocos1');
  
  if (!workspace) {
    isRestoring = false;
    return;
  }
  
  // Limpa o workspace atual
  const blocks = workspace.querySelectorAll('.pb-wblock');
  blocks.forEach(block => workspace.removeChild(block));
  
  codigo = [];
  codigoHTML = [];
  
  // Restaura os blocos
  state.forEach((item, i) => {
    const div = document.createElement('div');
    div.className = item.className;
    div.textContent = item.label;
    div.dataset.idx = String(i);
    div.setAttribute('draggable', 'true');
    
    codigo.push(item.code);
    codigoHTML.push(div);
    workspace.appendChild(div);
  });
  
  checkWorkspaceEmptyState();
  isRestoring = false;
}

function updateUndoRedoButtons() {
  const btnUndo = document.getElementById('btnUndo');
  const btnRedo = document.getElementById('btnRedo');
  
  if (btnUndo) {
    btnUndo.classList.toggle('disabled', !canUndo());
    btnUndo.setAttribute('aria-disabled', !canUndo());
  }
  if (btnRedo) {
    btnRedo.classList.toggle('disabled', !canRedo());
    btnRedo.setAttribute('aria-disabled', !canRedo());
  }
}

function initHistory() {
  // Salva estado inicial (vazio)
  history = [];
  historyIndex = -1;
  saveState();
}

function checkWorkspaceEmptyState() {
  const workspace = document.getElementById('blocos1');
  if (!workspace) return;

  const hasBlocks = workspace.querySelector('.pb-wblock');

  if (hasBlocks) {
    workspace.classList.remove('is-empty');
  } else {
    workspace.classList.add('is-empty');
  }
}

function criarBlocoElemento(linhaCodigo, classe, rotulo, index) {
  const div = document.createElement('div');
  div.className = 'pb-wblock ' + classe;
  div.textContent = rotulo;
  div.dataset.idx = String(index);
  div.setAttribute('draggable', 'true');
  return div;
}

function pushBloco(linhaCodigo, classe, rotulo, index) {
  const workspace = document.getElementById('blocos1');
  if (!workspace) return;

  const isAppend =
    index === undefined ||
    index === null ||
    index < 0 ||
    index >= codigo.length;
  const targetIndex = isAppend ? codigo.length : index;

  // Verifica se o bloco atual é um bloco 'ELSE' ou 'ELSE IF'
  if (linhaCodigo.trim().startsWith('ELSE')) {
    // Se houver um bloco anterior e ele terminar com ponto e vírgula
    if (codigo.length > 0) {
      const lastBlockIndex = isAppend ? codigo.length - 1 : targetIndex - 1;
      if (lastBlockIndex >= 0) {
        // Garante que haja um bloco antes do atual
        let previousCode = codigo[lastBlockIndex];
        if (previousCode && previousCode.trim().endsWith(';')) {
          // Remove o ponto e vírgula do bloco anterior
          codigo[lastBlockIndex] = previousCode.trim().slice(0, -1);
          // Atualiza o elemento HTML correspondente, se existir
          if (codigoHTML[lastBlockIndex]) {
            codigoHTML[lastBlockIndex].textContent = codigo[lastBlockIndex];
          }
        }
      }
    }
  }

  const elemento = criarBlocoElemento(linhaCodigo, classe, rotulo, targetIndex);

  if (isAppend) {
    codigo.push(linhaCodigo);
    codigoHTML.push(elemento);
    workspace.appendChild(elemento);
  } else {
    codigo.splice(targetIndex, 0, linhaCodigo);
    codigoHTML.splice(targetIndex, 0, elemento);
    workspace.insertBefore(elemento, workspace.children[targetIndex]);
  }

  const allBlocks = workspace.querySelectorAll('.pb-wblock');
  for (let i = 0; i < allBlocks.length; i++) {
    allBlocks[i].dataset.idx = String(i);
  }
  checkWorkspaceEmptyState();
  saveState();
}

function pushToken(token, index) {
  const workspace = document.getElementById('blocos1');
  if (!workspace) return;

  token = String(token);
  const isAppend =
    index === undefined ||
    index === null ||
    index < 0 ||
    index >= codigo.length;
  const targetIndex = isAppend ? codigo.length : index;

  const elemento = criarBlocoElemento(
    token,
    'rosa pb-token',
    token,
    targetIndex
  );

  if (isAppend) {
    codigo.push(token);
    codigoHTML.push(elemento);
    workspace.appendChild(elemento);
  } else {
    codigo.splice(targetIndex, 0, token);
    codigoHTML.splice(targetIndex, 0, elemento);
    workspace.insertBefore(elemento, workspace.children[targetIndex]);
  }

  // indexa novamente todos os elementos do DOM após a inserção
  const allBlocks = workspace.querySelectorAll('.pb-wblock');
  for (let i = 0; i < allBlocks.length; i++) {
    allBlocks[i].dataset.idx = String(i);
  }
  checkWorkspaceEmptyState();
  saveState();
}

function editarBloco(index) {
  const oldCode = codigo[index];
  if (!oldCode) return;

  let newCode = oldCode;
  let newLabel = oldCode;
  let match;

  match = oldCode.match(/^program\s+(.*);$/i);
  if (match) {
    const oldName = match[1];
    const newName = window.prompt('Informe o nome do programa:', oldName);
    if (newName !== null) {
      newCode = `program ${newName.trim()};`;
      newLabel = newCode;
    } else {
      return;
    }
  }

  match = oldCode.match(/^(\S+)\s*:\s*(\S+);$/);
  if (
    match &&
    !/^(program|uses|begin|end|if|while|for|repeat|until|case|else|while|writeln|readln|for)\b/i.test(
      match[1]
    )
  ) {
    const oldNome = match[1];
    const oldTipo = match[2];
    const newNome = window.prompt('Informe o nome da variável:', oldNome);
    const newTipo = window.prompt('Informe o tipo da variável:', oldTipo);

    if (newNome !== null && newTipo !== null) {
      newCode = `${newNome.trim()}: ${newTipo.trim()};`;
      newLabel = `${newNome.trim()} : ${newTipo.trim()};`;
    } else {
      return;
    }
  }

  // TODO: adicionar mais casos de blocos editaveis aqui
  if (newCode !== oldCode) {
    codigo[index] = newCode;
    if (codigoHTML[index]) {
      codigoHTML[index].textContent = newLabel;
    }
    saveState();
  }
}

function limparWorkspace() {
  if (
    !window.confirm(
      'Tem certeza que deseja limpar todo o workspace? Esta ação não pode ser desfeita.'
    )
  ) {
    return;
  }

  codigo = [];
  codigoHTML = [];

  const workspace = document.getElementById('blocos1');
  if (workspace) {
    const blocks = workspace.querySelectorAll('.pb-wblock');
    blocks.forEach((block) => workspace.removeChild(block));
  }

  const codeView = document.getElementById('blocos2');
  if (codeView) {
    codeView.innerHTML = '';
  }
  checkWorkspaceEmptyState();
  saveState();
}

export {
  codigo,
  codigoHTML,
  checkWorkspaceEmptyState,
  criarBlocoElemento,
  pushBloco,
  pushToken,
  editarBloco,
  limparWorkspace,
  undo,
  redo,
  canUndo,
  canRedo,
  initHistory,
  saveState,
};
