const Metadata = require('../models/metadata.model');
const User = require('../models/user.model');
const { normalizeErrors } = require('../helpers/mongoose');
const moment = require('moment');

//-Tạo câu hỏi trong db
exports.listMetadata = function(req, res) {
  console.log('listMeta');
  Metadata.find().sort({CreateAt: -1}).find((function(err,foundMetadata){
      if (err){
        return res.status(422).send({errors: normalizeErrors(err.errors)});
      }
      return res.json(foundMetadata);
    }))
};

exports.getMetadataId = function(req, res) {
  const metadataId = req.params.id;
  Metadata.findById(metadataId).exec(function(err, foundMetadata) {
    if (err || !foundMetadata) {
      return res.status(422).send({errors: [{title: 'Metadata Error!', detail: 'Could not find Metadata!'}]});
    }
    return res.json(foundMetadata);
  });
};

exports.createMetadata = function(req, res){
  const { Category, Channel, CopyrightedEnd, CopyrightedPlatform, CopyrightedStart, Copyrights, CopyrightsStatus, Date, Description, Director, Duration, DVBCategories, EndTimecode, Episode, Extenedtitle, FileCode, FileFormat, FileName, GenredDescription, OnairDate, ProgramEvaluator, PromoteImages, Publisher, Season, StartTimecode, Subtitles, TimeToLive, Title, SubjectandKeywords_ } = req.body;
  const metadata = new Metadata({Category, Channel, CopyrightedEnd, CopyrightedPlatform, CopyrightedStart, Copyrights, CopyrightsStatus, Date, Description, Director, Duration, DVBCategories, EndTimecode, Episode, Extenedtitle, FileCode, FileFormat, FileName, GenredDescription, OnairDate, ProgramEvaluator, PromoteImages, Publisher, Season, StartTimecode, Subtitles, TimeToLive, Title, SubjectandKeywords_});
  metadata.save(function(err) {
    if (err) {
      return res.status(422).send({errors: normalizeErrors(err.errors)});
    }
    return res.json({'METADATA': true});
  })
};

exports.delMetadata = function(req,res) {
  Metadata.findById(req.params.id).exec(function(err, foundMetadata) {
    if (err) {
      return res.status(422).send({errors: normalizeErrors(err.errors)});
    } foundMetadata.remove(function(err) {
      if (err) {
        return res.status(422).send({errors: normalizeErrors(err.errors)});
      }
      return res.json({'status': 'deleted'});
    });
  })
};

exports.updateMetadata = function(req,res) {
  const { _id, Category, Channel, CopyrightedEnd, CopyrightedPlatform, CopyrightedStart, Copyrights, CopyrightsStatus, Date, Description, Director, Duration, DVBCategories, EndTimecode, Episode, Extenedtitle, FileCode, FileFormat, FileName, GenredDescription, OnairDate, ProgramEvaluator, PromoteImages, Publisher, Season, StartTimecode, Subtitles, TimeToLive, Title, SubjectandKeywords_ } = req.body;
  const updateMetadata = { Category, Channel, CopyrightedEnd, CopyrightedPlatform, CopyrightedStart, Copyrights, CopyrightsStatus, Date, Description, Director, Duration, DVBCategories, EndTimecode, Episode, Extenedtitle, FileCode, FileFormat, FileName, GenredDescription, OnairDate, ProgramEvaluator, PromoteImages, Publisher, Season, StartTimecode, Subtitles, TimeToLive, Title, SubjectandKeywords_};
  Metadata.findById(_id).exec(function(err, foundMetadata){
    if(err){
      return res.status(422).send({errors: normalizeErrors(err.errors)});
    }
    console.log(foundMetadata);
    console.log(updateMetadata);
    foundMetadata.set(updateMetadata);
    console.log(foundMetadata);
    foundMetadata.save(function(err){
      if(err){
        return res.status(422).send({errors: normalizeErrors(err.errors)});
      }
      return res.json({'status': 'Update OK'});
    });
  });
  /* Metadata.findById(_id).exec(function(err, foundMetadata) {
    if (err) {
      return res.status(422).send({errors: normalizeErrors(err.errors)});
    } foundMetadata.update(function(err){
      if (err) {
        return res.status(422).send({errors: normalizeErrors(err.errors)});
      }
      return res.json({'status': 'Update OK'});
    });
  }) */
};
