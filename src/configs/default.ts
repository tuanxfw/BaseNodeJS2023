import AppParam from "@constants/appParam";
import express from "express";
import type { Express } from "express";
import * as fs from "fs";

const publicFolder: string = AppParam.VITE_PUBLIC_FOLDER;
const limit: string = AppParam.VITE_LIMIT_REQUEST;

const ConfigDefault = (app: Express) => {
  //config public folder
  if (!fs.existsSync(publicFolder)) {
    fs.mkdirSync(publicFolder, { recursive: true });
  }

  app.use(express.static(publicFolder));

  //middleware
  app.use(
    express.urlencoded({
      extended: true,
      limit: limit,
    }),
  );
  app.use(express.json({ limit: limit }));
};

export default ConfigDefault;
