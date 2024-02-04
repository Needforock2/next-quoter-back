import ProductRepository from "../repositories/product.rep.js";

export default class ProductService {
  constructor() {
    this.repository = new ProductRepository();
  }
  createModel = (data) => this.repository.createModel(data);
  readModel = () => this.repository.readModel();
  readOneModel = (data) => this.repository.readOneModel(data);
  updateModel = (id, data) => this.repository.updateModel(id, data);
  destroyModel = (data) => this.repository.destroyModel(data);
}
