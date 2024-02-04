import AuthPersistance from "../dao/mongo/auth.mongo.js";

export default class AuthRepository {
  constructor() {
    this.model = new AuthPersistance()
  }
  register = (data) => this.model.register(data);
  login = () => this.model.login();
  logout = () => this.model.logout();
  readOne = (mail) => this.model.readOne(mail);
  readAll = () => this.model.readAll()
  readCurrent = (query) => this.model.readCurrent(query);
  readById = (id) => this.model.readById(id);
  updateOne = (mail, data) => this.model.updateOne(mail, data);
  destroyOne = (mail) => this.model.destroyOne(mail);
}
