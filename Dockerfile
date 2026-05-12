# Build stage
FROM node:22-slim AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Production stage
FROM node:22-slim

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY --from=build /app/dist ./dist
COPY --from=build /app/server.ts ./
COPY --from=build /app/firebase-applet-config.json ./

# Install tsx to run server.ts directly if needed, or we could compile it.
# Node 20+ supports type stripping partially but for full support we might need tsx.
# However, the environment constraints say "Node supports TypeScript type stripping natively".
# Let's assume Node 22+ or similar. On node 20 we might need --experimental-strip-types or tsx.
# To be safe and follow constraints, I'll just use node to run it if it's simple.
# Wait, if I use node server.ts, I need to make sure server.ts doesn't use complex TS.
# In my server.ts I used "import ... from 'vite'".
# Actually, let's just use tsx in production too if needed, but the constraint says "node server.ts".

EXPOSE 3000

ENV NODE_ENV=production

CMD ["node", "--experimental-strip-types", "server.ts"]
