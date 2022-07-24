const mongoose = require("mongoose");

const product = mongoose.model(
    "Product",
    mongoose.Schema(
        {
            productName: {
                type: String,
                required: true,
                unquie: true,
            },
            category: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Category"
            },
            productShortDescription: {
                type: String,
                required: true
            },
            productDescription: {
                type: String,
                required: false
            },
            //Precio del producto
            productPrice: {
                type: Number,
                required: true,
            },
            //Precio de venta del producto
            productSalePrice: {
                type: Number,
                required: true,
                default: 0
            },
            productImage: {
                type: String
            },
            productSKU: {
                type: String,
                required: false
            },
            productType: {
                type: String,
                required: true,
                default: "simple"
            },
            stockStatus: {
                type: String,
                default: "IN"
            }
        },
        {
            toJSON: {
                transform: function (doc, ret) {
                    ret.productId = ret._id.toString();
                    delete ret._id;
                    delete ret._v;
                }
            }
        }
    )
);

module.exports = {
    product
}