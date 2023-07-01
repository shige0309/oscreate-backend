const express = require("express");
const app = express();
const adminRoute = require("./routes/admin");
const blogRoute = require("./routes/blog");
const workRoute = require("./routes/work");
const uploadRoute = require("./routes/upload");
const emailRoute = require("./routes/email");
const imageUploadRoute = require("./routes/imageUpload");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const PORT = process.env.PORT || 4000;

//データベース接続
mongoose.connect(process.env.DATABASEURL)
.then(() => {
    console.log("DBと接続中...");
}).catch((err) => {
    console.log(err);
}) 

//ミドルウェア
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(cors({ origin: true, credentials: false }));
app.use(express.json());
app.use("/api/admin", adminRoute);
app.use("/api/blog", blogRoute);
app.use("/api/work", workRoute);
app.use("/api/upload", uploadRoute);
app.use("/api/email", emailRoute);
app.use("/api/imageUpload", imageUploadRoute);

app.listen(PORT, () => console.log("サーバーが起動しました。"));