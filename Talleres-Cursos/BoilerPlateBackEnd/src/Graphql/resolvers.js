const {
  getUser,
  addUser,
  updateUser,
  removeUser,
  userLogin
} = require("./Controllers/User");

const resolvers = {
  Query: {
    getUser
  },
  Mutation: {
    // User
    userLogin,
    addUser,
    updateUser,
    removeUser
  }
};

module.exports = resolvers;
