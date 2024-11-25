# Base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json, then install dependencies
COPY package*.json ./
RUN npm install

# Copy the entire project (excluding files in .dockerignore)
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build the application
RUN npm run build

# Expose the application port
EXPOSE 3000

# Default command to run both integration tests and the application
CMD ["sh", "-c", "npm test && npm start"]
