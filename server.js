const express = require('express');
const mysql = require('mysql');
const cors = require('cors')

const app = express();
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

let db = mysql.createConnection({
    host: 'localhost',
    database: 'healthy_choice',
    user: 'root',
    password: '12345'
})

let personalData = {
    gender: "female",
    age: 0,
    height: 0,
    weight: 0,
    trainingDays: "0-1",
    goal: "weight_loss"
};

app.get('/healthy_choice', (req, res) => {
    res.json(personalData);
})

app.post('/healthy_choice/submitted', (req, res) => {
    personalData = req.body;
    return res.json(req.body);
})

app.get('/healthy_choice/diets', (req, res) => {
    const sql = "SELECT * FROM diets";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        res.json(data);
    })
})
app.get('/healthy_choice/equipment', (req, res) => {
    const sql = "SELECT * FROM equipment";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        res.json(data);
    })
})

app.get('/healthy_choice/supplements', (req, res) => {
    const sql = "SELECT * FROM supplements";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        res.json(data);
    })
})

app.listen(8081, () => {
    console.log("listening");
    db.connect((err) => {
        if (err) return console.log(err);
        console.log('database is connected')
    })
})