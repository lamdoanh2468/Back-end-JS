const getHomePage = (req, res) => {
    res.send('Hello World! & every dev in the world')
};
const getAnhThuCuaTui = (req, res) => {
    res.send('<h1>Lam Doanh thương em bé mờ</h1>')
}
const getHoiDanIT = (req, res) => {
    res.render('sample.ejs')
}
//Export module
module.exports = {
    getHomePage,
    getAnhThuCuaTui,
    getHoiDanIT
};