const express = require("express");
const router = express.Router();

//In-memory Storage
let dataStorage = [
  { id: 1, title: "First", data: "First item" },
  { id: 2, title: "Second", data: "Second Item" },
];

// GET ALL
// localhost3000/api vvvv
router.get("/", (req, res) => {
  res.status(200).json(dataStorage);
});

//GET BY ID
//localhost:3000/api/id
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const todo = dataStorage.find((obj) => obj.id == id);

  res.status(200).json(todo || {});
});
//POST - add a new object
router.post("/", (req, res) => {
  const newObj = {
    id: req.body.id || Math.floor(Math.random() * 200),
    ...req.body,
  };

  dataStorage.push(newObj);
  res.status(200).json(newObj);
});
//PUT BY ID - update an object
//localhost:3000/api/id

router.put("/:id", (req, res) => {
  const id = req.params.id;

  dataStorage = dataStorage.map((obj) =>
    obj.id == id ? { ...obj, ...req.body } : obj
  );

  res.status(200).json({ id, updated: req.body });
});

//DELETE BY ID - remove an object
//localhost:3000/api/id

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  dataStorage = dataStorage.filter((obj) => obj.id != id);

  res.status(200).json({ message: "Deleted", id });
});
module.exports = router;
