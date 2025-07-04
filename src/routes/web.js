//Declare Route
const express = require('express');
const router = express.Router();
//Import module
const {
    getHomePage,
    getAnhThuCuaTui,
    getHoiDanIT,
    postAddUser,
    getCreatePage,
    editUserProfile
} = require('../controllers/homeController');
//<<
router.get('/', getHomePage);
router.get('/anhthuiu', getAnhThuCuaTui);
router.get("/hoidanIT", getHoiDanIT);
router.get("/create", getCreatePage);
router.post("/create_user", postAddUser)
router.get("/edit_user",editUserProfile)
//>>
//Export module
module.exports = router;