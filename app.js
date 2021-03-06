require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const firebase = require('firebase');

const config = {
    apiKey: process.env.APP_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID
};

firebase.initializeApp(config)
// const ref = firebase.database().ref();

const app = express()
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/uploadImage', (req, res) => {
res.setHeader('Access-Control-Allow-Origin', '*');
    var ref = firebase.database().ref();
    firebase.database().ref().push(req.body);
    ref.once('value', (snapshot) => {
        var value = snapshot.val()
        var result = Object.keys(value).map((key) => value[key]);
        // result = result.push(req.body);
        // res.send(result.reverse());
        firebase.database().ref().set(result.reverse());
    })
});

app.get('/allImages', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var ref = firebase.database().ref();
    ref.once('value', (snapshot) => {
        var value = snapshot.val()
        var result = Object.keys(value).map((key) => value[key]);
        res.send(result);
    })
})

app.delete('/images/:id', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var ref = firebase.database().ref();
    ref.child(req.params.id).remove()
    ref.once('value', (snapshot) => {
            var array = snapshot.val()
        firebase.database().ref().set(array);
    })
})


app.listen((process.env.PORT || 8000),() => {
})
