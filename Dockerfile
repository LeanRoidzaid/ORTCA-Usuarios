FROM node:10-alpine

RUN mkdir -p /root/Documentos/WebApp/usuarios/ORTCA-Usuarios

WORKDIR /root/Documentos/WebApp/usuarios/ORTCA-Usuarios/

COPY package*.json ./


COPY . .

RUN npm install



EXPOSE 3001

CMD ["npm", "run", "start"]