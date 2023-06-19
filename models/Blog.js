const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            require: true,
            max: 23,
        },
        Thumbnail: {
            type: String,
            default: "",
        },
        descriptionImage: {
            type: String,
            default: "",
        },
        content: {
            type: String,
            default: "",
        }
    },{timestamps: true}
);

module.exports = mongoose.model("Blog", blogSchema);