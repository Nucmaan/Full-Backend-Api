require('dotenv').config()

const app = require("./app.js");
const db = require('./Database/dbConnection.js');

const PORT = process.env.PORT || 7001;

db.connect((err) => {
    if (err){
        console.error('Error connecting to the database:', err);
        process.exit(1);
    }else{
        console.log('Connected to the database successfully');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }
});


