#Build Stage Start

#Specify a base image
FROM node:14-alpine as builder 

#Specify a working directory
WORKDIR /app

#Copy the dependencies file
COPY package.json .
COPY yarn.lock .

#Install dependencies
RUN yarn install --frozen-lockfile

#Copy remaining files
COPY . .

#Build the project for production
RUN yarn run build 


# Stage 2: deploy app with Nginx
FROM nginx:latest

COPY --from=builder /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]