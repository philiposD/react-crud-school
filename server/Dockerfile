FROM node:12

WORKDIR /src

COPY package*.json ./

#shell form -- starts a shell
RUN npm install

COPY . .

ENV PORT=3001

EXPOSE 3001

#exec form
CMD [ "npm", "start" ]
