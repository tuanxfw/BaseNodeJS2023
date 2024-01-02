import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import type { AppParam } from "@prisma/client";
const prisma = new PrismaClient();

const ReportService = {
  htmlToPdf: async (req: Request, res: Response) => {
    const lstTest: AppParam[] = await prisma.appParam.findMany({
      where: {
        content: { not: null },
      },
    });
    res.status(200).json(lstTest);
  },
};

export default ReportService;
