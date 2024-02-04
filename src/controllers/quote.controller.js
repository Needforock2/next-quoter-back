import QuoteService from "../services/quote.service.js";

export default class QuoteController {
  constructor() {
    this.service = new QuoteService();
  }
  create = (data) => this.service.create(data);
  readByQid = (qid) => this.service.readByQid(qid);
  readByCid = (data) => this.service.readByCid(data);
  readByUid = (data) => this.service.readByUid(data);
  readAll = (query) => this.service.readAll(query);
  update = (qid, data) => this.service.update(qid, data);
  destroy = (qid) => this.service.destroy(qid);
}