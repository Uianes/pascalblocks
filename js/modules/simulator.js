// OBS: Esse código aqui foi bastante vibecodado 😅

import { codigo } from './workspace.js';
import { normalizarLinhaPas, escapeHtml } from './code_generator.js';
import { openModal, closeModal } from './modals.js';

var sim = {
  steps: [],
  ip: -1,
  vars: {},
  out: [],
  timer: null,
  playing: false,
  _wired: false,
};

function $(id) {
  return document.getElementById(id);
}

function prepararSteps() {
  sim.steps = (codigo || []).map(normalizarLinhaPas).filter(Boolean);
}

function renderSimCode() {
  var pre = $('simCode');
  if (!pre) return;

  if (!sim.steps.length) {
    pre.innerHTML =
      '<span class="pb-line pb-line--active"><span class="pb-line__no">1</span>(sem blocos)</span>';
    return;
  }
  var html = [];
  for (var i = 0; i < sim.steps.length; i++) {
    var active = i === sim.ip;
    var cls = 'pb-line' + (active ? ' pb-line--active' : '');
    html.push(
      '<span class="' +
        cls +
        '"><span class="pb-line__no">' +
        (i + 1) +
        '</span>' +
        escapeHtml(sim.steps[i]) +
        '</span>'
    );
  }
  pre.innerHTML = html.join('');
}

function renderSimVars() {
  var pre = $('simVars');
  if (!pre) return;
  var keys = Object.keys(sim.vars || {});
  if (!keys.length) {
    pre.textContent = '(nenhuma)';
    return;
  }
  keys.sort();
  pre.textContent = keys
    .map(function (k) {
      var v = sim.vars[k];
      return k + ' = ' + (v === undefined ? 'undefined' : String(v));
    })
    .join('\n');
}

function renderSimOut() {
  var pre = $('simOut');
  if (!pre) return;
  pre.textContent = (sim.out || []).join('\n');
}

function renderSimAll() {
  renderSimCode();
  renderSimVars();
  renderSimOut();
}

function abrirSimulador() {
  closeModal('valModal');
  prepararSteps();
  simReset();
  openModal('simModal');

  if (sim._wired) return;
  var close = function () {
    fecharSimulador();
  };
  if ($('simClose')) $('simClose').addEventListener('click', close);
  if ($('simCloseBtn')) $('simCloseBtn').addEventListener('click', close);
  if ($('simReset')) $('simReset').addEventListener('click', simReset);
  if ($('simPrev')) $('simPrev').addEventListener('click', simPrev);
  if ($('simNext')) $('simNext').addEventListener('click', simNext);
  if ($('simPlay')) $('simPlay').addEventListener('click', simTogglePlay);
  if ($('simSpeed'))
    $('simSpeed').addEventListener('change', function () {
      if (sim.playing) simStartPlay();
    });
  document.addEventListener('keydown', function (ev) {
    var m = $('simModal');
    if (!m || m.classList.contains('pb-hidden')) return;
    if (ev.key === 'Escape') close();
    if (ev.key === 'ArrowRight') simNext();
    if (ev.key === 'ArrowLeft') simPrev();
  });
  sim._wired = true;
}

function fecharSimulador() {
  simStopPlay();
  closeModal('simModal');
}

function simReset() {
  simStopPlay();
  sim.ip = -1;
  sim.vars = {};
  sim.out = [];
  sim.flowStack = []; // Initialize flow stack
  renderSimAll();
}

function simPrev() {
  simStopPlay();
  var alvo = Math.max(-1, sim.ip - 1);
  var steps = sim.steps.slice();
  simReset();
  sim.steps = steps;
  // Re-execute all steps up to the target to restore state
  for (var i = 0; i <= alvo; i++) {
    executarLinhaSimStatement(sim.steps[i]);
  }
  sim.ip = alvo; // Set IP back to target
  renderSimAll();
}

