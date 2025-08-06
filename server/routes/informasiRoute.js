const express = require('express');
const router = express.Router();
const informasiControllers = require('../controllers/informasiControllers');
const {authenticateToken} = require("../middleware/authToken");
const upload = require("../middleware/upload");