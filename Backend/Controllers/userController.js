const User = require("../Models/userModel.js");
const multer = require('multer'); // npm i multer 

const bcrypt = require('bcrypt'); // npm i bcrypt 
const jwt = require('jsonwebtoken'); // npm i jsonwebtoken 

let filename = ''; 

//***************upload of Images**********************

const mystorage = multer.diskStorage({
  destination: './Images',
  filename: (req, file, cb) => {
    //creation of unique file name
    let date = Date.now() // date actuel
    let fl = date+'.'+file.mimetype.split('/')[1];
    cb(null,fl) // call back fonction avec deux parametres 
    filename = fl ; //save file name dans le bd 
  },
});

const upload = multer ({storage:mystorage})

//****************REGISTER**************************

exports.registerUser=async(req,res)=>{
  try {
    const {firstName,lastName,email,password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); // motpasse crypté
    const user = new User({firstName,lastName,email,password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
    }
}
//****************LOGIN**************************

exports.Login=async(req,res)=>{ 
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
    return res.status(401).json({ error: 'wrong email !!! ' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
    return res.status(401).json({ error: 'wrong password !!!' });
    }
    const token = jwt.sign({ _id: user._id },  process.env.JWT_SECRET, {
    expiresIn: '1h',
    });
 
    res.status(200).json({ token });
    } catch (error) {
    res.status(500).json({ error: 'Login failed' });
    }
}
 
//****************API POST**************************

exports.addUser = async (req, res) => {
  try {
    //upload file
    upload.single('image')(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).json({ message: err })
      } else if (err) {
        return res.status(500).json({ message: err })
      }
    //Extraction des données depuis body
    const newUser = new User(req.body);
    newUser.imageURL = filename;
    //enregistrement dans la bd
    const resUser = await newUser.save();
    res.status(201).json(resUser);
    })

  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//**************API GET ALL USER****************
exports.allUsers = async (req, res) => {
  try {
    const usersList = await User.find();
    res.status(200).json(usersList);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//**************API GET SINGLE USER***************
exports.singleUser = async (req, res) => {
  try {
    const userId = req.params.id; // lecture  id user
    const userExist = await User.findOne({_id:userId}); // recherche de id user dans la bd
    //const userExist = await User.findById(userId); 

    //verification de userExist = 0 ou 1
    if (!userExist) {
      // userExist = 0
      res.status(404).json({ message: "User not found ! Check your ID" });
    } else {
      //userExist = 1
      //Récupérer la liste des users après la suppression
      res.status(200).json(userExist);
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
//**************API DELETE************************
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id; // lecture  id user
    const userExist = await User.findById(userId); // recherche de id user dans la bd
    //verification de userExist = 0 ou 1
    if (!userExist) {
      // userExist = 0
      res.status(404).json({ message: "User not found ! Check your ID" });
    } else {
      //userExist = 1
      await User.findByIdAndDelete(userId); //suppression de"id user"apres la vérification
      res.status(204).json({ message: "User deleted Succesfully " });
      //Récupérer la liste des users après la suppression
      const usersList = await User.find();
      res.status(200).json(usersList);
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//API PUT
exports.editUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const userExist = await User.findById(userId);
    if (!userExist) {
      res.status(404).json({ message: "User not found ! Check your ID"});
    } else {
      const newUserData = req.body;
      await User.findByIdAndUpdate(userId, newUserData, {new: true});
      res.status(204).json({ message: "User updated Succesfully"}); 
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};