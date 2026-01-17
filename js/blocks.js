//Transformar cada DIV em um botão
a.addEventListener('click', program)
b.addEventListener('click', usescrt)
c.addEventListener('click', begin)
c0.addEventListener('click', end0)
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
// btn2 removido (substituído por lixeira drag'n'drop)
if(typeof r1 !== 'undefined' && r1) r1.addEventListener('click', baixarCodigo)
if(typeof t1 !== 'undefined' && t1) t1.addEventListener('click', abrirSimulador)
if(typeof u1 !== 'undefined' && u1) u1.addEventListener('click', abrirValidacao)
s1.addEventListener('click', condicionalsenaose)
let codigoHTML = []
let codigo = []
let controleVar = 0;

// -------------------------------------------------
// Workspace (render + drag'n'drop)
// -------------------------------------------------
function atualizarWorkspace(){
    var c = document.getElementById('blocos1');
    if(!c) return;
    c.innerHTML = codigoHTML.join('');
    // Indexa blocos e deixa dragável
    var els = c.querySelectorAll('.pb-wblock');
    for(var i=0;i<els.length;i++){
        els[i].dataset.idx = String(i);
        els[i].setAttribute('draggable','true');
    }
}

function pushBloco(linhaCodigo, classe, rotulo){
    codigo[codigo.length] = linhaCodigo;
    codigoHTML[codigoHTML.length] = '<div class="pb-wblock '+classe+'">'+escapeHtml(rotulo)+'</div>';
    atualizarWorkspace();
}

function pushToken(token){
    token = String(token);
    codigo[codigo.length] = token;
    codigoHTML[codigoHTML.length] = '<div class="pb-wblock rosa pb-token">' + escapeHtml(token) + '</div>';
    atualizarWorkspace();
}


// --- Drag'n'drop: reordenar + lixeira ---
var _dragFromIdx = null;

function wireDnD(){
    var ws = document.getElementById('blocos1');
    if(ws && !ws._pbDndWired){
        ws.addEventListener('dragstart', function(ev){
            var t = ev.target && ev.target.closest ? ev.target.closest('.pb-wblock') : null;
            if(!t) return;
            _dragFromIdx = parseInt(t.dataset.idx, 10);
            ev.dataTransfer.setData('text/plain', String(_dragFromIdx));
            ev.dataTransfer.effectAllowed = 'move';
        });

        ws.addEventListener('dragover', function(ev){
            // Permite drop
            if(_dragFromIdx === null) return;
            ev.preventDefault();
            var t = ev.target && ev.target.closest ? ev.target.closest('.pb-wblock') : null;
            // marca alvo
            var els = ws.querySelectorAll('.pb-wblock');
            for(var i=0;i<els.length;i++) els[i].classList.remove('pb-drop-target');
            if(t) t.classList.add('pb-drop-target');
        });

        ws.addEventListener('dragleave', function(){
            var els = ws.querySelectorAll('.pb-wblock');
            for(var i=0;i<els.length;i++) els[i].classList.remove('pb-drop-target');
        });

        ws.addEventListener('drop', function(ev){
            if(_dragFromIdx === null) return;
            ev.preventDefault();
            var from = parseInt(ev.dataTransfer.getData('text/plain'), 10);
            if(isNaN(from)) from = _dragFromIdx;

            var t = ev.target && ev.target.closest ? ev.target.closest('.pb-wblock') : null;
            var to = t ? parseInt(t.dataset.idx, 10) : codigo.length;
            if(isNaN(to)) to = codigo.length - 1;

            // move (inserir na posição do alvo)
            if(from !== to && from >= 0 && from < codigo.length){
                var itemC = codigo.splice(from, 1)[0];
                var itemH = codigoHTML.splice(from, 1)[0];
                if(to > from) to = to - 1;
                to = Math.max(0, Math.min(to, codigo.length));
                codigo.splice(to, 0, itemC);
                codigoHTML.splice(to, 0, itemH);
            }

            _dragFromIdx = null;
            var els = ws.querySelectorAll('.pb-wblock');
            for(var i=0;i<els.length;i++) els[i].classList.remove('pb-drop-target');
            atualizarWorkspace();
        });

        ws.addEventListener('dragend', function(){
            _dragFromIdx = null;
            var els = ws.querySelectorAll('.pb-wblock');
            for(var i=0;i<els.length;i++) els[i].classList.remove('pb-drop-target');
        });

        ws._pbDndWired = true;
    }

    var trash = document.getElementById('trashBin');
    if(trash && !trash._pbDndWired){
        trash.addEventListener('dragover', function(ev){
            if(_dragFromIdx === null) return;
            ev.preventDefault();
            trash.classList.add('pb-trash--over');
            ev.dataTransfer.dropEffect = 'move';
        });
        trash.addEventListener('dragleave', function(){
            trash.classList.remove('pb-trash--over');
        });
        trash.addEventListener('drop', function(ev){
            if(_dragFromIdx === null) return;
            ev.preventDefault();
            var idx = parseInt(ev.dataTransfer.getData('text/plain'), 10);
            if(isNaN(idx)) idx = _dragFromIdx;
            if(idx >= 0 && idx < codigo.length){
                codigo.splice(idx, 1);
                codigoHTML.splice(idx, 1);
                atualizarWorkspace();
            }
            _dragFromIdx = null;
            trash.classList.remove('pb-trash--over');
        });
        trash._pbDndWired = true;
    }
}

