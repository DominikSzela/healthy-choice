const express = require('express');
const app = express();
app.use(express.json());

function getTypeEquipment(age) { //function to check whether the equipment should be less dangerous  
    if (age < 40) {
        return "no";
    }
    else { //personalData.age >= 40
        return "yes"
    }
}

module.exports = (db, getPersonalData) => {
    return app.get('/healthy_choice/equipment', (req, res) => {
        const personalData = getPersonalData();
        const less_dangerous = getTypeEquipment(personalData.age);

        let sql = `SELECT * FROM equipment WHERE type='${personalData.goal}'`;
        if (less_dangerous === "yes") sql += ` AND less_dangerous='${less_dangerous}'`;

        db.query(sql, (err, data) => {
            if (err) return res.json(err);
            res.json(data);
        })
    });
};