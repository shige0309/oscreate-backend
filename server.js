const express = require("express");
const app = express();
require("dotenv").config();
const adminRoute = require("./routes/admin");
const blogRoute = require("./routes/blog");
const workRoute = require("./routes/work");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 4000;
const cors = require("cors");

//データベース接続
mongoose.connect(process.env.DATABASEURL)
.then(() => {
    console.log("DBと接続中...");
}).catch((err) => {
    console.log(err);
}) 

//ミドルウェア
app.use(express.json());
app.use(cors());
app.use("/api/admin", adminRoute);
app.use("/api/blog", blogRoute);
app.use("/api/work", workRoute);

app.get("/", (req, res) => {
    res.send("hello express");
});

app.listen(PORT, () => console.log("サーバーが起動しました。"));