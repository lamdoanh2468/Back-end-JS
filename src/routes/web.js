//Declare Route
const express = require('express');
const router = express.Router();
//Import module
const {
    getHomePage,
    getAnhThuCuaTui,
    getHoiDanIT
} = require('../controllers/homeController');
//<<
router.get('/', getHomePage);
router.get('/anhthuiu', getAnhThuCuaTui);
router.get("/hoidanIT", getHoiDanIT);
//>>
//Export module
module.exports = router;