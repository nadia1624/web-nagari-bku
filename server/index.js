const express = require('express');
const cors = require('cors');
const path = require("path");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const authRoutes = require("./routes/authRoute");
const beritaRoutes = require("./routes/beritaRoute");
const umkmRoutes = require("./routes/umkmRoute");
const informasiRoutes = require("./routes/informasiRoute");
const { Berita, Umkm } = require("./models");

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/berita", beritaRoutes)
app.use("/umkm", umkmRoutes)
app.use("/informasi-nagari", informasiRoutes);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
  res.send('API is working!');
});

app.get('/api/geojson', (req, res) => {
  const geojsonPath = path.join(__dirname, '../data','nagari_batukalang_utara.geojson');
  res.sendFile(geojsonPath, (err) => {
    if (err) {
      console.error("Error sending GeoJSON file:", err);
      res.status(500).send('Error loading GeoJSON data.');
    }
  });
});

app.get('/api/agricultural-geojson', (req, res) => {
  const geojsonPath = path.join(__dirname, '../data','agricultural_batukalang_utara.geojson');
  res.sendFile(geojsonPath, (err) => {
    if (err) {
      console.error("Error sending GeoJSON file:", err);
      res.status(500).send('Error loading GeoJSON data.');
    }
  });
});

app.get('/api/korong/:korongName', (req, res) => {
  const { korongName } = req.params;
  const korongDetails = {
    "korong-a": { name: "Korong A", description: "Detail lengkap Korong A...", population: "1500 jiwa" },
  };
  if (korongDetails[korongName]) {
    res.json(korongDetails[korongName]);
  } else {
    res.status(404).send('Korong not found');
  }
});

app.get('/api/berita', async (req, res) => {
   try {
        const berita = await Berita.findAll({
        order: [['createdAt', 'DESC']],
        attributes: ['id_berita', 'judul', 'isi_berita', 'gambar', 'createdAt'],
        });
        res.status(200).json(berita);
    } catch (error) {
        console.error('Error fetching berita:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/api/berita/:id_berita', async (req, res) => {
    const { id_berita } = req.params;
    try {
        const berita = await Berita.findOne({
            where: { id_berita },
            attributes: ['id_berita', 'judul', 'isi_berita', 'gambar', 'createdAt'],
        });

        if (!berita) {
            return res.status(404).json({ message: 'Berita tidak ditemukan' });
        }

        res.status(200).json(berita);
    } catch (error) {
        console.error('Error fetching detail berita:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.get('/api/umkm', async (req, res) => {
    try {
        const umkm = await Umkm.findAll({
        order: [['createdAt', 'DESC']],
        attributes : ['id_umkm', 'nama_pemilik', 'produk', 'alamat','deskripsi','gambar','no_hp', 'createdAt']
        });
        res.status(200).json(umkm);
    } catch (error) {
        console.error('Error fetching umkm:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/api/umkm/:id_umkm', async (req, res) => { 
    const { id_umkm } = req.params;
    try {
        const umkm = await Umkm.findOne({
            where: { id_umkm },
            attributes: ['id_umkm', 'nama_pemilik', 'produk', 'alamat','deskripsi','gambar','no_hp', 'createdAt'],
        });

        if (!umkm) {
            return res.status(404).json({ message: 'UMKM not found' });
        }

        res.status(200).json(umkm);
    } catch (error) {
        console.error('Error fetching umkm by ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});