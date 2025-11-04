This folder contains static assets served by Create React App.

Health endpoint:
- /healthz -> static file returning 200 OK with body "OK"
- Used by the `npm run healthcheck` script to verify dev server readiness/stability in CI.

Notes:
- The public/index.html is a minimal shell to ensure CRA has a valid template in all environments.
- Binding is done via HOST=0.0.0.0 for container accessibility.
- To reduce memory and avoid exit code 137 (OOM kill), scripts cap Node heap via NODE_OPTIONS=--max-old-space-size=256 and use CI-friendly flags.
