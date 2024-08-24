const express = require('express');
const app = express();
app.use(express.json());

function PPM(personalData) {
    const m = personalData.weight;
    const wz = personalData.height;
    const w = personalData.age;
    const s = personalData.gender === "female" ? -165 : 5;

    return Math.round((10 * m) / 1 + (6.25 * wz / 1) - (5 * w / 1) + s);
}

function CPM(personalData) {
    let k;

    switch (personalData.activity) {
        case "low":
            k = (1.40 + 1.69) / 2;
            break;
        case "moderate":
            k = (1.70 + 1.99) / 2;
            break;
        case "high":
            k = (2.00 + 2.40) / 2;
            break;
        default:
            k = (1.40 + 2.40) / 2; // The average of the lowest ratio for low activity and the highest ratio for high activity
            break;
    }

    return Math.round(PPM(personalData) * k);
}

function getTypeDiet(personalData) {
    if (personalData.age < 40) {
        if (personalData.activity === "low") {
            return "ketogeniczna";
        }
        else {
            return "wysokobiałkowa"
        };
    }
    else { //personalData.age >= 40
        if (personalData.activity === "low") {
            return "śródziemnomorska";
        }
        else {
            return "wysokobiałkowa"
        };
    }
}

module.exports = (db, getPersonalData) => {
    return app.get('/healthy_choice/diet', (req, res) => {
        const personalData = getPersonalData();
        const nameDiet = getTypeDiet(personalData);
        const sql = `SELECT * FROM diets WHERE name='${nameDiet}'`;

        db.query(sql, (err, data) => {
            if (err) return res.json(err);

            const response = {
                ...data[0],
                PPM: PPM(personalData),
                CPM: CPM(personalData)
            };

            res.json(response);
        })
    });
};