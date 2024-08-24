const express = require('express');
const app = express();
app.use(express.json());

module.exports = (db, getPersonalData) => {
    return app.get('/healthy_choice/supplements', (req, res) => {
        const personalData = getPersonalData();
        const sql = `SELECT * FROM supplements WHERE type='${personalData.goal}' AND activity='${personalData.activity}'`;

        db.query(sql, (err, data) => {
            if (err) return res.json(err);
            res.json(data);
        })
    });
};