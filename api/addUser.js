const express = require('express');
const router = express.Router();
const {addUser} = require('../controllers/user_controller');

// Add a task to the database
router.post('/user', addUser);

module.exports = router;