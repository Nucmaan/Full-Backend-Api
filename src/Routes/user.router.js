const { getAllUsers, AddNewUser, GetSingleUser, deleteUser, updateUser } = require('../Controllers/user.controller');

const Router = require('express').Router();

Router.get('/userList', getAllUsers);
Router.post('/createUser', AddNewUser);
Router.get('/getSingleUser/:userId', GetSingleUser);
Router.delete('/deleteUser/:userId', deleteUser);
Router.put('/updateUser/:userId', updateUser);

module.exports = Router;
