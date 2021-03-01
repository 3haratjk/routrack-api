require('./models/User');
require('./models/Track');
const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('./middlewares/requireAuth');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');

const app = express();

const port = process.env.PORT;
const mongoUri = 'mongodb+srv://admin:passwordpassword@cluster0.rtnra.gcp.mongodb.net/trackme?retryWrites=true&w=majority';

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true
});

mongoose.connection.on('connected', () => console.log('connected to mongodb'));

mongoose.connection.on('error', (err) => console.error('unable to connect to mongodb: ', err));


app.use(express.json());

app.use(authRoutes);

app.use(trackRoutes);

app.get('/', requireAuth, (req, res) => {
    res.send(`Your email is ${req.user.email}`);
});


app.get('/favicon.ico', (req, res) => {
    res.sendFile('./favicon.ico');
})


app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});