//Test connection
const dbConnection = require('../config/newConnection');
//Database connection
const getHomePage = (req, res) => {
    let users = [];
    dbConnection.query('SELECT * FROM `USERS`',
        function (err, results, fields) {
            users = results;
            console.log("Result:", results); // results contains rows returned by server
            // console.log("Fields:", fields); // fields contains extra meta data about results, if available
            res.render('home.ejs');
        });
};
const getAnhThuCuaTui = (req, res) => {
    res.send('<h1>Lam Doanh thương em bé mờ</h1>')
}
const getHoiDanIT = (req, res) => {
    res.render('sample.ejs')
}
const postAddUser = (req, res) => {
    console.log("request body:", req.body);
    const { email, name, city } = req.body;
    try {
        dbConnection.query(
            'INSERT INTO USERS(email,name,city) VALUES (?,?,?)',
            [email, name, city]
        );
        // res.render("createSuccessful.ejs");
        res.send("Create user successful");
    } catch (err) {
        console.log(err);
    }
}
//Export module
module.exports = {
    getHomePage,
    getAnhThuCuaTui,
    getHoiDanIT,
    postAddUser
};