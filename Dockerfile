FROM node:latest
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN npm install
COPY . /usr/src/app
CMD ["npm","run","dev"]

# ==========================================
# =============== Docker Cli ===============
# ==========================================
# docker build . -t <your username>/node-web-app
# . could be at the end
# port mapping
# docker run -p 5000:8080 <your username>/node-web-app
# local machine 5000 ports where its works, and container port is 8080 

# docker run <image name>
# docker exec -it <image id> <command for this image>
# docker run -it <image name> sh // open cmd for this image

# ==========================================
# ================ WorkFlow ================
# ==========================================
# 1. From node itself is an image, we will build and run our docker based on this image.
# 2. Every docker image run on docker container. 
# 3. Docker execute this file from top to bottom. docker cache execution command for future use. 
#    It will update anythin if command sereal or inside command data is change.
#    if any command change, other command bellow this command will execute again. 
#    so its better to place frequently change command bellow less change command.
# 4. We create new dir /usr/src/app to separate our code from other container file.
#    if we not use this, then all code will be at root of the file with all other 
#    container and image file. which is not good convention.
# 5. Here we first copy only package.json because we need this file to install our dependency.
# 6. If we copy our code before npm install command, everytime change occure in code, 
#    npm install command will execute. so we put this command bellow npm install command.
# 7. Here we build our docker first. Then we will run our docker with port forwarding/mapping. 
# 8. In port mapping, (8080:4000) first port is server port where it will shown and last port is 
#    container port where from its comming. Remember in index.js/ts file, we start out node js
#    express server in a spacific port(4000), this port is now docker container port. 
# 9. .dockerignore will not copy in our wording directory.    