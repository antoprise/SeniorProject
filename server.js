const express = require('express');
const connectDB = require('./config/db');
const app = express();
const passport = require('passport');
const cookieSession = require('cookie-session');
const  cors = require('cors')

app.use(cors())

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());

//Passport

// app.use(
//     cookieSession({
//       maxAge: 30 * 24 * 60 * 60 * 1000,
//       keys: ['fwfeeadajksdkjasdkakwkfwe']
//     })
//   );
app.use(passport.initialize());
// app.use(passport.session());
require("./config/passport");



// Define Routes

app.use('/api/user', require('./routes/api/user'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/room', require('./routes/api/room'));
app.use('/api/ask', require('./routes/api/ask'));
app.use('/api/feedback', require('./routes/api/feedback'));
app.use('/api/question', require('./routes/api/question'));




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));