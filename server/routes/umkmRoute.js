const express = require('express');
const router = express.Router();
const umkmControllers = require('../controllers/umkmControllers');
const {authenticateToken} = require("../middleware/authToken");
const upload = require("../middleware/upload");

router.get('/', authenticateToken, umkmControllers.getAllUmkm);
router.get('/:id_umkm', authenticateToken, umkmControllers.getUmkmById);  
router.post('/', authenticateToken, upload.single("gambar"), umkmControllers.createUmkm);
router.delete('/:id_umkm', authenticateToken, umkmControllers.deleteUmkm);
router.put('/:id_umkm', authenticateToken,upload.single("gambar"), umkmControllers.updateUmkm);   

module.exports = router;