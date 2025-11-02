#!/usr/bin/env bash
set -euo pipefail

# Usage:
#   DEV_HOST=your.dev.host \
#   DEV_PATH=/home/youruser/projects/website-portfolio \
#   DEV_USER=youruser \
#   ./scripts/sync-to-dev.sh
#
# Notes:
# - Requires rsync and SSH access from this machine to $DEV_HOST.
# - Excludes temp/build/VC files via .rsyncignore.

if [[ -z "${DEV_HOST:-}" || -z "${DEV_PATH:-}" ]]; then
  echo "[sync] Please set DEV_HOST and DEV_PATH environment variables. Optionally DEV_USER."
  exit 1
fi

REMOTE="${DEV_HOST}"
if [[ -n "${DEV_USER:-}" ]]; then
  REMOTE="${DEV_USER}@${DEV_HOST}"
fi

# Ensure remote path exists
ssh -o StrictHostKeyChecking=accept-new "$REMOTE" "mkdir -p '${DEV_PATH}'"

# Sync repo files to remote, pruning removed files
rsync -avz --delete \
  --exclude-from=.rsyncignore \
  ./ "$REMOTE":"${DEV_PATH}/"

echo "[sync] Done. Remote path: $REMOTE:$DEV_PATH"
