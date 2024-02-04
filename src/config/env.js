import dotenv from "dotenv";


dotenv.config({ path: "./.env.dev" });

export default {
  DATABASE_URL: process.env.DATABASE_URL,
  SECRET_COOKIE: process.env.SECRET_COOKIE,
  SECRET_SESSION: process.env.SECRET_SESSION,
  SECRET_TOKEN: process.env.SECRET_TOKEN,
};
