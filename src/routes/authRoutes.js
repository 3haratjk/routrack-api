const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = mongoose.model('User');

const router = express.Router();

router.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = new User({ email, password });
        await user.save();

        const token = jwt.sign({ userId: user._id }, 'khuljasimsim');

        res.send({ token });
    } catch (err) {
        res.status(422).send(err.message);
    }
});

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(422).send({ error: 'Must provide email and password' });
    }

    const user = await User.findOne({ email });

    if (!user) {
        res.status(422).send({ error: 'Invalid User' });
    }

    try {
        await user.comparePassword(password);
        const token = await jwt.sign({ userId: user._id }, 'khuljasimsim');
        res.send({ token });
    } catch (err) {
        res.status(422).send({ error: 'Invalid email or password' });
    }
})

module.exports = router;