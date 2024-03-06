const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  firsName: {
    type: String,
    trim: true, //effacer les espacements avant et aprés
    required: [true, "firtName is required !"], // ce champs est obligatoire
    maxlength: 32, //longueur de chaine maximal
  },
  lastName: {
    type: String,
    trim: true, //effacer les espacements avant et aprés
    required: [true, "lastName is required !"], // ce champs est obligatoire
    maxlength: 32, //longueur de chaine maximal
  },
  email: {
    type: String,
    trim: true, //effacer les espacements avant et après
    required: [true, "email is required !"], // ce champs est obligatoire
    maxlength: 32, //longueur de chaine maximal
    unique: true, // ce champ est unique pour éviter les doublons
    Math: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Please add a valid email"], //design pattern format de l'email acceptable
  },
  password: {
    type: String,
    trim: true, //effacer les espacements avant et aprés
    required: [true,"password is required !"], // ce champs est obligatoire
    minlength: [8,"password must have at least 8 characters!"], //longueur de chaine minimal
  },
  imageURL:String,
  
});
const User = mongoose.model("User", UserSchema);
module.exports = User;