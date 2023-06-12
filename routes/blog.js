const router = require("express").Router();

router.get('/', (req,res) => {
    res.send('blog router');
})

module.exports = router;