# What the ladder hides: ground, game and outcome

An editorial NRL data story by **Waylon Lin**, for FIT3179 Data Visualisation 2. Eleven Vega/Vega-Lite views, including three map idioms, on one vertically scrolling Pure.css page.

Target repository: https://github.com/WaylonLin/fit3179-nrl-visualisation

Expected Pages URL after activation: https://waylonlin.github.io/fit3179-nrl-visualisation/

## Run locally

From the site root: `python -m http.server 8000 --bind 127.0.0.1`, then open http://127.0.0.1:8000. An internet connection is needed for the pinned CDN libraries. There is no build step, front-end framework or package installation.

## Deploy

The tested deployment files are in the local `release/fit3179-nrl-visualisation/` folder and ZIP. Upload the folder’s contents, not the ZIP or enclosing folder, at the root of `main`. The site has been committed and pushed to `main`. GitHub Pages activation remains the next step. In GitHub Settings → Pages, choose **Deploy from a branch**, **main**, **/(root)**. The user will activate Pages. Do not claim the public site is verified before it is live.

All app/data/specification paths are relative, so the repository subpath works. Preserve the capital `Data` in paths. `.nojekyll` enables direct static publication. The local packaging script includes only site files, compact data, readable specifications and selected documentation; it excludes raw research caches, course PDFs and old prototypes.

## Data and design

2025 men's NRL results and geography; 2023–2025 regular-season comparisons. Sources include Useless NRL Stats/Rugby League Project, ABS, Champion Data, Natural Earth and sourced venue/home-ground lookups. Final data payload is about 1.09 MB before compression, excluding CDN code.

- [Current implementation and decisions](docs/final_implementation.md)
- [Data definitions and provenance](docs/data_notes.md)
- [Prioritised plan](docs/plan.md)
- [Automated final checks](docs/final_site_checks.json)

Every chart links to its readable JSON specification and compact data. Original source files and preparation scripts remain in the audited local workspace; the browser never requests them. The baseline proof of concept is preserved locally under `prototypes/baseline/`.

## Publication status

AI assistance: ChatGPT was used for editorial writing and website creation. 
