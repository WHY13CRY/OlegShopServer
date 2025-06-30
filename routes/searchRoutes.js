const express = require('express');
const router = express.Router();
const { searchUserItem } = require('../controllers/searchController');

router.get('/', searchUserItem);

module.exports = router;
