console.log("CORRECT SERVER RUNNING");
const express = require("express");

require("dotenv").config();

const connectDB = require("./config/db");

const app = express();
app.get("/test", (req, res) => {
    res.send("TEST ROUTE WORKING");
});
connectDB();

app.use(express.json());

const carRoutes = require("./routes/carRoutes");


app.use("/cars", carRoutes);
//“Whenever someone visits /cars, use routes from carRoutes.js.”

app.listen(5000, () => {
    console.log("Server started on port 5000");
});