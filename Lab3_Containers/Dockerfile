#Use a lighweight Node.js image for runtime
FROM node:20-alpine

#Set the working directory inside the container
WORKDIR /usr/src/app

#Copy package.json and package-lock.json to the working directory
COPY package*.json ./

#Install the application dependencies
RUN npm install --omit=dev

#Copy the rest of the application code to the working directory
COPY . .

#Run the script to start the application
CMD ["npm", "start"]
