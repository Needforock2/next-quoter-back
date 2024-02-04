import QuoteController from "../../controllers/quote.controller.js";
import MyRouter from "../router.js";

const controller = new QuoteController()

export default class QuoteRouter extends MyRouter{
    init() {
      //CREATE
      this.post("/", ["USER", "ADMIN"], async (req, res, next) => {
        try {
          let data = req.body;
          data.user_id = req.user._id;
          let response = await controller.create(data);
          if (response) {
            return res.sendSuccessCreate(response);
          } else {
            return res.sendNotFound();
          }
        } catch (error) {
          next(error);
        }
      });

      //READ ONE BY QUOTE ID
      this.read("/qid/:qid", ["USER", "ADMIN"], async (req, res, next) => {
        try {
          let { qid } = req.params;
          let response = await controller.readByQid(qid);
          if (response) {
            return res.sendSuccessCreate(response);
          } else {
            return res.sendNotFound();
          }
        } catch (error) {
          next(error);
        }
      });
      //READ BY CUSTOMER ID
      this.read("/cid/:cid", ["USER", "ADMIN"], async (req, res, next) => {
        try {
            let data = req.params;
            data.query = req.query;
          let response = await controller.readByCid(data);
          if (response) {
            return res.sendSuccessCreate(response);
          } else {
            return res.sendNotFound();
          }
        } catch (error) {
          next(error);
        }
      });

      //READ BY USER ID
      this.read("/uid/:uid", ["USER", "ADMIN"], async (req, res, next) => {
        try {
            let data = req.params;
            data.query = req.query
          let response = await controller.readByUid(data);
          if (response) {
            return res.sendSuccessCreate(response);
          } else {
            return res.sendNotFound();
          }
        } catch (error) {
          next(error);
        }
      });

      //READ ALL
        this.read("/", ["USER", "ADMIN", "PUBLIC"], async (req, res, next) => {
        try {
          let response = await controller.readAll(req.query);
          if (response) {
            return res.sendSuccessCreate(response);
          } else {
            return res.sendNotFound();
          }
        } catch (error) {
          next(error);
        }
      });

      //UPDATE
      this.put("/:qid", ["USER", "ADMIN"], async (req, res, next) => {
        try {
          let { qid } = req.params;
          let data = req.body;
          let response = await controller.update(qid, data);
          if (response) {
            return res.sendSuccessCreate(response);
          } else {
            return res.sendNotFound();
          }
        } catch (error) {
          next(error);
        }
      });
      //DELETE
      this.delete("/:qid", ["USER", "ADMIN"], async (req, res, next) => {
        try {
          let { qid } = req.params;
          let response = await controller.destroy(qid);
          if (response) {
            return res.sendSuccessCreate(response);
          } else {
            return res.sendNotFound();
          }
        } catch (error) {
          next(error);
        }
      });
    }
}