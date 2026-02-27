const express = require("express");
const productsRouter = require("./routes/products.js");

const app = express();
app.use(express.json());

app.get("/health", (req, res) => res.json({ status: "ok" }));
app.use("/products", productsRouter);

// Export for tests
module.exports = app;

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`API listening on http://localhost:${port}`));
}