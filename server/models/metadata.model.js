const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const metadataSchema = new Schema({
  Category:	{ type: String },
  Channel:	{ type: String },
  CopyrightedEnd:	{ type: String },
  CopyrightedPlatform:	{ type: String },
  CopyrightedStart:	{ type: String },
  Copyrights:	{ type: String },
  CopyrightsStatus:	{ type: String },
  Date:	{ type: String },
  Description:	{ type: String },
  Director:	{ type: String },
  Duration:	{ type: String },
  DVBCategories:	{ type: String },
  EndTimecode:	{ type: String },
  Episode:	{ type: String },
  Extenedtitle:	{ type: String },
  FileCode:	{ type: String },
  FileFormat:	{ type: String },
  FileName:	{ type: String },
  GenredDescription:	{ type: String },
  OnairDate:	{ type: String },
  ProgramEvaluator:	{ type: String },
  PromoteImages:	{ type: String },
  Publisher:	{ type: String },
  Season:	{ type: String },
  StartTimecode:	{ type: String },
  SubjectandKeywords_:	{ type: String },
  Subtitles:	{ type: String },
  TimeToLive:	{ type: String },
  Title:	{ type: String },
  CreateAt:{ type: Date, default: Date.now }
});


module.exports = mongoose.model('Metadata', metadataSchema );
