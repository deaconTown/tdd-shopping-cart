# Use the official Node.js image as the base image
FROM node:16-alpine

# 1. Install dependencies only when needed
WORKDIR /app
EXPOSE 3000

ENV PORT 3000
ENV NODE_ENV=production
# Install dependencies based using the package manager
COPY package.json ./
RUN npm install express
RUN npm install

# 2. Copy over all the other files
COPY . .

RUN npm run build

CMD ["npm", "start"]