function simNext() {
  sim.ip++; // Move to the next line

  while (sim.ip < sim.steps.length) {
    let currentLine = sim.steps[sim.ip].trim().toLowerCase();
    let shouldExecute = true;
    const lineType = getLineType(currentLine);

    // Get the most relevant IF context
    let currentIfContext = null;
    for (let i = sim.flowStack.length - 1; i >= 0; i--) {
      if (sim.flowStack[i].type === 'if') {
        currentIfContext = sim.flowStack[i];
        break;
      }
    }

    // --- Determine if current line should be skipped based on existing flow context ---
    if (currentIfContext) {
      if (lineType === 'else') {
        // If current line IS the ELSE keyword, it is executed if IF condition was false.
        shouldExecute = !currentIfContext.conditionResult;
      } else if (currentIfContext.elseFound) {
        // If we are AFTER the 'else' keyword (currentIfContext.elseFound is true)
        // and the IF condition was TRUE, then we should skip this ELSE block content.
        if (currentIfContext.conditionResult) {
          shouldExecute = false;
        }
      } else {
        // We are in the THEN block (before ELSE or END)
        // If IF condition was FALSE, then skip the THEN block content.
        if (!currentIfContext.conditionResult) {
          shouldExecute = false;
        }
      }
    }

    // --- Update flowStack based on current line's type ---
    // This part needs to happen regardless of 'shouldExecute' as it defines structural context
    if (lineType === 'if') {
      const condition = evalExpr(currentLine.match(/^if\s*(.+)\s*then/i)[1]);
      sim.flowStack.push({
        type: 'if',
        conditionResult: condition,
        elseFound: false,
        startIp: sim.ip,
      });
    } else if (lineType === 'else') {
      const topIf = sim.flowStack.findLast((ctx) => ctx.type === 'if');
      if (topIf) {
        topIf.elseFound = true;
      }
    } else if (lineType === 'begin') {
      sim.flowStack.push({ type: 'block' }); // A generic block for BEGIN/END matching
    } else if (lineType === 'end') {
      if (sim.flowStack.length > 0) {
        const top = sim.flowStack[sim.flowStack.length - 1];
        // Pop if 'end' matches a 'block' or 'if' context (or others like while, for)
        if (top.type === 'block' || top.type === 'if') {
          // TODO: Extend to WHILE/FOR/REPEAT
          sim.flowStack.pop();
        }
      }
    }
    // TODO: Add cases for WHILE, REPEAT, UNTIL to manage flowStack

    // --- Decision to execute or jump ---
    if (shouldExecute) {
      executarLinhaSimStatement(currentLine); // Execute the line if not skipped
      renderSimAll();
      return; // Stop after executing one line
    } else {
      // If shouldExecute is false, we need to find the next relevant line to jump to.
      let jumpTargetIp = -1; // IP to jump to
      // Call helper function to find the next IP
      if (currentIfContext) {
        jumpTargetIp = findNextRelevantIp(sim.ip, currentIfContext);
      }

      if (jumpTargetIp !== -1) {
        sim.ip = jumpTargetIp; // Jump to the target
        continue; // Re-evaluate at the new sim.ip immediately
      } else {
        sim.ip++; // If no specific jump target was found (e.g., end of program or complex error), advance
      }
    }
  }
  // If we reach here, we've gone past the end of steps or hit sim.steps.length
  simStopPlay();
}

function simTogglePlay() {
  if (sim.playing) simStopPlay();
  else simStartPlay();
}

function simStartPlay() {
  simStopPlay();
  sim.playing = true;
  if ($('simPlay')) $('simPlay').textContent = '⏸';
  var delay = parseInt(($('simSpeed') && $('simSpeed').value) || '700', 10);
  sim.timer = setInterval(function () {
    if (sim.ip >= sim.steps.length - 1) {
      simStopPlay();
      return;
    }
    simNext();
  }, delay);
}

function simStopPlay() {
  sim.playing = false;
  if ($('simPlay')) $('simPlay').textContent = '▶';
  if (sim.timer) {
    clearInterval(sim.timer);
    sim.timer = null;
  }
  renderSimAll(); // Renderiza ao parar para mostrar o estado final
}

function simExecuteAt(index) {
  sim.ip = index;
  executarLinhaSimStatement(sim.steps[index] || '');
}

function stripStringsForParse(s) {
  return String(s).replace(/'(?:''|[^'])*'/g, "''");
}

