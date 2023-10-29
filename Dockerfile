FROM node:alpine AS build
# Install dependencies only when needed
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
WORKDIR /app
# Copy and install the dependencies for the project
COPY package.json ./
## hack until bun works
RUN npm i --force
# Copy all other project files to working directory
COPY . .
# Run the next build process and generate the artifacts
ENV NEXT_PUBLIC_REDIS_ENABLED=false

RUN node --version

RUN npm run build


# we are using multi stage build process to keep the image size as small as possible
FROM node:alpine
# update and install latest dependencies, add dumb-init package
# add a non root user
ENV PATH="${PATH}:/sbin"
RUN apk update && apk upgrade && apk add dumb-init && adduser -D nextuser 

# set work dir as app
WORKDIR /app
# copy the public folder from the project as this is not included in the build process
COPY --from=build --chown=nextuser:nextuser /app/public ./public
# copy the standalone folder inside the .next folder generated from the build process 
COPY --from=build --chown=nextuser:nextuser /app/.next ./
# copy the static folder inside the .next folder generated from the build process 
#COPY --from=build --chown=nextuser:nextuser /app/.next/static ./.next/static
# set non root user
USER nextuser
# expose 3000 on container
EXPOSE 3000

# set app host ,port and node env 
ENV HOST=0.0.0.0 PORT=3000
# start the app with dumb init to spawn the Node.js runtime process
# with signal support
CMD ["dumb-init","npm","run", "start"]
