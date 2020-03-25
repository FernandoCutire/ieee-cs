const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// UserInputError es un tipo de error handling. Más info: https://www.apollographql.com/docs/apollo-server/data/errors/
const { UserInputError } = require("apollo-server");

// Crea un token seguro mediante bcrypt
const { createToken } = require("../../Controllers/Authentication");


// Añade un nuevo usuario y retorna su token
const addUser = async (parent, args, context, info) => {
  try {
    const { userData } = args;
    const userModel = mongoose.model("user");
    let newUserData = { ...userData};
    const userAdded = await userModel.create(newUserData);
    const token = createToken(userAdded);
    return { token };
  } catch (error) {
    throw new UserInputError("Error al registrar al usuario", {
      invalidArgs: Object.keys(args)
    });
  }
};

// Función de loggeo del usuario
const userLogin = async (parent, args, context, info) => {
  try {
    const { email, password } = args;
    const UserModel = mongoose.model("user");
    const filterSearch = { email };
    const currentUser = await UserModel.findOne(filterSearch);
    if (currentUser) {
      // funcion de bcrypt para comparar las contraseñas
      const validLogin = await bcrypt.compare(password, currentUser.password);
      if (validLogin) {
        const token = createToken(currentUser);
        return { token };
      }
      // manda el error
      throw true;
    }
    // manda el error
    throw true;
  } catch (error) {
    throw new UserInputError("Error al hacer login, token incorrecto", {
      invalidArgs: Object.keys(args)
    });
  }
};

// Recibe el ID del usuario y obtiene sus datos
const getUser = async (parent, args, context, info) => {
  try {
    const { userID } = args;
    const userModel = mongoose.model(user);
    const filterData = { _id: userID };
    const users = await userModel.find(filterData);
    return users;
  } catch (error) {
    throw new UserInputError("Error al buscar el usuario: Verifica el ID", {
      invalidArgs: Object.keys(args)
    });
  }
};


// Actualiza un usuario , al pasarle los datos y su ID
const updateUser = async (parent, args, context, info) => {
  try {
    const { userData, userID } = args;
    const userModel = mongoose.model("user");
    return await userModel.findByIdAndUpdate(userID, userData, {
      new: true
    });
  } catch (error) {
    throw new UserInputError("Error al buscar el usuario: Verifica el ID", {
      invalidArgs: Object.keys(args)
    });
  }
};

const removeUser = async (parent, args, context, info) => {
  try {
    const { userID } = args;
    const userModel = mongoose.model("user");
    return await userModel.findByIdAndRemove(userID)
  } catch (error) {
    throw new UserInputError("Error al buscar el usuario: Verifica el ID", {
      invalidArgs: Object.keys(args)
    });
  }
};

module.exports = {
  getUser,
  addUser,
  updateUser,
  removeUser,
  userLogin
};
