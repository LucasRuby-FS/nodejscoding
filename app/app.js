// Import the Express framework
const express = require("express");
// Create an Express application instance
const app = express();
// Import the router that contains API route definitions
const router = require("./routes");
// Built-in Express middleware to parse incoming JSON request bodies
app.use(express.json());

// Actuator endpoint to confirm the service is running
// URL: http://localhost:3000/
app.get("/", (req, res) => {
  res.status(200).json({ message: "Service is up!" });
});
// Mount the API router under the /api context path
// Example: http://localhost:3000/api
app.use("/api", router);

// Catch-all middleware for handling undefined routes
// If no route matches, a 404 error is created and passed to the error handler
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
// Centralized error-handling middleware
// Handles both custom and unexpected server errors
app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ message: err.message, status: err.status });
});
// Export the Express app for use by the server entry point
module.exports = app;