function evalExpr(expr) {
  var e = stripStringsForParse(expr).replace(/\bdiv\b/gi, '/');
  e = e.replace(/\bmod\b/gi, '%');
  e = e.replace(/\bsqr\s*\(/gi, 'Math.pow(');
  e = e.replace(/\bsqrt\s*\(/gi, 'Math.sqrt(');

  e = e.replace(/\b([A-Za-z_][A-Za-z0-9_]*)\b/g, function (m, v) {
    if (v.toLowerCase() === 'math') return m;
    if (v in sim.vars)
      return '(' + (sim.vars[v] === undefined ? 0 : Number(sim.vars[v])) + ')';
    return m;
  });
  try {
    var r = Function('return (' + e + ');')();
    if (typeof r === 'number' && !isFinite(r)) return 0;
    return r;
  } catch (_) {
    return 0;
  }
}

function executarLinhaSimStatement(line) {
  var l = String(line).trim();
  if (!l) return;

  if (
    /^if\b/i.test(l) ||
    /^else\b/i.test(l) ||
    /^begin\b/i.test(l) ||
    /^end\b/i.test(l)
  ) {
    return;
  }
  if (/^program\b/i.test(l) || /^uses\b/i.test(l) || /^var\b/i.test(l)) {
    return;
  }

  var decl = l.match(
    /^([A-Za-z_][A-Za-z0-9_]*)\s*:\s*([A-Za-z_][A-Za-z0-9_]*)\s*;?$/
  );
  if (decl) {
    var nome = decl[1];
    if (!(nome in sim.vars)) sim.vars[nome] = undefined;
    return;
  }

  if (/^clrscr\s*;?$/i.test(l)) {
    sim.out = [];
    return;
  }

  var rd = l.match(/^readln\s*\(\s*([A-Za-z_][A-Za-z0-9_]*)\s*\)\s*;?$/i);
  if (rd) {
    var v = rd[1];
    var val = window.prompt('Readln(' + v + '): informe um valor');
    var num = val === null || val === '' ? 0 : Number(val);
    sim.vars[v] = isNaN(num) ? val : num;
    return;
  }

  var asg = l.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*:=\s*(.+?);?$/);
  if (asg) {
    var left = asg[1];
    var expr = asg[2].replace(/;\s*$/, '').trim();
    sim.vars[left] = evalExpr(expr);
    return;
  }

  var wr = l.match(/^writeln\s*\((.*)\)\s*;?$/i);
  if (wr) {
    var inside = wr[1];
    var parts = [];
    var cur = '';
    var inStr = false;
    for (var i = 0; i < inside.length; i++) {
      var ch = inside[i];
      if (ch === "'") inStr = !inStr;
      if (ch === ',' && !inStr) {
        parts.push(cur.trim());
        cur = '';
        continue;
      }
      cur += ch;
    }
    if (cur.trim()) parts.push(cur.trim());

    var out = parts
      .map(function (p) {
        p = p.trim();
        if (/^'.*'$/.test(p)) return p.slice(1, -1);
        if (p in sim.vars)
          return String(sim.vars[p] === undefined ? '' : sim.vars[p]);
        return String(evalExpr(p));
      })
      .join('');
    sim.out.push(out);
    return;
  }
}

// Helper to classify lines (new)
function getLineType(line) {
  if (!line) return 'empty';
  line = line.trim().toLowerCase();
  if (/^if\b.*then/i.test(line)) return 'if';
  if (/^else\b/i.test(line)) return 'else';
  if (/^begin\s*;?$/i.test(line)) return 'begin';
  if (/^end(\.|\s*;)?$/i.test(line)) return 'end';
  if (/^while\b.*do/i.test(line)) return 'while';
  if (/^for\b.*do/i.test(line)) return 'for';
  if (/^repeat\b/i.test(line)) return 'repeat';
  if (/^until\b/i.test(line)) return 'until';
  return 'statement';
}

// This function finds the IP of the line where the skip should *end*.
// currentIp: The IP of the line that is *currently* being evaluated (and found to be skippable).
// currentIfContext: The relevant IF context from sim.flowStack.
function findNextRelevantIp(currentIp, currentIfContext) {
  let nestingLevel = 0; // Tracks nesting *relative to currentIp*.

  // Account for the nesting opened by currentIp itself.
  const currentIpType = getLineType(sim.steps[currentIp].trim().toLowerCase());
  if (
    currentIpType === 'if' ||
    currentIpType === 'begin' ||
    currentIpType === 'while' ||
    currentIpType === 'for' ||
    currentIpType === 'repeat'
  ) {
    nestingLevel = 1;
  }

  for (let i = currentIp + 1; i < sim.steps.length; i++) {
    const line = sim.steps[i].trim().toLowerCase();
    const type = getLineType(line);

    if (
      type === 'if' ||
      type === 'begin' ||
      type === 'while' ||
      type === 'for' ||
      type === 'repeat'
    ) {
      nestingLevel++;
    } else if (type === 'end' || type === 'until') {
      nestingLevel--;
    }

    if (nestingLevel === 0) {
      // Found something at the same nesting level as the block opened by currentIp
      if (!currentIfContext.conditionResult && !currentIfContext.elseFound) {
        // Skipping THEN block (IF condition false)
        if (type === 'else') return i; // Prioritize ELSE if found
        if (type === 'end') return i; // If no ELSE, then this END is the target
      } else if (
        currentIfContext.conditionResult &&
        currentIfContext.elseFound
      ) {
        // Skipping ELSE block (IF condition true)
        if (type === 'end') return i; // Found END of ELSE block
      }
    }
  }
  return sim.steps.length; // Fallback: end of program
}

export { abrirSimulador, fecharSimulador };
