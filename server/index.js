const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const authRoutes = require("./routes/authRoute");

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);

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


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});