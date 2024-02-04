import passport from "passport";
import { Strategy } from "passport-local";
import jwt from "passport-jwt";
import env from "../config/env.js";
import AuthController from "../controllers/auth.controller.js";



export default function inicializePassport() {
  passport.serializeUser((user, done) => done(null, user._id));
  passport.deserializeUser(async (id, done) => {
    try {

      const user = await User.readById(id); // Recupera al usuario por su ID
      done(null, user.response); // Carga el usuario en req.user
    } catch (error) {
      done(error);
    }
  });
}


//JWT

passport.use(
  "jwt",
  new jwt.Strategy(
    {
      jwtFromRequest: jwt.ExtractJwt.fromExtractors([
        (req) => req?.cookies["token"],          
      ]),
      secretOrKey: env.SECRET_TOKEN,
    },
    async (payload, done) => {
      let authController = new AuthController()
      try {
        let one = await authController.readOne(payload.email);
        if (one) {
          return done(null, one.response);
        } else {
          return done(null, false);
        }
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

passport.use(
  "current",
  new jwt.Strategy(
    {
      jwtFromRequest: jwt.ExtractJwt.fromExtractors([
        (req) => req?.cookies["token"],
      ]),
      secretOrKey: env.SECRET_TOKEN,
    },
    async (payload, done) => {
      let authController = new AuthController();
      try {
        let one = await authController.readCurrent(
          { mail: payload.email },
          "first_name last_name age mail photo role"
        );
        if (one) {
          return done(null, one.response);
        } else {
          return done(null);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);
