const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            require: true,
            max: 10,
            unique: true,
        },
        password: {
            type: String,
            require: true,
            min: 6,
            max: 20,
            unique: true
        },
    },
    {timestamps: true}
);

module.exports = mongoose.model("Admin", adminSchema);