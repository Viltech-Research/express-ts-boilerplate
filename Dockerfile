FROM node

# Create app directory
WORKDIR /opt/app

# Install app dependencies
COPY package.json /opt/app
RUN npm install

# Bundle app source
COPY . /opt/app

# Set environment variables
ENV PORT=3000

# Expose port
EXPOSE 3000

# Run app
CMD ["npm", "start"]