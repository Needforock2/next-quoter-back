import CustomerRepository from "../repositories/customer.rep.js";

export default class CustomerService {
  constructor() {
    this.repository = new CustomerRepository();
  }
  createModel = (data) => this.repository.createModel(data);
  readModel = () => this.repository.readModel();
  readOneModel = (data) => this.repository.readOneModel(data);
  updateModel = (id,data) => this.repository.updateModel(id,data);
  destroyModel = (data) => this.repository.destroyModel(data);
}