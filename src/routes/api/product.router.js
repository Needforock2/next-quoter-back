import ProductController from "../../controllers/product.controller.js";
import MyRouter from "../router.js";

const productController = new ProductController();

export default class ProductRouter extends MyRouter {
  init() {
    //CREATE
    this.post("/", ["USER", "ADMIN"], async (req, res, next) => {
      try {
        let data = req.body;
        let response = await productController.createModel(data);
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
        let response = await productController.readModel();
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
    this.read("/:pid", ["USER", "ADMIN"], async (req, res, next) => {
      let { pid } = req.params;
      try {
        let response = await productController.readOneModel(pid);
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
    this.put("/:pid", ["USER", "ADMIN"], async (req, res, next) => {
      let { pid } = req.params;
      try {
        let data = req.body;
        let response = await productController.updateModel(pid, data);
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
    this.delete("/:pid", ["USER", "ADMIN"], async (req, res, next) => {
      let { pid } = req.params;
      try {
        let response = await productController.destroyModel(pid);
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
