const express = require("express");
const noteRoutes = require("./routes/notes.js");
const app = express();
const port = process.env.PORT || 4567;

app.use(express.json());
app.use(noteRoutes);

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
