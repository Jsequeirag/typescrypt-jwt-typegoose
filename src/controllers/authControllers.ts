import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { userModel, User } from "../models/userModel";

export const signUp = async (req: Request, res: Response) => {
  try {
    const username: User /* si es find({}) poner User[] */ | null =
      await userModel.findOne({ username: req.body.username });
    if (username) return res.status(400).json({ message: "user existed" });

    const email = await userModel.findOne({ email: req.body.email });
    if (email) return res.status(400).json({ message: "email existed" });

    const newUser = await userModel.create(req.body);
    res.status(200).json(newUser);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "server error" });
  }
};

export const signIn = async (req: Request, res: Response) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ message: "user doesn't exist" });

    const comparedPassword = await userModel.desencrypt(
      req.body.password,
      user!.password
    );
    if (!comparedPassword)
      return res.status(400).json({ message: "wrong password" });

    const token = jwt.sign(
      {
        id: user!._id,
      },
      "secret",
      {
        expiresIn: 60 * 60 * 24,
      }
    );
    res.status(200).header("x-access-token", token).json(user);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "server error" });
  }
};
export const profile = async (req: Request, res: Response) => {
  try {
    const user: User | null = await userModel.findById(req.body.userId);
    if (!user) return res.status(400).json({ message: "user doesn't exist" });

    res.status(200).json(user);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "server error" });
  }
};
