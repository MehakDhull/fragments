# Stage 1: Build
FROM node:alpine
WORKDIR /app
COPY ./package.json /app
RUN npm install 
COPY ./app /app

CMD [ "npm",  "start" ]
# # Stage 2: Serve with nginx
# RUN npm run build
# RUN npm install -g serve
# EXPOSE 3000
# COPY --from=build /app /usr/share/nginx/html
# CMD [ "serve", "-s", "build", "-l", "3000" ]
