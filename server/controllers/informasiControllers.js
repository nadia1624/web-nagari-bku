const { Korong, FasilitasKorong, InformasiNagari, SosialMedia } = require('../models/index');
const { where } = require('sequelize');
const fs = require("fs");
const path = require("path");

const getAllKorong = async (req, res) => {
    try {
        const korongs = await Korong.findAll({
            include: [{ model: FasilitasKorong, as: 'fasilitas' }],
            order: [['createdAt', 'DESC']],
        });
        res.status(200).json(korongs);
    } catch (error) {
        console.error('Error fetching korong:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const updateKorong = async (req, res) => {
    const { id_korong } = req.params;
    const { nama_korong, deskripsi_korong, jumlah_pria, jumlah_wanita } = req.body;
    try {
        const korong = await Korong.findByPk(id_korong);
        if (!korong) {
            return res.status(404).json({ message: 'Korong not found' });
        }
        korong.nama_korong = nama_korong || korong.nama_korong;
        korong.deskripsi_korong = deskripsi_korong || korong.deskripsi_korong;
        korong.jumlah_pria = jumlah_pria || korong.jumlah_pria;
        korong.jumlah_wanita = jumlah_wanita || korong.jumlah_wanita;
        await korong.save();
        return res.status(200).json(korong);
    } catch (error) {
        console.error('Error updating korong:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
const getAllFasilitasKorong = async (req, res) => {
    try {
        const fasilitas = await FasilitasKorong.findAll({
            include: [{ model: Korong, as: 'korong', attributes: ['nama_korong'] }],
            order: [['createdAt', 'DESC']],
        });
        res.status(200).json(fasilitas);
    } catch (error) {
        console.error('Error fetching fasilitas korong:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const createFasilitasKorong = async (req, res) => {
    const { id_korong, nama_fasilitas } = req.body;
    try {
        const newFasilitas = await FasilitasKorong.create({
            id_korong,
            nama_fasilitas,
        });
        res.status(201).json(newFasilitas);
    } catch (error) {
        console.error('Error creating fasilitas korong:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updateFasilitasKorong = async (req, res) => {
    const { id_fasilitas } = req.params;
    const { id_korong, nama_fasilitas } = req.body;
    try {
        const fasilitas = await FasilitasKorong.findByPk(id_fasilitas);
        if (!fasilitas) {
            return res.status(404).json({ message: 'Fasilitas not found' });
        }
        fasilitas.id_korong = id_korong || fasilitas.id_korong;
        fasilitas.nama_fasilitas = nama_fasilitas || fasilitas.nama_fasilitas;
        await fasilitas.save();
        return res.status(200).json(fasilitas);
    } catch (error) {
        console.error('Error updating fasilitas korong:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteFasilitasKorong = async (req, res) => {
    const { id_fasilitas } = req.params;
    try {
        const fasilitas = await FasilitasKorong.findByPk(id_fasilitas);
        if (!fasilitas) {
            return res.status(404).json({ message: 'Fasilitas not found' });
        }
        await fasilitas.destroy();
        return res.status(200).json({ message: 'Fasilitas berhasil dihapus' });
    } catch (error) {
        console.error('Error deleting fasilitas korong:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const getInformasiNagari = async (req, res) => {
    try {
        const info = await InformasiNagari.findOne({
            order: [['createdAt', 'DESC']],
        });
        res.status(200).json(info);
    } catch (error) {
        console.error('Error fetching informasi nagari:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updateInformasiNagari = async (req, res) => {
    const { id } = req.params;
    const { deskripsi, visi, misi, kontak, email, vidio, jam_pelayanan } = req.body;
    try {
        const info = await InformasiNagari.findByPk(id);
        if (!info) {
            return res.status(404).json({ message: 'Informasi Nagari not found' });
        }
         if (req.file) {
                    const oldImagePath = path.join(__dirname, '../uploads', info.struktur);
                    if (fs.existsSync(oldImagePath)) {
                        fs.unlinkSync(oldImagePath);
              }
              
              info.struktur = req.file.filename;
            }
        info.deskripsi = deskripsi || info.deskripsi;
        info.visi = visi || info.visi;
        info.misi = misi || info.misi;
        info.kontak = kontak || info.kontak;
        info.email = email || info.email;
        info.vidio = vidio || info.vidio;
        info.jam_pelayanan = jam_pelayanan || info.jam_pelayanan;
        await info.save();
        return res.status(200).json(info);
    } catch (error) {
        console.error('Error updating informasi nagari:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const getSosialMedia = async (req, res) => {
    try {
        const sosmed = await SosialMedia.findOne({
            order: [['createdAt', 'DESC']],
        });
        res.status(200).json(sosmed);
    } catch (error) {
        console.error('Error fetching sosial media:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updateSosialMedia = async (req, res) => {
    const { id } = req.params;
    const { facebook, instagram, x, youtube } = req.body;
    try {
        const sosmed = await SosialMedia.findByPk(id);
        if (!sosmed) {
            return res.status(404).json({ message: 'Sosial Media not found' });
        }
        sosmed.facebook = facebook || sosmed.facebook;
        sosmed.instagram = instagram || sosmed.instagram;
        sosmed.x = x || sosmed.x;
        sosmed.youtube = youtube || sosmed.youtube;
        await sosmed.save();
        return res.status(200).json(sosmed);
    } catch (error) {
        console.error('Error updating sosial media:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getAllKorong,
    updateKorong,
    getAllFasilitasKorong,
    createFasilitasKorong,
    updateFasilitasKorong,
    deleteFasilitasKorong,
    getInformasiNagari,
    updateInformasiNagari,
    getSosialMedia,
    updateSosialMedia,
};