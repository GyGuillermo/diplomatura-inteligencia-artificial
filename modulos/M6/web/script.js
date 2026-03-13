const colors = {
  core: '#00d4ff',
  module: '#f72585',
  cv: '#ff007a',
  bio: '#ffaa00',
  interview: '#9d4edd',
  email: '#4cc9f0',
  prompt: '#7fe8ff',
  security: '#ff8a65'
};

let module6Graph = null;
let renderTicket = 0;
let panelTicket = 0;
const noteFileCache = new Map();

const slides = [
  {
    title: 'Diplomatura IA (M6–M9)',
    subtitle: 'Obsidian global · grafo emergente',
    legend: ['core','module','prompt','security'],
    data: {
      nodes: [
        { id:'Diplomado en Inteligencia Artificial', group:'core', radius:20, note:'Nodo raíz del sistema de conocimiento.' },
        { id:'Módulo 6: ChatGPT Entrevistas', group:'module', radius:15, note:'Empleabilidad con IA: CV, bio, entrevistas y correos.' },
        { id:'Módulo 7: Fundamentos Prompt Engineering', group:'module', radius:15, note:'Teoría base y componentes del prompt.' },
        { id:'Módulo 8: Técnicas Básicas Prompt Engineering', group:'module', radius:15, note:'Priming, N-Shot y Chain-of-Thought.' },
        { id:'Módulo 9: Técnicas Avanzadas Prompt Engineering', group:'module', radius:15, note:'Role Playing, Self-Consistency y seguridad.' },

        { id:'Prompt Engineering', group:'prompt', radius:13, note:'Conexión transversal entre módulos 7-8-9.' },
        { id:'Casos Prácticos', group:'prompt', radius:13, note:'Aplicación en salud, educación, finanzas y tecnología.' },

        { id:'Creación de Currículums Rápidos y Efectivos', group:'cv', radius:12, note:'Personalización, pasos clave y ATS.' },
        { id:'Desarrollo de Biografías Profesionales Impactantes', group:'bio', radius:12, note:'Perfil, estructura y verbos de acción.' },
        { id:'Personalización de Entrevistas Laborales', group:'interview', radius:12, note:'Preparación, STAR y preguntas difíciles.' },
        { id:'Redacción de Correos Electrónicos Profesionales', group:'email', radius:12, note:'Estructura, tono y seguimiento.' },

        { id:'Definiciones y Términos Clave', group:'prompt', radius:11, note:'Prompting, Template, Engineering, Fine-Tuning.' },
        { id:'Componentes Esenciales de un Prompt', group:'prompt', radius:11, note:'Directiva, contexto, ejemplos, estilo, restricciones.' },
        { id:'Principios de Diseño', group:'prompt', radius:11, note:'Definir objetivo, construir, refinar, experimentar.' },
        { id:'Aplicaciones del Prompt Engineering', group:'prompt', radius:11, note:'Educación, Derecho, Marketing, Salud, Software, Finanzas.' },

        { id:'Técnica de Priming', group:'prompt', radius:11, note:'Preparar al modelo con contexto y rol.' },
        { id:'N-Shot Prompting', group:'prompt', radius:11, note:'Zero-shot, one-shot y few-shot.' },
        { id:'Chain-of-Thought (CoT)', group:'prompt', radius:11, note:'Razonamiento paso a paso.' },

        { id:'Técnica de Role Playing', group:'prompt', radius:11, note:'Asignación de roles especializados.' },
        { id:'Generated Knowledge y Knowledge Integration', group:'prompt', radius:11, note:'Generar e integrar conocimiento antes de responder.' },
        { id:'Self-Consistency', group:'prompt', radius:11, note:'Múltiples soluciones y selección consistente.' },
        { id:'Seguridad y Alineamiento', group:'security', radius:12, note:'Prompt Hacking, riesgos, mitigación y guardrails.' }
      ],
      links: [
        {source:'Diplomado en Inteligencia Artificial', target:'Módulo 6: ChatGPT Entrevistas'},
        {source:'Diplomado en Inteligencia Artificial', target:'Módulo 7: Fundamentos Prompt Engineering'},
        {source:'Diplomado en Inteligencia Artificial', target:'Módulo 8: Técnicas Básicas Prompt Engineering'},
        {source:'Diplomado en Inteligencia Artificial', target:'Módulo 9: Técnicas Avanzadas Prompt Engineering'},

        {source:'Módulo 6: ChatGPT Entrevistas', target:'Creación de Currículums Rápidos y Efectivos'},
        {source:'Módulo 6: ChatGPT Entrevistas', target:'Desarrollo de Biografías Profesionales Impactantes'},
        {source:'Módulo 6: ChatGPT Entrevistas', target:'Personalización de Entrevistas Laborales'},
        {source:'Módulo 6: ChatGPT Entrevistas', target:'Redacción de Correos Electrónicos Profesionales'},

        {source:'Módulo 7: Fundamentos Prompt Engineering', target:'Definiciones y Términos Clave'},
        {source:'Módulo 7: Fundamentos Prompt Engineering', target:'Componentes Esenciales de un Prompt'},
        {source:'Módulo 7: Fundamentos Prompt Engineering', target:'Principios de Diseño'},
        {source:'Módulo 7: Fundamentos Prompt Engineering', target:'Aplicaciones del Prompt Engineering'},

        {source:'Módulo 8: Técnicas Básicas Prompt Engineering', target:'Técnica de Priming'},
        {source:'Módulo 8: Técnicas Básicas Prompt Engineering', target:'N-Shot Prompting'},
        {source:'Módulo 8: Técnicas Básicas Prompt Engineering', target:'Chain-of-Thought (CoT)'},

        {source:'Módulo 9: Técnicas Avanzadas Prompt Engineering', target:'Técnica de Role Playing'},
        {source:'Módulo 9: Técnicas Avanzadas Prompt Engineering', target:'Generated Knowledge y Knowledge Integration'},
        {source:'Módulo 9: Técnicas Avanzadas Prompt Engineering', target:'Self-Consistency'},
        {source:'Módulo 9: Técnicas Avanzadas Prompt Engineering', target:'Seguridad y Alineamiento'},

        {source:'Prompt Engineering', target:'Módulo 7: Fundamentos Prompt Engineering'},
        {source:'Prompt Engineering', target:'Módulo 8: Técnicas Básicas Prompt Engineering'},
        {source:'Prompt Engineering', target:'Módulo 9: Técnicas Avanzadas Prompt Engineering'},

        {source:'Casos Prácticos', target:'Módulo 6: ChatGPT Entrevistas'},
        {source:'Casos Prácticos', target:'Módulo 7: Fundamentos Prompt Engineering'},
        {source:'Casos Prácticos', target:'Módulo 8: Técnicas Básicas Prompt Engineering'},
        {source:'Casos Prácticos', target:'Módulo 9: Técnicas Avanzadas Prompt Engineering'}
      ]
    }
  },
  {
    title: 'M6: empleabilidad con IA',
    subtitle: '',
    legend: ['core','cv','bio','interview','email','prompt'],
    data: null,
    dataUrl: './data.json'
  },
  {
    title: 'Slide 2 · MOC alternativo M6 (comparación)',
    subtitle: 'Estructura temática adjunta por el usuario',
    legend: ['core','cv','bio','interview','email','prompt'],
    data: {
      nodes: [
        { id:'MOC - ChatGPT en la Preparación de Entrevistas de Trabajo', group:'core', radius:20, note:'Hub central del conocimiento M6.' },

        { id:'Optimización de Currículums con IA', group:'cv', radius:14, note:'CV dinámico y personalizado con IA.' },
        { id:'Pasos Críticos para un CV Eficaz', group:'cv', radius:13, note:'Investigación previa de puesto y empresa.' },
        { id:'Estructura Atómica del Currículum', group:'cv', radius:12, note:'Descomposición del CV en bloques optimizables.' },
        { id:'Personalización de Perfil por Audiencia', group:'cv', radius:12, note:'Adaptación por industria/rol objetivo.' },
        { id:'Optimización para ATS', group:'cv', radius:12, note:'Formato legible por sistemas ATS.' },

        { id:'Diseño de Biografías Profesionales Impactantes', group:'bio', radius:14, note:'Narrativa breve con propuesta de valor.' },
        { id:'Uso de Verbos de Acción', group:'bio', radius:11, note:'Lenguaje de alto impacto para perfil profesional.' },
        { id:'Métricas de Impacto', group:'bio', radius:11, note:'Resultados cuantificables en bio/CV.' },

        { id:'Estrategias de Preparación para Entrevistas', group:'interview', radius:14, note:'Preparación contextual y argumental.' },
        { id:'Técnica STAR para Respuestas Perspicaces', group:'interview', radius:14, note:'Situación, Tarea, Acción, Resultado.' },
        { id:'Investigación Previa del Empleador', group:'interview', radius:12, note:'Contexto de empresa para responder mejor.' },

        { id:'Redacción de Correos Electrónicos Profesionales', group:'email', radius:14, note:'Mensajes claros con CTA.' },
        { id:'Protocolo de Seguimiento Post-Contacto', group:'email', radius:13, note:'Seguimiento profesional en 3-5 días.' },
        { id:'Imagen Corporativa Personal', group:'email', radius:11, note:'Consistencia de marca personal en comunicación.' },

        { id:'Rol de Experto en Recursos Humanos para LLMs', group:'prompt', radius:14, note:'Priming de rol para salida de mayor calidad.' },
        { id:'Simulación de Entrevistas y Feedback con IA', group:'prompt', radius:13, note:'Práctica y mejora iterativa asistida por IA.' },
        { id:'IA como Facilitador de Empleo', group:'prompt', radius:11, note:'La IA traduce habilidades a requerimientos del mercado.' }
      ],
      links: [
        {source:'MOC - ChatGPT en la Preparación de Entrevistas de Trabajo', target:'Optimización de Currículums con IA'},
        {source:'MOC - ChatGPT en la Preparación de Entrevistas de Trabajo', target:'Diseño de Biografías Profesionales Impactantes'},
        {source:'MOC - ChatGPT en la Preparación de Entrevistas de Trabajo', target:'Estrategias de Preparación para Entrevistas'},
        {source:'MOC - ChatGPT en la Preparación de Entrevistas de Trabajo', target:'Redacción de Correos Electrónicos Profesionales'},
        {source:'MOC - ChatGPT en la Preparación de Entrevistas de Trabajo', target:'Rol de Experto en Recursos Humanos para LLMs'},

        {source:'Optimización de Currículums con IA', target:'Pasos Críticos para un CV Eficaz'},
        {source:'Pasos Críticos para un CV Eficaz', target:'Estructura Atómica del Currículum'},
        {source:'Pasos Críticos para un CV Eficaz', target:'Optimización para ATS'},
        {source:'Optimización de Currículums con IA', target:'IA como Facilitador de Empleo'},
        {source:'Diseño de Biografías Profesionales Impactantes', target:'Personalización de Perfil por Audiencia'},
        {source:'Diseño de Biografías Profesionales Impactantes', target:'Uso de Verbos de Acción'},
        {source:'Diseño de Biografías Profesionales Impactantes', target:'Métricas de Impacto'},

        {source:'Estrategias de Preparación para Entrevistas', target:'Técnica STAR para Respuestas Perspicaces'},
        {source:'Estrategias de Preparación para Entrevistas', target:'Investigación Previa del Empleador'},
        {source:'Técnica STAR para Respuestas Perspicaces', target:'Simulación de Entrevistas y Feedback con IA'},

        {source:'Redacción de Correos Electrónicos Profesionales', target:'Protocolo de Seguimiento Post-Contacto'},
        {source:'Redacción de Correos Electrónicos Profesionales', target:'Imagen Corporativa Personal'},

        {source:'Rol de Experto en Recursos Humanos para LLMs', target:'Optimización de Currículums con IA'},
        {source:'Rol de Experto en Recursos Humanos para LLMs', target:'Simulación de Entrevistas y Feedback con IA'}
      ]
    }
  }
];

