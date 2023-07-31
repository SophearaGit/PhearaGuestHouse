const con = require('../config/db');
const fs = require('fs');

const getAll = (req, res) => {
    let sql = 'SELECT * FROM `admin_dir`';
    con.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.render('admin/login', {result});
        }
    })
}

const getLogin = (req, res) => {
    let sql = 'SELECT * FROM `admin_dir`';
    con.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.render('admin/login', {result});
        }
    })    
}

const postLogin = (req, res) => {
    const body = req.body;
    const username = body.user_name;
    const password = body.password;
    con.query('select * from `admin_dir` where username = ? and password = ?', [username, password] ,(err, result) => {
        if(err){
            console.log(err);
        }else{
            const user = result.find((x) => (x.username === username && x.password === password));
            if(user){
                // const token = createToken(user.id);
                // res.cookie('jwt', token, {httpOnly: true, maxAge: 3 * 24 * 60 *60 * 1000});
                res.redirect('admin/dashboard')
            }else{
                res.redirect('/admin');
            }
        }
    })
}

const getDashboard = (req, res) => {
    let sql = 'SELECT * FROM `booking`';
    con.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.render('admin/dashboard', {result});
        }
    }) 
}

const getRoom = (req, res) => {
    res.render('admin/room')   
}

const postRoom = (req, res) => {
    let avarta = null;
    if(req.files){
        var timestamp = Date.now();
        var file = req.files.image;
        var filename = timestamp + file.name;
        
        file.mv('./public/upload/' + filename, (err) => {
            if(err){
                console.log(err);
            }
        })
        avarta = filename;
    }
    // TAKE THE INFO TO STORE IN DATABASE
    let body = req.body;
    let sql = 'INSERT INTO `booking`(`rimage`, `rtype`, `rprice`, `rtext`) VALUES (?, ?, ?, ?)'
    let myarr = [avarta, body.type, body.price, body.text];
    con.query(sql, myarr, (err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/admin/dashboard')
        }
    })
}

const deleteRoom = (req, res) => {
    let sql = 'DELETE FROM `booking` WHERE r_id = ?'
    let id = req.params.id
    con.query(sql, [id], (err) => {
        if (err) {
            console.log(err)
        } else {
            res.redirect('/admin/dashboard')
        }
    })
}

const edit_getRoom = (req, res) => {
    let sql = 'SELECT * FROM `booking` WHERE r_id = ?';
    let mydata = [ req.params.id];
    con.query(sql,mydata,(err,result) =>{
      if(err){
        console.log(err);
      }else{
        res.render('admin/room-edit', {result});
      }
    })
}

const edit_postRoom = (req, res) => {
    let body = req.body;
    let img = body.img;
    if (req.files) {
        var timestamp = Date.now();
        var file = req.files.image;
        var filename = timestamp + file.name;
        file.mv('./public/upload/' + filename, (err) => {
            if (err) {
                console.log(err);
            }
        });
        fs.unlinkSync('public/upload/' + img)
        img = filename;
    }
    const my_sql = 'UPDATE `booking` SET `rimage`= ?, `rtype`= ?, `rprice`=?, `rtext`= ? WHERE `r_id` = ?';
    const mydata = [img, body.type, body.price, body.text, body.id];
    con.query(my_sql, mydata, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.redirect('/admin/dashboard');
        }
    });
}

const getBooking = (req, res) => {
    let sql = 'SELECT * FROM `detail`'
    con.query(sql, (err, result) => {
        if (err) {
            console.log(err)
        }
        res.render('admin/booking', {result})   
    })
}

module.exports = {
    getAll,

    getLogin,
    postLogin,

    getDashboard,
    
    getRoom,
    postRoom,
    deleteRoom,
    edit_getRoom,
    edit_postRoom,

    getBooking
}