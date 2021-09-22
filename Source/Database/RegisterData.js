const mongoose = require("mongoose")

const RegisterData = new mongoose.Schema({
    Kisi: String,
    Man: Number,
    Woman: Number,
    Total: Number,
    AdminID: String
})

module.exports = mongoose.model("RegisterData", RegisterData)