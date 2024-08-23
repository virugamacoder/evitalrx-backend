const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const path = require("path");
const { connectDB } = require("./dbConfig/db");
// const extraRouter = require("./routes/extra");
const userRoute = require("./routes/User");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
dotenv.config();
connectDB();

app.use("/", userRoute);

const PORT = process.env.PORT || 8080;

// Server setup to listen on port
app.listen(PORT, () => {
  console.log("Server is running at ", PORT);
});
