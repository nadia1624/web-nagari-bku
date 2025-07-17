const express = require('express');
const router = express.Router();
const umkmControllers = require('../controllers/umkmControllers');
const {authenticateToken} = require("../middleware/authToken");
const upload = require("../middleware/upload");

router.get('/', authenticateToken, umkmControllers.getAllUmkm);
router.get('/:id_berita', authenticateToken, umkmControllers.getUmkmById);  
router.post('/', authenticateToken, upload.single("gambar"), umkmControllers.createUmkm);
router.delete('/:id_berita', authenticateToken, umkmControllers.deleteUmkm);
router.put('/:id_berita', authenticateToken,upload.single("gambar"), umkmControllers.updateUmkm);   

module.exports = router;