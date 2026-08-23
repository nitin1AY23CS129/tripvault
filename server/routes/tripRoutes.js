const express = require("express");
const Trip = require("../models/Trip");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();


// =========================
// CREATE TRIP
// =========================

router.post("/", authMiddleware, async (req, res) => {
    try {
        const {
            title,
            destination,
            startDate,
            endDate,
            description
        } = req.body;

        // Check required fields
        if (!title || !destination || !startDate || !endDate) {
            return res.status(400).json({
                message:
                    "Please provide title, destination, start date and end date"
            });
        }

        // Check date order
        if (new Date(endDate) < new Date(startDate)) {
            return res.status(400).json({
                message:
                    "End date cannot be before start date"
            });
        }

        // Create trip
        const trip = await Trip.create({
            title,
            destination,
            startDate,
            endDate,
            description,
            user: req.user.userId
        });

        res.status(201).json({
            message: "Trip created successfully",
            trip
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});


// =========================
// GET MY TRIPS
// =========================

router.get("/", authMiddleware, async (req, res) => {
    try {
        const trips = await Trip.find({
            user: req.user.userId
        }).sort({ createdAt: -1 });

        res.json({
            trips
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});


// =========================
// GET SINGLE TRIP
// =========================

router.get("/:id", authMiddleware, async (req, res) => {
    try {
        const trip = await Trip.findOne({
            _id: req.params.id,
            user: req.user.userId
        });

        if (!trip) {
            return res.status(404).json({
                message: "Trip not found"
            });
        }

        res.json({
            trip
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});


// =========================
// UPDATE TRIP
// =========================

router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const {
            title,
            destination,
            startDate,
            endDate,
            description
        } = req.body;

        // Check required fields
        if (!title || !destination || !startDate || !endDate) {
            return res.status(400).json({
                message:
                    "Please provide title, destination, start date and end date"
            });
        }

        // Check date order
        if (new Date(endDate) < new Date(startDate)) {
            return res.status(400).json({
                message:
                    "End date cannot be before start date"
            });
        }

        // Update only logged-in user's trip
        const trip = await Trip.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user.userId
            },
            {
                title,
                destination,
                startDate,
                endDate,
                description
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!trip) {
            return res.status(404).json({
                message: "Trip not found"
            });
        }

        res.json({
            message: "Trip updated successfully",
            trip
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});


// =========================
// DELETE TRIP
// =========================

router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const trip = await Trip.findOneAndDelete({
            _id: req.params.id,
            user: req.user.userId
        });

        if (!trip) {
            return res.status(404).json({
                message: "Trip not found"
            });
        }

        res.json({
            message: "Trip deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});


// =========================
// UPLOAD TRIP PHOTO
// =========================

router.post(
    "/:id/photos",
    authMiddleware,
    upload.single("photo"),
    async (req, res) => {

        try {

            // Check if image was uploaded
            if (!req.file) {
                return res.status(400).json({
                    message: "Please select an image"
                });
            }


            // Find user's trip
            const trip = await Trip.findOne({
                _id: req.params.id,
                user: req.user.userId
            });


            if (!trip) {
                return res.status(404).json({
                    message: "Trip not found"
                });
            }


            // Create image path
            const photoPath =
                `/uploads/${req.file.filename}`;


            // Add photo to array
            trip.photos.push(photoPath);


            // Save trip
            await trip.save();


            res.status(201).json({
                message:
                    "Photo uploaded successfully",

                photo: photoPath,

                trip
            });


        } catch (error) {

            console.log(
                "Photo upload error:",
                error
            );


            res.status(500).json({
                message: "Server error",
                error: error.message
            });

        }

    }
);


module.exports = router;