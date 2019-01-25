const Info = require('../models/info.model');
const User = require('../models/user.model');
const { normalizeErrors } = require('../helpers/mongoose');
const moment = require('moment');

//-Thêm info01
exports.createInfo01 = function(req, res){
  const { userId, content } = req.body;
  User.findById(userId, (function(err,foundUser){
    if (foundUser.level!='mod'&&foundUser.level!='admin'&&foundUser.level!='sa'){
      console.log(foundUser.level);
      return res.status(422).send({errors: [{title: 'Invalid User!', detail: 'Cannot create notice because you not admin!'}]});
    }
    const info01 = new Info({
      category: 'tab01',
      group: foundUser.group,
      content: content,
      infoEmail: foundUser.getValue(foundUser.method).email,
    });
    console.log(info01);
    info01.save(function(err) {
      if (err) {
        return res.status(422).send({errors: normalizeErrors(err.errors)});
      }
      return res.json({'info': true});
    })
  }))
};

exports.listInfo01 = function(req, res) {
  Info.find().sort({CreateAt: -1}).find({ 'category':'tab01' },function(err,foundInfos){
    if (err){
      return res.status(422).send({errors: normalizeErrors(err.errors)});
    }
    return res.json(foundInfos);
  })
}

//-Thêm info02
exports.createInfo02 = function(req, res){
  const { userId, content } = req.body;
  User.findById(userId, (function(err,foundUser){
    if (foundUser.level!='mod'&&foundUser.level!='admin'&&foundUser.level!='sa'){
      console.log(foundUser.level);
      return res.status(422).send({errors: [{title: 'Invalid User!', detail: 'Cannot create notice because you not admin!'}]});
    }
    const info02 = new Info({
      category: 'tab02',
      group: foundUser.group,
      content: content,
      infoEmail: foundUser.getValue(foundUser.method).email,
    });
    console.log(info02);
    info02.save(function(err) {
      if (err) {
        return res.status(422).send({errors: normalizeErrors(err.errors)});
      }
      return res.json({'info': true});
    })
  }))
};

exports.listInfo02 = function(req, res) {
  const {userId} = req.body;
  console.log('id'+userId);
  User.findById(userId, (function(err,foundUser){
    if (foundUser.group==='none'){
      return res.status(422).send({errors: [{title: 'Invalid User!', detail: 'because you not admin!'}]});
    }
    else {
      Info.find().sort({CreateAt: -1}).find({ 'category':'tab02' },function(err,foundInfos){
        if (err){
          return res.status(422).send({errors: normalizeErrors(err.errors)});
        }
        return res.json(foundInfos);
      })
    }
  }))
};

//-Thêm info03
exports.createInfo03 = function(req, res){
  const { userId, content } = req.body;
  User.findById(userId, (function(err,foundUser){
    if (foundUser.level!='mod'&&foundUser.level!='admin'&&foundUser.level!='sa'){
      console.log(foundUser.level);
      return res.status(422).send({errors: [{title: 'Invalid User!', detail: 'because you not admin!'}]});
    }
    const info03 = new Info({
      category: 'tab03',
      group: foundUser.group,
      content: content,
      infoEmail: foundUser.getValue(foundUser.method).email,
    });
    console.log(info03);
    info03.save(function(err) {
      if (err) {
        return res.status(422).send({errors: normalizeErrors(err.errors)});
      }
      return res.json({'info': true});
    })
  }))
};

exports.listInfo03 = function(req, res) {
  const {userId} = req.body;
  User.findById(userId, (function(err,foundUser){
    if (foundUser.group!='tonghop'&&foundUser.group!='noidung'&&foundUser.group!='thehien'&&foundUser.group!='hkcn'&&foundUser.group!='trungtam'){
      return res.status(422).send({errors: [{title: 'Invalid User!', detail: 'Cannot create notice because you not admin!'}]});
    }
    else {
      if (foundUser.group==='trungtam') {
        Info.find().sort({CreateAt: -1}).find({ 'category':'tab03' },function(err,foundInfos){
          if (err){
            return res.status(422).send({errors: normalizeErrors(err.errors)});
          }
          return res.json(foundInfos);
        })
      }
      else {
        Info.find({'group': foundUser.group}).sort({CreateAt: -1}).find({ 'category':'tab03' },function(err,foundInfos){
          if (err){
            return res.status(422).send({errors: normalizeErrors(err.errors)});
          }
          return res.json(foundInfos);
        })
      }
    }
  }))
};

//-Thêm info04
exports.createInfo04 = function(req, res){
  const { userId, content } = req.body;
  User.findById(userId, (function(err,foundUser){
    if (foundUser.level!='mod'&&foundUser.level!='admin'&&foundUser.level!='sa'){
      console.log(foundUser.level);
      return res.status(422).send({errors: [{title: 'Invalid User!', detail: 'Cannot create notice because you not admin!'}]});
    }
    const info04 = new Info({
      category: 'tab04',
      group: foundUser.group,
      content: content,
      infoEmail: foundUser.getValue(foundUser.method).email,
    });
    console.log(info04);
    info04.save(function(err) {
      if (err) {
        return res.status(422).send({errors: normalizeErrors(err.errors)});
      }
      return res.json({'info': true});
    })
  }))
};

exports.listInfo04 = function(req, res) {
  Info.find().sort({CreateAt: -1}).find({ 'category':'tab04' },function(err,foundInfos){
    if (err){
      return res.status(422).send({errors: normalizeErrors(err.errors)});
    }
    return res.json(foundInfos);
  })
}

// Sửa - Xóa
exports.editInfo = function(req, res){
  const { userId, _id, editcontent } = req.body;
  User.findById(userId, (function(err,foundUser){
    if(err){
      return res.status(422).send({errors: [{title: 'Invalid User!', detail: 'Have not User!'}]});
    }
    if (foundUser.level!='mod'&&foundUser.level!='admin'&&foundUser.level!='sa'){
      console.log(foundUser.level);
      return res.status(422).send({errors: [{title: 'Invalid User!', detail: 'Cannot create notice because you not admin!'}]});
    }
    Info.findById(_id).exec(function(err, foundInfo){
      if(err){
        return res.status(422).send({errors: normalizeErrors(err.errors)});
      }
      foundInfo.set({content:editcontent});
      foundInfo.save(function(err){
        if(err){
          return res.status(422).send({errors: normalizeErrors(err.errors)});
        }
        return res.json({'status': 'Update OK'});
      });
    });
  }));
};

exports.delInfo = function(req, res){
  const { userId, _id} = req.body;
  User.findById(userId, (function(err,foundUser){
    if(err){
      return res.status(422).send({errors: [{title: 'Invalid User!', detail: 'Have not User!'}]});
    }
    if (foundUser.level!='mod'&&foundUser.level!='admin'&&foundUser.level!='sa'){
      return res.status(422).send({errors: [{title: 'Invalid User!', detail: 'Cannot create notice because you not admin!'}]});
    }
    Info.findById(_id).exec(function(err, foundInfo){
      if(err){
        return res.status(422).send({errors: normalizeErrors(err.errors)});
      };
      foundInfo.remove(function(err) {
        if (err) {
          return res.status(422).send({errors: normalizeErrors(err.errors)});
        }
        return res.json({'status': 'deleted'});
      });
    })
  }))
};

