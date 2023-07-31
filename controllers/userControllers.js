const con = require('../config/db');

const getIndex = (req, res) => {
    res.render('user/index');
}

const getAbout = (req, res) => {
    res.render('user/about')
}

const getTerm = (req, res) => {
    res.render('user/term')
}

const getContact = (req, res) => {
    res.render('user/contact')
}

const getSearch = (req, res) => {
    let sql = 'SELECT * FROM `booking`'
    con.query(sql, (err, result) => {
        if (err) {
            console.log(err)
        }
        res.render('user/search', {result})
    })
}

module.exports = {
    getIndex,
    getAbout,
    getTerm,
    getContact,
    getSearch
}