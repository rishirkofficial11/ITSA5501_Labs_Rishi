FROM node:20-alpine
#Sets the working directory inside the container.
WORKDIR /app

#Copies only package.json and package-lock.json
COPY package*.json ./
#installs exact versions from package-lock.json or fallback to npm install 
RUN npm ci --omit=dev || npm install --omit=dev

#Copy application source into the image after dependencies are installed
COPY . .
#enable production optimizations
ENV NODE_ENV=production
#Tells docker to start your app with node server.js when the container runs.
CMD ["npm", "start"]