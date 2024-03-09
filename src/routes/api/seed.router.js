import Product from "../../dao/mongo/models/product.js";
import MyRouter from "../router.js";

import { faker } from "@faker-js/faker";

export default class SeedRouter extends MyRouter {
  init() {
    //Seed

    this.read("/", ["PUBLIC"], async (req, res, next) => {
      try {
        for (let i = 0; i < 100; i++) {
          const product = {
            name: faker.commerce.product(),
            description: faker.commerce.productDescription(),
            code: faker.number.int({ min: 1, max: 100000 }),
            price: faker.commerce.price({ min: 100, max: 2000 }),
            brand: faker.commerce.productAdjective(),
            stock: faker.number.int({ min: 1, max: 1000 }),
            category: faker.commerce.department(),
            pType: "Product",
          };
          try {
            await Product.create(product);
          } catch (error) {
            console.log(error);
          }
          }
          return res.sendSuccessCreate("seeded");
      } catch (error) {
        console.log(error);
      }
    });
  }
}
