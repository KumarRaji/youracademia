const express = require("express");
const router = express.Router();
const db = require("../db"); // your existing mysql2 createConnection export

// Create (POST /api/features)
router.post("/", async (req, res) => {
  try {
    const { heading, description } = req.body;
    if (!heading) return res.status(400).json({ message: "heading is required" });

    const [result] = await db.query("INSERT INTO feature (heading, description) VALUES (?, ?)", [heading, description ?? null]);
    const [rows] = await db.query("SELECT * FROM feature WHERE id = ?", [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read all (GET /api/features)
router.get("/", async (_req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM feature ORDER BY id DESC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read one (GET /api/features/:id)
router.get("/:id", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM feature WHERE id = ?", [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: "Feature not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update (PUT /api/features/:id)
router.put("/:id", async (req, res) => {
  try {
    const { heading, description } = req.body;
    if (!heading) return res.status(400).json({ message: "heading is required" });

    const [result] = await db.query("UPDATE feature SET heading = ?, description = ? WHERE id = ?", [heading, description ?? null, req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Feature not found" });

    const [rows] = await db.query("SELECT * FROM feature WHERE id = ?", [req.params.id]);
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete (DELETE /api/features/:id)
router.delete("/:id", async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM feature WHERE id = ?", [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Feature not found" });
    res.json({ message: "Feature deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
