const winston = require("winston");
const mongoose = require("mongoose");
const { format } = winston;
require("winston-mongodb");
require("dotenv").config();

// Define the MongoDB transport for Winston

// here we are using the MongoDB transport to store the logs in the MongoDB database
// we switched to mongDB transport from file transport as render and many deployment platforms do not support the file system for free plans
// The log can be accessed by the MongoDB Compass or any other MongoDB client
// we are using the info level to store the logs in the database as info allows the logs of info, warn and error
const mongoDBTransport = new winston.transports.MongoDB({
  level: "error", // Log level
  db: process.env.MONGO_URI, // MongoDB connection string
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  handleExceptions: true,

  collection: "logs", // Collection name
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.json()
  ),
});

// Define the logger instance with MongoDB transport
const logger = winston.createLogger({
  transports: [mongoDBTransport],
  exitOnError: false,
});

module.exports = { logger };