// Garante que os listeners estão ativos
window.addEventListener('load', wireDnD);
wireDnD();
//Função de cada botão
function program(){
    var nome = window.prompt("Informe o nome do programa: ") || '';
    nome = String(nome).trim();
    // BUGFIX: garante espaço entre "program" e o nome
    pushBloco('program '+nome+';', 'laranja', 'program '+nome+';');
}
function usescrt(){
    pushBloco('uses crt;', 'laranja', 'uses crt;');
}
function begin(){
    pushBloco('begin', 'laranja', 'begin');
}
// "end" sem ponto e vírgula (necessário antes de ELSE)
function end0(){
    pushBloco('end', 'laranja', 'end');
}
function end1(){
    pushBloco('end;', 'laranja', 'end;');
}
function end2(){
    pushBloco('end.', 'laranja', 'end.');
}
function variaveis(){
    pushBloco('var', 'verde', 'var');
}
function novavar(){
    var nomevariavel = window.prompt("Informe o nome da variável:")
    var tipovar = window.prompt("Informe o tipo da variável:")
    pushBloco(String(nomevariavel)+": "+String(tipovar)+";", 'verde', String(nomevariavel)+' : '+String(tipovar)+';');
}

function entrada(){
    var texto = window.prompt("Deseja ler qual variável? ")
    pushBloco('Readln('+String(texto)+');', 'azul', 'Readln('+String(texto)+');');

}
function saida(){
    var texto = window.prompt("O que você deseja escrever: ")
    pushBloco("Writeln('"+String(texto)+"');", 'azul', "Writeln('"+String(texto)+"');");
}
function saidacomvar(){
    alert("Informe primeiramente o texto, feche a apóstrofe e adicione as suas variáveis separando por vírgulas. Não esqueça que você deve fechar as apóstrofes!")
    var texto = window.prompt("O que você deseja escrever: ")
    pushBloco("Writeln('"+String(texto)+");", 'azul', "Writeln('"+String(texto)+");");
}
function novovalor(){
    var valorvariavel = window.prompt("Qual o nome da variável que você deseja atribuir um valor?")
    var valor = window.prompt("Qual o valor que você deseja atribuir?")
    pushBloco(String(valorvariavel)+' := '+String(valor)+';', 'verde', String(valorvariavel)+' := '+String(valor)+';');
}
function entradaDados(){
    pushToken(':=');
}
function igualdade(){
    pushToken('=');
}
function diferenca(){
    pushToken('<>');
}
function maior(){
    pushToken('>');
}
function menor(){
    pushToken('<');
}
function nao(){
    pushToken('NOT');
}
function ee(){
    pushToken('AND');
}
function ou(){
    pushToken('OR');
}
function dv(){
    pushToken('DIV');
}
function aspas(){
    pushToken('"');
}
function apostrofe(){
    pushToken("'");
}
function pontoevirgula(){
    pushToken(';');
}
function virgula(){
    pushToken(',');
}
function mod(){
    pushToken('MOD');
}
function parentese1(){
    pushToken('(');
}
function parentese2(){
    pushToken(')');
}
function clrscr(){
    pushBloco('CLRSCR;', 'cinza', 'CLRSCR;');
}
function sqr(){
    var varquadrada = window.prompt("Em qual variável você deseja armazenar o valor ao quadrado?")
    pushBloco(String(varquadrada)+' := SQR('+String(varquadrada)+');', 'cinza', String(varquadrada)+' := SQR('+String(varquadrada)+');');
}
function sqrt(){
    var raiz = window.prompt("Em qual variável você deseja armazenar o valor da raiz quadrada?")
    pushBloco(String(raiz)+' := SQRT('+String(raiz)+');', 'cinza', String(raiz)+' := SQRT('+String(raiz)+');');
}
function condicionalsimples(){
    var condicao1 = window.prompt("Insira aqui a condição: ")
    pushBloco('IF ('+String(condicao1)+') THEN', 'amarelo', 'IF ('+String(condicao1)+') THEN');
}

