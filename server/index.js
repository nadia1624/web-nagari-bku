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
const { Berita, Umkm, InformasiNagari, SosialMedia, Korong, FasilitasKorong } = require("./models");

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

app.get('/api/profile-nagari', async (req, res) => {
   try {
        const info = await InformasiNagari.findOne({
            order: [['createdAt', 'DESC']],
        });
        res.status(200).json(info);
    } catch (error) {
        console.error('Error fetching informasi nagari:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

app.get('/api/sosial-media', async (req, res) => {
    try {
        const sosmed = await SosialMedia.findOne({
            order: [['createdAt', 'DESC']],
        });
        res.status(200).json(sosmed);
    } catch (error) {
        console.error('Error fetching sosial media:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/api/korong/:korongName', async (req, res) => {
    try {
        const { korongName } = req.params;

        const formattedName = korongName
            .replace(/-/g, ' ')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

        const korong = await Korong.findOne({
            where: { nama_korong: formattedName },
            include: [
                {
                    model: FasilitasKorong,
                    as: 'fasilitas', // Gunakan alias 'fasilitas' sesuai model Korong
                    attributes: ['nama_fasilitas']
                }
            ]
        });

        if (!korong) {
            return res.status(404).json({ message: 'Korong tidak ditemukan' });
        }

        // Menghitung total penduduk dari jumlah pria dan wanita
        const totalPenduduk = (korong.jumlah_pria || 0) + (korong.jumlah_wanita || 0);

        res.status(200).json({
            nama: korong.nama_korong,
            deskripsi: korong.deskripsi_korong || 'Tidak ada deskripsi', // Gunakan atribut `deskripsi_korong`
            penduduk: totalPenduduk,
            fasilitas: korong.fasilitas.map(f => f.nama_fasilitas),
            jumlah_wanita: korong.jumlah_wanita,
            jumlah_pria: korong.jumlah_pria
        });

    } catch (error) {
        console.error('Error fetching korong:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});