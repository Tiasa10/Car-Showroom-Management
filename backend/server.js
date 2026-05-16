console.log("CORRECT SERVER RUNNING");
const express = require("express");
const cors = require("cors");

require("dotenv").config();

const connectDB = require("./config/db");

const CustomerRoutes =
require("./routes/CustomerRoutes");

const bookingRoutes =
require("./routes/BookingRoutes");

const salesRoutes =
require("./routes/SalesRoutes");

const app = express();
app.use(cors());
app.get("/test", (req, res) => {
    res.send("TEST ROUTE WORKING");
});
connectDB();

app.use(express.json());

const carRoutes = require("./routes/carRoutes");


app.use("/cars", carRoutes);
//“Whenever someone visits /cars, use routes from carRoutes.js.”

app.use("/customers", CustomerRoutes);

app.use("/bookings", bookingRoutes);

app.use("/sales", salesRoutes);
app.listen(5000, () => {
    console.log("Server started on port 5000");
});

app.use(
    "/customers",
    CustomerRoutes
);

app.use(
    "/bookings",
    bookingRoutes
);

app.use(
    "/sales",
    salesRoutes
);