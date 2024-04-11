const express = require("express");
const app = express();
app.use(express.json());

let items = [1, 2, 4];

// GET 
app.get("/items", (req, res) => {
  res.json(items);
});

// GET 
app.get("/items/:index", (req, res) => {
  const index = req.params.index;
  const item = items[index];
  if (item !== undefined) {
    res.json(item);
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});

// POST 
app.post("/items", (req, res) => {
  const newItem = req.body;
  console.log(newItem)
  items.push(newItem);
  console.log(items)
  res.status(201).json({ message: "Item added successfully" });
});

// UPDATE
app.put("/items/:index", (req, res) => {
  const index = req.params.index;
  const newItem = req.body.item; 
  if (items[index] !== undefined) {
    items[index] = newItem;
    res.json({ message: "Item updated successfully" });
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});

// DELETE 
app.delete("/items/:index", (req, res) => {
  const index = req.params.index;
  if (items[index] !== undefined) {
    items.splice(index, 1);
    res.sendStatus(204);
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
