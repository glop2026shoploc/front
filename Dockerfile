FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME=0.0.0.0

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY .next ./.next
COPY public ./public

RUN addgroup -S app && adduser -S app -G app && chown -R app:app /app
USER app
EXPOSE 3000
CMD ["npx", "next", "start"]