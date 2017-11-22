var mongo = require("../lib/mongo");


exports.index = function(req, res) {
  /*res.render('index', { //render the default.ejs
    title: 'Home'
  });*/
  session = req.session;
  if(session.userid){
    res.redirect('/main');
  }
  else{
    res.render('login', {
      title: 'Achorn/MTC Job Tracking System - Login',
      message: 'Enter your details below'
    });
  }
}

exports.login = function(req, res) {
  session = req.session;
  if(session.userid){
    res.redirect('/main');
  }
  else{
    res.render('login', {
      title: 'Achorn/MTC Job Tracking System - Login',
      message: 'Enter your details below'
    });
  }
}

exports.logger = function(req, res) {
  // res.end(JSON.stringify(req.body));
  session = req.session;
  var user = req.body.username;
  var pass = req.body.password;
  mongo.getUser(user, function ( err, found ) {
      if(found == undefined){
        res.render('login', {
          title: 'Achorn/MTC Job Tracking System - Login',
          message: 'Login error. No user found!'
        });
        console.log('error user "'+user+'" not found!');
      }
      else if(user == found.userid && pass == found.password){
          console.log(found);
          session.userid = user;
          session.fname = found.fname;
          session.lname = found.lname;
          res.redirect('/main');
      }
      else{
        res.render('login', {
          title: 'Achorn/MTC Job Tracking System - Login',
          message: 'Login failed.'
        });
      }
  });
}

exports.main = function(req, res) {
  session = req.session;
  if(session.userid){
    res.render('main', {
      title: 'Main',
      user: session.userid,
      fname: session.fname,
      lname: session.lname
    });
  }
  else{
    res.send('You have no business here! Please <a href="\\login">login</a> to access this page.');
  }
}

exports.logout = function(req, res) {
  session = req.session;
  session.destroy(function(error){
    // console.log(error);
    res.render('logout', {//render the default.ejs
      title: 'Logged Out'
    });
  });
}