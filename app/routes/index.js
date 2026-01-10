// Import the Express framework to handle HTTP requests and routing
const express = require("express");
// Create an Express Router instance for modular route handling
const router = express.Router();

// In-memory data storage using a JavaScript array
// This array stores objects while the server is running
let dataStorage = [
  { id: 1, data: "First item" },
  { id: 2, data: "Second Item" },
];

// GET ALL
// Express GET route that returns all stored data
// URL: http://localhost:3000/{context-name}
router.get("/", (req, res) => {
  res.status(200).json(dataStorage);
});

// GET BY ID
// Express GET route with a dynamic route parameter (:id)
// URL: http://localhost:3000/{context-name}/45
router.get("/:id", (req, res) => {
  const id = req.params.id; // Express parses route parameters

  const todo = dataStorage.find((obj) => obj.id == id);

  res.status(200).json(todo || {});
});
// POST
// Express POST route to add a new object to the array
// URL: http://localhost:3000/{context-name}
router.post("/", (req, res) => {
  const newObj = {
    id: req.body.id || Math.floor(Math.random() * 200),
    ...req.body, // Express provides req.body via middleware
  };

  dataStorage.push(newObj); // Add object to in-memory storage
  res.status(200).json(newObj);
});
// PUT BY ID
// Express PUT route to update an object by ID
// URL: http://localhost:3000/{context-name}/89

router.put("/:id", (req, res) => {
  const id = req.params.id;
  // Update matching object while keeping array structure
  dataStorage = dataStorage.map((obj) =>
    obj.id == id ? { ...obj, ...req.body } : obj
  );

  res.status(200).json({ id, updated: req.body });
});

// DELETE BY ID
// Express DELETE route to remove an object by ID
// URL: http://localhost:3000/{context-name}/9

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  dataStorage = dataStorage.filter((obj) => obj.id != id);

  res.status(200).json({ message: "Deleted", id });
});
// Export the router so it can be mounted in the Express app
module.exports = router;
