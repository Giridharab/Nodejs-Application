// app.js
const express = require('express');
const app = express();
app.use(express.json());

app.get('/api/status', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

app.post('/api/add', (req, res) => {
    const { num1, num2 } = req.body;
    if (typeof num1 !== 'number' || typeof num2 !== 'number') {
        return res.status(400).json({ error: 'Invalid input' });
    }
    res.status(200).json({ result: num1 + num2 });
});

module.exports = app;

