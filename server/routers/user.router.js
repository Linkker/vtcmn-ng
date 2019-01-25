const express = require('express');
const router = express.Router();
const routerPromise = require('express-promise-router')();
const passport = require('passport');
const passportConf = require('../passport');

const { validateBody, schemas } = require('../helpers/routeHelpers');
const UsersController = require('../controllers/user.controller');
const passportSignIn = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });
const passportGoogle = passport.authenticate('googleToken', { session: false });

router.post('/signup', UsersController.signUp);
router.post('/signin', UsersController.signIn);
router.post('/oauth/google', passportGoogle, UsersController.googleOAuth);
router.get('/auth', passportJWT, UsersController.auth);
router.post('/auth', passportJWT, UsersController.auth);

module.exports = router;
