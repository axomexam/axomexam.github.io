#!/usr/bin/env bash
# safe-push.sh — push to a remote branch only when it cannot drop anyone's work.
#
# Refuses to push unless the remote branch tip is an ancestor of HEAD, i.e.
# the push is a pure fast-forward. If someone pushed in the meantime, the
# script stops and tells you to rebase instead of overwriting.
#
# Usage:
#   tools/safe-push.sh <remote> <branch> [remote-url]
#
# Example:
#   tools/safe-push.sh origin main
#   tools/safe-push.sh origin main "https://<token>@github.com/owner/repo.git"

set -u

REMOTE="${1:-origin}"
BRANCH="${2:-main}"
PUSH_URL="${3:-}"

if [ -n "$PUSH_URL" ]; then
  TARGET="$PUSH_URL"
else
  TARGET="$REMOTE"
fi

echo "safe-push: fetching $REMOTE/$BRANCH ..."
git fetch "$REMOTE" "$BRANCH" --quiet || {
  echo "safe-push: fetch failed — stopping, nothing pushed." >&2
  exit 2
}

REMOTE_SHA="$(git rev-parse "$REMOTE/$BRANCH")"
LOCAL_SHA="$(git rev-parse HEAD)"

echo "safe-push: remote $BRANCH = $REMOTE_SHA"
echo "safe-push: local  HEAD    = $LOCAL_SHA"

if [ "$REMOTE_SHA" = "$LOCAL_SHA" ]; then
  echo "safe-push: already up to date — nothing to push."
  exit 0
fi

# The remote tip must be reachable from HEAD, otherwise the push would
# discard commits that are only on the remote.
if ! git merge-base --is-ancestor "$REMOTE_SHA" HEAD; then
  echo "safe-push: BLOCKED — $REMOTE/$BRANCH has commits that HEAD does not have." >&2
  echo "safe-push: someone else pushed. Rebase first:" >&2
  echo "safe-push:     git rebase $REMOTE/$BRANCH" >&2
  echo "safe-push: nothing was pushed." >&2
  exit 1
fi

echo "safe-push: fast-forward confirmed — pushing $LOCAL_SHA to $BRANCH ..."
git push "$TARGET" "HEAD:$BRANCH"
echo "safe-push: done."
