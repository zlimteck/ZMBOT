FROM node:latest

# Create the bot's directory
WORKDIR /bot

COPY package.json ./
RUN npm install

COPY ./ /bot

# Start the bot.
CMD ["node", "index.js"]