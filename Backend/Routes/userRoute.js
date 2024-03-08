const express = require("express");
const router = express.Router();
const{allUsers,singleUser,editUser,addUser,deleteUser, registerUser, Login}=require('../Controllers/userController');

//get all users
router.get('/allusers',allUsers);
//get user by id
router.get('/user/:id',singleUser);
//add user
router.post('/addUser',addUser);
//edit user
router.put('/user/edit/:id',editUser);
//delete user
router.delete('/user/delete/:id',deleteUser);
//register
router.post('/register',registerUser);
//login
router.post('/login',Login);

module.exports = router;