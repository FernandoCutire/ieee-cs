const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

// Definimos el esquema para usuario
const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, max: 100 },
    lastName: { type: String },
    password: { type: String, required: true },
    // Para que el correo sea unico y no permita repetirse al
    email: { type: String, required: true, unique: true }
  },
  {timestamps: true}
);

mongoose.Types.ObjectId.prototype.valueOf = function() {
  return this.toString();
};

UserSchema.pre("save", function(next) {
  let user = this;
  bcrypt.genSalt(10, function(error, salt) {
    bcrypt.hash(user.password, salt, function(error, hash) {
      if (error) return next(error);
      user.password = hash;
      next();
    });
  });
});

module.exports = UserSchema;
