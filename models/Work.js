const mongoose = require("mongoose");
const bcrypt = require("mongoose-bcrypt");

const workSchema = new mongoose.Schema(
    {
        adminId: {
            type: String,
            require: true,
        },
        tag: {
            type: String,
            require: true,
            max: 10,
        },
        title: {
            type: String,
            require: true,
            max: 23,
        },
        thumbnail: {
            type: String,
            default: "",
        },
        descriptionImage: {
            type: String,
            default: "",
        }
    }
)