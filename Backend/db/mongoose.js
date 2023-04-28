const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("Successfully connected to database");
})
    .catch((error) => {
        console.error("database connection failed");
        console.error(error);
        process.exit(1);
    });

module.exports = { mongoose };

