import express, { Router } from "express";
import MongoConnect from "./config/mongo.js";
import env from "../src/config/env.js";
import router from "./routes/index.js";
import expressSession from "express-session";
import MongoStore from "connect-mongo";
import inicializePassport from "./middlewares/passport.js";
import passport from "passport";
import cookieParser from "cookie-parser";
import error_handler from "./middlewares/errorHandler.js";
import cluster from 'cluster'


const PORT = 8080
const ready = () => {
  console.log("server ready on port " + PORT);
};



const app = express();
app.use(cookieParser(env.SECRET_COOKIE));
const mongoFs = new MongoConnect(env.DATABASE_URL);
mongoFs.connect_mongo();

app.use(
  expressSession({
    store: MongoStore.create({
      mongoUrl: env.DATABASE_URL,
      ttl: 60 * 60 * 24 * 7,
    }),
    secret: env.SECRET_SESSION,
    resave: false,
    saveUninitialized: false,
  })
);
inicializePassport();
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Main Router
app.use("/", router)
app.get("/docker", (req, res) => {
  res.send("hola, docker")
})
app.use(error_handler);
const server = app.listen(PORT, ready);