import { getModelForClass, prop, pre } from "@typegoose/typegoose";
import bcrypt from "bcrypt";
/* -------------------------------- pre save encrypt password -------------------------------- */
@pre<User>("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
})
/* ---------------------------------- class --------------------------------- */
export class User {
  @prop({ required: true, type: String, min: 4, lowercase: true, unique: true })
  username: string;
  @prop({ required: true, type: String, unique: true, lowercase: true })
  email: string;
  @prop({ required: true, type: String })
  password: string;
  /* --------------------------------- methods -------------------------------- */
  static async desencrypt(password: string, hash: string) {
    const comparedPassword = await bcrypt.compare(password, hash);
    return comparedPassword;
  }
}

export const userModel = getModelForClass(User);
