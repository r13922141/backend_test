const mainService = require("../services/main_service");

exports.getAllMachines = async (req, res) => {
  try {
    const machines = await mainService.getAllMachines();
    res.json(machines);
  } catch (error) {
    res.status(500).json({ error: "伺服器錯誤" });
  }
};

exports.addMachine = async (req, res) => {
  try {
    const newMachine = await mainService.addMachine(req.body);
    res.status(201).json(newMachine);
  } catch (error) {
    res.status(500).json({ error: "無法新增" });
  }
};

exports.deleteMachine = async (req, res) => {
  try {
    await mainService.deleteMachine(req.params.name);
    res.json({ message: "刪除成功" });
  } catch (error) {
    res.status(500).json({ error: "刪除失敗" });
  }
};
