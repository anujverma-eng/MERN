import { User } from "../models/user.js";
import ErrorHandler from "../utils/utility-class.js";
import { TryCatch } from "./error.js";

export const adminOnly = TryCatch(async (req, res, next) => {
  const { id } = req.query;

  if (!id) {
    return next(new ErrorHandler("Admin Id is required to access this.", 401));
  }

  const user = await User.findById(id);

  if (!user) {
    return next(new ErrorHandler("User does not exists !!", 400));
  }

  if (user.role !== "admin") {
    return next(
      new ErrorHandler("you are not allowed to access this resource", 401)
    );
  }

  next();
});
