import type { Express } from "express";
import helmet from "helmet";

const ConfigSecurity = (app: Express) => {
  app.use(
    helmet({
      hidePoweredBy: true,
      xXssProtection: true,
    }),
  );
};

export default ConfigSecurity;
