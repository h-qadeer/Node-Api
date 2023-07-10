const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/productModel");

const app = express();
app.use(express.json());
//it's use to change data to form instead of json
// app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hi, Haris Qadeer");
});

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: message.error });
  }
});
app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: message.error });
  }
});
app.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
      return res
        .status(404)
        .json({ message: `cannot find any product with Id ${id}` });
    }
    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: message.error });
  }
});
app.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res
        .status(404)
        .json({ message: `cannot find any product with Id ${id}` });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: message.error });
  }
});

app.post("/products", async (req, res) => {
  try {
    const products = await Product.create(req.body);
    res.status(200).json(products);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: message.error });
  }
});

mongoose
  .connect("mongodb+srv://haris:haris12@node-api.3jdt3vm.mongodb.net/")
  .then(() => {
    console.log("Server Connected");
    app.listen(4000, () => {
      console.log("The Server is connected on port 4000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
