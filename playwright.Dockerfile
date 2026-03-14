# https://playwright.dev/docs/docker#image-tags
FROM mcr.microsoft.com/playwright:v1.58.2-noble
WORKDIR /project
COPY package*.json .
# In playwright.config.ts, if we're on the CI, we want 0% pixels diff threshold
# So, when we want to update the snapshot, we need to force the CI env var to be true
# with that, if Playwright detects at least 1 pixel diff, it will update the snapshot.
ENV CI=true
RUN --mount=type=secret,id=npmrc,target=/root/.npmrc npm ci && chown -R pwuser:pwuser /project
USER pwuser
