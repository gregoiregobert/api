FROM node:latest AS development

WORKDIR /chat/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

################
## PRODUCTION ##
################
FROM node:latest AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /chat/src/app

COPY --from=development /thomas/src/app/ .

EXPOSE 3000

CMD [ "node", "dist/main"]


#npm i --save @nestjs/config
#npm i --save @nestjs/typeorm typeorm pg
#npm i nestjs-typeorm-paginate --save
#npm i --save bcrypt
#npm i class-validator --save
#npm i --save class-transformer
#npm i --save @nestjs/passport passport passport-local
#npm i --save @nestjs/jwt passport-jwt
