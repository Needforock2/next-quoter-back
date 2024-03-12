import ProductService from "../services/product.service.js";

export default class ProductController {
  constructor() {
    this.service = new ProductService();
  }
  createModel = (data) => this.service.createModel(data);
  readModel = () => this.service.readModel();
  readOneModel = (data) => this.service.readOneModel(data);
  readModelPag = (query, options) => this.service.readModelPag(query, options);
  updateModel = (id, data) => this.service.updateModel(id, data);
  destroyModel = (data) => this.service.destroyModel(data);
}
