require('dotenv').config();
const express = require('express');
const app = express();
const Student = require('./models/student')
const mongoose = require('mongoose');
const connectDb = () => {
    return mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
};

app.get('/', function (req, res) {
    return res.send('Hello world');
});

app.get('/test', function (req, res) {
    Student.find({}, function (err, students) {
        if (err) return console.error(err);
        res.send(students);
    })
});


connectDb().then(async () => {
    app.listen(process.env.PORT, () =>
        console.log(`Example app listening on port ${process.env.PORT}!`),
    );
});


// app.listen(process.env.PORT || 8080);