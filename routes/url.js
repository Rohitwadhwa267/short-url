// Import the express library to create a router
const express = require('express');

// Import the controller functions to handle URL generation, analytics, and redirection
const { handleGenerateShortUrl, handleAnalytics, handleRedirectUrl } = require('../controllers/url');

// Create a new router instance
const router  = express.Router();

// Define a POST route to handle the generation of short URLs
router.post('/', handleGenerateShortUrl);

// Define a GET route to handle redirection to the original URL using the short URL
router.get('/:shortUrl', handleRedirectUrl);

// Define a GET route to handle fetching analytics for a short URL
router.get('/analytics/:shortUrl', handleAnalytics);

// Export the router to be used in other parts of the application
module.exports = router;