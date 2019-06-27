const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

userSchema.pre("save", async function(next) {
  const user = this;
  if (user.isModified("password") || user.isNew) {
    user.set("password", await bcrypt.hash(user.get("password"), 8));
  }
  next();
});

userSchema.post("save", function(err, user, next) {
  if (err.name === "MongoError" && err.code === 11000) {
    err.message = "username has already been taken";
    next(err);
    return;
  }
  next();
});

userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
