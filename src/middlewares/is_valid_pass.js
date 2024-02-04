import { compareSync } from "bcrypt";
import AuthPersistance from "../dao/mongo/auth.mongo.js";

let persistance = new AuthPersistance();


export default async function is_valid_pass(req, res, next) {

    try {
      const one = await persistance.readOne(req.body.mail);
        const pass_from_form = req.body.password
        const hashed_pass = one.response.password
        let verified = compareSync(pass_from_form, hashed_pass);
         if (verified) {
           return next();
        }
        return res.status(401).json({
          status: 401,
          method: req.method,
          path: req.url,
          message: "invalid credentials",
        });
    } catch (error) {
        next(error)
    }  
    
}