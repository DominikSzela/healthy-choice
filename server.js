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
    database: 'employee_database',
    user: 'root',
    password: '12345'
})

app.get('/', (req, res) => {
    return res.json("Backend are working :)!");
})

app.get('/employee_database', (re, res) => {
    const sql = "SELECT * FROM employee_info";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        res.json(data);
    })
})

app.post('/submitted', (req, res) => {
    const { waga, wiek, wzrost } = req.body;
    const sql = "INSERT INTO employee_info (waga, wiek, wzrost) VALUES (?, ?, ?)"
    db.query(sql, [waga, wiek, wzrost], (err, result) => {
        if (err) {
            console.log("error INSERT employee_info:", err);
            return res.status(500).json({ message: "inserting error" })
        }
        console.log('inserting result:', result);
        res.json({ "message": "Form submitted" });
    })
})

app.listen(8081, () => {
    console.log("listening");
    db.connect((err) => {
        if (err) return console.log(err);
        console.log('database is connected')
    })
})