const mongoose = require("mongoose")

const CezaData = new mongoose.Schema({
    Kisi: String,
    Sebep: String,
    Ban: Number,
    Jail: Number,
    Mute: Number,
    Puan: Number
})

module.exports = mongoose.model("CezaData", CezaData)