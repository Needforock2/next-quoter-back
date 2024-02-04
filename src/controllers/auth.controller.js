import AuthService from "../services/auth.service.js";

export default class AuthController {
  constructor() {
    this.service = new AuthService();
  }
  register = (data) => this.service.register(data);
  login = () => this.service.login();
  logout = () => this.service.logout();
  readOne = (mail) => this.service.readOne(mail);
  readAll = () => this.service.readAll();
  readCurrent = (query) => this.service.readCurrent(query);
  readById = (id) => this.service.readById(id);
  updateOne = (mail, data) => {
    return this.service.updateOne(mail, data);
  };
  destroyOne = (mail) => this.service.destroyOne(mail);
}