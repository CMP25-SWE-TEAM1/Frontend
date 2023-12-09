FROM node:15 as base


FROM base as development

WORKDIR /react-app

COPY package.json .

COPY . .

EXPOSE ${3000}

RUN npm install

CMD [ "npm","start" ]
