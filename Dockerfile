FROM node:alpine
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

ENV PATH="${PATH}:/sbin"
RUN apk update && apk upgrade && apk add dumb-init && adduser -D nextuser 

USER nextuser
# expose 3000 on container
EXPOSE 3000

# set app host ,port and node env 
ENV HOST=0.0.0.0 PORT=3000

CMD ["dumb-init","npm", "start"]
