# Steg 1: Bygg appen med en Node.js-bild
FROM node:16 AS build

# Ange arbetskatalog
WORKDIR /app

# Kopiera package.json och package-lock.json
COPY package*.json ./

# Installera beroenden
RUN npm install

# Kopiera alla filer från projektet till container
COPY . .

# Bygg React-applikationen för produktion
RUN npm run build

# Steg 2: Servera den byggda applikationen med en statisk filserver
FROM nginx:alpine

# Kopiera byggfilen från den första bilden till Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Exponera porten som Nginx kör på
EXPOSE 80

# Starta Nginx
CMD ["nginx", "-g", "daemon off;"]
