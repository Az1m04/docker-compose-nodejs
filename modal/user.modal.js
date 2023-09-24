const { Schema, model } = require("mongoose");

const User = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
   memberShip:{
    lastPurchaseDate:{
        type:Date,
    },
    buyCount:{
        type:Number,
        default:0
    }
   }
  },
  { timestamps: true }
);

module.exports = model("User", User, "user");
