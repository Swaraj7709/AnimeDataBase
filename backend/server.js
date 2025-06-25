const express = require("express");
const cors = require("cors");
const app = express();
const animeRoutes = require("./routes/anime");

app.use(cors());
app.use(express.json());
app.use("/api/anime", animeRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
