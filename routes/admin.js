const router = require("express").Router();
const Admin = require("../models/Admin");

//admin登録
router.post("/register", async (req, res) => {
    try {
        const newAdmin = new Admin({
            username: req.body.username,
            password: req.body.password
        });

        const admin = await newAdmin.save();
        return res.status(200).json(admin);
    } catch (error) {
        return res.status(500).json(error);
    }
});

//ログイン
router.post("/login", async (req, res) => {
    try {

        const admin = await Admin.findOne({ username: req.body.username });

        if(!admin) return res.status(404).send("ユーザーが見つかりません");

        const validPassword = await admin.verifyPassword(req.body.password);

        if(!validPassword) return res.status(400).json("パスワードが違います");

        return res.status(200).json(admin);

    } catch (error) {
        return res.status(500).json(error);
    }
});

//Admin情報の更新
router.put("/:id", async (req, res) => {
    if(req.body.adminId === req.params.id) {
        try {
            // 一つのユーザーを検索し更新する $setにて全てのパラメーター
            await Admin.findByIdAndUpdate(req.params.id, {
                $set: req.body
            });
            res.status(200).json("ユーザー情報が更新されました。");
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        return res.status(403).json("アカウントの情報を更新できません。");
    }
});

//Admin情報の削除
router.delete("/:id", async (req,res) => {
    if(req.body.adminId === req.params.id) {
        try {
            await Admin.findByIdAndDelete(req.params.id);
            res.status(200).json("管理者情報を削除しました");
        } catch (error) {
            res.status(500).json(error);
        }

    } else {
        res.status(403).json("削除できませんでした");
    }
});

//Admin情報の取得
router.get("/:id", async (req,res) => {
    if(req.body.adminId === req.params.id) {
        try {
            await Admin.findById(req.params.id);
            res.status(200).json("管理者情報を削除しました");
        } catch (error) {
            res.status(500).json(error);
        }

    } else {
        res.status(403).json("削除できませんでした");
    }
});

// router.get('/', (req,res) => {
//     res.send('admin router');
// })

module.exports = router;