// Quedan activos el slide general y el slide M6 reconstruido desde data.json.
const enabledSlides = slides.slice(0, 2);

const svg = d3.select('body').append('svg')
  .attr('width', window.innerWidth)
  .attr('height', window.innerHeight);

const container = svg.append('g');
const zoomBehavior = d3.zoom().scaleExtent([0.2, 5]).on('zoom', (event) => {
  container.attr('transform', event.transform);
});
svg.call(zoomBehavior);

let currentSlide = 0;
let pointer = { x: 120, y: 120 };

async function loadGraphData(slide) {
  if (slide.data) return slide.data;
  if (!slide.dataUrl) return null;
  if (slide.dataUrl === './data.json' && module6Graph) return module6Graph;

  const response = await fetch(slide.dataUrl);
  if (!response.ok) {
    throw new Error(`No se pudo cargar ${slide.dataUrl}`);
  }

  const data = await response.json();
  if (slide.dataUrl === './data.json') module6Graph = data;
  return data;
}

function renderLegend(keys) {
  const legend = document.getElementById('legend');
  legend.innerHTML = keys
    .map(k => `<span><i style="background:${colors[k] || '#fff'}"></i>${k}</span>`)
    .join('');
}

function placePanelNearPointer() {
  const panel = document.getElementById('detailPanel');
  const pad = 16;
  const offset = 28;
  const w = panel.offsetWidth || 420;
  const h = Math.min(window.innerHeight - pad * 2, panel.offsetHeight || 220);

  let left = pointer.x + offset;
  let top = pointer.y + offset;

  if (left + w > window.innerWidth - pad) left = pointer.x - w - offset;
  if (top + h > window.innerHeight - pad) top = pointer.y - h - offset;

  left = Math.max(pad, left);
  top = Math.max(pad, top);

  panel.style.left = `${left}px`;
  panel.style.top = `${top}px`;
}

