const express = require("express");
const router = express.Router();
const mainController = require("../controller/main_controller");
const searchController = require("../controller/search_controller");

router.get("/", mainController.getAllMachines);
router.post("/add", mainController.addMachine);
router.delete("/:name", mainController.deleteMachine);
router.get("/search", searchController.searchMachine);
module.exports = router;