function condicionalsenao(){
    pushBloco('ELSE', 'amarelo', 'ELSE');
}
function condicionalsenaose(){
    var condicao2 = window.prompt("Insira aqui a condição: ")
    pushBloco('ELSE IF ('+String(condicao2)+') THEN', 'amarelo', 'ELSE IF ('+String(condicao2)+') THEN');
}
function condicionalcase(){
    var condicao3 = window.prompt("Insira aqui a variável para ser testada: ")
    pushBloco('CASE '+String(condicao3)+' OF', 'amarelo', 'CASE '+String(condicao3)+' OF');
}
function caseopcao(){
    var condicao4 = window.prompt("Valor do CASE (ex: 1, 'a', 1..3):") || '';
    condicao4 = String(condicao4).trim();
    pushBloco(String(condicao4)+':', 'amarelo', String(condicao4)+':');
}
function enquanto(){
    var condicao = window.prompt("Insira aqui a condição:")
    pushBloco('WHILE ('+String(condicao)+') DO', 'laranja2', 'WHILE ('+String(condicao)+') DO');
}
function repita(){
    pushBloco('REPEAT', 'laranja2', 'REPEAT');
}
function until(){
    var condicao = window.prompt("Insira aqui a condição:") || '';
    condicao = String(condicao).trim();
    pushBloco('UNTIL ('+condicao+');', 'laranja2', 'UNTIL ('+condicao+');');
}
function para(){
    var variavel = window.prompt("Nome da variável de controle (ex: i):") || 'i';
    variavel = String(variavel).trim() || 'i';

    var inicio = window.prompt("Valor inicial (ex: 1):") || '1';
    var fim = window.prompt("Valor final (ex: 10):") || '10';

    inicio = String(inicio).trim();
    fim = String(fim).trim();

    pushBloco('FOR '+variavel+' := '+inicio+' TO '+fim+' DO', 'laranja2', 'FOR '+variavel+' := '+inicio+' TO '+fim+' DO');
}
function ate(){
    console.log("to")
}
function btn(){
    var pre = gerarFontePascal();
    var el = document.getElementById('blocos2');
    if(!el) return;
    el.innerHTML = '<pre class="pb-code-preview">'+escapeHtml(pre)+'</pre>';
}
// btn2 removido (substituído por lixeira drag'n'drop)

