const {Berita} = require('../models/index');
const { where } = require('sequelize');
const fs = require("fs");
const path = require("path");

const getAllBerita = async (req, res) => {
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
}

const getCountBerita = async (req,res)=> {
    try {
        const count = await Berita.count()
        console.log('Jumlah berita:', count);   
        res.status(200).json({count})
    } catch (error) {
        console.error('Error fetching berita:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const getBeritaById = async (req, res) => {
    const { id_berita } = req.params;
    try {
        const berita = await Berita.findOne({
            where: { id_berita },
            attributes: ['id_berita', 'judul', 'isi_berita', 'gambar', 'createdAt'],
        });

        if (!berita) {
            return res.status(404).json({ message: 'Berita not found' });
        }

        res.status(200).json(berita);
    } catch (error) {
        console.error('Error fetching berita by ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const createBerita = async (req, res) => {
    const { judul, isi_berita } = req.body;
    const gambar = req.file.filename;
    try {
          if (!req.file) {
    return res.status(400).json({ message: 'File gambar wajib diunggah.' });
  }
        const newBerita = await Berita.create({
            judul,
            isi_berita,
            gambar
        });
        res.status(201).json(newBerita);
    } catch (error) {
        console.error('Error creating berita:', error);
        res.status(500).json({ message: 'Internal server error' });
    } 
}

const deleteBerita = async (req, res) => {
    const {id_berita} = req.params;
    try {
        const berita = await Berita.findByPk(id_berita);
        if (!berita) {
            return res.status(404).json({ message: 'Berita not found' });
        }

        await berita.destroy();
        return res.status(200).json({ message: 'Berita berhasil dihapus' });

    } catch (error) {
        console.error('Gagal menghapus berita:', error);
        return res.status(500).json({ message: 'Terjadi kesalahan saat menghapus berita' });
    }
}

const updateBerita = async (req, res) => {
    const {id_berita} = req.params;
    try {
        const berita = await Berita.findByPk(id_berita);
        if (!berita) {
            return res.status(404).json({ message: 'Berita not found' });
        }

        const { judul, isi_berita } = req.body;
        if (req.file) {
            const oldImagePath = path.join(__dirname, '../uploads', berita.gambar);
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
      }
      
      berita.gambar = req.file.filename;
    }
        berita.judul = judul || berita.judul;
        berita.isi_berita = isi_berita || berita.isi_berita;

        await berita.save();
        return res.status(200).json(berita);
        
    } catch (error) {
        console.error('Gagal mengedit berita:', error);
        return res.status(500).json({ message: 'Terjadi kesalahan saat mengedit berita' });
    }
}

module.exports = {
    getAllBerita,
    getBeritaById,
    createBerita,
    deleteBerita,
    updateBerita,
    getCountBerita
}