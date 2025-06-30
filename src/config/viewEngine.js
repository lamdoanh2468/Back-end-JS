const express = require('express');
const path = require('path');
const configViewEngine = (app) => {
    //Config template engine
    //Manifest : src/views/viewEngine.js
    app.set('views', path.join('./src', 'views'))
    app.set('view engine', 'ejs')
    //Config static files
    app.use(express.static(path.join("./src", 'publics')))
};
module.exports = configViewEngine;