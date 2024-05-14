import Product from "./models/product.js";

export default class ProductPersistance {
  constructor() {}
  async createModel(data) {

    try {
      let verify = await this.readOneByCode(data.code)
      if (verify) {
        return {
          success: false,
          message: "Product Code already exists"
        }
      }
      let one = await Product.create(data);
   
      if (one) {
        return {
          success: true,
          message: "Product created",
          response: { "Product Id": one._id },
        };
      } 
    } catch (error) {
      console.log(error)
    }
  }
  async readModel() {
    const products = await Product.find();
    if (products) {
      return products;
    } else {
      return null;
    }
  }
  async readModelPag(query, options) {
    const products = await Product.paginate(query, options);
    if (products) {
      return products;
    } else {
      return null;
    }
  }
  async readOneModel(data) {
    try {
      const one = await Product.findById(data);
      if (one) {
        return one;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  }

  async readOneByCode(code) {
     try {
       const one = await Product.findOne({code: code})
       if (one) {
         return one;
       } else {
         return null;
       }
     } catch (error) {
       return null;
     }
  }
  async updateModel(id, data) {
    try {
      let one = await Product.findByIdAndUpdate(id, data);
      if (one) {
        return {
          success: true,
          message: `The product was modified`,
        };
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  }
  async destroyModel(data) {
    try {
      let one = await Product.findByIdAndDelete(data);
      if (one) {
        return {
          success: true,
          message: `Product deleted`,
        };
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  }
}