function setStatus(message = '') {
  const badge = document.getElementById('statusBadge');
  if (!message) {
    badge.classList.add('status-hidden');
    badge.textContent = '';
    return;
  }

  badge.textContent = message;
  badge.classList.remove('status-hidden');
}

function getGraphViewportCenter() {
  const topElements = [
    document.getElementById('ui-layer'),
    document.getElementById('header-logo'),
    document.getElementById('slide-controls')
  ].filter(Boolean);
  const legend = document.getElementById('legend');
  const pad = 24;

  const topBound = topElements.reduce((maxBottom, element) => {
    const rect = element.getBoundingClientRect();
    return Math.max(maxBottom, rect.bottom + pad);
  }, pad);

  const bottomBound = legend
    ? Math.max(topBound + pad, legend.getBoundingClientRect().top - pad)
    : window.innerHeight - pad;

  return {
    x: window.innerWidth / 2,
    y: topBound + ((bottomBound - topBound) / 2)
  };
}

function getGraphViewportBounds() {
  const topElements = [
    document.getElementById('ui-layer'),
    document.getElementById('header-logo'),
    document.getElementById('slide-controls')
  ].filter(Boolean);
  const legend = document.getElementById('legend');
  const pad = 24;

  const top = topElements.reduce((maxBottom, element) => {
    const rect = element.getBoundingClientRect();
    return Math.max(maxBottom, rect.bottom + pad);
  }, pad);

  const bottom = legend
    ? Math.max(top + pad, legend.getBoundingClientRect().top - pad)
    : window.innerHeight - pad;

  return {
    left: pad,
    right: window.innerWidth - pad,
    top,
    bottom,
    width: Math.max(1, window.innerWidth - pad * 2),
    height: Math.max(1, bottom - top)
  };
}