// -------------------------------------------------
// Baixar código (.pas)
// -------------------------------------------------
function escapeHtml(str){
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function normalizarLinhaPas(l){
    return String(l || '')
        .replace(/<br\s*\/?\s*>/gi, '')
        .replace(/\s+/g, ' ')
        .trim();
}

function gerarFontePascal(){
    // Une todos os blocos em um texto só (permite operadores como tokens)
    var flat = (codigo || []).map(normalizarLinhaPas).filter(Boolean).join(' ');
    flat = String(flat || '').replace(/\s+/g, ' ').trim();

    if(!flat){
        flat = [
            'program MeuPrograma;',
            'uses crt;',
            'begin',
            "writeln('Olá!');",
            'end.'
        ].join(' ');
    }

    // Formatação segura: insere quebras de linha APENAS fora de strings.
    // Importante: não usamos regex como /\bdo\b/ porque isso quebraria textos dentro de strings (ex.: "... do ponto").
    var out = '';
    var inStr = false;
    var word = '';
    var lastWord = '';

    function flushWord(nextCh){
        if(!word) return;
        out += word;
        lastWord = word.toLowerCase();

        // Algumas palavras-chave ficam mais legíveis em nova linha (fora de string)
        var kw = {
            'var': 1,
            'begin': 1,
            'repeat': 1,
            'then': 1,
            'do': 1,
            'of': 1,
            'else': 1,
            'end': 1
        };

        if(kw[lastWord]){
            // evita inserir quebra antes de ';' ou '.' (que já cuidam)
            if(nextCh && nextCh !== ';' && nextCh !== '.'){
                if(out[out.length-1] !== '\n') out += '\n';
            }
        }
        word = '';
    }

    for(var i=0;i<flat.length;i++){
        var ch = flat[i];

        if(ch === "'"){
            // Pascal: '' dentro da string significa apóstrofo escapado
            if(inStr && flat[i+1] === "'"){
                out += "''";
                i++;
                continue;
            }
            flushWord(ch);
            inStr = !inStr;
            out += ch;
            continue;
        }

        if(!inStr){
            // acumula palavra (identificadores/palavras-chave)
            if(/[A-Za-z0-9_]/.test(ch)){
                word += ch;
                continue;
            }

            // saiu da palavra
            flushWord(ch);

            if(ch === ';'){
                out += ';\n';
                continue;
            }

            if(ch === '.'){
                out += '.';
                // end. costuma finalizar o programa
                if(lastWord === 'end') out += '\n';
                continue;
            }

            // normaliza espaços: evita múltiplos espaços
            if(/\s/.test(ch)){
                var last = out[out.length-1] || '';
                if(last === ' ' || last === '\n' || last === '\t') continue;
                out += ' ';
                continue;
            }

            out += ch;
            continue;
        }

        // dentro de string: preserva exatamente
        out += ch;
    }

    // flush final
    flushWord('');

    // limpeza
    out = out.replace(/[ \t]+\n/g, '\n');
    out = out.replace(/\n{3,}/g, '\n\n');

    return out.trim() + '\n';
}




function sugerirNomeArquivoPas(){
    var fonte = (codigo || []).join(' ');
    var m = fonte.match(/\bprogram\s*([A-Za-z0-9_]+)/i);
    var nome = (m && m[1]) ? m[1] : 'codigo';
    return nome + '.pas';
}

function baixarCodigo(){
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

    setTimeout(function(){ URL.revokeObjectURL(url); }, 500);
}

// -------------------------------------------------
// Simulador passo a passo (MVP)
// -------------------------------------------------
var sim = { steps: [], ip: -1, vars: {}, out: [], timer: null, playing: false, _wired: false };

function $(id){ return document.getElementById(id); }

function prepararSteps(){
    sim.steps = (codigo || []).map(normalizarLinhaPas).filter(Boolean);
}

function renderSimCode(){
    var pre = $('simCode');
    if(!pre) return;

    if(!sim.steps.length){
        pre.innerHTML = '<span class="pb-line pb-line--active"><span class="pb-line__no">1</span>(sem blocos)</span>';
        return;
    }
    var html = [];
    for(var i=0;i<sim.steps.length;i++){
        var active = (i === sim.ip);
        var cls = 'pb-line' + (active ? ' pb-line--active' : '');
        html.push('<span class="'+cls+'"><span class="pb-line__no">'+(i+1)+'</span>'+escapeHtml(sim.steps[i])+'</span>');
    }
    pre.innerHTML = html.join('');
}

function renderSimVars(){
    var pre = $('simVars');
    if(!pre) return;
    var keys = Object.keys(sim.vars || {});
    if(!keys.length){ pre.textContent = '(nenhuma)'; return; }
    keys.sort();
    pre.textContent = keys.map(function(k){
        var v = sim.vars[k];
        return k + ' = ' + (v === undefined ? 'undefined' : String(v));
    }).join('\n');
}

function renderSimOut(){
    var pre = $('simOut');
    if(!pre) return;
    pre.textContent = (sim.out || []).join('\n');
}

function renderSimAll(){
    renderSimCode();
    renderSimVars();
    renderSimOut();
}

function abrirSimulador(){
    prepararSteps();
    simReset();
    var modal = $('simModal');
    if(modal) modal.classList.remove('pb-hidden');

    if(sim._wired) return;
    var close = function(){ fecharSimulador(); };
    if($('simClose')) $('simClose').addEventListener('click', close);
    if($('simCloseBtn')) $('simCloseBtn').addEventListener('click', close);
    if($('simReset')) $('simReset').addEventListener('click', simReset);
    if($('simPrev')) $('simPrev').addEventListener('click', simPrev);
    if($('simNext')) $('simNext').addEventListener('click', simNext);
    if($('simPlay')) $('simPlay').addEventListener('click', simTogglePlay);
    if($('simSpeed')) $('simSpeed').addEventListener('change', function(){ if(sim.playing) simStartPlay(); });
    document.addEventListener('keydown', function(ev){
        var m = $('simModal');
        if(!m || m.classList.contains('pb-hidden')) return;
        if(ev.key === 'Escape') close();
        if(ev.key === 'ArrowRight') simNext();
        if(ev.key === 'ArrowLeft') simPrev();
    });
    sim._wired = true;
}

function fecharSimulador(){
    simStopPlay();
    var modal = $('simModal');
    if(modal) modal.classList.add('pb-hidden');
}

function simReset(){
    simStopPlay();
    sim.ip = -1;
    sim.vars = {};
    sim.out = [];
    renderSimAll();
}

function simPrev(){
    simStopPlay();
    var alvo = Math.max(-1, sim.ip - 1);
    var steps = sim.steps.slice();
    simReset();
    sim.steps = steps;
    for(var i=0;i<=alvo;i++) simExecuteAt(i);
    renderSimAll();
}

function simNext(){
    if(sim.ip >= sim.steps.length - 1){ simStopPlay(); return; }
    simExecuteAt(sim.ip + 1);
    renderSimAll();
}

function simTogglePlay(){
    if(sim.playing) simStopPlay();
    else simStartPlay();
}

function simStartPlay(){
    simStopPlay();
    sim.playing = true;
    if($('simPlay')) $('simPlay').textContent = '⏸';
    var delay = parseInt(($('simSpeed') && $('simSpeed').value) || '700', 10);
    sim.timer = setInterval(function(){
        if(sim.ip >= sim.steps.length - 1){ simStopPlay(); return; }
        simNext();
    }, delay);
}

function simStopPlay(){
    sim.playing = false;
    if($('simPlay')) $('simPlay').textContent = '▶';
    if(sim.timer){ clearInterval(sim.timer); sim.timer = null; }
}

function simExecuteAt(index){
    sim.ip = index;
    executarLinhaSim(sim.steps[index] || '');
}

function stripStringsForParse(s){
    // remove conteúdo entre aspas simples (suporta apóstrofo escapado com '')
    return String(s).replace(/'(?:''|[^'])*'/g, "''");
}

