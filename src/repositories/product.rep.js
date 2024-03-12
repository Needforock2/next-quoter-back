import ProductPersistance from "../dao/mongo/product.mongo.js";

export default class ProductRepository {
  constructor() {
    this.model = new ProductPersistance();
  }
  createModel = (data) => this.model.createModel(data);
  readModel = () => this.model.readModel();
  readModelPag = (query, options) => this.model.readModelPag(query, options);
  readOneModel = (data) => this.model.readOneModel(data);
  updateModel = (id, data) => this.model.updateModel(id, data);
  destroyModel = (data) => this.model.destroyModel(data);
}
