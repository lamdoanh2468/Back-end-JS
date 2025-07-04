//Test connection
const dbConnection = require('../config/newConnection');
const {
    getAllUsers,editUser
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
const editUserProfile = (req,res)=>{
    res.render('editUser.ejs')
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
        [email, name, city],
    );
    res.render("createSuccessful.ejs")
    console.log("Check results:", results);
}
//Export module
module.exports = {
    getHomePage,
    getAnhThuCuaTui,
    getHoiDanIT,
    postAddUser,
    getCreatePage,
    editUserProfile
};