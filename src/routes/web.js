//Declare Route
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload')
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
let upload = multer({ storage: storage, fileFilter: imageFilter });

//Import module
const {
    getHomePage,
    getAnhThuCuaTui,
    getHoiDanIT,
    postAddUser,
    getCreatePage,
    getUserProfile,
    updateUserProfile,
    removeUserProfile,
    getUploadSingleFilePage,
    getUploadMutilFilePage,
    uploadSinglePicFile,
    uploadMultiPicFile
} = require('../controllers/homeController');
//<<
router.get('/', getHomePage);
router.get('/anhthuiu', getAnhThuCuaTui);
router.get("/hoidanIT", getHoiDanIT);
router.get("/create", getCreatePage);
router.post("/create_user", postAddUser)
router.get("/edit_user/:id/", getUserProfile)
router.post("/update_user/:id", updateUserProfile)
router.get("/remove_user/:id", removeUserProfile)
router.get("/single-upload", getUploadSingleFilePage)
router.get("/multi-upload", getUploadMutilFilePage)
router.post("/upload-profile-pic", upload.single('profile_pic'), uploadSinglePicFile)
router.post("/upload-multi-profile-pic", upload.array('profile_pic', 10), uploadMultiPicFile)
//>>
//Export module
module.exports = router;