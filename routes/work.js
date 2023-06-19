const router = require("express").Router();
const Work = require("../models/Work");

router.post('/register', async (req,res) => {
    const newWork = new Work(req.body);
    try {
        const work = await newWork.save();
        return res.status(200).json(work);
    } catch (error) {
        return res.status(500).json(error);
    }
});

router.get("/get", async (req, res) => {
    try {
        const works = await Work.find();
        return res.status(200).json(works);
    } catch (error) {
        console.log(error);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const response = await Work.findById(req.params.id);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(error);
    }
});

module.exports = router;