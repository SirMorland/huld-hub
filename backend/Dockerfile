# fetch strapi image
FROM strapi/strapi

# setup root workdir
WORKDIR /srv/app

# copy package.json to workdir
COPY ./app/package.json ./

# install packages
RUN npm install

# copy other files to workdir
COPY ./app .

# setup environment
ENV NODE_ENV production

# build strapi admin
RUN npm run build

CMD ["yarn", "start"]
