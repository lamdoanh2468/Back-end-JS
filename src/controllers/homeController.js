//Test connection
const dbConnection = require('../config/newConnection');
const multer = require('multer');
const path = require('path')
const {
    getAllUsers, editUser, createUser,
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
    } = req.body
    const newUser = await createUser(email, name, city);
    res.send("<h3>Create User Successful<h3>")
    console.log("Check results:", newUser);
}
const getUploadFilePage = async (req, res) => {
    res.render('uploadFile.ejs')
}
const uploadPicFile = async (req, res) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, '/upload')
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        }
    })
    const imageFilter = function (req, file, cb) {
        // Accept images only
        if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
            req.fileValidationError = 'Only image files are allowed!';
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    };
    // 10 is the limit I've defined for number of uploaded files at once
    // 'multiple_images' is the name of our file input field
    let upload = multer({ storage: storage, fileFilter: imageFilter }).single('profile_pic');

    upload(req, res, function (err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }
        // Display uploaded image for user validation
        res.send(`You have uploaded this image: <hr/><img src="${req.file.path}" width="500"><hr /><a href="./">Upload another image</a>`);
    });

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
    removeUserProfile,
    getUploadFilePage,
    uploadPicFile
};