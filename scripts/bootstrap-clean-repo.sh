#!/usr/bin/env bash
set -euo pipefail

# Bootstrap a CLEAN git repo on a remote dev server from current working tree
# - Copies the current project (excluding junk listed in .rsyncignore)
# - Re-initializes a fresh git repository on the remote with a single initial commit
#
# Requirements:
# - Run from WSL/Linux with rsync + ssh installed
# - Remote host has git installed
#
# Env vars:
#   DEV_HOST   : required, remote hostname or IP
#   DEV_PATH   : required, remote absolute path to project folder
#   DEV_USER   : optional, ssh user (defaults to your current user if omitted)
#   BRANCH_NAME: optional, defaults to 'main'
#   COMMIT_MSG : optional, defaults to "chore(init): import current version"

if [[ -z "${DEV_HOST:-}" || -z "${DEV_PATH:-}" ]]; then
  echo "[bootstrap] Please set DEV_HOST and DEV_PATH environment variables. Optionally DEV_USER, BRANCH_NAME, COMMIT_MSG."
  exit 1
fi

REMOTE="${DEV_HOST}"
if [[ -n "${DEV_USER:-}" ]]; then
  REMOTE="${DEV_USER}@${DEV_HOST}"
fi

BRANCH_NAME="${BRANCH_NAME:-main}"
COMMIT_MSG="${COMMIT_MSG:-chore(init): import current version}"

# 1) Ensure remote path exists
ssh -o StrictHostKeyChecking=accept-new "$REMOTE" "mkdir -p '${DEV_PATH}'"

# 2) Sync repo files to remote (working tree only), excluding junk
rsync -avz --delete \
  --exclude-from=.rsyncignore \
  ./ "$REMOTE":"${DEV_PATH}/"

# 3) Initialize a FRESH git repository on remote and create initial commit
ssh "$REMOTE" bash -lc "\
  set -euo pipefail; \
  cd '${DEV_PATH}'; \
  rm -rf .git; \
  if git init -b '${BRANCH_NAME}' 2>/dev/null; then \
    :; \
  else \
    git init; git checkout -B '${BRANCH_NAME}'; \
  fi; \
  git add .; \
  git commit -m '${COMMIT_MSG}'; \
  echo '[bootstrap] Clean repository initialized on ${DEV_HOST}:${DEV_PATH} (branch ${BRANCH_NAME})'\
"

echo "[bootstrap] Done. You can now add a remote on the server and push if desired."
