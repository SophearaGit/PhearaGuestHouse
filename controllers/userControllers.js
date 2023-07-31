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
    let sql = 'SELECT * FROM `booking` WHERE rtype = ?'
    let mydata = [req.body.type]
    con.query(sql, mydata, (err, result) => {
        if (err) {
            console.log(err)
        }
        res.render('user/search', {result})
    })
}

const getBooking = (req, res) => {
    let sql = 'SELECT * FROM `booking` WHERE r_id = ?';
    let mydata = [ req.param.id];
    con.query(sql,mydata,(err,result) =>{
      if(err){
        console.log(err);
      }else{
        res.render('user/booking', {result})
      }
    })
}

module.exports = {
    getIndex,
    getAbout,
    getTerm,
    getContact,
    getSearch,

    getBooking
}