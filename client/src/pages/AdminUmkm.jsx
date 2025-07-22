import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  X,
  MapPin,
  Phone,
  User,
  Calendar,
  Upload,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

import api from '../lib/axios';     

const AdminUmkm = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedUmkm, setSelectedUmkm] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  const [formData, setFormData] = useState({
    nama_pemilik: '',
    produk: '',
    alamat: '',
    deskripsi: '',
    no_hp: '',
    gambar: null
  });
  const navigate = useNavigate();

  const [umkmData, setUmkmData] = useState([]);

  const isAnyModalOpen = showAddModal || showDetailModal || showDeleteConfirm;

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
    };
    checkAuth();
    fetchUmkmData();
  }, [navigate]);

  const fetchUmkmData = async () => {
    setLoading(true);
    try {
      const response = await api.get('/umkm');
      setUmkmData(response.data);
    } catch (error) {
      console.error('Error fetching UMKM data:', error);
      setError('Gagal memuat data UMKM');
    } finally {
      setLoading(false);
    }
  };

  const filteredUmkm = umkmData.filter(umkm =>
    umkm.nama_pemilik.toLowerCase().includes(searchTerm.toLowerCase()) ||
    umkm.produk.toLowerCase().includes(searchTerm.toLowerCase()) ||
    umkm.alamat.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUmkm.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUmkm.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append('nama_pemilik', formData.nama_pemilik);
    formDataToSend.append('produk', formData.produk);
    formDataToSend.append('alamat', formData.alamat);
    formDataToSend.append('deskripsi', formData.deskripsi);
    formDataToSend.append('no_hp', formData.no_hp);
    
    if (selectedFile) {
      formDataToSend.append('gambar', selectedFile);
    }

    try {
      if (editMode && selectedUmkm) {
        await api.put(`/umkm/${selectedUmkm.id_umkm}`, formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setSuccess('Data UMKM berhasil diperbarui!');
      } else {
        await api.post('/umkm', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setSuccess('Data UMKM berhasil ditambahkan!');
      }
      
      setShowAddModal(false);
      resetForm();
      fetchUmkmData(); 
    } catch (error) {
      console.error('Error saving UMKM:', error);
      setError(error.response?.data?.message || 'Gagal menyimpan data UMKM. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (umkm) => {
    setSelectedUmkm(umkm);
    setFormData({
      nama_pemilik: umkm.nama_pemilik,
      produk: umkm.produk,
      alamat: umkm.alamat,
      deskripsi: umkm.deskripsi,
      no_hp: umkm.no_hp
    });
    
    if (umkm.gambar) {
      setImagePreview(`http://localhost:5000/uploads/${umkm.gambar}`);
    }
    
    setEditMode(true);
    setShowAddModal(true);
  };

  const handleDetail = async (umkm) => {
    try {
      const response = await api.get(`/umkm/${umkm.id_umkm}`);
      setSelectedUmkm(response.data);
      setShowDetailModal(true);
    } catch (error) {
      console.error('Error fetching UMKM detail:', error);
      setError('Gagal memuat detail UMKM');
    }
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowDeleteConfirm(true);
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await api.delete(`/umkm/${deleteId}`);
      setSuccess('Data UMKM berhasil dihapus!');
      setShowDeleteConfirm(false);
      setDeleteId(null);
      fetchUmkmData(); // Refresh data
    } catch (error) {
      console.error('Error deleting UMKM:', error);
      setError(error.response?.data?.message || 'Gagal menghapus data UMKM');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      nama_pemilik: '',
      produk: '',
      alamat: '',
      deskripsi: '',
      no_hp: ''
    });
    setSelectedFile(null);
    setImagePreview('');
    setEditMode(false);
    setSelectedUmkm(null);
  };

  const closeModal = () => {
    setShowAddModal(false);
    resetForm();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess('');
        setError('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  const AlertMessage = ({ message, type }) => {
    if (!message) return null;
    
    const bgColor = type === 'success' ? 'bg-green-100 border-green-400 text-green-700' : 'bg-red-100 border-red-400 text-red-700';
    
    return (
      <div className={`border px-4 py-3 rounded mb-4 ${bgColor} relative`}>
        <span className="block sm:inline">{message}</span>
        <button
          onClick={() => type === 'success' ? setSuccess('') : setError('')}
          className="absolute top-0 bottom-0 right-0 px-4 py-3"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  };

  const Pagination = () => {
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
      const pageNumbers = [];
      const maxVisiblePages = 5;
      
      let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
      let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      
      if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      
      return pageNumbers;
    };

    return (
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
        
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Menampilkan{' '}
              <span className="font-medium">{indexOfFirstItem + 1}</span> hingga{' '}
              <span className="font-medium">
                {Math.min(indexOfLastItem, filteredUmkm.length)}
              </span>{' '}
              dari <span className="font-medium">{filteredUmkm.length}</span> hasil
            </p>
          </div>
          
          <div>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              
              {getPageNumbers().map((pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                    currentPage === pageNumber
                      ? 'z-10 bg-red-600 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600'
                      : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                  }`}
                >
                  {pageNumber}
                </button>
              ))}
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="sr-only">Next</span>
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    );
  };

  if (loading && umkmData.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className={`bg-white rounded-2xl shadow-xl p-8 ${isAnyModalOpen ? 'blur-sm scale-[0.98] opacity-50' : ''}`}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Manajemen UMKM</h2>
          
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:flex-initial">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Cari UMKM..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full md:w-64 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            
            <button
              onClick={() => {
                resetForm();
                setShowAddModal(true);
              }}
              className="flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200"
            >
              <Plus className="w-5 h-5" />
              <span>Tambah UMKM</span>
            </button>
          </div>
        </div>

        <AlertMessage message={success} type="success" />
        <AlertMessage message={error} type="error" />

        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nama Pemilik
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Produk
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Alamat
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  No. HP
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Gambar
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.map((umkm) => (
                <tr key={umkm.id_umkm} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{umkm.nama_pemilik}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{umkm.produk}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{umkm.alamat}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{umkm.no_hp}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                      <img src={`http://localhost:5000/uploads/${umkm.gambar}`}
                      alt="Foto UMKM" className="w-20 h-20 object-cover rounded-md" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleDetail(umkm)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Lihat Detail"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEdit(umkm)}
                        className="text-green-600 hover:text-green-900"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => confirmDelete(umkm.id_umkm)}
                        className="text-red-600 hover:text-red-900"
                        title="Hapus"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredUmkm.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Tidak ada data UMKM yang ditemukan
            </div>
          )}
        </div>

        <Pagination />
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-md" 
            onClick={closeModal}
          ></div>
          <div className="relative bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-gray-200 z-10">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {editMode ? 'Edit UMKM' : 'Tambah UMKM Baru'}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Pemilik
                </label>
                <input
                  type="text"
                  value={formData.nama_pemilik}
                  onChange={(e) => setFormData({...formData, nama_pemilik: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Produk
                </label>
                <input
                  type="text"
                  value={formData.produk}
                  onChange={(e) => setFormData({...formData, produk: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alamat
                </label>
                <input
                  type="text"
                  value={formData.alamat}
                  onChange={(e) => setFormData({...formData, alamat: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nomor HP
                </label>
                <input
                  type="tel"
                  value={formData.no_hp}
                  onChange={(e) => setFormData({...formData, no_hp: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deskripsi
                </label>
                <textarea
                  value={formData.deskripsi}
                  onChange={(e) => setFormData({...formData, deskripsi: e.target.value})}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gambar
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-200"
                  >
                    <Upload className="w-5 h-5" />
                    <span>Pilih Gambar</span>
                  </label>
                  {imagePreview && (
                    <div className="w-20 h-20 border rounded-lg overflow-hidden">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
                >
                  {loading ? 'Menyimpan...' : (editMode ? 'Update' : 'Simpan')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedUmkm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-md" 
            onClick={() => setShowDetailModal(false)}
          ></div>
          <div className="relative bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-gray-200 z-10">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Detail UMKM</h3>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                {selectedUmkm.gambar && (
                  <div className="w-32 h-32 border rounded-lg overflow-hidden">
                    <img
                    src={`http://localhost:5000/uploads/${selectedUmkm.gambar}`}
                      alt={selectedUmkm.produk}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">{selectedUmkm.produk}</h1>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mt-2">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Terdaftar: {formatDate(selectedUmkm.createdAt)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{selectedUmkm.nama_pemilik}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Informasi Pemilik</h4>
                  <div className="space-y-2">
                    <p><span className="text-gray-600">Nama:</span> <span className="font-medium">{selectedUmkm.nama_pemilik}</span></p>
                    <p className="flex items-center"><Phone className="w-4 h-4 mr-2 text-gray-400" /><span className="font-medium">{selectedUmkm.no_hp}</span></p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Informasi Usaha</h4>
                  <div className="space-y-2">
                    <p><span className="text-gray-600">Produk:</span> <span className="font-medium">{selectedUmkm.produk}</span></p>
                    <p className="flex items-center"><MapPin className="w-4 h-4 mr-2 text-gray-400" /><span className="font-medium">{selectedUmkm.alamat}</span></p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Deskripsi</h4>
                <p className="text-gray-700 leading-relaxed">{selectedUmkm.deskripsi}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Tanggal Registrasi</p>
                <p className="text-lg font-bold text-gray-800">{formatDate(selectedUmkm.createdAt)}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-md" 
            onClick={() => {
              setShowDeleteConfirm(false);
              setDeleteId(null);
            }}
          ></div>
          <div className="relative bg-white rounded-lg p-6 w-full max-w-md shadow-2xl border-2 border-gray-200 z-10">
            <h3 className="text-lg font-semibold mb-4">Konfirmasi Hapus</h3>
            <p className="text-gray-600 mb-6">
              Apakah Anda yakin ingin menghapus data UMKM ini? Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setDeleteId(null);
                }}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
              >
                {loading ? 'Menghapus...' : 'Hapus'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUmkm;