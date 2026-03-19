#Use a lighweight Node.js image for runtime
FROM node:20-alpine

#Set the working directory inside the container
WORKDIR /usr/src/app

#Copy package.json and package-lock.json to the working directory
COPY package*.json ./

#Install the application dependencies
RUN npm ci --omit=dev || npm install --omit=dev

#Copy the rest of the application code to the working directory
COPY . .

#enable the production optimization
ENV NODE_ENV=production

#Run the script to start the application
CMD ["npm", "start"]