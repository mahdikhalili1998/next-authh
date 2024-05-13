import { verify } from "jsonwebtoken";

const { hash, compare } = require("bcryptjs");

async function hashPassword(password) {
  const hashPassword = await hash(password, 12);
  return hashPassword;
}

async function verifyPassword(password, hashPassword) {
  const isValid = await compare(password, hashPassword);
  return isValid;
}

function verifyToken(token, secretkey) {
  try {
    const result = verify(token, secretkey);
    return { email: result.email };
  } catch (error) {
    return false;
  }
}

export { hashPassword, verifyPassword, verifyToken };
