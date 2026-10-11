/* Share compact data across charts, and preserve filters when resizing. */
const loader = vega.loader();
const originalLoad = loader.load.bind(loader);
const cache = new Map();
loader.load = (url, options) => {
  if (!cache.has(url)) cache.set(url, originalLoad(url, options));
  return cache.get(url);
};
const instances = [];
function sizeSpec(spec, width) {
  spec.width = width;
  if (spec.vconcat) {
    delete spec.width;
    delete spec.height;
    spec.vconcat.forEach(panel => { panel.width = Math.max(160, width - 60); });
  }
  if (width < 570 && spec.config) {
    spec.config.axis.labelFontSize = 10;
    spec.config.axis.titleFontSize = 10;
    spec.config.axis.labelLimit = 90;
    spec.config.legend.labelFontSize = 10;
    spec.config.legend.titleLimit = width - 20;
    if (spec.encoding?.x?.field === 'metric') {
      spec.encoding.x.axis.labelExpr = "datum.label === 'Run metres' ? ['Run','m ↑'] : datum.label === 'Post-contact metres' ? ['Post-','contact','m ↑'] : datum.label === 'Line breaks' ? ['Line','breaks ↑'] : datum.label === 'Breaks conceded' ? ['Opp.','breaks ↓'] : ['Opp.','run m ↓']";
      spec.encoding.x.axis.labelPadding = 32;
      spec.encoding.y.axis.title = null;
      spec.encoding.y.axis.labelLimit = 95;
    }
  }
}
async function render(item) {
  const width = Math.floor(item.element.clientWidth);
  if (width === item.width || item.rendering) return;
  item.rendering = true;
  const spec = structuredClone(item.template);
  if (item.view && spec.params) spec.params.forEach(p => { p.value = item.view.signal(p.name); });
  sizeSpec(spec, width);
  if (item.view) item.view.finalize();
  try {
    const result = await vegaEmbed(item.element, spec, {actions:false, renderer:'svg', loader});
    item.view = result.view;
    item.width = width;
    item.element.dataset.ready = 'true';
  } catch (error) {
    console.error(error);
    const p = document.createElement('p');
    p.className = 'chart-error';
    p.setAttribute('role','alert');
    p.textContent = 'This chart could not load. Check your connection or use the linked data and specification. ' + error.message;
    item.element.replaceChildren(p);
  } finally { item.rendering = false; }
}
Promise.all(Array.from(document.querySelectorAll('[data-spec]')).map(async element => {
  const response = await fetch('visualisations/final/' + element.dataset.spec);
  if (!response.ok) throw new Error('Missing chart: ' + element.dataset.spec);
  const item = {element, template:await response.json(), width:0};
  instances.push(item);
  await render(item);
})).catch(console.error);
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => instances.forEach(render), 200);
});
