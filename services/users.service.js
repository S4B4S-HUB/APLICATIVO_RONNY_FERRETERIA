const { user } = require("../models/user.model");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");

async function login({ email, password }, callback) {
    const userModel = await user.findOne({ email });

    if (userModel != null) {
        if (bcrypt.compareSync(password, userModel.password)) {
            const token = auth.generateAccessToken(userModel.toJSON());
            return callback(null, { ...userModel.toJSON(), token });
        } else {
            return callback({
                message: "¡El correo electrónico o la contraseña ingresada son inválidos!"
            });
        }
    }
    else {
        return callback({
            message: "¡El correo electrónico o la contraseña ingresada son inválidos!"
        });
    }
}

async function register(params, callback) {
    if (params.email == undefined) {
        return callback({
            message: "¡El campo correo electrónico es un campo requerido para el proceso de registro!"
        });
    }

    let isUserExist = await user.findOne({ email: params.email });

    if (isUserExist) {
        return callback({
            message: "¡El correo electrónico ingresado ya ha sido usado anteriormente en un registro, ingrese un nuevo correo electrónico!"
        });
    }

    const salt = bcrypt.genSaltSync(10);
    params.password = bcrypt.hashSync(params.password, salt);

    const userSchema = new user(params);
    userSchema.save()
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

module.exports = {
    login,
    register
}