function centerNodesInViewport(nodes = []) {
  if (!nodes.length) return;

  const positionedNodes = nodes.filter(node =>
    Number.isFinite(node.x) && Number.isFinite(node.y)
  );
  if (!positionedNodes.length) return;

  const minX = Math.min(...positionedNodes.map(node => node.x));
  const maxX = Math.max(...positionedNodes.map(node => node.x));
  const minY = Math.min(...positionedNodes.map(node => node.y));
  const maxY = Math.max(...positionedNodes.map(node => node.y));

  const graphCenterX = (minX + maxX) / 2;
  const graphCenterY = (minY + maxY) / 2;
  const viewportCenter = getGraphViewportCenter();
  const viewportCenterX = viewportCenter.x;
  const viewportCenterY = viewportCenter.y;
  const deltaX = viewportCenterX - graphCenterX;
  const deltaY = viewportCenterY - graphCenterY;

  positionedNodes.forEach((node) => {
    node.x += deltaX;
    node.y += deltaY;
  });
}

function centerGraphViewport(nodes = []) {
  if (!nodes.length) {
    svg.call(zoomBehavior.transform, d3.zoomIdentity);
    return;
  }

  const positionedNodes = nodes.filter(node =>
    Number.isFinite(node.x) && Number.isFinite(node.y)
  );
  if (!positionedNodes.length) {
    svg.call(zoomBehavior.transform, d3.zoomIdentity);
    return;
  }

  const minX = Math.min(...positionedNodes.map(node => node.x - (node.radius || 12)));
  const maxX = Math.max(...positionedNodes.map(node => node.x + (node.radius || 12)));
  const minY = Math.min(...positionedNodes.map(node => node.y - (node.radius || 12)));
  const maxY = Math.max(...positionedNodes.map(node => node.y + (node.radius || 12)));
  const graphWidth = Math.max(1, maxX - minX);
  const graphHeight = Math.max(1, maxY - minY);
  const graphCenterX = (minX + maxX) / 2;
  const graphCenterY = (minY + maxY) / 2;
  const viewportBounds = getGraphViewportBounds();
  const viewportCenter = getGraphViewportCenter();
  const viewportCenterX = viewportCenter.x;
  const viewportCenterY = viewportCenter.y;
  const fitScale = Math.min(
    1,
    viewportBounds.width / graphWidth,
    viewportBounds.height / graphHeight
  );
  const appliedScale = Math.max(0.82, fitScale);

  svg.call(
    zoomBehavior.transform,
    d3.zoomIdentity.translate(
      viewportCenterX - graphCenterX * appliedScale,
      viewportCenterY - graphCenterY * appliedScale
    ).scale(appliedScale)
  );
}

