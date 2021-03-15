const express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', (req, res, next) => res.sendFile(path.join(__dirname + '/views/index.html')));

app.post('/calculate', (req, res, next) => {
    const input = req.body;
    for (const index in input) {
        input[index] = parseInt(input[index]);
    }

    if (input.tarif == 1) {
        let result = input.a;
        if (input.t > input.k) {
            result += (input.t - input.k) * input.b;
        }
        return res.send('К оплате: ' + result);
    }

    if (input.t <= input.k) {
        return res.send('К оплате: ' + (input.c * input.t));
    }
    return res.send('К оплате: ' + (input.d * input.t));
});

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Listening on port ${port}`));
