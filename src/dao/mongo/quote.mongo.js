import paginateArray from "./aggregations/paginate.js";
import QuoteAggregation from "./aggregations/quote.agg.js";
import Quote from "./models/quote.js";


export default class QuoteMongo {
  constructor() {}

  //CREATE
  async create(data) {
    try {
      let lastQuote = await Quote.findOne({}, "-createdAt -updatedAt -__v", {
        sort: { number: -1 },
      });
      let newNumber = 1;
      if (lastQuote) {
        newNumber = lastQuote.number + 1;
      }
      const newQuote = {
        number: newNumber,
        ...data,
      };
      let one = await Quote.create(newQuote);
      if (one) {
        return {
          message: "quote created",
          response: "quote id: " + one._id,
        };
      }
    } catch (error) {
      console.log(error);
    }
  }

  //READ ONE BY QID
  async readByQid(qid) {
    try {
      let one = await QuoteAggregation("_id", qid);
      return one ? one[0] : null;
    } catch (error) {
      return null;
    }
  }

  //READ ALL BY CID
  async readByCid(data) {
    let { cid } = data;
    let { page, limit } = data.query;
    try {
      let response = await QuoteAggregation("customer_id", cid);
      let one = paginateArray(response, Number(page), Number(limit));
      return one ? one : null;
    } catch (error) {
      return null;
    }
  }

  //READ ALL BY UID
  async readByUid(data) {
    let { uid } = data;
    let { page, limit } = data.query;
    try {
      let response = await QuoteAggregation("user_id", uid);
      let one = paginateArray(response, Number(page), Number(limit));
      return one ? one : null;
    } catch (error) {
      return null;
    }
  }

  //READ ALL
  async readAll(query) {

    let { limit, page, quoteId } = query;

    try {
      let response = await QuoteAggregation("number", +quoteId);
      let all = paginateArray(response, Number(page), Number(limit));

      return all ? all : null;
    } catch (error) {
      return null;
    }
  }

  //UPDATE
  async update(qid, data) { 
    try {
      let one = await Quote.findByIdAndUpdate(qid, data, { new: true });
      if (one) {
        return {
          message: "Quote updated",
          response: one,
        };
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  }

  //DELETE
  async destroy(qid) {
    try {
      let one = await Quote.findByIdAndDelete(qid);
      if (one) {
        return {
          message: "Quote deleted",
        };
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  }
}
