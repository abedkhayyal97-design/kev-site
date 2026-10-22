#!/usr/bin/env bash
# Deploy the current staging branch HEAD to abedkhayyal97-design/kev-site-staging (GitHub Pages).
# Staging-only step: injects <meta name="robots" content="noindex, nofollow"> into every HTML page
# and writes robots.txt "Disallow: /". The source tree (and production) is never modified.
set -euo pipefail
SRC="$(cd "$(dirname "$0")" && pwd)"; OUT="$(mktemp -d)"
REMOTE="${STAGING_REMOTE:-https://github.com/abedkhayyal97-design/kev-site-staging.git}"
git clone -q --depth 1 -b main "$REMOTE" "$OUT"
cd "$OUT" && git rm -rq --ignore-unmatch . && git clean -fdxq
git -C "$SRC" archive HEAD | tar -x -C "$OUT"
for f in $(find . -name '*.html'); do
  grep -q 'name="robots"' "$f" || sed -i 's#<meta charset="utf-8">#<meta charset="utf-8"><meta name="robots" content="noindex, nofollow">#' "$f"
done
printf 'User-agent: *\nDisallow: /\n' > robots.txt
git add -A
git -c user.name="KEV deploy" -c user.email="deploy@kev.local" commit -qm "Deploy staging $(git -C "$SRC" rev-parse --short HEAD) (noindex + robots Disallow)"
git push -q origin main
git rev-parse --short HEAD
