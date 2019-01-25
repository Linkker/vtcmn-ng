const JWT = require('jsonwebtoken');
const User = require('../models/user.model');
const { normalizeErrors } = require('../helpers/mongoose');
const { JWT_SECRET } = require('../configuration');

const signToken = user => {
    if(user.method==='local'){email=user.local.email} else {email=user.google.email};
    return JWT.sign({
    iss: 'VTCMN',
    sub:user.id,
    email,
    group:user.group,
    level:user.level,
    iat: new Date().getTime(), // current time
    exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
  }, JWT_SECRET);
}

exports.signUp = function (req, res) {
  const { email, password, passwordConfirmation } = req.body;
  if (!password || !email) {
    return res.status(422).send({errors: [{title: 'Data missing!', detail: 'Provide email and password!'}]});
  }

  if (password !== passwordConfirmation) {
    return res.status(422).send({errors: [{title: 'Invalid passsword!', detail: 'Password is not a same as confirmation!'}]});
  }

  User.findOne({"local.email": email}, function(err, existingUser) {
    if (err) {
      return res.status(422).send({errors: normalizeErrors(err.errors)});
    }

    if (existingUser) {
      return res.status(422).send({errors: [{title: 'Invalid email!', detail: 'User with this email already exist!'}]});
    }
    const user = new User({
      method: 'local',
      local:{
        email: email,
        password: password
      }
    });
    user.save(function(err) {
      if (err) {
        return res.status(422).send({errors: normalizeErrors(err.errors)});
      }
      return res.json({'registered': true});
    })
  })
}

exports.signIn =  function(req, res) {
  const { email, password } = req.body;
  console.log(email, password);
  if (!password || !email) {
    return res.status(422).send({errors: [{title: 'Data missing!', detail: 'Provide email and password!'}]});
  }

  User.findOne({"local.email": email}, function(err, user) {
    if (err) {
      return res.status(422).send({errors: normalizeErrors(err.errors)});
    }

    if (!user) {
      return res.status(422).send({errors: [{title: 'Invalid User!', detail: 'User does not exist'}]});
    }
    if (user.hasSamePassword(password)) {
      const token = signToken(user);
      return res.json(token);
    } else {
      return res.status(422).send({errors: [{title: 'Wrong Data!', detail: 'Wrong email or password'}]});
    }
  });
}

exports.googleOAuth = function (req, res, next) {
  // Generate token
  const token = signToken(req.user);
  console.log("ID User: "+req.user.id);
  console.log("Token: "+token);
  //user.save();
  return res.json(token);
}

exports.authSecret = function (req, res, next) {
  console.log('UsersController.secret() called');
  res.json({ secret: "resource" });
}


// Middleware auth
function notAuthorized(res) {
  return res.status(401).send({errors: [{title: 'Not authorized!', detail: 'You need to login to get access!'}]});
}

exports.auth = function(req, res, next) {
  console.log('UsersController.secret() called');
  console.log(req.user);
  const user = new User(req.user);
  console.log(user);
  if (!user) {
    console.log("ko co");
    return notAuthorized(res);
  } else {
    console.log("ton tai user"+ user);
    res.locals.user = user;
  }
  res.json({ secret: "resource" });
}
