import { Response, Request, NextFunction } from "express";
import { TryCatch } from "../middlewares/error.js";
import { User } from "../models/user.js";
import ErrorHandler from "../utils/utility-class.js";

export const newUser = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { _id, name, email, photo, gender, dob } = req.body;

    let user = await User.findById(_id);

    if (user) {
      return res.status(200).json({
        success: true,
        message: `Welcome, ${user._id} || ${user.name} || ${user.email}`,
      });
    }

    if (!_id || !name || !email || !photo || !gender || !dob) {
      return next(new ErrorHandler("Some Fields are missing", 400));
    }

    user = await User.create({
      _id,
      name,
      email,
      photo,
      gender,
      dob: new Date(dob),
    });

    return res.status(201).json({
      success: true,
      message: `Welcome, ${user._id} || ${user.name} || ${user.email}`,
    });
  }
);

export const getAllUsers = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await User.find({});

    return res.status(200).json({
      success: true,
      message: "users fetched successfully",
      users,
    });
  }
);

export const getUser = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const user = await User.findById(id);

    if (!user)
      return next(new ErrorHandler("Invalid Id || User Does not Exists", 400));

    return res.status(200).json({
      success: true,
      message: "users fetched successfully",
      user,
    });
  }
);

export const deleteUser = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const user = await User.findById(id);

    if (!user)
      return next(new ErrorHandler("Invalid Id || User Does not Exists", 400));

    await user.deleteOne();

    return res.status(200).json({
      success: true,
      message: "user deleted successfully",
    });
  }
);
