const express = require("express");
const router = express.Router();
const Routes = require("./route");
router.get('/', (req, res) => {
    res.send('TEST');
});
router.use("/machines", Routes);

module.exports = router;