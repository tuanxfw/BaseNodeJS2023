import express from "express";
import ConfigDefault from "@configs/default";
import ConfigLogger from "@configs/logger";
import ConfigPrometheus from "@configs/prometheus";
import ReportController from "@controllers/reportController";
import AppParam from "@constants/appParam";
import { AuthenMiddleware } from "@middlewares/commonMiddleware";
import ConfigSecurity from "@configs/security";
const app = express();
const port = AppParam.VITE_PORT;

//#region Configs
ConfigDefault(app);
ConfigLogger(app);
ConfigSecurity(app);
ConfigPrometheus(app);
//#endregion

//#region Controllers

app.get("/health-check", (_req, res) => res.send("RUNNING"));

app.use("/report", AuthenMiddleware, ReportController);
//#endregion

if (import.meta.env.PROD) {
  app.listen(port, () => console.log(`Server is listening port ${port}`));
}

export const viteNodeApp = app;