const express = require('express');
const posting = express.Router();
const validator = require('../validator/validatorPosting');
const postingHandler = require('../handler/postingHandler');

posting.get('/posting', postingHandler.getPosting); // index
posting.post('/posting', validator.posting, postingHandler.addPosting); // insert
posting.get('/posting/:id', postingHandler.detailPosting); // get by id
posting.patch('/posting/:id', validator.posting, postingHandler.updatePosting); // update
posting.delete('/posting/:id', postingHandler.deletePosting); // delete

module.exports = posting;
