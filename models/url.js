// Import the mongoose library to interact with MongoDB
const mongoose = require("mongoose");

// Define the schema for the URL model
const urlSchema = new mongoose.Schema({
    // The original URL to redirect to
    redirectURL: {
        type: String,
        required: true
    },
    // The generated short URL
    shortUrl: {
        type: String,
        required: true,
        unique: true
    },
    // The total number of clicks the short URL has received
    totalClicks: {
        type: Number,
        default: 0
    },
    // The history of visits to the short URL, each with a timestamp
    visitHistory: [{
        timestamp: {
            type: Number
        }
    }]
}, { timestamps: true }); // Automatically add createdAt and updatedAt timestamps

// Create the Url model using the schema
const Url = mongoose.model("Url", urlSchema);

// Export the Url model to be used in other parts of the application
module.exports = Url;