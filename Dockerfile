FROM node:18 AS builder
WORKDIR /app


ARG API_URL
ARG APP_VERSION
ARG BUILD_MODE=production

ENV VITE_API_URL=${API_URL}

COPY . .

RUN npm install
RUN npx vite build --mode $BUILD_MODE

FROM nginx:1.16.0-alpine

COPY --from=builder /app/dist /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY ./.nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]