const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: { type: "String", required: true },
    email: { type: "String", unique: true, required: true},
    password: { type: "String", required: true },
    pic: {
      type: "String",
      required: true,
      default:
        "https://th.bing.com/th?id=OIP.HHVUf3TYqncgpJXyCMmxyAHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2",
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestaps: true, required: true}
);

userSchema.methods.matchPassword = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.pre("save", async function(next){
  if(!this.isModified){
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password , salt);
}) 


const User = mongoose.model("User", userSchema);

module.exports = User;