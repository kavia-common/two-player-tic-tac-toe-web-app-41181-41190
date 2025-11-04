# Lightweight React Template for KAVIA

This project provides a minimal React template with a clean, modern UI and minimal dependencies.

## Features

- Lightweight: No heavy UI frameworks - uses only vanilla CSS and React
- Modern UI: Clean, responsive design with KAVIA brand styling
- Fast: Minimal dependencies for quick loading times
- Simple: Easy to understand and modify
- Optional OpenAI Chatbot widget (disabled by default; opt-in via env vars)

## Getting Started

In the project directory, you can run:

### `npm start`

Runs the app in development mode.
Open http://localhost:3000 to view it in your browser.

By default, npm start uses CI-friendly settings to reduce memory usage and avoid exit code 137 in containers.

### CI-friendly usage and stability notes

To prevent CI from killing the dev server with exit code 137 (OOM/timeout), prefer the CI variants below.

- Development server: `npm run start:ci` or `npm run start:ci:quiet`
  - Binds to HOST=0.0.0.0, uses REACT_APP_PORT (default 3000), disables auto-open (BROWSER=none).
  - Forces CI=true to reduce watcher workload and keep logs concise.
  - Disables polling watchers (CHOKIDAR_USEPOLLING=false, WATCHPACK_POLLING=false) to reduce CPU/memory in containers.
  - Adds FAST_REFRESH=false in the quiet variant to reduce hot-reload CPU spikes.
  - Uses react-scripts dev server which prints "Compiled successfully" on readiness.
- Production build: `npm run build:ci`
  - Suppresses outdated Browserslist DB warnings in CI via BROWSERSLIST_IGNORE_OLD_DATA.
  - Disables source maps by default (GENERATE_SOURCEMAP=false) to reduce memory usage.

These variants help avoid resource-related terminations (exit code 137) by reducing overhead and preventing manual kills. If port 3000 is occupied in CI, set `REACT_APP_PORT` to a free port.

Health check:
- A static health endpoint is served at `/healthz` (served from `public/healthz`). After starting, verify readiness with `npm run healthcheck` (expects HTTP 200 on /healthz). The healthcheck targets 127.0.0.1 by default.

Browserslist:
- To update the Browserslist DB locally, run: `npx update-browserslist-db@latest`

Deprecation warnings:
- Webpack dev server middleware warnings about `onBeforeSetupMiddleware`/`onAfterSetupMiddleware` are benign with `react-scripts@5.x` and do not affect functionality. They can be ignored in CI.

Webpack dev server binding note:
- The dev server binds to 0.0.0.0 intentionally for containerized environments. Access via http://localhost:3000 from the host or the provided container URL.

## OpenAI Chatbot (Optional)

A lightweight floating chat widget can be enabled to chat with an OpenAI-compatible model.

Environment variables:
- REACT_APP_ENABLE_CHATBOT=true
- REACT_APP_OPENAI_API_KEY=sk-... (do not commit; set via environment)
- REACT_APP_OPENAI_API_BASE=https://api.openai.com/v1 (or compatible base)
- REACT_APP_OPENAI_MODEL=gpt-4o-mini (or your chosen model)

Notes:
- If REACT_APP_ENABLE_CHATBOT is not "true", the widget will not render.
- Missing API key disables sending and will show a hint in the input placeholder.

## Customization

See `src/styles.css` for the retro light theme styling used by the game. The chat widget styling is included at the bottom of this file and follows the same theme.

## Learn More

To learn React, check out the React documentation: https://reactjs.org/
