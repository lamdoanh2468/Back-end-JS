const e = require('express');
const dbConnection = require('../config/newConnection');
const { getAllUsers, createUser, updateUser, removeUser } = require('../services/CRUDService');
//!READ
const getAllUsersData = async (req, res) => {
    const allUserData = await getAllUsers() //TODO :GET
    return res.status(200).json({
        message: 'ldoanh xin loi em be ma:',
        data: allUserData
    })
}
//!CREATE
const createUserData = async (req, res) => {
    const { email, name, city } = req.body;
    if (!email || !name || !city) {
        return res.status(200).json({ //TODO : POST
            message: "missing request params"
        })
    }
    await createUser(email, name, city);
    return res.status(200).json({ //TODO : POST
        message: "Adding user...",
    })
}
//!UPDATE
const updateUserProfile = async (req, res) => {
    const { id, email, name, city } = req.body;
    if (!id || !email || !name || !city) {
        return res.status(200).json({ //TODO : POST
            message: "missing request params"
        })
    }
    await updateUser(id, email, name, city);
    return res.status(200).json({ //TODO : POST
        message: "updating...",
    })
}
//!DELETE
const removeUserData = async (req, res) => {
    // console.log(req.params)
    const id = req.params.id;
    if (!id) {
        return res.status(200).json({ //TODO : POST
            message: "missing request params"
        })
    }
    await removeUser(id);
    return res.status(200).json({ //TODO : DELETE
        message: "removing...",
    })

}
module.exports = { getAllUsersData, createUserData, updateUserProfile, removeUserData }