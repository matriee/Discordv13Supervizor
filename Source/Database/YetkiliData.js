const mongoose = require("mongoose")

const YetkiliData = new mongoose.Schema({
    Yetkili: String,
    Ban: Number,
    Jail: Number,
    Mute: Number,
    Reg: Number,
    Puan: Number
})

module.exports = mongoose.model("YetkiliData", YetkiliData)