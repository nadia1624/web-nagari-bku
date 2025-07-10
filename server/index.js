const express = require('express');
const cors = require('cors');
const path = require('path'); // Tambahkan ini
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is working!');
});

// Endpoint baru untuk melayani file GeoJSON
app.get('/api/geojson', (req, res) => {
  const geojsonPath = path.join(__dirname, '../data', ' nagari_batukalang_utara.geojson');
  res.sendFile(geojsonPath, (err) => {
    if (err) {
      console.error("Error sending GeoJSON file:", err);
      res.status(500).send('Error loading GeoJSON data.');
    }
  });
});

// Opsional: Endpoint untuk mendapatkan detail korong (jika kamu ingin memuatnya dari backend)
app.get('/api/korong/:korongName', (req, res) => {
  const { korongName } = req.params;
  // Di sini kamu bisa membaca data detail korong dari database atau file JSON
  // Untuk contoh sederhana, kita bisa mengirimkan respons dummy
  const korongDetails = {
    "korong-a": { name: "Korong A", description: "Detail lengkap Korong A...", population: "1500 jiwa" },
    // ... tambahkan detail untuk korong lainnya
  };
  if (korongDetails[korongName]) {
    res.json(korongDetails[korongName]);
  } else {
    res.status(404).send('Korong not found');
  }
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});