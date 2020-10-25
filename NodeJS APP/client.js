const express = require('express');
const axios = require('axios');
const ejs = require('ejs');
const app = express();
const port = 8000;

app.set('view engine', 'ejs');

let mock_record = [];
let userTone;

function getUser() {
    axios.get('http://localhost:8080/user')
        .then(function (response) {
            mock_record = response.data;
        })
        .catch(function (error) {
            console.log(error);
        })
}

async function createUser() {
    /** Get User Tone */
    await axios.get('http://localhost:5000/tone')
        .then(function (response) {
            userTone = response.data;
        })
        .catch(function (error) {
            console.log(error);
        })


    const mockData =
    {
        "firstName": "Super",
        "lastName": "Man",
        "email": "superman@dc.com",
        "tone": userTone
    }
    await axios.post('http://localhost:8080/user', mockData)
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
}

function getUserTone() {
    axios.get('http://localhost:5000/tone')
        .then(function (response) {
            userTone = response.data;
        })
        .catch(function (error) {
            console.log(error);
        })
}

app.get('/', (req, res) => {
    getUser();
    createUser();
    setTimeout(() => {
        res.render(__dirname + '/index.ejs', {
            mock_record: mock_record,
            userTone: userTone
        });
    }, 1000);
});

app.listen(port, () => {
    console.log(`Client app listening on port ${port}!`)
});