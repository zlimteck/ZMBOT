const {Client, Collection, Partials} = require("discord.js");
const dotenv = require("dotenv"); dotenv.config();
const mongoose = require("mongoose");
const client = new Client ({intents: 70149, partials: [Partials.Message, Partials.Channel, Partials.User, Partials.Reaction]});
const Logger = require("./utils/Logger");

["commands", "buttons"].forEach(x => client[x] = new Collection());
["CommandUtil", "EventUtil", "ButtonUtil"].forEach(handler => {require(`./utils/handlers/${handler}`)(client)});
require("./utils/Functions")(client);

process.on("exit", code => { Logger.client(`The process is stopped with the code: ${code} !`)});
process.on("uncaughtException", (err, origin) => { Logger.error(`UNCAUGHT_EXCEPTION: ${err}`); console.log(`Origin: ${origin}`)});
process.on("unhandledRejection", (reason, promise) => { Logger.warn(`UNHANDLE_REJECTION: ${reason}\n----\n`); console.log(promise)});
process.on("warning", (...args) => Logger.warn(...args));

mongoose.connect(process.env.DATABASE_URI, {
    autoIndex: false,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4   
}).then(() => {Logger.client("Connected to the database.")})
.catch(err => {Logger.error(err)});

client.login(process.env.DISCORD_TOKEN);