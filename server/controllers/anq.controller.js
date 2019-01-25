const Anq = require('../models/anq.model');
const User = require('../models/user.model');
const { normalizeErrors } = require('../helpers/mongoose');
const moment = require('moment');

//-Tạo câu hỏi trong db
exports.createAnq = function(req, res){
  console.log('Vào CreareAnd controller'+req.body);
  const { feedbackName, feedbackTitle, feedbackMessenger } = req.body;
  const anq = new Anq({
    feedbackName: feedbackName,
    feedbackTitle: feedbackTitle,
    feedbackMessenger: feedbackMessenger});
  anq.save(function(err) {
    if (err) {
      return res.status(422).send({errors: normalizeErrors(err.errors)});
    }
    return res.json({'ANQ': true});
  })
};

//-Lấy danh sách câu hỏi trong db
exports.listAnq = function(req, res) {
  //Anq.find().sort({feedbackCreateAt: -1}).find({ 'feedbackAnswer': { $gt: [] } },(function(err,foundAnqs){
    Anq.find().sort({feedbackCreateAt: -1}).find({ 'feedbackAnswer':{ $exists: true, $not: { $size: 0 }} },(function(err,foundAnqs){
      if (err){
        return res.status(422).send({errors: normalizeErrors(err.errors)});
      }
      console.log('0');
      return res.json(foundAnqs);
    }))
};

//-Lấy danh sách câu hỏi trong db khi có tài khoản
exports.listAnqAuth = function(req, res) {
  Anq.find().sort({feedbackCreateAt: -1}).find((function(err,foundAnqs){
      if (err){
        return res.status(422).send({errors: normalizeErrors(err.errors)});
      }
      console.log('1');
      return res.json(foundAnqs);
    }))
};

//-Xoá 1 câu hỏi (trưởng phòng xoá)
exports.delAnq = function(req,res) {
    Anq.remove({ _id: req.params.id
      }, function (err) { if (err) return res.send(err);
          res.json({ message: 'Deleted' });
      }
    );
};

//-Tạo 1 câu trả lời (trưởng phòng xoá)
exports.createAnqAns = function(req,res){
  console.log('vao node');
  const { anqId, messenger, messengerEmail} = req.body;
  console.log(anqId, messenger, messengerEmail);
    const anq = new Anq ({
      feedbackAnswer: {
        messenger:messenger,
        messengerEmail: messengerEmail
      }
    });
  console.log(anq.feedbackAnswer);
  Anq.findOneAndUpdate({_id: anqId}, {$push:{feedbackAnswer:anq.feedbackAnswer}},
    function (error, success) {
      if (error) {
        return res.status(422).send({errors: normalizeErrors(error.errors)});
      }
      return res.json({'ANSWER': true});
    }
  );
};


