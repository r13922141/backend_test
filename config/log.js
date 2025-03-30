const winston = require("winston");
const morgan = require("morgan");
const path = require("path");

// 設定日誌儲存位置
const logDir = path.join(__dirname, "../logs");

// 設定 Winston 日誌管理器
const logger = winston.createLogger({
  level: "info", // 記錄的最低日誌級別
  transports: [
    new winston.transports.File({
      filename: path.join(logDir, "app.log"),
      level: "info", // 記錄 info 級別以上的日誌
    }),
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
});

// 使用 Winston 作為 Morgan 的日誌傳送目標
const morganMiddleware = morgan("combined", {
  stream: {
    write: (message) => {
      logger.info(message); // 使用 Winston 記錄 HTTP 請求日誌
    },
  },
});

module.exports = { logger, morganMiddleware };