function evalExpr(expr){
    // Avaliação simples (MVP). Aceita + - * / div mod ( ) e variáveis.
    var e = stripStringsForParse(expr)
        .replace(/\bdiv\b/gi, '/');
    // mod
    e = e.replace(/\bmod\b/gi, '%');
    // sqr/sqrt
    e = e.replace(/\bsqr\s*\(/gi, 'Math.pow(');
    e = e.replace(/\bsqrt\s*\(/gi, 'Math.sqrt(');

    // troca variáveis por valores
    e = e.replace(/\b([A-Za-z_][A-Za-z0-9_]*)\b/g, function(m, v){
        if(v.toLowerCase() === 'math') return m;
        if(v in sim.vars) return '(' + (sim.vars[v] === undefined ? 0 : Number(sim.vars[v])) + ')';
        return m;
    });
    try{
        // eslint-disable-next-line no-new-func
        var r = Function('return (' + e + ');')();
        if(typeof r === 'number' && !isFinite(r)) return 0;
        return r;
    }catch(_){
        return 0;
    }
}

function executarLinhaSim(line){
    var l = String(line).trim();
    if(!l) return;

    // ignora estruturais
    if(/^program\b/i.test(l)) return;
    if(/^uses\b/i.test(l)) return;
    if(/^var\b/i.test(l)) return;
    if(/^begin\b/i.test(l)) return;
    if(/^end\.?;?$/i.test(l)) return;

    // declaracao: x:integer;
    var decl = l.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*:\s*([A-Za-z_][A-Za-z0-9_]*)\s*;?$/);
    if(decl){
        var nome = decl[1];
        if(!(nome in sim.vars)) sim.vars[nome] = undefined;
        return;
    }

    // clrscr
    if(/^clrscr\s*;?$/i.test(l)){
        sim.out = [];
        return;
    }

    // readln(x)
    var rd = l.match(/^readln\s*\(\s*([A-Za-z_][A-Za-z0-9_]*)\s*\)\s*;?$/i);
    if(rd){
        var v = rd[1];
        var val = window.prompt('Readln(' + v + '): informe um valor');
        var num = (val === null || val === '') ? 0 : Number(val);
        sim.vars[v] = isNaN(num) ? val : num;
        return;
    }

    // atribuicao: x := expr;
    var asg = l.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*:=\s*(.+?);?$/);
    if(asg){
        var left = asg[1];
        var expr = asg[2].replace(/;\s*$/,'').trim();
        sim.vars[left] = evalExpr(expr);
        return;
    }

    // writeln(...)
    var wr = l.match(/^writeln\s*\((.*)\)\s*;?$/i);
    if(wr){
        var inside = wr[1];
        // split por virgula fora de strings
        var parts = [];
        var cur = '';
        var inStr = false;
        for(var i=0;i<inside.length;i++){
            var ch = inside[i];
            if(ch === "'") inStr = !inStr;
            if(ch === ',' && !inStr){ parts.push(cur.trim()); cur=''; continue; }
            cur += ch;
        }
        if(cur.trim()) parts.push(cur.trim());

        var out = parts.map(function(p){
            p = p.trim();
            if(/^'.*'$/.test(p)) return p.slice(1,-1);
            if(p in sim.vars) return String(sim.vars[p] === undefined ? '' : sim.vars[p]);
            // expressão
            return String(evalExpr(p));
        }).join('');
        sim.out.push(out);
        return;
    }

    // estruturas (MVP): não controla fluxo
    if(/^(if\b|else\b|while\b|for\b|repeat\b|until\b|case\b)/i.test(l)){
        return;
    }
}

