const express = require("express");
const app = express();
const adminRoute = require("./routes/admin");
const blogRoute = require("./routes/blog");
const workRoute = require("./routes/work");
const PORT = 4000;
const mongoose = require("mongoose");
require("dotenv").config();

//データベース接続
mongoose.connect(process.env.DATABASEURL)
.then(() => {
    console.log("DBと接続中...");
}).catch((err) => {
    console.log(err);
}) 

//ミドルウェア
app.use(express.json());
app.use("/api/admin", adminRoute);
app.use("/api/blog", blogRoute);
app.use("/api/work", workRoute);

app.get("/", (req, res) => {
    res.send("hello express");
});

app.listen(PORT, () => console.log("サーバーが起動しました。"));