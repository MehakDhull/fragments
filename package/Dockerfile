# Dockerfile for fragments microservice

# Use a specific Node.js version that matches local dev
FROM node:18.13.0

# Metadata
LABEL maintainer="Your Name <your.email@example.com>"
LABEL description="Fragments node.js microservice"

# Set environment variables
ENV PORT=8080
ENV NPM_CONFIG_LOGLEVEL=warn
ENV NPM_CONFIG_COLOR=false

# Create and switch to app directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy application source code
COPY ./src ./src

# Copy .htpasswd if using basic auth
COPY ./tests/.htpasswd ./tests/.htpasswd

# Expose port and start the service
EXPOSE 8080
CMD npm start
