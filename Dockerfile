FROM --platform=linux/arm64 node:lts-alpine AS build

WORKDIR /app

COPY package*.json ./

# Öka timeout och byt npm-register för att undvika nätverksproblem
RUN npm config set fetch-retry-mintimeout 20000 && \
    npm config set fetch-retry-maxtimeout 120000 && \
    npm config set registry https://registry.npmmirror.com && \
    npm install --legacy-peer-deps

COPY . .

RUN npm run build

FROM nginx:latest AS prod

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80/tcp

CMD ["nginx", "-g", "daemon off;"]
