const search_Service = require("../services/search_service");
exports.searchMachine = async (req, res) => {
  try {
    const { keyword } = req.query; 
    if (!keyword) {
      return res.status(400).json({ message: "Keyword is required" }); 
    }
    const machines = await search_Service.searchMachine(keyword);
    if (machines.length === 0) {
      return res.status(404).json({ message: "No machines found" });
    }
    res.json(machines); 
  } catch (error) {
    res.status(500).json({ error: "搜尋失敗" });
  }
};
