//Test connection
const dbConnection = require('../config/newConnection');
const {
    getAllUsers, editUser,
    getUser, updateUser, removeUser
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
const removeUserProfile = async (req, res) => {
    const id = req.params.id; //! GET ID FROM ROUTE PARAMS
    const affectedRows = await removeUser(id);
    res.send('<h3>Remove user successful</h3>')
    console.log("Rows affected>>>", affectedRows);
}
const updateUserProfile = async (req, res) => {
    const { id, email, name, city } = req.body;
    const affectedRows = await updateUser(id, email, name, city);
    res.redirect("/")
    console.log("Rows affected>>>", affectedRows);
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
    getUserProfile,
    updateUserProfile,
    removeUserProfile
};