const express = require('express');
const router = express.Router();
const upload = require("../utils/multer");

const {
  editSchool, addSchool, getAllSchools
} = require('../controllers/school')

router.route('/').get(getAllSchools);
router.route('/').post(upload.any(), addSchool);
router.route('/').patch(upload.any(), editSchool);

module.exports = router;