// -------------------------------------------------
// Validação semântica
// -------------------------------------------------
function abrirValidacao(){
    validarEExibir();
    var modal = $('valModal');
    if(modal) modal.classList.remove('pb-hidden');

    if(abrirValidacao._wired) return;
    var close = function(){ fecharValidacao(); };
    if($('valClose')) $('valClose').addEventListener('click', close);
    if($('valCloseBtn')) $('valCloseBtn').addEventListener('click', close);
    if($('valRevalidar')) $('valRevalidar').addEventListener('click', validarEExibir);
    if($('valCopiar')) $('valCopiar').addEventListener('click', function(){
        var t = ($('valReport') && $('valReport').textContent) || '';
        if(navigator.clipboard && navigator.clipboard.writeText){
            navigator.clipboard.writeText(t);
        }else{
            window.prompt('Copie o relatório:', t);
        }
    });
    document.addEventListener('keydown', function(ev){
        var m = $('valModal');
        if(!m || m.classList.contains('pb-hidden')) return;
        if(ev.key === 'Escape') close();
    });
    abrirValidacao._wired = true;
}

function fecharValidacao(){
    var modal = $('valModal');
    if(modal) modal.classList.add('pb-hidden');
}

function validarEExibir(){
    var fonte = gerarFontePascal();
    var diags = validarFontePascal(fonte);

    var erros = diags.filter(function(d){ return d.sev === 'ERRO'; }).length;
    var avisos = diags.filter(function(d){ return d.sev === 'AVISO'; }).length;
    if($('valResumo')) $('valResumo').textContent = (erros ? (erros+' erro(s)') : '0 erros') + (avisos ? (' • '+avisos+' aviso(s)') : '');

    var linhas = [];
    if(!diags.length){
        linhas.push('✅ Nenhum problema encontrado nas regras básicas.');
    }else{
        diags.forEach(function(d){
            var pos = (d.line != null) ? ('L'+d.line+': ') : '';
            linhas.push(d.sev + ' ' + pos + d.msg);
        });
    }
    if($('valReport')) $('valReport').textContent = linhas.join('\n');
}

