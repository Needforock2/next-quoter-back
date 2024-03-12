import { Router } from "express";
import jwt from "jsonwebtoken";
import User from "../dao/mongo/models/user.js";
import MyError from "../config/MyError.js";
import errors from "../config/errors.js";

const { notRegistered, authenticated, notFound, authorized } = errors;

export default class MyRouter {
  constructor() {
    this.router = Router();
    this.init();
  }
  getRouter() {
    return this.router;
  }
  init() {}
  applyCb(cbs) {
    return cbs.map((cb) => async (...params) => {
      try {
        await cb.apply(this, params);
      } catch (error) {
        params[1].status(500).send(error);
      }
    });
  }
  responses = (req, res, next) => {
    res.sendSuccessCreate = (payload) => res.status(201).json(payload);
    res.sendSuccess = (payload) => res.status(200).json(payload);
    res.sendNotRegistered = (payload) =>
      MyError.new(notRegistered(payload).message, notRegistered(payload).code);
    res.sendNotFound = () => MyError.new(notFound.message, notFound.code);
    res.sendNoAuthenticatedError = () =>
      MyError.new(authenticated.message, authenticated.code);
    res.sendNoAuthorizedError = (error) =>
      MyError.new(authorized(error).message, authorized(error).code);
    return next();
  };
  handlePolicies = (policies) => async (req, res, next) => {
    try {
      console.log(policies)
      if (policies.includes("PUBLIC")) {
        return next()
      } else {
        const token = req.headers.authorization;

        if (!token) {
          return res.sendNoAuthenticatedError();
        } else {
          const payload = jwt.verify(token, process.env.SECRET_TOKEN);
        
          const user = await User.findOne({ email: payload.email }, "mail role");

          const role = user.role;

       
          if (
            (policies.includes("USER") && role === 0) ||
            (policies.includes("ADMIN") && role === 'Admin')
          ) {
            req.user = user;
            return next();
          } else {
            return res.sendNoAuthorizedError("Unauthorized");
          }
        }
      }
    } catch (error) {
      return next(error);
    }
  };
  //create
  post(path, policies, ...cbs) {
    this.router.post(
      path,
      this.responses,
      this.handlePolicies(policies),
      this.applyCb(cbs)
    );
  }
  //read
  read(path, policies, ...cbs) {
    this.router.get(
      path,
      this.responses,
      this.handlePolicies(policies),
      this.applyCb(cbs)
    );
  }
  //update
  put(path, policies, ...cbs) {
    this.router.put(
      path,
      this.responses,
      this.handlePolicies(policies),
      this.applyCb(cbs)
    );
  }
  //destroy
  delete(path, policies, ...cbs) {
    this.router.delete(
      path,
      this.responses,
      this.handlePolicies(policies),
      this.applyCb(cbs)
    );
  }
}
