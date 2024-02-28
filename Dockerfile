FROM playcourt/nodejs:14-alpine

ENV BABEL_DISABLE_CACHE=1

WORKDIR /usr/src/app

# Copy Node Packages Requirement
COPY package*.json ./
USER root
# Install Node Modules Based On Node Packages Requirement
RUN apk add --update --no-cache --virtual .build-dev \
    build-base \
    python3 \
    make \
    g++ \
    && npm i -g node-gyp \
    && npm i \
    && apk del .build-dev

# Copy Node Source Code File
COPY . .

# Build Node Source Code File
RUN npm run build \
    && chown -R user:root . \
    && chmod 775 .nuxt \
    && find .nuxt -type d -exec chmod 775 {} \; \
    && find .nuxt -type f -exec chmod 664 {} \;

# Change Working User to "User"
USER user

# Expose Application Port
EXPOSE 3000

# Run The Application
CMD ["sh", "-c", "npm run start"]
