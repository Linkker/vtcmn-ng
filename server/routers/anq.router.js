const express = require('express');
const router = express.Router();
const passport = require('passport');

const AnqController = require('../controllers/anq.controller');
const passportJWT = passport.authenticate('jwt', { session: false });

//-Tạo câu hỏi
router.post('', AnqController.createAnq);

//Lấy messenger của 1 câu hỏi
//router.get('', passportJWT, AnqController.listAnq);
//Lấy toàn bộ câu hỏi
router.get('/auth', AnqController.listAnqAuth); //Bỏ passportJWT để test
router.get('', AnqController.listAnq);

//Xoá câu hỏi
router.delete('/:id', AnqController.delAnq); //passportJWT để test
//Tạo messenger cho câu hỏi
router.post('/mess/', AnqController.createAnqAns); // passportJWT
//Sửa messenger cho câu hỏi
router.patch('/mess/', passportJWT, AnqController.createAnq);

module.exports = router;
