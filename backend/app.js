const express = require("express");
const awsServerlessExpress = require("aws-serverless-express");
const cors = require("cors");
const tableRoutes = require("./routes/tableRoutes");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();
app.use(express.json());
app.use(cors());

// Use routes from tableRoutes.js
app.use("/api", tableRoutes);
app.use("/auth", authRoutes);
app.use("/products", productRoutes);

app.get("/", (req, res) => {
  res.send("Hello from AWS lambda");
});

app.all('*', (req, res) => {
  res.json({
      message: "Unknown route",
      path: req.path,
      method: req.method,
      headers: req.headers
  });
});


// Create AWS Lambda handler
const server = awsServerlessExpress.createServer(app);

exports.handler = (event, context) => {
  return awsServerlessExpress.proxy(server, event, context);
};