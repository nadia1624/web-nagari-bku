const {Umkm} = require('../models/index');
const { where } = require('sequelize');
const fs = require("fs");
const path = require("path");

const getAllUmkm = async(req, res) => {
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
}

const getCountUmkm = async( req, res) => {
    try {
        const count = await Umkm.count()
        res.status(200).json({count})
    } catch (error) {
        console.error('Error fetching umkm:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const getUmkmById = async (req, res) => {
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
}

const createUmkm = async (req, res) => {
    const { nama_pemilik, produk, alamat, deskripsi, no_hp } = req.body;
    const gambar = req.file.filename;
    try {
        const newUmkm = await Umkm.create({
            nama_pemilik, 
            produk, 
            alamat, 
            deskripsi, 
            no_hp,
            gambar
        });
        res.status(201).json(newUmkm);
    } catch (error) {
        console.error('Error creating Umkm:', error);
        res.status(500).json({ message: 'Internal server error' });
    } 
}

const deleteUmkm = async (req, res) => {
    const {id_umkm} = req.params;
    try {
        const umkm = await Umkm.findByPk(id_umkm);
        if (!umkm) {
            return res.status(404).json({ message: 'Umkm not found' });
        }

        await umkm.destroy();
        return res.status(200).json({ message: 'Umkm berhasil dihapus' });

    } catch (error) {
        console.error('Gagal menghapus Umkm:', error);
        return res.status(500).json({ message: 'Terjadi kesalahan saat menghapus Umkm' });
    }
}

const updateUmkm = async (req, res) => {
    const {id_umkm} = req.params;
    try {
        const umkm = await Umkm.findByPk(id_umkm);
        if (!umkm) {
            return res.status(404).json({ message: 'Umkm not found' });
        }
        
        const { nama_pemilik, produk, alamat, deskripsi, no_hp } = req.body;

        if (req.file) {
            const oldImagePath = path.join(__dirname, '../uploads', umkm.gambar);
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }
            umkm.gambar = req.file.filename;
        }

        umkm.nama_pemilik = nama_pemilik || umkm.nama_pemilik;
        umkm.produk = produk || umkm.produk;
        umkm.alamat = alamat || umkm.alamat;
        umkm.deskripsi = deskripsi || umkm.deskripsi;
        umkm.no_hp = no_hp || umkm.no_hp;

        await umkm.save();
        return res.status(200).json(umkm);
        
    } catch (error) {
        console.error('Gagal mengedit Umkm:', error);
        return res.status(500).json({ message: 'Terjadi kesalahan saat mengedit Umkm' });
    }
}

module.exports = {
    getAllUmkm,
    getUmkmById,
    createUmkm,
    deleteUmkm,
    updateUmkm,
    getCountUmkm
}