//Test connection
const dbConnection = require('../config/newConnection');
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
const getUploadSingleFilePage = async (req, res) => {
    res.render('uploadSingleFile.ejs')
}
const getUploadMutilFilePage = async (req, res) => {
    res.render('uploadMultiFile.ejs')
}
const uploadSinglePicFile = async (req, res) => {
    try {
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        if (!req.file) {
            return res.send('Please select image to upload');
        }
        res.send(`
            <h3>You have uploaded this image:</h3>
            <hr/>
            <img src="/upload/${req.file.filename}" width="500" style="margin: 10px;">
            <hr/>
            <a href="/single-upload">Upload more</a>
        `);

    } catch (error) {
        console.error("Upload error:", error);
        res.status(500).send("Something went wrong during file upload.");
    }

}
const uploadMultiPicFile = async (req, res) => {
    // 10 is the limit I've defined for number of uploaded files at once
    // 'multiple_images' is the name of our file input field
    try {
        // Nếu có lỗi do multer lọc ảnh
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }

        // Nếu không có file nào được upload
        if (!req.files || req.files.length === 0) {
            return res.send('Please select at least one image to upload');
        }
        let imageTags = req.files.map(file => {
            return `<img src="/upload/${file.filename}" width="300" style="margin: 10px;">`;
        }).join("");
        // Tất cả ổn, phản hồi lại
        res.send(`
            <h3>You have uploaded these images:</h3>
            <hr/>
            ${imageTags}
            <hr />
            <a href="/multi-upload">Upload another image</a>
        `);
    } catch (err) {
        console.error("Upload error:", err);
        res.status(500).send("Something went wrong during file upload.");
    }

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
    getUploadMutilFilePage,
    getUploadSingleFilePage,
    uploadSinglePicFile,
    uploadMultiPicFile
};