function splitLabelLines(text = '', maxChars = 24) {
  const words = text.split(/\s+/).filter(Boolean);
  const lines = [];
  let currentLine = '';

  for (const word of words) {
    const candidate = currentLine ? `${currentLine} ${word}` : word;
    if (candidate.length <= maxChars || !currentLine) {
      currentLine = candidate;
      continue;
    }

    lines.push(currentLine);
    currentLine = word;
  }

  if (currentLine) lines.push(currentLine);
  return lines.length ? lines : [text];
}

function escapeHtml(value = '') {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function formatInlineMarkdown(line) {
  return escapeHtml(line)
    .replace(/\[\[([^\]]+)\]\]/g, '$1')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
}

function markdownToHtml(markdownText = '') {
  const lines = markdownText.replace(/\r\n/g, '\n').split('\n');
  const blocks = [];
  let inCode = false;
  let codeLines = [];
  let listItems = [];

  function flushList() {
    if (!listItems.length) return;
    blocks.push(`<ul>${listItems.map(item => `<li>${formatInlineMarkdown(item)}</li>`).join('')}</ul>`);
    listItems = [];
  }

  function flushCode() {
    if (!codeLines.length) return;
    blocks.push(`<pre><code>${escapeHtml(codeLines.join('\n'))}</code></pre>`);
    codeLines = [];
  }

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();

    if (line.startsWith('```')) {
      if (inCode) {
        flushCode();
      } else {
        flushList();
      }
      inCode = !inCode;
      continue;
    }

    if (inCode) {
      codeLines.push(rawLine);
      continue;
    }

    if (!line.trim()) {
      flushList();
      continue;
    }

    if (line.startsWith('### ')) {
      flushList();
      blocks.push(`<h3>${formatInlineMarkdown(line.slice(4))}</h3>`);
      continue;
    }

    if (line.startsWith('## ')) {
      flushList();
      blocks.push(`<h2>${formatInlineMarkdown(line.slice(3))}</h2>`);
      continue;
    }

    if (line.startsWith('# ')) {
      flushList();
      blocks.push(`<h1>${formatInlineMarkdown(line.slice(2))}</h1>`);
      continue;
    }

    if (line.startsWith('- ')) {
      listItems.push(line.slice(2));
      continue;
    }

    flushList();
    blocks.push(`<p>${formatInlineMarkdown(line)}</p>`);
  }

  flushList();
  flushCode();
  return blocks.join('');
}

function extractNoteBody(markdownText = '') {
  if (!markdownText.startsWith('---')) return markdownText.trim();
  const closingIndex = markdownText.indexOf('\n---', 3);
  if (closingIndex === -1) return markdownText.trim();
  return markdownText.slice(closingIndex + 4).trim();
}

