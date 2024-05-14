import Quote from "../models/quote.js";
import { ObjectId } from "mongodb";

export default async function QuoteAggregation(param, value) {
  let query = {};
  if (param && value) {
    if (param === "number" && value > 0) {
      query[param] = value;
    } else {
      query[param] = new ObjectId(value);
    }
  }

  let result = await Quote.aggregate([
    { $match: query },
    {
      $lookup: {
        from: "users",
        localField: "user_id",
        foreignField: "_id",
        as: "userData",
      },
    },
    {
      $lookup: {
        from: "customers",
        localField: "customer_id",
        foreignField: "_id",
        as: "customerData",
      },
    },
    { $unwind: "$products" },
    {
      $lookup: {
        from: "products",
        localField: "products.product_id",
        foreignField: "_id",
        as: "productsData",
      },
    },
    {
      $unwind: "$productsData",
    },

    {
      $addFields: {
        productTotal: {
          $multiply: ["$productsData.price", "$products.quantity"],
        },
        createdAt: "$createdAt",
        updatedAt: "$updatedAt",
      },
    },
    {
      $group: {
        _id: "$_id",
        totalAmount: { $sum: "$productTotal" },
        products: { $push: "$productsData" },
        quantity: { $push: "$products.quantity" },
        number: { $first: "$number" },
        status: { $first: "$status" },
        user: { $first: "$userData" },
        customer: { $first: "$customerData" },
        createdAt: { $first: "$createdAt" },
        updatedAt: { $first: "$updatedAt" },
      },
    },
    {
      $project: {
        _id: "$_id",
        total: "$totalAmount",
        number: 1,
        status: 1,
        user: 1,
        customer: 1,
        createdAt: 1,
        updatedAt: 1,
        sortedProducts: {
          $map: {
            input: {
              $zip: {
                inputs: ["$products", "$quantity"],
              },
            },
            as: "productQuantity",
            in: {
              $let: {
                vars: {
                  product: {
                    $arrayElemAt: ["$$productQuantity", 0],
                  },
                  quantity: {
                    $arrayElemAt: ["$$productQuantity", 1],
                  },
                },
                in: {
                  $mergeObjects: ["$$product", { quantity: "$$quantity" }],
                },
              },
            },
          },
        },
      },
    },
    {
      $sort: {
        number: 1, // Ordenar ascendentemente en base a la propiedad "number"
      },
    },
  ]);
  return result;
}
