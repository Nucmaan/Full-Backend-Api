const express = require("express");
const cors = require('cors')

const app = express();


app.use(cors(
    {
        origin: process.env.CORS_ORIGIN,
        credentials: true,
        methods: 'GET, POST, PUT, DELETE, PATCH'
    }
));

app.use(express.json());

app.use(express.static('public/images'));


// import my routes here

const testRouter = require('./Routes/test.router');
const UserRouter = require('./Routes/user.router');

app.use('/api', testRouter);
app.use('/api/user', UserRouter);



module.exports = app;
