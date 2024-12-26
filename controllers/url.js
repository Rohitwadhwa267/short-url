// Import the shortid library to generate unique short URLs
const shortid = require('shortid');

// Import the Url model to interact with the database
const Url = require('../models/url');

// Define an asynchronous function to handle the generation of short URLs
async function handleGenerateShortUrl(req, res) {
    // Extract the body from the request object
    const body = req.body;

    // Check if the URL is provided in the request body
    if (!body.url) {
        // If the URL is not provided, return a 400 Bad Request response with an error message
        return res.status(400).json({ error: "URL is required" });
    }

    // Find if the URL already exists in the database
    const existingUrl = await Url.findOne({ redirectURL: body.url });

    // If the URL already exists, return a 200 OK response with the existing short URL
    if (existingUrl) {
        return res.status(200).json({ shortUrl: existingUrl.shortUrl });
    }

    // Generate a new short URL using the shortid library
    const shortUrl = shortid.generate();

    // Create a new URL entry in the database with the provided URL, generated short URL, and an empty visit history
    await Url.create({
        redirectURL: body.url,
        shortUrl: shortUrl,
        visitHistory: []
    });

    // Return a 201 Created response with the newly generated short URL
    return res.status(201).json({ shortUrl: shortUrl });
}

// Define an asynchronous function to handle analytics for a short URL
async function handleAnalytics(req, res) {
    // Extract the short URL from the request parameters
    const shortUrl = req.params.shortUrl;

    // Find the URL entry in the database using the short URL
    const url = await Url.findOne({ shortUrl });

    // Return a JSON response with the total clicks and visit history of the URL
    return res.json({
        totalClicks: url.totalClicks,
        visitHistory: url.visitHistory
    });
}

// Define an asynchronous function to handle redirection to the original URL
async function handleRedirectUrl(req, res) {
    // Extract the short URL from the request parameters
    const shortUrl = req.params.shortUrl;

    // Find and update the URL entry in the database, incrementing the total clicks and adding a timestamp to the visit history
    const redirectUrl = await Url.findOneAndUpdate(
        { shortUrl },
        { $inc: { totalClicks: 1 }, $push: { visitHistory: { timestamp: Date.now() } } }
    );

    // If the URL is not found, return a 404 Not Found response with an error message
    if (!redirectUrl) {
        return res.status(404).json({ error: "URL not found" });
    }

    // Redirect the client to the original URL
    res.redirect(redirectUrl.redirectURL);
}

// Export the functions to be used in other parts of the application
module.exports = { handleGenerateShortUrl, handleAnalytics, handleRedirectUrl };