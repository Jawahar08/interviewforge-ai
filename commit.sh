#!/bin/bash
set -e

export HOME=/tmp

git config user.name "Nithesh kumar S"
git config user.email "nitheshk236@gmail.com"

# Commit 1
git add frontend/index.html frontend/vite.config.js frontend/src/main.jsx frontend/src/assets frontend/public frontend/package.json || true
git commit -m "chore(frontend): initialize React+Vite frontend workspace" || true

# Commit 2
git add frontend/src/index.css || true
git commit -m "feat(frontend): establish premium dark theme and glassmorphism UI" || true

# Commit 3
git add frontend/src/utils/api.js || true
git commit -m "feat(frontend): add Axios API wrapper with ApiResponse interceptor" || true

# Commit 4
git add frontend/src/App.jsx || true
git commit -m "feat(frontend): build Dashboard and mock interview UI" || true

# Commit 5
git add frontend/Dockerfile || true
git commit -m "chore(frontend): add standalone frontend Dockerfile" || true

# Commit 6
git add docker-compose.yml || true
git commit -m "chore(docker): integrate frontend service into docker-compose" || true

# Commit 7
git add Dockerfile || true
git commit -m "chore(docker): update root Dockerfile for multi-stage build" || true

# Commit 8
git add frontend/ || true
git commit -m "chore(frontend): finalize frontend dependencies and linting config" || true

# Push
git push
