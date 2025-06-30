//Declare Route
const express = require('express');
const router = express.Router();
//<<
router.get('/', (req, res) => { //when route is '/' , server send 'Hello World'
    res.send('Hello World! & every dev in the world')
})
router.get('/anhthuiu', (req, res) => {
    res.send("<h1>Anh iu bé na lắm ạ<h1>");
})
router.get("/hoidanIT", (req, res) => {
    res.render('sample.ejs')
})
//>>
module.exports = router;