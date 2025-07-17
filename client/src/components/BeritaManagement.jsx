import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Eye,
  Calendar,
  Image,
  X,
  Save,
  AlertCircle
} from 'lucide-react';

const BeritaManagement = () => {
  const [beritaList, setBeritaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedBerita, setSelectedBerita] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [formData, setFormData] = useState({
    judul: '',
    isi_berita: '',
    gambar: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const API_URL = 'http://localhost:5000/api/berita';

  useEffect(() => {
    fetchBerita();
  }, []);

  const fetchBerita = async () => {
    try {
      const response = await axios.get(API_URL);
      setBeritaList(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching berita:', error);
      setError('Gagal memuat data berita');
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      if (editMode && selectedBerita) {
        await axios.put(`${API_URL}/${selectedBerita.id_berita}`, formData, config);
        setSuccess('Berita berhasil diperbarui!');
      } else {
        await axios.post(API_URL, formData, config);
        setSuccess('Berita berhasil ditambahkan!');
      }

      setShowModal(false);
      resetForm();
      fetchBerita();
    } catch (error) {
      console.error('Error saving berita:', error);
      setError('Gagal menyimpan berita. Silakan coba lagi.');
    }
  };

  const handleEdit = (berita) => {
    setSelectedBerita(berita);
    setFormData({
      judul: berita.judul,
      isi_berita: berita.isi_berita,
      gambar: berita.gambar || ''
    });
    setEditMode(true);
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess('Berita berhasil dihapus!');
      setShowDeleteConfirm(false);
      setDeleteId(null);
      fetchBerita();
    } catch (error) {
      console.error('Error deleting berita:', error);
      setError('Gagal menghapus berita');
    }
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowDeleteConfirm(true);
  };

  const resetForm = () => {
    setFormData({
      judul: '',
      isi_berita: '',
      gambar: ''
    });
    setEditMode(false);
    setSelectedBerita(null);
  };

  const filteredBerita = beritaList.filter(berita =>
    berita.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
    berita.isi_berita.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Manajemen Berita</h2>
        
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:flex-initial">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Cari berita..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full md:w-64 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          
          <button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200"
          >
            <Plus className="w-5 h-5" />
            <span>Tambah Berita</span>
          </button>
        </div>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center">
          <AlertCircle className="w-5 h-5 mr-2" />
          {success}
        </div>
      )}
      
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center">
          <AlertCircle className="w-5 h-5 mr-2" />
          {error}
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">No</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Judul</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Tanggal</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Gambar</th>
              <th className="text-center py-3 px-4 font-semibold text-gray-700">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredBerita.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-8 text-gray-500">
                  Tidak ada berita ditemukan
                </td>
              </tr>
            ) : (
              filteredBerita.map((berita, index) => (
                <tr key={berita.id_berita} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">{index + 1}</td>
                  <td className="py-4 px-4">
                    <div className="max-w-xs">
                      <p className="font-medium text-gray-800 truncate">{berita.judul}</p>
                      <p className="text-sm text-gray-500 truncate">{berita.isi_berita}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(berita.createdAt).toLocaleDateString('id-ID')}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    {berita.gambar ? (
                      <div className="flex items-center text-green-600">
                        <Image className="w-4 h-4 mr-1" />
                        <span className="text-sm">Ada</span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">Tidak ada</span>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => handleEdit(berita)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => confirmDelete(berita.id_berita)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                        title="Hapus"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-800">
                  {editMode ? 'Edit Berita' : 'Tambah Berita Baru'}
                </h3>
                <button
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Judul Berita <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.judul}
                  onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Isi Berita <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.isi_berita}
                  onChange={(e) => setFormData({ ...formData, isi_berita: e.target.value })}
                  rows="6"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL Gambar
                </label>
                <input
                  type="text"
                  value={formData.gambar}
                  onChange={(e) => setFormData({ ...formData, gambar: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200"
                >
                  <Save className="w-4 h-4" />
                  <span>{editMode ? 'Simpan Perubahan' : 'Tambah Berita'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mb-4">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Hapus Berita</h3>
              <p className="text-gray-600 mb-6">
                Apakah Anda yakin ingin menghapus berita ini? Tindakan ini tidak dapat dibatalkan.
              </p>
              <div className="flex justify-center space-x-3">
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setDeleteId(null);
                  }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BeritaManagement;