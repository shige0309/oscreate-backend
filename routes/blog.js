const router = require("express").Router();
const Blog = require("../models/Blog")

router.post('/register', async (req,res) => {
    const newBlog = new Blog(req.body);
    try {
        const blog = await newBlog.save();
        return res.status(200).json(blog);
    } catch (error) {
        return res.status(500).json(error);
    }
})

module.exports = router;