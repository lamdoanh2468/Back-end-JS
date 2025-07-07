//Test connection
const dbConnection = require('../config/newConnection');
const {
    getAllUsers, editUser,
    getUser
} = require('../services/CRUDService');
//Database connection
const getHomePage = async (req, res) => {
    let users = await getAllUsers();
    console.log(">>>check results:", users);
    return res.render('home.ejs', {
        listUsers: users
    })
};
// const getHomePage = (req, res) => {
//     res.render('home.ejs')
// }
const getAnhThuCuaTui = (req, res) => {
    res.send('<h1>Lam Doanh thương em bé mờ</h1>')
}
const getHoiDanIT = (req, res) => {
    res.render('sample.ejs')
}
const getCreatePage = (req, res) => {
    res.render('createUser.ejs')
}
const getUserProfile = async (req, res) => {
    const userData = req.params;
    const user = await getUser(userData.id);
    console.log(user);
    res.render('editUser.ejs', { userEdit: user })
}
const updateUserProfile = async (req, res) => {
    const { id, email, name, city } = req.body;
    let [results, fields] = await dbConnection.query("UPDATE `USERS` SET email =? ,name =?,city=? WHERE id =?", [email, name, city, id])
    console.log(req.body);
    console.log("Rows affected>>>", results);
    res.send("<h3>Update User Successful<h3>")
}
const postAddUser = async (req, res) => {
    console.log("request body:", req.body);
    const {
        email,
        name,
        city
    } = req.body;
    let [results, fields] = await dbConnection.query(
        'INSERT INTO USERS(email,name,city) VALUES (?,?,?)',
        [email, name, city]
    );
    res.send("<h3>Create User Successful<h3>")
    console.log("Check results:", results);
}
//Export module
module.exports = {
    getHomePage,
    getAnhThuCuaTui,
    getHoiDanIT,
    postAddUser,
    getCreatePage,
    getUserProfile,updateUserProfile
};