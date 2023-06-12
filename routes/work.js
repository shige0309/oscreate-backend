const router = require("express").Router();

router.get('/', (req,res) => {
    res.send('work router');
})

module.exports = router;