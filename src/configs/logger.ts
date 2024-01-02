import type { Express } from "express";
import winston, { format } from "winston";
import type { LoggerOptions } from "winston";
import expressWinston from "express-winston";
import * as fs from "fs";
import AppParam from "@constants/appParam";
import "winston-daily-rotate-file";

const logFolder = AppParam.VITE_LOGS_FOLDER;

const ConfigLogger = (app: Express) => {
  if (!fs.existsSync(logFolder)) {
    fs.mkdirSync(logFolder, { recursive: true });
  }

  app.use(
    expressWinston.logger({
      transports: [
        new winston.transports.DailyRotateFile({
          filename: `${logFolder}/%DATE%.log`,
          datePattern: "DD-MM-YYYY",
          zippedArchive: true,
          maxSize: "20m",
          maxFiles: "14d",
        }),
      ],
      format: format.combine(
        format.timestamp({
          format: "DD-MM-YYYY HH:mm:ss",
        }),
        format.printf(
          (info) =>
            `${info.timestamp} ${info.level}: ${info.message}` + (info.splat !== undefined ? `${info.splat}` : " "),
        ),
      ),
      meta: true, // optional: control whether you want to log the meta data about the request (default to true)
      msg: `HTTP {{req.ip}} {{req.method}} {{req.url}}`, // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
      ignoreRoute: function (req, res) {
        if (["/", AppParam.VITE_PATH_PROMETHEUS_METRICS, "/health-check", "/favicon.ico"].includes(req.url)) {
          return true;
        }
        return false;
      },
    }),
  );

  const options: LoggerOptions = {
    transports: [
      new winston.transports.DailyRotateFile({
        filename: `${logFolder}/%DATE%.log`,
        datePattern: "DD-MM-YYYY",
        zippedArchive: true,
        maxSize: "20m",
        maxFiles: "14d",
      }),
    ],
    format: format.combine(
      format.timestamp({
        format: "DD-MM-YYYY HH:mm:ss",
      }),
      format.printf((info) => {
        return `${info.timestamp} ${info.level}: ${info.message}` + (info.splat !== undefined ? `${info.splat}` : " ");
      }),
    ),
  };
  const logger = winston.createLogger(options);
  console.info = logger.info.bind(logger);
  console.error = logger.error.bind(logger);
  console.warn = logger.warn.bind(logger);
  // console.info = function (...params) {
  //   logger.info("", params);
  // };
};

export default ConfigLogger;
