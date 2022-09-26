const mongoose = require("mongoose");

let dbConnectionString;
if (process.env.PRODUCTION) {
    dbConnectionString = process.env.MONGODB_DATABASE_PRODUCTION;
} else {
    dbConnectionString = process.env.MONGODB_DATABASE_DEVELOPMENT;
}

let database = new mongoose.Mongoose();

function connect() {
    console.log(dbConnectionString);
    database.connect(dbConnectionString).catch(e => {
        console.log(e.message);
        setTimeout(connect, 5000);
    });
}
connect();

module.exports = {database, dbConnectionString};