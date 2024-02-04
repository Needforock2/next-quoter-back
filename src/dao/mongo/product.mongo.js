import Product from "./models/product.js";

export default class ProductPersistance {
  constructor() {}
  async createModel(data) { //TODO verificar error de cuando ya el code existe
    let one = await Product.create(data);
    if (one) {
      return {
        status: "success",
        message: "Product created",
        response: { "Product Id": one._id },
      };
    } else {
      return null;
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
  async updateModel(id, data) {
 try {
       let one = await Product.findByIdAndUpdate(id, data);
       if (one) {
         return {
           success: true,
           message: `Product id: ${one._id} modified`,
         };
       } else {
         return null;
       }
 } catch (error) {
    return null
 }
  }
  async destroyModel(data) {
   try {
     let one = await Product.findByIdAndDelete(data);
     if (one) {
       return {
         success: true,
         message: `Product id: ${one._id} deleted`,
       };
     } else {
       return null;
     }
   } catch (error) {
    return null
   }
  }
}
