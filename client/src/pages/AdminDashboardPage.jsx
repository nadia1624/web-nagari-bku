import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Newspaper, 
  ShoppingBag, 
  Users, 
  Bell,
  TrendingUp,
  Calendar,
  Activity,
  BarChart3,
  Eye
} from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
      }
    };
    checkAuth();
  }, [navigate]);

  const statsCards = [
    {
      title: 'Total Berita',
      value: '24',
      change: '+3 minggu ini',
      icon: Newspaper,
      color: 'from-blue-500 to-blue-600',
      bgLight: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Total UMKM',
      value: '156',
      change: '+12 bulan ini',
      icon: ShoppingBag,
      color: 'from-green-500 to-green-600',
      bgLight: 'bg-green-50',
      textColor: 'text-green-600'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Selamat Datang, Admin!</h1>
            <p className="text-red-100 text-lg">Kelola sistem informasi nagari dengan mudah dan efisien</p>
            <div className="mt-4 flex items-center space-x-4 text-red-200">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{new Date().toLocaleDateString('id-ID', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <BarChart3 className="w-20 h-20 text-red-200 opacity-50" />
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div 
              key={index} 
              className={`bg-gradient-to-br ${stat.color} p-6 rounded-2xl text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group`}
            >
              <div className="flex items-center justify-between mb-4">
                <Icon className="w-10 h-10 opacity-80 group-hover:scale-110 transition-transform duration-200" />
                <span className="text-3xl font-bold">{stat.value}</span>
              </div>
              <h3 className="text-lg font-semibold mb-1">{stat.title}</h3>
              <p className="text-sm opacity-80">{stat.change}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminDashboard;