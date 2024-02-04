import CustomerService from "../services/customer.service.js";

export default class CustomerController {
  constructor() {
    this.service = new CustomerService();
  }
  createModel = (data) => this.service.createModel(data);
  readModel = () => this.service.readModel();
  readOneModel = (data) => this.service.readOneModel(data);
  updateModel = (id,data) => this.service.updateModel(id,data);
  destroyModel = (data) => this.service.destroyModel(data);
}