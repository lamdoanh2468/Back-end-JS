//Test connection
const dbConnection = require('../config/newConnection');
//Database connection
// const getHomePage = async (req, res) => {
//     let users = [];
//     const [results, fields] = await dbConnection.query('SELECT * FROM `USERS`');
//     console.log(">>>check results:", results);
// };
const getHomePage = (req, res) => {
    res.render('home.ejs')
}
const getAnhThuCuaTui = (req, res) => {
    res.send('<h1>Lam Doanh thương em bé mờ</h1>')
}
const getHoiDanIT = (req, res) => {
    res.render('sample.ejs')
}
const getCreatePage = (req, res) => {
    res.render('createUser.ejs')
}
const postAddUser = async (req, res) => {
    console.log("request body:", req.body);
    const [email, name, city] = req.body;
    const [results, fields] = await dbConnection.query(
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
    getCreatePage
};