import QuoteMongo from "../dao/mongo/quote.mongo.js";

export default class QuoteRepository {
  constructor() {
    this.model = new QuoteMongo();
  }
  create = (data) => this.model.create(data);
  readByQid = (qid) => this.model.readByQid(qid);
  readByCid = (data) => this.model.readByCid(data);
  readByUid = (data) => this.model.readByUid(data);
  readAll = (query) => this.model.readAll(query);
  update = (qid, data) => this.model.update(qid, data);
  destroy = (qid) => this.model.destroy(qid);
}