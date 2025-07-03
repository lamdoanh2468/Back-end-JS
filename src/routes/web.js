//Declare Route
const express = require('express');
const router = express.Router();
//Import module
const {
    getHomePage,
    getAnhThuCuaTui,
    getHoiDanIT,
    postAddUser
} = require('../controllers/homeController');
//<<
router.get('/', getHomePage);
router.get('/anhthuiu', getAnhThuCuaTui);
router.get("/hoidanIT", getHoiDanIT);
router.post("/create_user", postAddUser)
//>>
//Export module
module.exports = router;