function validarFontePascal(fonte){
    var lines = String(fonte || '').replace(/\r/g,'').split('\n');
    var diags = [];

    function add(sev, line, msg){ diags.push({sev: sev, line: line, msg: msg}); }

    // helpers de parse (ignora strings)
    function stripStr(s){ return String(s).replace(/'(?:''|[^'])*'/g, "''"); }

    // 1) program / begin / end.
    var hasProgram = false;
    var hasBegin = false;
    var hasEndDot = false;
    for(var i=0;i<lines.length;i++){
        var raw = lines[i];
        var l = raw.trim();
        if(!l) continue;
        if(/^program\b/i.test(l)) hasProgram = true;
        if(/^begin\b/i.test(l)) hasBegin = true;
        if(/^end\.$/i.test(l)) hasEndDot = true;
    }
    if(!hasProgram) add('ERRO', null, 'Faltou a linha "program Nome;".');
    if(!hasBegin) add('ERRO', null, 'Faltou o "begin" para iniciar o bloco principal.');
    if(!hasEndDot) add('ERRO', null, 'Faltou o "end." para finalizar o programa.');

    // 2) balanceamento begin/end (aproximado)
    var stack = [];
    for(i=0;i<lines.length;i++){
        var s = stripStr(lines[i]).toLowerCase();
        // conta tokens begin/end fora de palavras
        var m;
        var reB = /\bbegin\b/g; while((m=reB.exec(s))) stack.push({t:'begin', line:i+1});
        var reE = /\bend\b\s*[;\.]?/g; while((m=reE.exec(s))){
            if(stack.length) stack.pop();
            else add('ERRO', i+1, '"end" sem "begin" correspondente.');
        }
    }
    if(stack.length){
        add('ERRO', stack[stack.length-1].line, 'Existe "begin" sem "end" correspondente.');
    }

    // 3) seção var e variáveis declaradas
    var inVar = false;
    var declared = Object.create(null);
    var keywords = {
        program:1, uses:1, crt:1, var:1, begin:1, end:1,
        if:1, then:1, else:1, while:1, do:1, for:1, to:1, downto:1,
        repeat:1, until:1, case:1, of:1, writeln:1, readln:1, clrscr:1,
        integer:1, real:1, char:1, string:1, boolean:1, div:1, mod:1, not:1, and:1, or:1,
        sqr:1, sqrt:1, true:1, false:1
    };

    for(i=0;i<lines.length;i++){
        var l2 = lines[i].trim();
        if(!l2) continue;
        if(/^var\b/i.test(l2)){ inVar = true; continue; }
        if(/^begin\b/i.test(l2)){ inVar = false; }
        if(inVar){
            // exemplo: x: integer;
            var d = l2.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*:\s*([A-Za-z_][A-Za-z0-9_]*)\s*;$/);
            if(!d){
                // var vazio ou sem ;
                if(/^var\b/i.test(l2)) continue;
                add('AVISO', i+1, 'Declaração de variável fora do padrão "nome: tipo;".');
            }else{
                var nm = d[1];
                if(declared[nm]) add('AVISO', i+1, 'Variável "'+nm+'" declarada mais de uma vez.');
                declared[nm] = true;
            }
        }
    }

    // 4) ponto-e-vírgula básico
    for(i=0;i<lines.length;i++){
        var tline = lines[i].trim();
        if(!tline) continue;

        // linhas que não exigem ;
        if(/^program\b/i.test(tline)){
            if(!/;\s*$/.test(tline)) add('ERRO', i+1, 'A linha "program" deve terminar com ";".');
            continue;
        }
        if(/^uses\b/i.test(tline)){
            if(!/;\s*$/.test(tline)) add('ERRO', i+1, 'A linha "uses" deve terminar com ";".');
            continue;
        }
        if(/^var\b/i.test(tline)) continue;
        if(/^begin\b/i.test(tline)) continue;
        if(/^end\.$/i.test(tline)) continue;
        if(/^end;$/i.test(tline)) continue;
        if(/^(if\b|while\b|for\b|repeat\b|until\b|else\b|case\b)/i.test(tline)){
            // aceitável sem ;
            continue;
        }

        // declaração dentro de var já tratada
        if(/:\s*[A-Za-z_][A-Za-z0-9_]*\s*;\s*$/.test(tline)) continue;

        // comandos comuns exigem ;
        if(/\b(:=|writeln\s*\(|readln\s*\(|clrscr\b)/i.test(tline)){
            if(!/;\s*$/.test(tline)) add('ERRO', i+1, 'Faltou ";" no fim da instrução.');
        }
    }

    // 5) parênteses e aspas balanceadas (por linha)
    for(i=0;i<lines.length;i++){
        var raw2 = lines[i];
        var s2 = stripStr(raw2);
        // parênteses
        var bal = 0;
        for(var j=0;j<s2.length;j++){
            if(s2[j] === '(') bal++;
            if(s2[j] === ')') bal--;
        }
        if(bal !== 0) add('AVISO', i+1, 'Parênteses parecem desbalanceados nesta linha.');

        // aspas simples simples (se houver número ímpar na linha)
        var count = (raw2.match(/'/g) || []).length;
        if(count % 2 === 1) add('AVISO', i+1, 'Aspas simples parecem desbalanceadas nesta linha.');
    }

    // 6) uso de variáveis não declaradas (aproximado)
    for(i=0;i<lines.length;i++){
        var line3 = stripStr(lines[i]);
        var tokens = line3.match(/\b[A-Za-z_][A-Za-z0-9_]*\b/g) || [];
        tokens.forEach(function(tok){
            var low = tok.toLowerCase();
            if(keywords[low]) return;
            // ignora nomes de tipo na declaração
            if(/:\s*\w/.test(line3) && new RegExp('^\\s*'+tok+'\\s*:','i').test(line3)) return;
            if(!declared[tok]){
                // se for nome de programa, deixa passar (heurística)
                if(/^program\b/i.test(lines[i])) return;
                add('AVISO', i+1, 'Possível uso de variável não declarada: "'+tok+'".');
            }
        });
    }

    // dedup avisos idênticos por linha
    var seen = Object.create(null);
    diags = diags.filter(function(d){
        var k = d.sev+'|'+(d.line||'')+'|'+d.msg;
        if(seen[k]) return false;
        seen[k] = 1;
        return true;
    });

    return diags;
}