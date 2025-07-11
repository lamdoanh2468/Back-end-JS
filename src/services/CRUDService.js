const connection = require('../config/newConnection')
const getAllUsers = async () => {
    let users = [];
    const [results, fields] = await connection.query('SELECT * FROM `USERS`');
    users = results;
    return users;
}

const getUser = async (userID) => {
    const [results, fields] = await connection.query(
        'SELECT * FROM `USERS` WHERE id = ?',
        [userID]
    );
    const user = results.length > 0 && results ? results[0] : {} //!Handle null user data
    return user
}
const createUser = async (email, name, city) => {
    let [results, fields] = await connection.query(
        'INSERT INTO USERS(email, name, city) VALUES (?, ?, ?)',
        [email, name, city]
    );
    return results.affectedRows;
}
const removeUser = async (id) => {
    const [results, fields] = await connection.query(
        'DELETE FROM `USERS` WHERE id = ?', [id]
    )
    return results.affectedRows
}
const updateUser = async (id, email, name, city) => {
    let [results, fields] = await connection.query("UPDATE `USERS` SET email =? ,name =?,city=? WHERE id =?", [email, name, city, id])
    return results.affectedRows;
}
module.exports = {
    createUser,
    getAllUsers,
    getUser, updateUser, removeUser
}