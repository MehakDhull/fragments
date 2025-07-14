# Stage 1: Builder
FROM node:22.12.0 AS builder

LABEL maintainer="khmahida <skshah11@myseneca.ca>"
LABEL description="Fragments node.js microservice - Build Stage"

WORKDIR /app

ENV NPM_CONFIG_LOGLEVEL=warn
ENV NPM_CONFIG_COLOR=false

COPY package*.json ./
RUN npm install

COPY ./src ./src
COPY ./tests/.htpasswd ./tests/.htpasswd

# Stage 2: Runtime
FROM node:22.12.0-slim AS runtime

LABEL maintainer="khmahida <skshah11@myseneca.ca>"
LABEL description="Fragments node.js microservice - Runtime Stage"

WORKDIR /app

# Copy only the built app and dependencies from builder
COPY --from=builder /app /app

EXPOSE 8080
ENV PORT=8080
CMD ["npm", "start"]
