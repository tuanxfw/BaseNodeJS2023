import AppParam from "@constants/appParam";
import type { Express } from "express";
import Prom from "express-prometheus-middleware";

const Prometheus = (app: Express) => {
  app.use(
    Prom({
      metricsPath: AppParam.VITE_PATH_PROMETHEUS_METRICS,
      collectDefaultMetrics: true,
    }),
  );
};

export default Prometheus;
