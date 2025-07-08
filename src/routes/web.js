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
    getUserProfile, updateUserProfile, removeUserProfile
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
//>>
//Export module
module.exports = router;