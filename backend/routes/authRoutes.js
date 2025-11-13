// routes/authRoutes.js
const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../db");

const router = express.Router();

// helper: shape user object (never expose password)
const toPublicAdmin = (row) => ({
  id: row.id,
  name: row.name,
  email: row.email,
  age: row.age,
});

// POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, age } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "name, email, password are required" });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "password must be at least 6 characters" });
    }

    // check existing email
    const [exists] = await db.query("SELECT id FROM admin WHERE email = ?", [email]);
    if (exists.length > 0) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const rounds = Number(process.env.BCRYPT_ROUNDS || 10);
    const hash = await bcrypt.hash(password, rounds);

    const [result] = await db.query(
      "INSERT INTO admin (name, email, password, age) VALUES (?, ?, ?, ?)",
      [name, email, hash, age ?? null]
    );

    // fetch the created user to return a clean object
    const [rows] = await db.query("SELECT id, name, email, age FROM admin WHERE id = ?", [result.insertId]);

    return res.status(201).json({
      message: "Registered successfully",
      user: toPublicAdmin(rows[0]),
    });
  } catch (err) {
    // handle duplicate email race even without unique index
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ message: "Email already registered" });
    }
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "email and password are required" });

    const [rows] = await db.query("SELECT * FROM admin WHERE email = ?", [email]);
    if (rows.length === 0) {
      // same message for security
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // If you want JWT later, generate here. For now return basic profile.
    return res.json({
      message: "Login successful",
      user: toPublicAdmin(user),
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
