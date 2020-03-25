const mongoose = require("mongoose");

const UserSchema = require("../Schemas/User")

mongoose.model("user", UserSchema);