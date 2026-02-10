FROM node:20-alpine AS build

WORKDIR /app

COPY sister-wedding-frontend/package.json sister-wedding-frontend/package-lock.json ./
RUN npm ci

COPY sister-wedding-frontend .
RUN npm run build

FROM nginx:alpine

COPY nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html