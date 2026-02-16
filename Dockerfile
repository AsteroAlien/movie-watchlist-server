
FROM node:24.12-alpine

# Goes to the app directory
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package.json and pnpm-lock.yaml for reproducible installs
COPY package.json ./
COPY pnpm-lock.yaml ./

# Installs the dependencies
RUN pnpm install

# Copy the rest of the application code into the container
COPY . .

# Sets the environment variable for the port that the application will run on
ENV PORT=3000

# Expose the port that the application will run on
EXPOSE 3000

# Runs the application
CMD ["pnpm", "start"]