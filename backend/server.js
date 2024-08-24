const express = require('express');
const mysql = require('mysql');
const cors = require('cors')

const app = express();
app.use(express.json());
app.use(cors());

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
    activity: "low",
    goal: "weight_loss"
};

const form = require('./steps/form');
const diet = require('./steps/diet');
const equipment = require('./steps/equipment');

const newPersonalData = (newData) => { personalData = { ...newData } };
const getPersonalData = () => personalData;

app.use(form(newPersonalData));
app.use(diet(db, getPersonalData));
app.use(equipment(db, getPersonalData));

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