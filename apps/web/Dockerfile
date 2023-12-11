# Use the official Node.js image as the base image
FROM node:16-alpine AS base

# 1. Install dependencies only when needed
WORKDIR /app
EXPOSE 3000

ENV PORT 3000
ENV NODE_ENV=production
# Install dependencies based using the package manager
COPY package.json ./
# RUN npm install
RUN npm install


# 3. Build the application
FROM node:16-alpine AS build
WORKDIR /app
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package.json ./
# 2. Copy over all the other files
COPY . .
RUN npm run build
# RUN rm -rf node_modules

FROM node:16-alpine as runner
WORKDIR /app

EXPOSE 3000

ENV PORT 3000
ENV NODE_ENV=production

# COPY --from=build /app/package.json ./
# COPY --from=build /app/next.config.js ./
# COPY --from=build /app/.next  ./.next
# COPY --from=build /app/public  ./next/standalone/public
# COPY --from=build /app/node_modules ./node_modules
COPY  --from=build /app/public  ./.next/standalone/public
COPY  --from=build /app/.next/static  ./.next/standalone/static
COPY  --from=build /app/.next/standalone  ./.next/standalone

# .\.next\standalone\apps\web\
# WORKDIR /.next/standalone/apps/web
# 4. Start the application 
CMD ["node", "./.next/standalone/server.js"]
# CMD ["npm", "start"]