function stripLeadingTitle(markdownText = '', nodeTitle = '') {
  const normalizedNodeTitle = nodeTitle.trim().toLowerCase();
  const lines = markdownText.split('\n');

  while (lines.length && !lines[0].trim()) {
    lines.shift();
  }

  if (!lines.length) return '';

  const firstLine = lines[0].trim();
  if (!firstLine.startsWith('# ')) return markdownText;

  const markdownTitle = firstLine.slice(2).trim().toLowerCase();
  if (markdownTitle !== normalizedNodeTitle) return markdownText;

  lines.shift();
  while (lines.length && !lines[0].trim()) {
    lines.shift();
  }

  return lines.join('\n');
}

function prunePresentationSections(markdownText = '') {
  const hiddenSections = new Set([
    'prompt sugerido',
    'aplicación web interactiva',
    'pendientes',
    'enlaces'
  ]);

  const lines = markdownText.split('\n');
  const keptLines = [];
  let skipSection = false;

  for (const rawLine of lines) {
    const trimmedLine = rawLine.trim();

    if (trimmedLine.startsWith('## ')) {
      const heading = trimmedLine.slice(3).trim().toLowerCase();
      skipSection = hiddenSections.has(heading);
      if (skipSection) continue;
    }

    if (!skipSection) {
      keptLines.push(rawLine);
    }
  }

  return keptLines.join('\n').trim();
}

async function loadAtomicNote(fileName) {
  if (!fileName) return null;
  if (noteFileCache.has(fileName)) return noteFileCache.get(fileName);

  const response = await fetch(`../notas-atomicas/${fileName}`);
  if (!response.ok) {
    throw new Error(`No se pudo cargar la nota ${fileName}`);
  }

  const markdownText = await response.text();
  noteFileCache.set(fileName, markdownText);
  return markdownText;
}

async function renderNodePanel(nodeData, pointerEvent) {
  const panel = document.getElementById('detailPanel');
  const panelContent = document.getElementById('panelContent');
  const panelSource = document.getElementById('panelSource');
  const ticket = ++panelTicket;

  pointer = { x: pointerEvent.pageX, y: pointerEvent.pageY };
  document.getElementById('panelTitle').textContent = nodeData.id;
  document.getElementById('panelGroup').textContent = nodeData.group.toUpperCase();
  document.getElementById('panelGroup').style.color = colors[nodeData.group] || '#e0e0e0';
  document.getElementById('panelNote').textContent = nodeData.note || '';
  panelSource.textContent = '';
  panelContent.innerHTML = '';
  panel.classList.remove('panel-hidden');
  placePanelNearPointer();
  panel.scrollTop = 0;

  if (!nodeData.file) return;

  panelContent.innerHTML = '<p>Cargando nota atómica...</p>';

  try {
    const markdownText = await loadAtomicNote(nodeData.file);
    if (ticket !== panelTicket) return;
    const cleanedBody = prunePresentationSections(
      stripLeadingTitle(extractNoteBody(markdownText), nodeData.id)
    );
    panelContent.innerHTML = markdownToHtml(cleanedBody);
    placePanelNearPointer();
  } catch (error) {
    if (ticket !== panelTicket) return;
    panelContent.innerHTML = `<p>${escapeHtml(error.message)}</p>`;
    placePanelNearPointer();
  }
}

