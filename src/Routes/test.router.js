const { test } = require('../Controllers/test.controller');

const Router = require('express').Router();

Router.get('/test', test);
Router.get('/test', test);


module.exports = Router;