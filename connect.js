// Import the mongoose library to interact with MongoDB
const mongoose = require('mongoose');

// Define an asynchronous function to connect to the MongoDB database
const connect = async (uri) => {
  try {
    // Attempt to connect to the MongoDB database using the provided URI
    await mongoose.connect(uri);
    // Log a message if the connection is successful
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    // Log an error message if the connection fails
    console.error('Failed to connect to MongoDB Atlas');
    console.error(error);
    // Exit the process with a failure code
    process.exit(1);
  }
};

// Export the connect function to be used in other parts of the application
module.exports = connect;