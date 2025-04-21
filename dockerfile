# Usar una imagen base oficial de Node.js
FROM node:18

# Copiar el package.json y el package-lock.json (si existe)
COPY package*.json ./

# Instalar las dependencias necesarias
RUN apt-get update && apt-get install -y \
    build-essential \
    python3 \
    python3-pip \
    chromium \
    chromium-driver \
    fontconfig \
    libnss3 \
    freetype2-demos \
    libfreetype6 \
    libharfbuzz-bin \
    ca-certificates \
    fonts-freefont-ttf \
    git \
    wget \
&& rm -rf /var/lib/apt/lists/*

# Instalar dependencias globales
RUN npm install -g typescript nodemon pm2

# Instalar dependencias de la aplicación
RUN npm install

RUN npm run build

# Establecer Puppeteer para usar Chromium de la instalación del sistema
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

COPY . .


# Comando de inicio
CMD ["pm2-runtime", "start", "dist/api/ecosystem.config.js"]
