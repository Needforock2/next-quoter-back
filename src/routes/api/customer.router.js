import CustomerController from "../../controllers/customer.controller.js";
import MyRouter from "../router.js";

const customerController = new CustomerController()

export default class CustomerRouter extends MyRouter{
    init() {
      //CREATE
      this.post("/", ["USER", "ADMIN"], async (req, res, next) => {
        try {
          let data = req.body;
          let response = await customerController.createModel(data);
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
      this.read("/", ["USER", "ADMIN"], async (req, res, next) => {
        try {
          let response = await customerController.readModel();
          if (response) {
            return res.sendSuccess(response);
          } else {
            return res.sendNotFound();
          }
        } catch (error) {
          next(error);
        }
      });

      //READ ONE
        this.read("/:cid", ["USER", "ADMIN"], async (req, res, next) => {
          let { cid } = req.params
        try {
          let response = await customerController.readOneModel(cid);
          if (response) {
            return res.sendSuccess(response);
          } else {
            return res.sendNotFound();
          }
        } catch (error) {
          next(error);
        }
      });

      //UpDATE
        this.put("/:cid", ["USER", "ADMIN"], async (req, res, next) => {
          let { cid } = req.params;
            try {
            let data = req.body;
          let response = await customerController.updateModel(cid, data);
          if (response) {
            return res.sendSuccess(response);
          } else {
            return res.sendNotFound();
          }
        } catch (error) {
          next(error);
        }
      });
      //DESTROY
        this.delete("/:cid", ["USER", "ADMIN"], async (req, res, next) => {
           let { cid } = req.params;
        try {
          let response = await customerController.destroyModel(cid);
          if (response) {
            return res.sendSuccess(response);
          } else {
            return res.sendNotFound();
          }
        } catch (error) {
          next(error);
        }
      });
    }
}