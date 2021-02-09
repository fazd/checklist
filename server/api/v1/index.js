const router = require('express').Router();

const tasks = require('./tasks/routes');
const groups = require('./groups/routes');
const users = require('./users/routes');

router.use('/tasks', tasks);
router.use('/groups', groups);
router.use('/users', users);

module.exports = router;
