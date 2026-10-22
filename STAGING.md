# Staging deploy

The `staging` branch is published to https://abedkhayyal97-design.github.io/kev-site-staging/ with `./deploy_staging.sh`.

The script exports an exact copy of `git archive HEAD`, then, **only in the deployed copy**:
- adds `<meta name="robots" content="noindex, nofollow">` to every HTML page;
- writes `robots.txt` with `User-agent: *` / `Disallow: /`.

The source tree has no noindex and no blocking robots.txt, so it is safe to merge to production.
Demo testimonials/clients live in `data/demo_content.json` and must be replaced before launch.
