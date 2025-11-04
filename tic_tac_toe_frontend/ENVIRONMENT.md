This frontend uses the following environment variables (read at build/start time):

Core:
- REACT_APP_PORT: Port to bind the dev server (default 3000)
- REACT_APP_ENABLE_SOURCE_MAPS: When "true", enables source maps in production builds (default false)
- REACT_APP_HEALTHCHECK_PATH: Health path served by CRA static public folder (default /healthz)

Optional integration placeholders:
- REACT_APP_FRONTEND_URL
- REACT_APP_BACKEND_URL
- REACT_APP_API_BASE
- REACT_APP_WS_URL

Feature flags:
- REACT_APP_FEATURE_FLAGS
- REACT_APP_EXPERIMENTS_ENABLED

OpenAI Chatbot (optional; disabled by default):
- REACT_APP_ENABLE_CHATBOT: "true" to enable
- REACT_APP_OPENAI_API_KEY: API key to use in Authorization header
- REACT_APP_OPENAI_API_BASE: API base URL (default https://api.openai.com/v1)
- REACT_APP_OPENAI_MODEL: Model (default gpt-4o-mini)

CI notes:
- Default `npm start` now runs `start:stable` to avoid exit code 137 (OOM/kill) in constrained environments.
- Health check is available at http://127.0.0.1:${REACT_APP_PORT:-3000}${REACT_APP_HEALTHCHECK_PATH:-/healthz} (served from `public/healthz` with body "OK").
- The dev server is configured with CI-friendly flags (CI=true, polling disabled, ESLint plugin disabled, small memory limit) to reduce overhead.
- The dev server binds to HOST=0.0.0.0 intentionally for containers; access via http://localhost:${REACT_APP_PORT:-3000}.
- Node memory is capped with NODE_OPTIONS=--max-old-space-size=256 to prevent OOM kills (exit 137).
- A static health file is served from public/healthz and returns 200 OK.
- Webpack Dev Server deprecation warnings for onAfterSetupMiddleware/onBeforeSetupMiddleware are benign under react-scripts 5.x and can be ignored in CI.
