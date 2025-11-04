Health check
- The dev server serves a static file at /healthz returning HTTP 200 with body "OK".
- You can validate readiness using: npm run healthcheck
- The script respects REACT_APP_PORT and REACT_APP_HEALTHCHECK_PATH.
