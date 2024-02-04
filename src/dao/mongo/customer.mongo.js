import Customer from "./models/customer.js";

export default class CustomerPersistance {
  constructor() {}
  async createModel(data) { //TODO verificar error de cuando los campos unicos se repiten
      let one = await Customer.create(data);
      if (one) {
          return {
            status: "success",
            message: "Customer created",
            response: { Customer_id: one._id },
          };
      } else {
          return null
      }
    
  }
  async readModel() {
    const customers = await Customer.find();
    if (customers) {
      return customers;
    } else {
      return null;
    }
  }
  async readOneModel(data) {
  try {
      const one = await Customer.findById(data);
      if (one) {
        return one;
      } else {
        return null;
      }
  } catch (error) {
    return null
  }
  }
  async updateModel(id, data) {
      try {
        let one = await Customer.findByIdAndUpdate(id, data);
        console.log(one);
        if (one) {
          return {
            success: true,
            message: `Customer id: ${one._id} modified`,
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
     let one = await Customer.findByIdAndDelete(data);
     if (one) {
       return {
         success: true,
         message: `Customer id: ${one._id} deleted`,
       };
     } else {
       return null;
     }
   } catch (error) {
    return null
   }
  }
}
