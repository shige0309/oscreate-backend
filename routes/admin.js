const router = require("express").Router();

router.get('/', (req,res) => {
    res.send('admin router');
})

module.exports = router;