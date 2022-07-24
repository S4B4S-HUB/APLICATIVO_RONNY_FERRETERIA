const mongoose = require('mongoose');

const user = mongoose.model(
    "User",
    mongoose.Schema({
        fullName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        direction: {
            type: String,
            required: true
        },
        number: {
            type: String,
            required: true
        },
        dni: {
            type: String,
            required: true,
        }
    },
        {
            toJSON: {
                transform: function (doc, ret) {
                    ret.userId = ret._id.toString();
                    delete ret._id;
                    delete ret._v;
                    delete ret.password;
                }
            }
        },
        {
            timestamps: true
        })
);


module.exports = {
    user
}