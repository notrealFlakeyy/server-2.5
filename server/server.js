const express = require('express');
const path = require('path');
const fs = require('fs');
const { log } = require('console');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../client')));

app.post('/save', (req, res) => {
    const { name, email, pass } = req.body;

    const data = {
        name: name,
        email: email,
        pass: pass
    };

    fs.writeFile('user_data.json', JSON.stringify(data), (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error saving data');
        } else {
            console.log('Data saved to user_data.txt');
            res.status(200).send('Data saved successfully');
        }
    });
});

app.get('/login', (req, res) => {
    res.sendFile(path.resolve('../client/login.html'))
});

app.post('/login', (req, res) => {
    console.log(req.body);
    const user = JSON.parse(fs.readFileSync('user_data.json', 'utf-8'))
    console.log(user)
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
