FROM node:20-alpine

WORKDIR /app

# Install dependencies first
COPY package*.json ./
RUN npm ci --only=production

# Copy app source
COPY . .

# Expose port
ENV PORT=5000
EXPOSE 5000

# Start the server
CMD ["node", "server.js"]

