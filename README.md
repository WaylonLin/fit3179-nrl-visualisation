# What the ladder hides: ground, game and outcome

An editorial NRL data story by **Waylon Lin**, for FIT3179 Data Visualisation 2. Eleven Vega/Vega-Lite views, including three map idioms, on one vertically scrolling Pure.css page.

Target repository: https://github.com/WaylonLin/fit3179-nrl-visualisation

Pages URL: https://waylonlin.github.io/fit3179-nrl-visualisation/

## Run locally

From the site root: `python -m http.server 8000 --bind 127.0.0.1`, then open http://127.0.0.1:8000. An internet connection is needed for the pinned CDN libraries. There is no build step, front-end framework or package installation.

## Deploy

The site is served by GitHub Pages from the root of the `main` branch. It is a static site with no build step.

All app/data/specification paths are relative, so the repository subpath works. Preserve the capital `Data` in paths. `.nojekyll` enables direct static publication. The local packaging script includes only site files, compact data, readable specifications and selected documentation; it excludes raw research caches, course PDFs and old prototypes.

## Data and design

2025 men's NRL results and geography; 2023–2025 regular-season comparisons. Sources include Useless NRL Stats/Rugby League Project, ABS, Champion Data, Natural Earth and sourced venue/home-ground lookups. Final data payload is about 1.09 MB before compression, excluding CDN code.

- [Data definitions and provenance](docs/data_notes.md)

Every chart links to its readable JSON specification and compact data. Original source files and preparation scripts remain in the audited local workspace; the browser never requests them. The baseline proof of concept is preserved locally under `prototypes/baseline/`.

## Publication status

I used ChatGPT and Codex ([OpenAI](https://chatgpt.com/)) to help plan my NRL visualisation, analyse the available NRL and ABS datasets, and compare possible narrative structures and visualisation idioms. For example, when I asked AI to gather data, I specified that it needed to support a coherent data story.

I used Codex to generate and revise substantial portions of the website’s HTML, CSS, JavaScript and Vega/Vega-Lite specifications, together with data-preparation scripts. AI assistance also included debugging, checking derived values against source records, and inspecting responsive layouts.
