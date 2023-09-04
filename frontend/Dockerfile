# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=20.5.0
FROM node:${NODE_VERSION}-slim as base

LABEL fly_launch_runtime="NodeJS"

# NodeJS app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV=production

RUN --mount=type=secret,id=VITE_BACKEND_HOSTNAME \
    echo VITE_BACKEND_HOSTNAME="$(cat /run/secrets/VITE_BACKEND_HOSTNAME)" >> .env

# Throw-away build stage to reduce size of final image
FROM base as build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install -y python-is-python3 pkg-config build-essential 

# Install node modules
COPY --link package.json package-lock.json .
RUN npm install --production=false

# Copy application code
COPY --link . .

# Build application
RUN npm run build

# Remove development dependencies
RUN npm prune --production

# Final stage for app image
FROM pierrezemb/gostatic

# Copy built application
COPY --from=build /app/dist /srv/http/

CMD ["-port","8080", "-fallback", "/index.html"]