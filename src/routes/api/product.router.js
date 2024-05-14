import ProductController from "../../controllers/product.controller.js";
import MyRouter from "../router.js";
import is_productform_ok from "../../middlewares/is_productform_ok.js";

const productController = new ProductController();

export default class ProductRouter extends MyRouter {
  init() {
    //CREATE
    this.post(
      "/",
      ["USER", "ADMIN"],
      is_productform_ok,
      async (req, res, next) => {
        try {
          let data = req.body;
  
          let response = await productController.createModel(data);
          if (response.success) {
            return res.sendSuccessCreate(response);
          } else {
            return res.duplicatedError(response.message);
          }
        } catch (error) {
          next(error);
        }
      }
    );

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

    //READ ALL Paginated
    this.read("/options", ["USER", "ADMIN"], async (req, res, next) => {
      const { limit, page, name } = req.query;
      const customLabels = {
        docs: "products",
      };
      const sort = {
        code: "asc",
      };
      let query = {};
      if (name) {
        query = {
          name: { $regex: `${name}` },
        };
      } else {
        query = {};
      }
      const options = { limit, page, sort, customLabels };
      try {
        let response = await productController.readModelPag(query, options);
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
