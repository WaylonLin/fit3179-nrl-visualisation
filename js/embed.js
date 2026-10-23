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
  if (spec.projection && width < 570) spec.height = 310;
  if (spec.data?.url === 'Data/site/states.json' && width < 570) {
    spec.encoding.y.axis.labelExpr = "datum.label === 'New South Wales' ? 'NSW' : datum.label === 'Queensland' ? 'QLD' : datum.label === 'Victoria' ? 'VIC' : datum.label === 'Australian Capital Territory' ? 'ACT' : datum.label === 'Western Australia' ? 'WA' : datum.label === 'Northern Territory' ? 'NT' : datum.label === 'South Australia' ? 'SA' : datum.label === 'Tasmania' ? 'TAS' : 'Other'";
    spec.encoding.x.axis = {tickCount:5};
  }
  if (spec.encoding?.x?.field === 'target' && width < 570) {
    spec.encoding.y.axis.title = null;
    spec.encoding.y.axis.labelLimit = 75;
    spec.layer[1].mark.fontSize = 12;
    spec.layer[2].mark.fontSize = 11;
  }
  if (spec.vconcat && width < 570) spec.vconcat.forEach(panel => panel.layer?.forEach(layer => {
    layer.transform?.forEach(t => { if (t.calculate?.includes("datum.series +")) t.calculate = t.calculate.replace("datum.series +", "(datum.series === 'Canterbury' ? 'CBY' : 'League') +"); });
    if (layer.mark?.type === 'text') layer.mark.fontSize = 10;
  }));
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
    attachReading(item);
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

function attachReading(item) {
  if (item.element.id === 'chart-profiles') {
    const update = () => document.getElementById('profile-reading').textContent = item.view.signal('profileMode') === 'Rank'
      ? 'Rank mode: 1 is strongest. Ranks show ordering, not the size of gaps between clubs.'
      : 'Actual values per match. Each column has its own colour scale, from weakest to strongest observed value; compare numerical gaps within the same measure.';
    item.view.addSignalListener('profileMode', update); update();
  }
  if (item.element.id === 'chart-network') {
    const update = async () => {
      const club = item.view.signal('club'), scope = item.view.signal('scope'), extent = item.view.signal('extent');
      const rows = (await (await fetch('Data/site/connections.json')).json()).filter(r => r.team === club);
      const field = scope === 'All fixtures' ? 'all' : 'home';
      const total = rows.reduce((n,r) => n+r[field],0);
      const usa = rows.filter(r => r.country === 'United States of America').reduce((n,r) => n+r[field],0);
      document.getElementById('network-reading').textContent = `${club}: ${total} ${scope.toLowerCase()}. ` +
        (usa ? `${usa} in Las Vegas${extent === 'Pacific / Las Vegas' ? ', shown in this extent' : ' outside this extent; select Pacific / Las Vegas'}. ` : 'No Las Vegas fixture in this selection. ') +
        (extent.includes('Sydney') ? 'This detail view shows only nearby venues; use Australia / NZ for the broader network.' : 'Australia / NZ and Pacific extents provide complementary views.');
    };
    ['club','scope','extent'].forEach(name => item.view.addSignalListener(name,update)); update();
  }
}
document.getElementById('hosting-mode').addEventListener('change', async event => {
  const item = instances.find(i => i.element.id === 'chart-hosting');
  if (!item || item.rendering) return;
  const file = event.target.value;
  item.template = await (await fetch('visualisations/final/' + file)).json();
  item.width = 0;
  const counts = file.includes('counts');
  item.element.setAttribute('aria-label', counts ? 'Total Australian fixtures hosted by state and territory' : 'Australian fixtures per 100,000 residents by state and territory');
  document.getElementById('hosting-view-title').textContent = counts ? 'Total fixtures hosted · Australia, 2025' : 'Hosting intensity · fixtures per 100,000 residents';
  document.getElementById('hosting-reading').textContent = counts ? 'Count view: NSW hosted 114 fixtures and Queensland 55 — together 84.9% of Australia’s total. Zero bars mean no fixtures.' : 'Rate view: the ACT leads at 2.68 fixtures per 100,000 residents. Grey means no fixtures.';
  document.getElementById('hosting-spec-link').href = 'visualisations/final/' + file;
  await render(item);
});
