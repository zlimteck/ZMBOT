const mongoose = require("mongoose");

/* Creating a schema for the guilds. */
const guildSchema = mongoose.Schema({
    id: String,
    prefix: {"type": String, "default": ".bot"},
    logChannel: {"type": String, "default": "985225557912469524"}
});

module.exports = mongoose.model("Guild", guildSchema);