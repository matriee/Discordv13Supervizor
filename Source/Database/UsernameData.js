const mongoose = require("mongoose")

const UsernameData = new mongoose.Schema({
    Kisi: String,
    isim: String,
    Tamisim: String,
    AdminID: String
})

module.exports = mongoose.model("UsernameData", UsernameData)