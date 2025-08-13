import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Newspaper,
    ShoppingBag,
    Calendar,
    BarChart3,
} from 'lucide-react';
import api from '../lib/axios';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        totalBerita: null,
        totalUmkm: null,
        totalKorong: null,
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }
    }, [navigate]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [beritaRes, umkmRes] = await Promise.all([
                    api.get('/berita/count'), 
                    api.get('/umkm/count'),
                ]);

                setStats({
                    totalBerita: beritaRes?.data?.count ?? 0,
                    totalUmkm: umkmRes?.data?.count ?? 0
                });
            } catch (err) {
                console.error("Gagal mengambil data statistik:", err);
                setError("Gagal memuat data. Silakan coba lagi.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchStats();
    }, []);

    const statsCards = [
        {
            title: 'Total Berita',
            value: stats.totalBerita,
            icon: Newspaper,
            color: 'from-blue-500 to-blue-600',
        },
        {
            title: 'Total UMKM',
            value: stats.totalUmkm,
            icon: ShoppingBag,
            color: 'from-green-500 to-green-600',
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
                                <span className="text-sm">
                                    {new Date().toLocaleDateString('id-ID', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <BarChart3 className="w-20 h-20 text-red-200 opacity-50" />
                    </div>
                </div>
            </div>

            {isLoading && (
                <div className="text-center p-8 text-gray-500 text-lg">Memuat data...</div>
            )}
            {error && (
                <div className="text-center p-8 text-red-600 text-lg">{error}</div>
            )}

            {!isLoading && !error && (
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
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
