const express = require('express');
const router = express.Router();
const Metadata = require('../models/metadata.model');
const User = require('../models/user.model');
const { normalizeErrors } = require('../helpers/mongoose');

const UserCtrl = require('../controllers/user.controller');
const MetadataController = require('../controllers/metadata.controller');

router.post('', MetadataController.createMetadata);
router.get('/:id', MetadataController.getMetadataId);
router.get('', MetadataController.listMetadata);
router.delete('/:id', MetadataController.delMetadata);
router.patch('/update', MetadataController.updateMetadata);
module.exports = router;
