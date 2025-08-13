const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

module.exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("Received username:", username);
    console.log("Received password:", password);

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "username and password are required" });
    }

    const user = await User.findOne({ where: { username: username } });
    if (!user) {
      console.log("User not found");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log(user);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ user }, process.env.SECRET_TOKEN, {
      expiresIn: "1d",
    });
    console.log("Token created successfully");

    res.json({ id: user.id, token });
    console.log("berhasil login");
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Error logging in", error });
  }
};

module.exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = req.user; 

    if (!user) {
      return res.status(401).json({ message: "Pengguna tidak ditemukan." });
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Kata sandi lama salah." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.update({ password: hashedPassword }, { where: { id: user.id } });

    res.status(200).json({ message: "Kata sandi berhasil diubah." });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ message: "Terjadi kesalahan server saat mengubah kata sandi." });
  }
};