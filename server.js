// Import the built-in Node.js HTTP module to create an HTTP server
const http = require("http");
// Load environment variables from a .env file

// This allows configuration like the server port to be stored outside the code
require("dotenv").config();
// Import the Express app instance from app.js
const app = require("./app/app");
// Create an HTTP server using the Express app
// Listen on the port defined in the environment variables (.env file)
http.createServer(app).listen(process.env.PORT, () => {
  // Log a message to confirm the server is running and listening
  console.log("server is running on port", process.env.PORT);
});
