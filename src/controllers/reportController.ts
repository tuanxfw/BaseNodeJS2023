import ReportService from "@/services/reportService";
import express from "express";
import type { Request, Response, NextFunction } from "express";
import Joi from "joi";

const ReportController = express.Router();

const schemaHtmlToPdf = Joi.object({
  size: Joi.string().required(),
  filename: Joi.string().required(),
  typeInput: Joi.string().required(),
}).options({ allowUnknown: true });
ReportController.post(
  "/html-to-pdf",
  (req: Request, res: Response, next: NextFunction) => {
    const { error } = schemaHtmlToPdf.validate(req.query);

    if (error) {
      res.status(403).send(error.message);
      return;
    }

    next();
  },
  ReportService.htmlToPdf,
);

export default ReportController;
