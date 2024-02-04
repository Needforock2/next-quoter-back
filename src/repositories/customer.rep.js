
import CustomerPersistance from "../dao/mongo/customer.mongo.js";

export default class CustomerRepository{
    constructor() {
        this.model = new CustomerPersistance();
    }
    createModel = (data) => this.model.createModel(data)
    readModel = () => this.model.readModel()
    readOneModel = (data) => this.model.readOneModel(data)
    updateModel = (id,data) => this.model.updateModel(id,data)
    destroyModel = (data) => this.model.destroyModel(data)
}