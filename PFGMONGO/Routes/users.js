const express = require('express');
const router = express.Router();
const usersControler = require('../Controllers/user');

router.post('/', usersControler.addUser);
router.get('/', usersControler.getUsers);
router.get('/:uid', usersControler.getUid);
router.put('/:uid', usersControler.actUid);
router.delete('/:uid', usersControler.deleteUid);

module.exports = router;