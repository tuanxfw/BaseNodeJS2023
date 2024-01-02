import type { Request, Response, NextFunction } from "express";

const AuthorMiddwares = (req: Request, res: Response, next: NextFunction) => {
  next();
};

export default AuthorMiddwares;