async function renderSlide(index) {
  const ticket = ++renderTicket;
  currentSlide = index;
  const slide = enabledSlides[index];
  const panel = document.getElementById('detailPanel');
  panel.classList.add('panel-hidden');
  const prevButton = document.getElementById('prevSlide');
  const nextButton = document.getElementById('nextSlide');
  const navigationEnabled = enabledSlides.length > 1;

  prevButton.disabled = !navigationEnabled;
  nextButton.disabled = !navigationEnabled;

  document.getElementById('slideTitle').textContent = slide.title;
  document.getElementById('slideSubtitle').textContent = slide.subtitle;
  document.getElementById('slideIndicator').textContent = `${index + 1} / ${enabledSlides.length}`;
  renderLegend(slide.legend);

  container.selectAll('*').remove();
  setStatus('Cargando visualización...');

  let rawData;
  try {
    rawData = await loadGraphData(slide);
  } catch (error) {
    if (ticket !== renderTicket) return;
    document.getElementById('panelTitle').textContent = 'Error de carga';
    document.getElementById('panelGroup').textContent = 'DATA';
    document.getElementById('panelGroup').style.color = '#ff8a65';
    document.getElementById('panelNote').textContent = error.message;
    panel.classList.remove('panel-hidden');
    panel.style.left = '16px';
    panel.style.top = '90px';
    setStatus('No se pudo cargar el slide');
    return;
  }

  if (ticket !== renderTicket) return;

  const data = JSON.parse(JSON.stringify(rawData));
  const introWideLayout = index === 0;
  const detailWideLayout = index === 1;
  const linkDistance = introWideLayout ? 202 : (detailWideLayout ? 170 : 120);
  const chargeStrength = introWideLayout ? -390 : (detailWideLayout ? -320 : -400);
  const collisionRadius = introWideLayout ? 15 : (detailWideLayout ? 16 : 20);
  const forceYStrength = introWideLayout ? 0.014 : (detailWideLayout ? 0.012 : 0.03);

  const simulation = d3.forceSimulation(data.nodes)
    .force('link', d3.forceLink(data.links).id(d => d.id).distance(linkDistance))
    .force('charge', d3.forceManyBody().strength(chargeStrength))
    .force('center', d3.forceCenter(window.innerWidth / 2, window.innerHeight / 2))
    .force('collision', d3.forceCollide().radius(d => (d.radius || 14) + collisionRadius))
    .force('y', d3.forceY(window.innerHeight / 2).strength(forceYStrength));

  simulation.stop();
  for (let iteration = 0; iteration < 220; iteration += 1) {
    simulation.tick();
  }
  centerNodesInViewport(data.nodes);
  centerGraphViewport(data.nodes);

  const link = container.append('g')
    .selectAll('line')
    .data(data.links)
    .join('line')
    .attr('stroke', '#2f3d62')
    .attr('stroke-width', 1.5)
    .attr('stroke-opacity', 0.42);

  function clearLinkGlow() {
    link.classed('link-glow', false);
  }
  function glowConnected(nodeId) {
    link.classed('link-glow', d => d.source.id === nodeId || d.target.id === nodeId);
  }

  const node = container.append('g')
    .selectAll('g')
    .data(data.nodes)
    .join('g')
    .call(d3.drag()
      .on('start', (event, d) => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x; d.fy = d.y;
      })
      .on('drag', (event, d) => {
        d.fx = event.x; d.fy = event.y;
      })
      .on('end', (event, d) => {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null; d.fy = null;
      }));

  const compactViewport = window.innerWidth < 1400;
  data.nodes.forEach((item) => {
    const maxChars = introWideLayout
      ? (compactViewport ? (item.id.length > 30 ? 18 : 15) : (item.id.length > 30 ? 22 : 18))
      : (compactViewport ? (item.id.length > 30 ? 22 : 18) : (item.id.length > 30 ? 28 : 22));
    item.labelLines = splitLabelLines(item.id, maxChars);
    item.labelFontSize = introWideLayout
      ? (item.labelLines.length >= 3 ? 8.1 : 8.8)
      : (item.labelLines.length >= 3 ? 8.5 : 9.5);
  });

  node.append('circle')
    .attr('r', d => d.radius || 12)
    .attr('fill', d => colors[d.group] || '#fff')
    .attr('stroke', d => colors[d.group] || '#fff')
    .attr('stroke-width', 2)
    .attr('stroke-opacity', 0.55)
    .style('cursor', 'pointer')
    .on('mouseover', function(event, d) {
      d3.select(this).transition().duration(180).attr('r', (d.radius || 12) + 5);
      glowConnected(d.id);

      const tt = d3.select('#tooltip');
      tt.style('visibility', 'visible')
        .html(`<strong>${d.id}</strong><br><small style="color:${colors[d.group]}">${d.group.toUpperCase()}</small>`);

      // posicionamiento inteligente para no tapar demasiado el grafo
      const tw = 190, th = 56;
      const pad = 14;
      let left = event.pageX + 18;
      let top = event.pageY + 18;
      if (left + tw > window.innerWidth - pad) left = event.pageX - tw - 18;
      if (top + th > window.innerHeight - pad) top = event.pageY - th - 18;
      tt.style('left', left + 'px').style('top', top + 'px');
    })
    .on('mouseout', function(event, d) {
      d3.select(this).transition().duration(180).attr('r', d => d.radius || 12);
      clearLinkGlow();
      d3.select('#tooltip').style('visibility', 'hidden');
    })
    .on('click', function(event, d) {
      selectedNodeId = d.id;
      applyNeighborFocus(selectedNodeId);
      renderNodePanel(d, event);
    });

  const label = node.append('text')
    .attr('class', 'node-label')
    .style('font-size', d => `${d.labelFontSize || 9.5}px`);

  label.each(function(d) {
    const text = d3.select(this);
    text.selectAll('tspan')
      .data(d.labelLines)
      .join('tspan')
      .attr('x', 0)
      .attr('dy', (_, index) => index === 0 ? 0 : '1.05em')
      .text(line => line);
  });

  let selectedNodeId = null;

  function applyNeighborFocus(nodeId) {
    const neighbors = new Set([nodeId]);
    data.links.forEach(l => {
      const s = l.source.id || l.source;
      const t = l.target.id || l.target;
      if (s === nodeId) neighbors.add(t);
      if (t === nodeId) neighbors.add(s);
    });

    node.style('opacity', d => neighbors.has(d.id) ? 1 : 0.22);
    link
      .style('opacity', d => {
        const s = d.source.id || d.source;
        const t = d.target.id || d.target;
        return (s === nodeId || t === nodeId) ? 0.95 : 0.12;
      })
      .style('stroke-width', d => {
        const s = d.source.id || d.source;
        const t = d.target.id || d.target;
        return (s === nodeId || t === nodeId) ? 2.8 : 1.1;
      });
  }

  function clearNeighborFocus() {
    node.style('opacity', 1);
    link.style('opacity', 0.42).style('stroke-width', 1.5);
  }

  function positionLabels() {
    const centerX = window.innerWidth / 2;

    label.each(function(d) {
      const text = d3.select(this);
      const lineCount = d.labelLines.length;
      const verticalCenterOffset = ((lineCount - 1) * 8) / 2;
      const radialOffset = (d.radius || 12) + 14;

      let x = 0;
      let y = radialOffset;
      let anchor = 'middle';

      if (d.x < centerX - 90) {
        x = radialOffset;
        y = 4 - verticalCenterOffset;
        anchor = 'start';
      } else if (d.x > centerX + 90) {
        x = -radialOffset;
        y = 4 - verticalCenterOffset;
        anchor = 'end';
      }

      text
        .attr('transform', `translate(${x},${y})`)
        .attr('text-anchor', anchor);
    });
  }

  function updateGraphPositions() {
    link
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y);

    node.attr('transform', d => `translate(${d.x},${d.y})`);
    positionLabels();
  }

  updateGraphPositions();
  simulation.on('tick', updateGraphPositions);

  setStatus('');
}

