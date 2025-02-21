const { getAllUsers } = require('../Controllers/user.controller');

const Router = require('express').Router();


Router.get('/userList', getAllUsers);

module.exports = Router;
