import UserInfo from "@/models/userInfo";
import ConnectDB from "@/utils/ConnectDB";
import { hashPassword } from "@/utils/password";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(500).json({ message: "request is not POSt" });
  }

  try {
    await ConnectDB();
  } catch (error) {
    res.status(500).json(error);
  }

  const { name, email, password } = req.body.info;
  if (!email || !password) {
    return res.status(411).json({ message: "FillOut " });
  }
  const exitingUser = await UserInfo.findOne({ email: email });
  if (exitingUser) {
    return res.status(422).json({ message: "Existed" });
  }

  const hashedPassword = await hashPassword(password);
  const newUser = await UserInfo.create({
    name,
    email,
    password: hashedPassword,
  });
  res.status(201).json({ message: "user created !" });
}
