require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const routes = require("./routes"); 
const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json()); 
app.use("/api", routes);
const { morganMiddleware } = require("./config/log"); 
app.use(morganMiddleware); //紀錄任意http請求
const { recreateTable } = require("./config/db");


recreateTable();
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/api/`);
});