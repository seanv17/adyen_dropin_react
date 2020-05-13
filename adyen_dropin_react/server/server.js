const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 8080;

const paymentMethodHeader = {
    'Content-Type': 'application/json',
    'x-API-key': 'AQEyhmfxK4zJbBZDw0m/n3Q5qf3VaY9UCJ1+XWZe9W27jmlZiniYHPZ+YtXG9dYfNdwN0H8QwV1bDb7kfNy1WIxIIkxgBw==-uA2G0DS73SlmB4EHi/YNndhli7KlCMjXHbMmm8stboc=-djvcdM2gNHq9dSvC'
};

const paymentMethodBody = {
    "merchantAccount": 'TestAccountNY',
    "countryCode": "US",
    "shopperLocale": "en-US",
    "amount": {
        "currency": "USD",
        "value": 1000
    } 
};

app.get('/paymentMethods', (req, res) => {
    req.url = 'http://dummy.restapiexample.com/api/v1/employees';
    // req.header = paymentMethodHeader;
    // req.body = paymentMethodBody;
    console.log(res.json);
    return res.json;
});

app.get('/', (req, res) => {
    return res.send('Hello World!');
});

app.get('/ping', (req, res) => {
    return res.send('pong');
});


app.listen(port, () => console.log(`server runnning on port ${port}`));