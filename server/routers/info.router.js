const express = require('express');
const router = express.Router();
const passport = require('passport');

const InfoController = require('../controllers/info.controller');
const passportJWT = passport.authenticate('jwt', { session: false });

//-Tạo Info01
router.post('/01/', passportJWT, InfoController.createInfo01);
//Lấy toàn bộ Info01
router.get('/01/', InfoController.listInfo01);

//-Tạo Info02
router.post('/02/', passportJWT, InfoController.createInfo02);
//Lấy toàn bộ Info02
router.post('/02/list', passportJWT, InfoController.listInfo02);

//-Tạo Info03
router.post('/03/', passportJWT, InfoController.createInfo03);
//Lấy toàn bộ Info03
router.post('/03/list', passportJWT, InfoController.listInfo03);

//-Tạo Info04
router.post('/04/', passportJWT, InfoController.createInfo04);
//Lấy toàn bộ Info04
router.get('/04/', InfoController.listInfo04);

//Edit Info
router.patch('/edit/', passportJWT, InfoController.editInfo);

//Delete Info
router.post('/del/', passportJWT, InfoController.delInfo);

module.exports = router;
