# Imagen base optimizada para producción con Node.js
FROM node:18-alpine as builder

# Setea la zona horaria (opcional, más prolijo si lo seteás en la imagen final)
ENV TZ=America/Argentina/Buenos_Aires

WORKDIR /app

# Copiamos solo lo necesario para instalar dependencias
COPY package*.json ./
COPY tsconfig.json ./

# Instala dependencias del sistema necesarias para la build (no runtime)
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    git

# Instalación de dependencias de Node.js
RUN npm install

# Copiamos el resto del código fuente
COPY . .

# Compilamos el proyecto
RUN npm run build


# ---------------------
# Imagen final
# ---------------------
FROM node:18-alpine

WORKDIR /app

# Instalación de dependencias necesarias en producción
RUN apk update && apk add --no-cache \
    nss \
    chromium \
    chromium-chromedriver \
    fontconfig \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    tzdata

# Seteamos variables de entorno
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser \
    TZ=America/Argentina/Buenos_Aires \
    NODE_ENV=production

# Copiamos solo lo necesario de la imagen builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Instalamos pm2 globalmente
RUN npm install -g pm2

# Exponé el puerto si querés (opcional, pero recomendado)
EXPOSE 3000

# Comando de inicio
CMD ["pm2-runtime", "start", "dist/api/ecosystem.config.js"]
