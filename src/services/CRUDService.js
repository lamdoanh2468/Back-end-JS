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
module.exports = {
    getAllUsers,
    getUser
}