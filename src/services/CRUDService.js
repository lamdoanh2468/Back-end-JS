const connection = require('../config/newConnection')
const getAllUsers = async () => {
    let users = [];
    const [results, fields] = await connection.query('SELECT * FROM `USERS`');
    users = results;
    return users;
}
const getUser = async (id) => {
    const [results, fields] = await connection.query('SELECT * FROM `USERS` WHERE id = ?', [id]);
    const user = results[0] || null;
    return user;
}
const editUser = async (id, email, name, city) => {
    const [results, fields] = await connection.query(
        `UPDATE USERS
        SET email = ?,  name = ?,city = ?
        WHERE id =?`, [id, email, name, city]
    )
    console.log("CHECK EDIT RESUTL:", results)
}
module.exports = {
    getAllUsers,
    editUser
}