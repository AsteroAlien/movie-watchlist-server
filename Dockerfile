
FROM node:24.12-alpine

# Goes to the app directory
WORKDIR /app

# Update Alpine packages to pull security fixes
RUN apk update && apk upgrade

# Install latest npm and pnpm globally
RUN npm install -g npm@latest pnpm@latest

# Copy package.json and pnpm-lock.yaml for reproducible installs
COPY package.json ./
COPY pnpm-lock.yaml ./

# Installs the dependencies
RUN pnpm install --frozen-lockfile

# Copy Prisma schema before generating client
COPY prisma ./prisma

# Generate Prisma client
RUN pnpm prisma generate

# Copy the rest of the application code into the container
COPY . .

# Sets the environment variable for the port that the application will run on
ENV PORT=5003

# Expose the port that the application will run on
EXPOSE 5003

# Runs the application
CMD ["pnpm", "start"]