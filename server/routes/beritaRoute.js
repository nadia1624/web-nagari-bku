const express = require('express');
const router = express.Router();
const beritaControllers = require('../controllers/beritaControllers');
const {authenticateToken} = require("../middleware/authToken");
const upload = require("../middleware/upload");

router.get('/', authenticateToken, beritaControllers.getAllBerita);
router.get('/:id_berita', authenticateToken, beritaControllers.getBeritaById);  
router.post('/', authenticateToken, upload.single("gambar"), beritaControllers.createBerita);
router.delete('/:id_berita', authenticateToken, beritaControllers.deleteBerita);
router.put('/:id_berita', authenticateToken, upload.single("gambar"), beritaControllers.updateBerita); 

module.exports = router;