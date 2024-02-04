import AuthPersistance from "../dao/mongo/auth.mongo.js";

let persistance = new AuthPersistance()

export default async function (req, res, next) {
  try {
    const { mail } = req.body;
    let one = await persistance.readOne(mail);
    if (one) {
      req.user = one.response;
      return next();
    } else {
      return res.status(400).json({
        message: "invalid credentials",
        response: null,
      });
    }
  } catch (error) {
    return next(error);
  }
}
