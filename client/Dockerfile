FROM node:16

WORKDIR /src

COPY package*.json ./

#shell form -- starts a shell
RUN npm install

COPY . .

ENV PORT=3000

EXPOSE 3000

#exec form
CMD [ "npm", "start" ]
