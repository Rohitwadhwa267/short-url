// Import the express library to create an Express application
const express = require("express");

// Import the connect function to connect to the MongoDB database
const connect = require("./connect");

// Import the URL router to handle URL-related routes
const urlRouter = require("./routes/url");

// Import the Url model (not used in this file but might be used elsewhere)
const Url = require("./models/url");

// Create a new Express application instance
const app = express();

// Define the port number to listen on, using the environment variable PORT or defaulting to 8080
const PORT = process.env.PORT || 8080;

// Connect to the MongoDB database using the provided connection string
connect("mongodb+srv://rohitwadhwa269:7IdWBIrvRU6tVr9w@short-url.0tgck.mongodb.net/?retryWrites=true&w=majority&appName=short-url")
    .then(() => {
        // Log a message if the connection is successful
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        // Log an error message if the connection fails
        console.error("Failed to connect to MongoDB");
        console.error(err);
    });

// Use the express.json() middleware to parse JSON request bodies
app.use(express.json());

// Use the URL router for routes starting with /url
app.use("/url", urlRouter);

// Use the URL router for routes with a short URL parameter
app.get("/:shortUrl", urlRouter);

// Use the URL router for analytics routes with a short URL parameter
app.get("/analytics/:shortUrl", urlRouter);

// Start the server and listen on the defined port
app.listen(PORT, () => {
    // Log a message indicating that the server is running
    console.log(`Server is running on port ${PORT}`);
});