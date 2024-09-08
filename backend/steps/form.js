const express = require('express');
const app = express();
app.use(express.json());

module.exports = (newPersonalData) => {
    return app.post('/healthy_choice/submitted', (req, res) => {
        const { gender, age, height, weight, activity, goal } = req.body;
        if (!gender || !age || !height || !weight || !activity || !goal) {
            console.log("missing one of the data");
        }
        console.log("successful");
        newPersonalData(req.body);
    });
};