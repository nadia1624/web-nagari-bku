import React, { useState, useEffect } from 'react';
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
  ChevronRight,
  Users,
  Building,
  Info,
  Share2,
  Home
} from 'lucide-react';

const AdminInformasi = () => {
  const [activeTab, setActiveTab] = useState('korong');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showAddFasilitasModal, setShowAddFasilitasModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedKorongForFasilitas, setSelectedKorongForFasilitas] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Form data states
  const [formData, setFormData] = useState({});
  const [fasilitasFormData, setFasilitasFormData] = useState({
    nama_fasilitas: ''
  });

  // Sample data - replace with actual API calls
  const [korongData, setKorongData] = useState([
    {
      id_korong: 1,
      nama_korong: 'Korong Tinggi',
      deskripsi_korong: 'Korong dengan wilayah perbukitan',
      jumlah_wanita: 120,
      jumlah_pria: 115,
      createdAt: '2024-01-15T10:00:00Z',
      fasilitas: [
        { id_fasilitas: 1, nama_fasilitas: 'Masjid Al-Ikhlas', id_korong: 1 },
        { id_fasilitas: 2, nama_fasilitas: 'Sekolah Dasar', id_korong: 1 },
        { id_fasilitas: 3, nama_fasilitas: 'Posyandu', id_korong: 1 }
      ]
    },
    {
      id_korong: 2,
      nama_korong: 'Korong Rendah',
      deskripsi_korong: 'Korong dengan wilayah dataran',
      jumlah_wanita: 95,
      jumlah_pria: 88,
      createdAt: '2024-01-20T10:00:00Z',
      fasilitas: [
        { id_fasilitas: 4, nama_fasilitas: 'Surau Baitul Makmur', id_korong: 2 },
        { id_fasilitas: 5, nama_fasilitas: 'Puskesmas Pembantu', id_korong: 2 }
      ]
    }
  ]);

  const [fasilitasData, setFasilitasData] = useState([
    {
      id_fasilitas: 1,
      id_korong: 1,
      nama_fasilitas: 'Masjid Al-Ikhlas',
      korong: { nama_korong: 'Korong Tinggi' }
    },
    {
      id_fasilitas: 2,
      id_korong: 1,
      nama_fasilitas: 'Sekolah Dasar',
      korong: { nama_korong: 'Korong Tinggi' }
    },
    {
      id_fasilitas: 3,
      id_korong: 1,
      nama_fasilitas: 'Posyandu',
      korong: { nama_korong: 'Korong Tinggi' }
    },
    {
      id_fasilitas: 4,
      id_korong: 2,
      nama_fasilitas: 'Surau Baitul Makmur',
      korong: { nama_korong: 'Korong Rendah' }
    },
    {
      id_fasilitas: 5,
      id_korong: 2,
      nama_fasilitas: 'Puskesmas Pembantu',
      korong: { nama_korong: 'Korong Rendah' }
    }
  ]);

  const [informasiData, setInformasiData] = useState([
    {
      id: 1,
      deskripsi: 'Nagari yang berkembang dengan pesat',
      visi: 'Menjadi nagari yang sejahtera dan mandiri',
      misi: 'Meningkatkan kesejahteraan masyarakat',
      struktur: 'Wali Nagari, Sekretaris, Bendahara',
      kontak: '0751-123456',
      email: 'nagari@example.com',
      vidio: 'https://youtube.com/watch?v=abc123',
      jam_pelayanan: '08:00 - 16:00'
    }
  ]);

  const [sosialMediaData, setSosialMediaData] = useState([
    {
      id: 1,
      facebook: 'https://facebook.com/nagari',
      instagram: 'https://instagram.com/nagari',
      x: 'https://x.com/nagari',
      youtube: 'https://youtube.com/nagari'
    }
  ]);

  const tabs = [
    { id: 'korong', name: 'Korong', icon: Home, count: korongData.length },
    { id: 'fasilitas', name: 'Fasilitas', icon: Building, count: fasilitasData.length },
    { id: 'informasi', name: 'Informasi Nagari', icon: Info, count: informasiData.length },
    { id: 'sosmed', name: 'Sosial Media', icon: Share2, count: sosialMediaData.length }
  ];

  const isAnyModalOpen = showAddModal || showDetailModal || showDeleteConfirm || showAddFasilitasModal;

  const getActiveData = () => {
    switch (activeTab) {
      case 'korong': return korongData;
      case 'fasilitas': return fasilitasData;
      case 'informasi': return informasiData;
      case 'sosmed': return sosialMediaData;
      default: return [];
    }
  };

  const getFilteredData = () => {
    const data = getActiveData();
    if (!searchTerm) return data;
    
    return data.filter(item => {
      switch (activeTab) {
        case 'korong':
          return item.nama_korong.toLowerCase().includes(searchTerm.toLowerCase()) ||
                 item.deskripsi_korong?.toLowerCase().includes(searchTerm.toLowerCase());
        case 'fasilitas':
          return item.nama_fasilitas.toLowerCase().includes(searchTerm.toLowerCase()) ||
                 item.korong?.nama_korong.toLowerCase().includes(searchTerm.toLowerCase());
        case 'informasi':
          return item.deskripsi?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                 item.visi?.toLowerCase().includes(searchTerm.toLowerCase());
        case 'sosmed':
          return item.facebook?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                 item.instagram?.toLowerCase().includes(searchTerm.toLowerCase());
        default:
          return false;
      }
    });
  };

  // Handler functions
  const resetForm = () => {
    setFormData({});
    setEditMode(false);
    setSelectedItem(null);
  };

  const closeModal = () => {
    setShowAddModal(false);
    setShowDetailModal(false);
    setShowAddFasilitasModal(false);
    setSelectedKorongForFasilitas(null);
    setFasilitasFormData({ nama_fasilitas: '' });
    resetForm();
  };

  const handleAdd = () => {
    resetForm();
    setShowAddModal(true);
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setFormData(item);
    setEditMode(true);
    setShowAddModal(true);
  };

  const handleDetail = (item) => {
    setSelectedItem(item);
    setShowDetailModal(true);
  };

  const handleConfirmDelete = (id) => {
    setDeleteId(id);
    setShowDeleteConfirm(true);
  };

  const handleDelete = () => {
    // Simulate delete
    setSuccess('Data berhasil dihapus!');
    setShowDeleteConfirm(false);
    setDeleteId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate save
    if (editMode) {
      setSuccess('Data berhasil diperbarui!');
    } else {
      setSuccess('Data berhasil ditambahkan!');
    }
    setShowAddModal(false);
    resetForm();
  };

  // Fasilitas specific handlers
  const handleAddFasilitas = (korong) => {
    setSelectedKorongForFasilitas(korong);
    setFasilitasFormData({ nama_fasilitas: '' });
    setShowAddFasilitasModal(true);
  };

  const handleSubmitFasilitas = (e) => {
    e.preventDefault();
    // Simulate adding fasilitas
    const newFasilitas = {
      id_fasilitas: Date.now(), // temporary ID
      id_korong: selectedKorongForFasilitas.id_korong,
      nama_fasilitas: fasilitasFormData.nama_fasilitas,
      korong: { nama_korong: selectedKorongForFasilitas.nama_korong }
    };

    // Add to fasilitasData
    setFasilitasData(prev => [...prev, newFasilitas]);

    // Update korongData to include new fasilitas
    setKorongData(prev => prev.map(korong => {
      if (korong.id_korong === selectedKorongForFasilitas.id_korong) {
        return {
          ...korong,
          fasilitas: [...(korong.fasilitas || []), newFasilitas]
        };
      }
      return korong;
    }));

    setSuccess('Fasilitas berhasil ditambahkan!');
    setShowAddFasilitasModal(false);
    setSelectedKorongForFasilitas(null);
    setFasilitasFormData({ nama_fasilitas: '' });
  };

  const handleDeleteFasilitas = (fasilitasId, korongId) => {
    // Remove from fasilitasData
    setFasilitasData(prev => prev.filter(f => f.id_fasilitas !== fasilitasId));
    
    // Remove from korongData
    setKorongData(prev => prev.map(korong => {
      if (korong.id_korong === korongId) {
        return {
          ...korong,
          fasilitas: (korong.fasilitas || []).filter(f => f.id_fasilitas !== fasilitasId)
        };
      }
      return korong;
    }));

    setSuccess('Fasilitas berhasil dihapus!');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

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

  const renderTable = () => {
    const filteredData = getFilteredData();
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    switch (activeTab) {
      case 'korong':
        return (
          <div className="space-y-6">
            {currentItems.map((korong) => (
              <div key={korong.id_korong} className="bg-white border border-gray-200 rounded-lg shadow-sm">
                {/* Korong Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-start space-x-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{korong.nama_korong}</h3>
                          <p className="text-gray-600 text-sm mb-3">{korong.deskripsi_korong}</p>
                          <div className="flex items-center space-x-6">
                            <div className="text-center">
                              <p className="text-xl font-bold text-blue-600">{korong.jumlah_pria}</p>
                              <p className="text-xs text-gray-500">Pria</p>
                            </div>
                            <div className="text-center">
                              <p className="text-xl font-bold text-pink-600">{korong.jumlah_wanita}</p>
                              <p className="text-xs text-gray-500">Wanita</p>
                            </div>
                            <div className="text-center">
                              <p className="text-xl font-bold text-green-600">{korong.jumlah_pria + korong.jumlah_wanita}</p>
                              <p className="text-xs text-gray-500">Total</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-4 lg:mt-0">
                      <button
                        onClick={() => handleDetail(korong)}
                        className="flex items-center space-x-1 px-3 py-2 text-sm text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                        title="Lihat Detail"
                      >
                        <Eye className="w-4 h-4" />
                        <span>Detail</span>
                      </button>
                      <button
                        onClick={() => handleEdit(korong)}
                        className="flex items-center space-x-1 px-3 py-2 text-sm text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                        title="Edit Korong"
                      >
                        <Edit className="w-4 h-4" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleConfirmDelete(korong.id_korong)}
                        className="flex items-center space-x-1 px-3 py-2 text-sm text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                        title="Hapus Korong"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Hapus</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Fasilitas Section */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-md font-medium text-gray-800">
                      Fasilitas ({korong.fasilitas?.length || 0})
                    </h4>
                    <button
                      onClick={() => handleAddFasilitas(korong)}
                      className="flex items-center space-x-2 px-3 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Tambah Fasilitas</span>
                    </button>
                  </div>

                  {korong.fasilitas && korong.fasilitas.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {korong.fasilitas.map((fasilitas) => (
                        <div key={fasilitas.id_fasilitas} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                          <div className="flex items-center space-x-2">
                            <Building className="w-4 h-4 text-gray-400" />
                            <span className="text-sm font-medium text-gray-700">{fasilitas.nama_fasilitas}</span>
                          </div>
                          <button
                            onClick={() => handleDeleteFasilitas(fasilitas.id_fasilitas, korong.id_korong)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                            title="Hapus Fasilitas"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Building className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                      <p className="text-sm">Belum ada fasilitas</p>
                      <p className="text-xs">Klik tombol "Tambah Fasilitas" untuk menambahkan</p>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {filteredData.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <Home className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium mb-2">Tidak ada data korong</h3>
                <p className="text-sm">Silakan tambah korong baru atau ubah kata kunci pencarian</p>
              </div>
            )}
          </div>
        );

      case 'fasilitas':
        return (
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nama Fasilitas
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Korong
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.map((fasilitas) => (
                  <tr key={fasilitas.id_fasilitas} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{fasilitas.nama_fasilitas}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{fasilitas.korong?.nama_korong || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleDetail(fasilitas)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Lihat Detail"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEdit(fasilitas)}
                          className="text-green-600 hover:text-green-900"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleConfirmDelete(fasilitas.id_fasilitas)}
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
            {filteredData.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Tidak ada data fasilitas yang ditemukan
              </div>
            )}
          </div>
        );

      case 'informasi':
        return (
          <div className="space-y-4">
            {currentItems.map((info) => (
              <div key={info.id} className="bg-gray-50 p-6 rounded-lg">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Informasi Nagari</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleDetail(info)}
                      className="text-blue-600 hover:text-blue-900"
                      title="Lihat Detail"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleEdit(info)}
                      className="text-green-600 hover:text-green-900"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Visi:</p>
                    <p className="text-sm font-medium text-gray-900 mb-2">{info.visi || 'Belum diisi'}</p>
                    <p className="text-sm text-gray-600">Kontak:</p>
                    <p className="text-sm font-medium text-gray-900">{info.kontak || 'Belum diisi'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Jam Pelayanan:</p>
                    <p className="text-sm font-medium text-gray-900 mb-2">{info.jam_pelayanan || 'Belum diisi'}</p>
                    <p className="text-sm text-gray-600">Email:</p>
                    <p className="text-sm font-medium text-gray-900">{info.email || 'Belum diisi'}</p>
                  </div>
                </div>
              </div>
            ))}
            {filteredData.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Tidak ada data informasi nagari yang ditemukan
              </div>
            )}
          </div>
        );

      case 'sosmed':
        return (
          <div className="space-y-4">
            {currentItems.map((sosmed) => (
              <div key={sosmed.id} className="bg-gray-50 p-6 rounded-lg">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Sosial Media</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleDetail(sosmed)}
                      className="text-blue-600 hover:text-blue-900"
                      title="Lihat Detail"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleEdit(sosmed)}
                      className="text-green-600 hover:text-green-900"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Facebook:</p>
                    <p className="text-sm font-medium text-gray-900 mb-2">{sosmed.facebook || 'Belum diisi'}</p>
                    <p className="text-sm text-gray-600">Instagram:</p>
                    <p className="text-sm font-medium text-gray-900">{sosmed.instagram || 'Belum diisi'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">X (Twitter):</p>
                    <p className="text-sm font-medium text-gray-900 mb-2">{sosmed.x || 'Belum diisi'}</p>
                    <p className="text-sm text-gray-600">YouTube:</p>
                    <p className="text-sm font-medium text-gray-900">{sosmed.youtube || 'Belum diisi'}</p>
                  </div>
                </div>
              </div>
            ))}
            {filteredData.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Tidak ada data sosial media yang ditemukan
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  const renderForm = () => {
    switch (activeTab) {
      case 'korong':
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Korong
              </label>
              <input
                type="text"
                value={formData.nama_korong || ''}
                onChange={(e) => setFormData({...formData, nama_korong: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deskripsi Korong
              </label>
              <textarea
                value={formData.deskripsi_korong || ''}
                onChange={(e) => setFormData({...formData, deskripsi_korong: e.target.value})}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jumlah Pria
                </label>
                <input
                  type="number"
                  value={formData.jumlah_pria || ''}
                  onChange={(e) => setFormData({...formData, jumlah_pria: parseInt(e.target.value) || 0})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jumlah Wanita
                </label>
                <input
                  type="number"
                  value={formData.jumlah_wanita || ''}
                  onChange={(e) => setFormData({...formData, jumlah_wanita: parseInt(e.target.value) || 0})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>
          </form>
        );

      case 'fasilitas':
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Korong
              </label>
              <select
                value={formData.id_korong || ''}
                onChange={(e) => setFormData({...formData, id_korong: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              >
                <option value="">Pilih Korong</option>
                {korongData.map((korong) => (
                  <option key={korong.id_korong} value={korong.id_korong}>
                    {korong.nama_korong}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Fasilitas
              </label>
              <input
                type="text"
                value={formData.nama_fasilitas || ''}
                onChange={(e) => setFormData({...formData, nama_fasilitas: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              />
            </div>
          </form>
        );

      case 'informasi':
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deskripsi
              </label>
              <textarea
                value={formData.deskripsi || ''}
                onChange={(e) => setFormData({...formData, deskripsi: e.target.value})}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Visi
              </label>
              <textarea
                value={formData.visi || ''}
                onChange={(e) => setFormData({...formData, visi: e.target.value})}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Misi
              </label>
              <textarea
                value={formData.misi || ''}
                onChange={(e) => setFormData({...formData, misi: e.target.value})}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Struktur Organisasi
              </label>
              <textarea
                value={formData.struktur || ''}
                onChange={(e) => setFormData({...formData, struktur: e.target.value})}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kontak
                </label>
                <input
                  type="tel"
                  value={formData.kontak || ''}
                  onChange={(e) => setFormData({...formData, kontak: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Video URL
                </label>
                <input
                  type="url"
                  value={formData.vidio || ''}
                  onChange={(e) => setFormData({...formData, vidio: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jam Pelayanan
                </label>
                <input
                  type="text"
                  value={formData.jam_pelayanan || ''}
                  onChange={(e) => setFormData({...formData, jam_pelayanan: e.target.value})}
                  placeholder="08:00 - 16:00"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>
          </form>
        );

      case 'sosmed':
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Facebook URL
              </label>
              <input
                type="url"
                value={formData.facebook || ''}
                onChange={(e) => setFormData({...formData, facebook: e.target.value})}
                placeholder="https://facebook.com/username"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Instagram URL
              </label>
              <input
                type="url"
                value={formData.instagram || ''}
                onChange={(e) => setFormData({...formData, instagram: e.target.value})}
                placeholder="https://instagram.com/username"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                X (Twitter) URL
              </label>
              <input
                type="url"
                value={formData.x || ''}
                onChange={(e) => setFormData({...formData, x: e.target.value})}
                placeholder="https://x.com/username"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                YouTube URL
              </label>
              <input
                type="url"
                value={formData.youtube || ''}
                onChange={(e) => setFormData({...formData, youtube: e.target.value})}
                placeholder="https://youtube.com/channel/username"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </form>
        );

      default:
        return null;
    }
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

  useEffect(() => {
    setCurrentPage(1);
    setSearchTerm('');
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm p-1 mb-6">
          <div className="flex space-x-1">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-md font-medium text-sm transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-red-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{tab.name}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    activeTab === tab.id
                      ? 'bg-red-700 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="relative">
          <div className={`bg-white rounded-2xl shadow-xl p-8 ${isAnyModalOpen ? 'blur-sm scale-[0.98] opacity-50' : ''}`}>
            {/* Header with Search and Add Button */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
                {tabs.find(tab => tab.id === activeTab)?.name}
              </h2>
              
              <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                <div className="relative flex-1 md:flex-initial">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder={`Cari ${tabs.find(tab => tab.id === activeTab)?.name.toLowerCase()}...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full md:w-64 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                
                <button
                  onClick={handleAdd}
                  className="flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200"
                >
                  <Plus className="w-5 h-5" />
                  <span>Tambah {tabs.find(tab => tab.id === activeTab)?.name}</span>
                </button>
              </div>
            </div>

            <AlertMessage message={success} type="success" />
            <AlertMessage message={error} type="error" />

            {/* Content */}
            {renderTable()}
          </div>

          {/* Add/Edit Modal */}
          {showAddModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div 
                className="fixed inset-0 bg-black/50 backdrop-blur-md" 
                onClick={closeModal}
              ></div>
              <div className="relative bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-gray-200 z-10">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold">
                    {editMode ? 'Edit' : 'Tambah'} {tabs.find(tab => tab.id === activeTab)?.name}
                  </h3>
                  <button
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  {renderForm()}
                  
                  <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    >
                      Batal
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={loading}
                      className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors duration-200"
                    >
                      {loading ? 'Menyimpan...' : (editMode ? 'Update' : 'Simpan')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Detail Modal */}
          {showDetailModal && selectedItem && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div 
                className="fixed inset-0 bg-black/50 backdrop-blur-md" 
                onClick={() => setShowDetailModal(false)}
              ></div>
              <div className="relative bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-gray-200 z-10">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold">
                    Detail {tabs.find(tab => tab.id === activeTab)?.name}
                  </h3>
                  <button
                    onClick={() => setShowDetailModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  {activeTab === 'korong' && (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-3">Informasi Korong</h4>
                          <div className="space-y-3">
                            <div>
                              <p className="text-sm text-gray-600">Nama Korong:</p>
                              <p className="font-medium text-gray-900">{selectedItem.nama_korong}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Deskripsi:</p>
                              <p className="font-medium text-gray-900">{selectedItem.deskripsi_korong || 'Tidak ada deskripsi'}</p>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-3">Data Demografi</h4>
                          <div className="space-y-3">
                            <div className="flex items-center space-x-4">
                              <div className="text-center">
                                <p className="text-2xl font-bold text-blue-600">{selectedItem.jumlah_pria}</p>
                                <p className="text-sm text-gray-600">Pria</p>
                              </div>
                              <div className="text-center">
                                <p className="text-2xl font-bold text-pink-600">{selectedItem.jumlah_wanita}</p>
                                <p className="text-sm text-gray-600">Wanita</p>
                              </div>
                              <div className="text-center">
                                <p className="text-2xl font-bold text-green-600">{selectedItem.jumlah_pria + selectedItem.jumlah_wanita}</p>
                                <p className="text-sm text-gray-600">Total</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Fasilitas Detail Section */}
                      <div className="mt-6">
                        <h4 className="font-semibold text-gray-800 mb-3">
                          Fasilitas ({selectedItem.fasilitas?.length || 0})
                        </h4>
                        {selectedItem.fasilitas && selectedItem.fasilitas.length > 0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            {selectedItem.fasilitas.map((fasilitas) => (
                              <div key={fasilitas.id_fasilitas} className="flex items-center p-3 bg-gray-50 rounded-lg border">
                                <Building className="w-4 h-4 text-gray-400 mr-2" />
                                <span className="text-sm font-medium text-gray-700">{fasilitas.nama_fasilitas}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-6 text-gray-500">
                            <Building className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                            <p className="text-sm">Belum ada fasilitas</p>
                          </div>
                        )}
                      </div>
                    </>
                  )}

                  {activeTab === 'fasilitas' && (
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-600">Nama Fasilitas:</p>
                        <p className="text-lg font-medium text-gray-900">{selectedItem.nama_fasilitas}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Korong:</p>
                        <p className="font-medium text-gray-900">{selectedItem.korong?.nama_korong || 'N/A'}</p>
                      </div>
                    </div>
                  )}

                  {activeTab === 'informasi' && (
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3">Visi & Misi</h4>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-gray-600">Visi:</p>
                            <p className="font-medium text-gray-900">{selectedItem.visi || 'Belum diisi'}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Misi:</p>
                            <p className="font-medium text-gray-900">{selectedItem.misi || 'Belum diisi'}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3">Kontak & Pelayanan</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-600">Kontak:</p>
                            <p className="font-medium text-gray-900">{selectedItem.kontak || 'Belum diisi'}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Email:</p>
                            <p className="font-medium text-gray-900">{selectedItem.email || 'Belum diisi'}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Jam Pelayanan:</p>
                            <p className="font-medium text-gray-900">{selectedItem.jam_pelayanan || 'Belum diisi'}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Video:</p>
                            <p className="font-medium text-gray-900">{selectedItem.vidio || 'Belum diisi'}</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3">Struktur Organisasi</h4>
                        <p className="font-medium text-gray-900">{selectedItem.struktur || 'Belum diisi'}</p>
                      </div>
                    </div>
                  )}

                  {activeTab === 'sosmed' && (
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-800 mb-3">Link Sosial Media</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Facebook:</p>
                          <p className="font-medium text-gray-900 break-all">{selectedItem.facebook || 'Belum diisi'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Instagram:</p>
                          <p className="font-medium text-gray-900 break-all">{selectedItem.instagram || 'Belum diisi'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">X (Twitter):</p>
                          <p className="font-medium text-gray-900 break-all">{selectedItem.x || 'Belum diisi'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">YouTube:</p>
                          <p className="font-medium text-gray-900 break-all">{selectedItem.youtube || 'Belum diisi'}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Add Fasilitas Modal */}
          {showAddFasilitasModal && selectedKorongForFasilitas && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div 
                className="fixed inset-0 bg-black/50 backdrop-blur-md" 
                onClick={() => setShowAddFasilitasModal(false)}
              ></div>
              <div className="relative bg-white rounded-lg p-6 w-full max-w-md shadow-2xl border-2 border-gray-200 z-10">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">
                    Tambah Fasilitas untuk {selectedKorongForFasilitas.nama_korong}
                  </h3>
                  <button
                    onClick={() => setShowAddFasilitasModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmitFasilitas} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nama Fasilitas
                    </label>
                    <input
                      type="text"
                      value={fasilitasFormData.nama_fasilitas}
                      onChange={(e) => setFasilitasFormData({...fasilitasFormData, nama_fasilitas: e.target.value})}
                      placeholder="Contoh: Masjid, Sekolah, Posyandu"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      required
                      autoFocus
                    />
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowAddFasilitasModal(false)}
                      className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                    >
                      Tambah Fasilitas
                    </button>
                  </div>
                </form>
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
                  Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan.
                </p>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => {
                      setShowDeleteConfirm(false);
                      setDeleteId(null);
                    }}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={loading}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors duration-200"
                  >
                    {loading ? 'Menghapus...' : 'Hapus'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminInformasi;