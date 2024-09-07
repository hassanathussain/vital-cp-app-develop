# Development
# ==== CONFIGURE =====
# Fetching the latest node image on apline linux for development
FROM node:18-alpine as base

# Set the working directory to /app inside the container
WORKDIR /app

# Copy app files
COPY . .

# ==== BUILD =====
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm install -g npm@9.1.1
RUN npm ci

# ==== RUN =======
# Expose the port on which the app will be running (80 is the default that `serve` uses)
EXPOSE 80

# AWS ELB DEPLOYMENT
ENV SKIP_PREFLIGHT_CHECK = $SKIP_PREFLIGHT_CHECK

# AUTH 0 TENNANT CONFIGURATIONS
ENV AUTH0_DOMAIN = $AUTH0_DOMAIN
ENV AUTH0_CLIENT_ID = $AUTH0_CLIENT_ID
ENV AUTH0_CALLBACK_URL = $AUTH0_CALLBACK_URL
ENV AUTH0_AUDIENCE = $AUTH0_AUDIENCE
ENV AUTH0_SCOPE = $AUTH0_SCOPE

# Start the app
CMD ["npm", "start"]

# Productioon
# Inheriting build steps from base for prodcution stage
FROM base as prod

# ==== BUILD =====
# Running build command to create minfied static files
RUN npm run build

# Fetching the latest nginx image on apline linux
FROM nginx:1.23.2-alpine

# Copy static build files into nginx from built application
COPY /app/build/ /usr/share/nginx/html

# Copy nginx configuration file provided with base node image
COPY /nginx.conf /etc/nginx/conf.d/default.conf

# CMD ["npm", "run", "build"]

LABEL maintainer="Patrick Morgan <pmorgan@sorenson.com>"
LABEL description="This Dockerfile builds the Customer Portal React Application using Node.js"
