import jwt from "jsonwebtoken";
import env from "../config/env.js";

export default function create_token(req, res, next) {
  let token = jwt.sign({ email: req.body.mail }, env.SECRET_TOKEN, {
    expiresIn: 60 * 60 * 24,
  });
  req.session.token = token;
  return next();
}
