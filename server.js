const express = require("express");
const connectDB = require("./config/db");
const app = express();
const passport = require("passport");
const session = require("express-session");
const { listen } = require("socket.io");
const handleSocket = require("./config/socket");
const  cors = require('cors')


//Enable All CORS Requests
app.use(cors())

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());

app.use(session({ secret: "urlredirect", redirectTo: "" }));

//Passport

app.use(passport.initialize());

require("./config/passport");

// Define Routes

app.use("/api/user", require("./routes/api/user"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/room", require("./routes/api/room"));
app.use("/api/ask", require("./routes/api/ask"));
app.use("/api/feedback", require("./routes/api/feedback"));
app.use("/api/question", require("./routes/api/question"));
app.use("/api/answer", require("./routes/api/answer"));

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () =>
  console.log(`Server started on port ${PORT}`)
);

const io = listen(server);
app.io = io;
handleSocket(io);
