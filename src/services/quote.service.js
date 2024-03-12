import QuoteRepository from "../repositories/quote.rep.js";

export default class QuoteService {
  constructor() {
    this.repository = new QuoteRepository();
  }
  create = (data) => this.repository.create(data);
  readByQid = (qid) => this.repository.readByQid(qid);
  readByCid = (data) => this.repository.readByCid(data);
  readByUid = (data) => this.repository.readByUid(data);
  readAll = (query) => this.repository.readAll(query);
  update = (qid, data) => this.repository.update(qid, data);
  destroy = (qid) => this.repository.destroy(qid); 

}
