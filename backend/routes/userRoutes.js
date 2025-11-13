// routes/authRoutes.js
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const db = require("../db"); // <-- this is your callback-style mysql2 connection

const toPublicAdmin = (row) => ({
  id: row.id,
  name: row.name,
  email: row.email,
  age: row.age,
});

// POST /api/auth/register
router.post("/register", (req, res) => {
  const { name, email, password, age } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "name, email, password are required" });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: "password must be at least 6 characters" });
  }

  // 1) check if email exists
  db.query("SELECT id FROM admin WHERE email = ?", [email], (err, rows) => {
    if (err) return res.status(500).json({ message: "Server error", error: err.message });
    if (rows.length > 0) return res.status(409).json({ message: "Email already registered" });

    // 2) hash password
    const rounds = Number(process.env.BCRYPT_ROUNDS || 10);
    bcrypt.hash(password, rounds, (hashErr, hash) => {
      if (hashErr) return res.status(500).json({ message: "Server error", error: hashErr.message });

      // 3) insert admin
      db.query(
        "INSERT INTO admin (name, email, password, age) VALUES (?, ?, ?, ?)",
        [name, email, hash, age ?? null],
        (insErr, result) => {
          if (insErr) {
            if (insErr.code === "ER_DUP_ENTRY") {
              return res.status(409).json({ message: "Email already registered" });
            }
            return res.status(500).json({ message: "Server error", error: insErr.message });
          }

          // 4) read back created user (without password)
          db.query(
            "SELECT id, name, email, age FROM admin WHERE id = ?",
            [result.insertId],
            (selErr, rows2) => {
              if (selErr) return res.status(500).json({ message: "Server error", error: selErr.message });
              return res.status(201).json({
                message: "Registered successfully",
                user: toPublicAdmin(rows2[0]),
              });
            }
          );
        }
      );
    });
  });
});

// POST /api/auth/login
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "email and password are required" });

  // 1) find user
  db.query("SELECT * FROM admin WHERE email = ?", [email], (err, rows) => {
    if (err) return res.status(500).json({ message: "Server error", error: err.message });
    if (rows.length === 0) return res.status(401).json({ message: "Invalid email or password" });

    const user = rows[0];

    // 2) compare password
    bcrypt.compare(password, user.password, (cmpErr, ok) => {
      if (cmpErr) return res.status(500).json({ message: "Server error", error: cmpErr.message });
      if (!ok) return res.status(401).json({ message: "Invalid email or password" });

      return res.json({
        message: "Login successful",
        user: toPublicAdmin(user),
      });
    });
  });
});

module.exports = router;
