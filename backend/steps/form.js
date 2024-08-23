const express = require('express');
const app = express();
app.use(express.json());

module.exports = (newPersonalData) => {
    return app.post('/healthy_choice/submitted', (req, res) => {
        const { gender, age, height, weight, activity, goal } = req.body;
        if (!gender || !age || !height || !weight || !activity || !goal) {
            return res.status(400).json({ error: "missing one of the data" });
        }
        res.status(200).json({ message: "successful" });

        newPersonalData(req.body);
    });
};