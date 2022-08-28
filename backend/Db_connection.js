//https://www.tutsmake.com/node-express-js-creating-a-restful-api-mysql-example/

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
extended: true
}));

// default route
app.get('/', function (req, res) {
    return res.send({ error: true, message: 'hello' })
    });

// connection configurations
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: 'ASE_DB'
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


// Retrieve all users 
app.get('/users', function (req, res) {
    con.query('SELECT * FROM users', function (error, results, fields) {
                    if (error) throw error;
                        return res.send({ error: false, data: results, message: 'users list.' });
    });
});

// Retrieve user with id 
app.get('/user/:id', function (req, res) {
    let user_id = req.params.id;
    if (!user_id) {
    return res.status(400).send({ error: true, message: 'Please provide user_id' });
    }
    con.query('SELECT * FROM users where id=?', user_id, function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results[0], message: 'users list.' });
    });
    });

// Add a new user  
app.post('/add', function (req, res) {
    let user = req.body.user;
    if (!user) {
    return res.status(400).send({ error:true, message: 'Please provide user' });
    }
    con.query("INSERT INTO users SET ? ", { name: user }, function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: 'New user has been created successfully.' });
    });
    });

//  Update user with id
app.put('/user', function (req, res) {
let user_id = req.body.user_id;
let user = req.body.user;
if (!user_id || !user) {
return res.status(400).send({ error: user, message: 'Please provide user and user_id' });
}
con.query("UPDATE users SET user = ? WHERE id = ?", [user, user_id], function (error, results, fields) {
if (error) throw error;
return res.send({ error: false, data: results, message: 'user has been updated successfully.' });
});
});

//  Delete user
app.delete('/user', function (req, res) {
let user_id = req.body.user_id;
if (!user_id) {
return res.status(400).send({ error: true, message: 'Please provide user_id' });
}
con.query('DELETE FROM users WHERE id = ?', [user_id], function (error, results, fields) {
if (error) throw error;
return res.send({ error: false, data: results, message: 'User has been updated successfully.' });
});
}); 

// set port
app.listen(3000, function () {
console.log('Node app is running on port 3000');
});
module.exports = app;