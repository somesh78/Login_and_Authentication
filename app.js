const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const connectDB = require('./config/db')


const app = express();

connectDB();

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false }));

app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
    })
);

app.use(flash());

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

require('./config/passport')(passport);

app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});