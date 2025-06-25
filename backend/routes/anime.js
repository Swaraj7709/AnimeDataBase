const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", async (req, res) => {
  const { year, genre, season, minRating } = req.query;
  let query = `SELECT * FROM anime_data WHERE 1=1`;
  let params = [];

  if (year) {
    params.push(year);
    query += ` AND year = $${params.length}`;
  }

  if (genre) {
    params.push(`%${genre}%`);
    query += ` AND genres ILIKE $${params.length}`;
  }

  if (season) {
    params.push(season);
    query += ` AND season = $${params.length}`;
  }

  if (minRating) {
    params.push(minRating);
    query += ` AND mean >= $${params.length}`;
  }

  query += ` ORDER BY popularity ASC LIMIT 100`;

  try {
    const result = await db.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch anime data" });
  }
});

module.exports = router;