document.getElementById('prevSlide').addEventListener('click', () => {
  const next = (currentSlide - 1 + enabledSlides.length) % enabledSlides.length;
  renderSlide(next);
});

document.getElementById('nextSlide').addEventListener('click', () => {
  const next = (currentSlide + 1) % enabledSlides.length;
  renderSlide(next);
});

window.addEventListener('keydown', (event) => {
  if (enabledSlides.length <= 1) {
    if (event.key === 'Escape') {
      document.getElementById('detailPanel').classList.add('panel-hidden');
    }
    return;
  }

  if (event.key === 'ArrowLeft') {
    renderSlide((currentSlide - 1 + enabledSlides.length) % enabledSlides.length);
  }

  if (event.key === 'ArrowRight') {
    renderSlide((currentSlide + 1) % enabledSlides.length);
  }

  if (event.key === 'Escape') {
    document.getElementById('detailPanel').classList.add('panel-hidden');
  }
});

window.addEventListener('mousemove', (e) => {
  pointer = { x: e.pageX, y: e.pageY };
  const panel = document.getElementById('detailPanel');
  if (!panel.classList.contains('panel-hidden')) {
    placePanelNearPointer();
  }
});

window.addEventListener('resize', () => {
  svg.attr('width', window.innerWidth).attr('height', window.innerHeight);
  const panel = document.getElementById('detailPanel');
  if (!panel.classList.contains('panel-hidden')) placePanelNearPointer();
  renderSlide(currentSlide);
});

renderSlide(0);
