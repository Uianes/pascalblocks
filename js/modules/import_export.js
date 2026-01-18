import {
  codigo,
  codigoHTML,
  limparWorkspace,
  pushBloco,
  pushToken,
  checkWorkspaceEmptyState,
} from './workspace.js';

function exportBlocksToXml() {
  const doc = document.implementation.createDocument(null, 'pas_block', null);
  const root = doc.documentElement;

  codigoHTML.forEach((blockElement, index) => {
    const block = doc.createElement('block');
    const classes = Array.from(blockElement.classList);

    let typeClass = '';
    if (classes.includes('pb-token')) {
      typeClass = classes.find(
        (cls) => cls !== 'pb-wblock' && cls !== 'pb-token'
      );
      block.setAttribute('isToken', 'true');
    } else {
      typeClass = classes.find((cls) => cls !== 'pb-wblock');
    }

    block.setAttribute('type', typeClass || 'default');
    block.setAttribute('label', blockElement.textContent.trim());
    block.setAttribute('code', codigo[index]);

    root.appendChild(block);
  });

  const serializer = new XMLSerializer();
  let xmlString = serializer.serializeToString(doc);

  xmlString = formatXml(xmlString);

  return xmlString;
}

function formatXml(xml) {
  let formatted = '';
  const reg = /(>)(<)(\/?)/g;
  xml = xml.replace(reg, '$1\r\n$2$3');
  let pad = 0;
  xml.split('\r\n').forEach((node) => {
    let indent = 0;
    if (node.match(/.+<\/\w[^>]*>$/)) {
      indent = 0;
    } else if (node.match(/^<\/\w/)) {
      if (pad != 0) {
        pad -= 1;
      }
    } else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
      indent = 1;
    } else {
      indent = 0;
    }

    formatted += '    '.repeat(pad) + node + '\r\n';
    pad += indent;
  });
  return formatted.trim();
}

function importBlocksFromXml(xmlString) {
  limparWorkspace();

  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, 'application/xml');

  if (xmlDoc.getElementsByTagName('parsererror').length > 0) {
    console.error(
      'Erro ao fazer parse do XML:',
      xmlDoc.getElementsByTagName('parsererror')[0].textContent
    );
    alert(
      'Erro ao importar arquivo. Verifique se é um arquivo .pas_block válido.'
    );
    return;
  }

  const blocks = xmlDoc.getElementsByTagName('block');
  Array.from(blocks).forEach((blockElement) => {
    const type = blockElement.getAttribute('type');
    const label = blockElement.getAttribute('label');
    const code = blockElement.getAttribute('code');
    const isToken = blockElement.getAttribute('isToken') === 'true';

    if (code && label) {
      if (isToken) {
        pushToken(code, type + ' pb-token', label);
      } else {
        pushBloco(code, type, label);
      }
    }
  });

  checkWorkspaceEmptyState();
}

export { exportBlocksToXml, importBlocksFromXml };
