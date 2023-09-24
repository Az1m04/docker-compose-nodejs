const { Schema, model } = require("mongoose");

const productMedia = new Schema({
  url: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

const productSchema = new Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      default:0
    },
    media: [
      {
        type: productMedia,
        required: false,
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("Products", productSchema, "products");
