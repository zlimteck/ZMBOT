const mongoose = require("mongoose");

const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);

/* Creating a schema for the guilds. */
const memberSchema = mongoose.Schema({
    id: String,
    guildId: String,
    zcoin: {"type": Number, "default": 0},
    daily: {"type": Date, "default": yesterday}
});

module.exports = mongoose.model("Member", memberSchema);