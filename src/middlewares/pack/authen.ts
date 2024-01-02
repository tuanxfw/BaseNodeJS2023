import licenses from "@constants/license";
import type { Request, Response, NextFunction } from "express";
import Joi from "joi";
import type { CustomHelpers } from "joi";
import _ from "lodash";

const schema = Joi.object({
  "client-id": Joi.string().required(),
  "api-key": Joi.string()
    .required()
    .custom((value, helpers: CustomHelpers) => {
      const license = {
        clientId: helpers.state.ancestors[0]["client-id"],
        apiKey: value,
      };

      if (!_.find(licenses, license)) {
        throw new Error("license is invalid");
      }

      return value;
    }),
}).options({ allowUnknown: true });

const authen = (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.headers);

  if (error) {
    res.status(401).send(error.message);
    return;
  }

  next();
};

export default authen;
