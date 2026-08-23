const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const tripRoutes = require("./routes/tripRoutes");

const app = express();


// ========================================
// MIDDLEWARE
// ========================================

app.use(cors());

app.use(express.json());

// Make uploaded images accessible
app.use(
    "/uploads",
    express.static("uploads")
);


// ========================================
// ROUTES
// ========================================

app.use(
    "/api/auth",
    authRoutes
);

app.use(
    "/api/trips",
    tripRoutes
);


// ========================================
// MONGODB CONNECTION
// ========================================

mongoose
    .connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 10000
    })
    .then(() => {

        console.log(
            "MongoDB connected successfully"
        );

        console.log(
            "MongoDB connection state:",
            mongoose.connection.readyState
        );

    })
    .catch((error) => {

        console.log(
            "MongoDB connection error:",
            error.message
        );

    });


// ========================================
// TEST ROUTE
// ========================================

app.get("/", (req, res) => {

    res.send(
        "Welcome to TripVault API"
    );

});


// ========================================
// START SERVER
// ========================================

const PORT =
    process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(
        `Server running on port ${PORT}`
    );

});