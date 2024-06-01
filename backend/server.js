const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// Configuración de rutas
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
