const express = require('express');
const router = express.Router();
const informasiControllers = require('../controllers/informasiControllers');
const { authenticateToken } = require("../middleware/authToken");
const upload = require("../middleware/upload");

router.get('/korong', authenticateToken, informasiControllers.getAllKorong);
router.put('/korong/:id_korong', authenticateToken, informasiControllers.updateKorong);

router.get('/fasilitas-korong', authenticateToken, informasiControllers.getAllFasilitasKorong);
router.post('/fasilitas-korong', authenticateToken, informasiControllers.createFasilitasKorong);
router.put('/fasilitas-korong/:id_fasilitas', authenticateToken, informasiControllers.updateFasilitasKorong);
router.delete('/fasilitas-korong/:id_fasilitas', authenticateToken, informasiControllers.deleteFasilitasKorong);

router.get('/informasi-nagari', authenticateToken, informasiControllers.getInformasiNagari);
router.put('/informasi-nagari/:id', authenticateToken,upload.single("struktur"), informasiControllers.updateInformasiNagari);

router.get('/sosial-media', authenticateToken, informasiControllers.getSosialMedia);
router.put('/sosial-media/:id', authenticateToken, informasiControllers.updateSosialMedia);

module.exports = router;