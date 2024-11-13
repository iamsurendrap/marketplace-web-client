FROM node:20.11.1-slim as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ARG configuration=production
RUN npm run build -- --configuration=$configuration

FROM nginx:alpine
COPY --from=build /app/dist/marketplace-web-client /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]