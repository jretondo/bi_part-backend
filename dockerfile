FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN apk update && apk add --no-cache \
    nss \
    python3 \
    chromium \
    chromium-chromedriver \
    fontconfig \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    git \
    tzdata \
    wget

RUN npm install -g typescript pm2
RUN npm install

COPY . .

RUN npm run build

COPY . .

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser \
    TZ=America/Argentina/Buenos_Aires

CMD ["pm2-runtime", "start", "dist/api/ecosystem.config.js"]
