//Declare Route
const express = require('express');
const API_Router = express.Router();
//Import module
const {
    getAllUsersData,createUserData,updateUserProfile,removeUserData
} = require('../controllers/APIController');
//<<
API_Router.get("/users",getAllUsersData);
API_Router.post("/create_user",createUserData)
API_Router.put("/update_user",updateUserProfile)
API_Router.delete("/remove_user/:id",removeUserData)
//>>
//Export module
module.exports = API_Router;