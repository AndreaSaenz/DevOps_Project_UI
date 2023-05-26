FROM node:18.16.0 as build

WORKDIR /DevOps_Project_UI/app

COPY package*.json ./

RUN npm install

COPY /DevOps_Project_UI .

RUN npm run build --prod

FROM nginx:1.18.0

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist/* /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]