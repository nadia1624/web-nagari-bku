import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import { Navigation, Info, Layers, ZoomIn, Loader2, Leaf, Sprout } from 'lucide-react';
import L from 'leaflet';
import api from '../lib/axios';

const MapLabels = ({ geojsonData }) => {
  const map = useMap();
  const labelsRef = useRef([]);

  const getPolygonCenter = (coordinates) => {
    let lat = 0, lng = 0;
    const points = coordinates[0];
    
    for (let i = 0; i < points.length - 1; i++) {
      lng += points[i][0];
      lat += points[i][1];
    }
    
    return [lat / (points.length - 1), lng / (points.length - 1)];
  };

  useEffect(() => {
    labelsRef.current.forEach(marker => {
      if (map.hasLayer(marker)) {
        map.removeLayer(marker);
      }
    });
    labelsRef.current = [];

    if (!geojsonData) return;

    geojsonData.features.forEach((feature) => {
      const center = getPolygonCenter(feature.geometry.coordinates);
      const farmName = feature.properties.name; 
      const cropType = feature.properties.cropType;
      
    });
  }, [geojsonData, map]);

  useEffect(() => {
    return () => {
      labelsRef.current.forEach(marker => {
        if (map.hasLayer(marker)) {
          map.removeLayer(marker);
        }
      });
    };
  }, [map]);

  return null;
};

const AgriculturalMappingPage = () => {
  const [geojsonData, setGeojsonData] = useState(null);
  const [mapBounds, setMapBounds] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFarm, setSelectedFarm] = useState(null);
  const [farmList, setFarmList] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [filterCropType, setFilterCropType] = useState('all');
  
  const navigate = useNavigate();

  useEffect(() => {
    const loadAgriculturalData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await api.get('/api/agricultural-geojson');
        const data = response.data;
        
        if (!data || !data.features || data.features.length === 0) {
          throw new Error('Data GeoJSON tidak valid atau kosong');
        }

        setGeojsonData(data);
        
        const farms = data.features?.map((feature) => ({
          id: feature.properties.id,
          name: feature.properties.name,
          label: feature.properties.label,
          cropType: feature.properties.cropType,
          color: feature.properties.color,
          area: feature.properties.area,
          owner: feature.properties.owner
        }));
        
        setFarmList(farms);
        
        const geoJsonLayer = L.geoJSON(data);
        const bounds = geoJsonLayer.getBounds();
        setMapBounds(bounds);
        
      } catch (error) {
        console.error("Error loading agricultural data:", error);
        setError(error.message || 'Gagal memuat data pertanian');
      } finally {
        setLoading(false);
      }
    };

    loadAgriculturalData();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const onEachFeature = (feature, layer) => {
    const farmName = feature.properties.name;
    const cropType = feature.properties.cropType;
    const area = feature.properties.area;
    const owner = feature.properties.owner;

    if (farmName) {
      layer.bindTooltip(
        `<div class="bg-green-50/95 backdrop-blur-sm p-4 rounded-xl shadow-lg border-2 border-green-200">
          <h3 class="font-bold text-green-800 text-sm mb-2 flex items-center gap-2">
            <span class="text-lg">${cropType === 'Pepaya' ? '🥭' : cropType === 'Padi' ? '🌾' : cropType === 'Jagung' ? '🌽' : '🌱'}</span> ${farmName}
          </h3>
          <div class="space-y-1 text-xs">
            <p><span class="font-medium text-green-700">Jenis Tanaman:</span> ${cropType}</p>
            <p><span class="font-medium text-green-700">Luas:</span> ${area} Ha</p>
            <p><span class="font-medium text-green-700">Pemilik:</span> ${owner}</p>
          </div>
        </div>`,
        { 
          sticky: true,
          className: 'agricultural-tooltip',
          direction: 'top',
          offset: [0, -10]
        }
      );
    }
  };

  const style = (feature) => {
    return {
      fillColor: feature.properties.color,
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
    };
  };

  const handleFarmClick = (farmName) => {
    const urlFriendlyFarmName = farmName.toLowerCase().replace(/\s/g, '-').replace(/[()]/g, '');
    navigate(`/pertanian/${urlFriendlyFarmName}`);
  };

  const filteredFarms = farmList.filter(farm => 
    filterCropType === 'all' || farm.cropType === filterCropType
  );

  const cropTypes = [...new Set(farmList.map(farm => farm.cropType))];

  const statistics = {
    totalFarms: farmList.length,
    totalArea: farmList.reduce((sum, farm) => sum + parseFloat(farm.area || 0), 0).toFixed(1),
    cropTypes: cropTypes.length,
    averageArea: farmList.length > 0 ? (farmList.reduce((sum, farm) => sum + parseFloat(farm.area || 0), 0) / farmList.length).toFixed(1) : '0',
    padiCount: farmList.filter(farm => farm.cropType === 'Padi').length,
    pepayaCount: farmList.filter(farm => farm.cropType === 'Pepaya').length,
    jagungCount: farmList.filter(farm => farm.cropType === 'Jagung').length
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50/30 to-lime-100/40 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-green-600 animate-spin mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-green-800 mb-2">Memuat Peta Pertanian</h2>
          <p className="text-green-600">Mohon tunggu sebentar...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50/30 to-yellow-100/40 flex items-center justify-center">
        <div className="text-center bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-red-200">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Info className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-red-800 mb-2">Error Memuat Data</h2>
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-100/40 relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-purple-900/5 to-red-900/5"></div>
        {[...Array(12)]?.map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${4 + Math.random() * 6}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/50">
          <div className="relative bg-gradient-to-r from-red-800 via-red-700 to-red-900 text-white p-8 overflow-hidden">
            <div 
              className="absolute inset-0 opacity-20 transition-all duration-300"
              style={{
                background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255,255,255,0.3) 0%, transparent 50%)`
              }}
            />
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 right-20 w-32 h-32 border-2 border-white rounded-full animate-pulse"></div>
              <div className="absolute bottom-10 left-20 w-24 h-24 border-2 border-white transform rotate-45"></div>
              <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-white/20 rounded-lg transform rotate-12"></div>
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-md rounded-full mb-4">
                <span className="text-white/90 text-sm font-medium">Peta Persebaran Komoditas Kelompok Rani Nago Intan</span>
              </div>
              <div className="flex items-center mb-2">
                <Sprout className="w-8 h-8 mr-3" />
                <h1 className="text-4xl md:text-5xl font-bold">Pemetaan Pertanian</h1>
              </div>
              <p className="text-green-100 text-lg">
                Monitoring dan analisis lahan pertanian di Batu Kalang Utara, Padang Pariaman, Sumatera Barat dengan teknologi GIS interaktif
              </p>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1">
                <div className="bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-xl shadow-lg p-6 border border-gray-200">
                  <div className="flex items-center mb-4">
                    <Layers className="w-5 h-5 text-green-600 mr-2" />
                    <h2 className="text-lg font-bold text-green-800">Daftar Lahan</h2>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-green-700 mb-2">
                      Filter Jenis Tanaman:
                    </label>
                    <select 
                      value={filterCropType}
                      onChange={(e) => setFilterCropType(e.target.value)}
                      className="w-full p-2 border border-green-300 rounded-lg bg-white/60 text-green-800 text-sm"
                    >
                      <option value="all">Semua Tanaman</option>
                      {cropTypes.map(cropType => (
                        <option key={cropType} value={cropType}>{cropType}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {filteredFarms?.map((farm) => (
                      <button
                        key={farm.id}
                        className={`w-full text-left p-3 rounded-lg transition-all duration-200 border ${
                          selectedFarm === farm.name
                            ? 'bg-green-100 border-green-400 text-green-800 shadow-md'
                            : 'bg-white/60 hover:bg-green-50 border-green-200 text-green-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div 
                              className="w-4 h-4 rounded-full mr-3 border-2 border-white shadow-sm"
                              style={{ backgroundColor: farm.color }}
                            ></div>
                            <div>
                              <span className="font-medium text-sm">{farm.name}</span>
                              <div className="text-xs text-green-600">{farm.cropType}</div>
                              <div className="text-xs text-green-500">{farm.area} Ha</div>
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-green-100/60 rounded-lg border border-green-300">
                    <div className="flex items-center mb-2">
                      <Info className="w-4 h-4 text-green-600 mr-2" />
                      <span className="text-sm font-medium text-green-800">Statistik Lahan</span>
                    </div>
                    <div className="space-y-1 text-xs text-green-700">
                      <div className="flex justify-between">
                        <span>Total Lahan:</span>
                        <span className="font-semibold">{statistics.totalFarms} Area</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Luas:</span>
                        <span className="font-semibold">{statistics.totalArea} Ha</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Jenis Tanaman:</span>
                        <span className="font-semibold">{statistics.cropTypes} Varietas</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Rata-rata Luas:</span>
                        <span className="font-semibold">{statistics.averageArea} Ha</span>
                      </div>
                      {statistics.padiCount > 0 && (
                        <div className="flex justify-between">
                          <span>🌾 Padi:</span>
                          <span className="font-semibold">{statistics.padiCount} Area</span>
                        </div>
                      )}
                      {statistics.pepayaCount > 0 && (
                        <div className="flex justify-between">
                          <span>🥭 Pepaya:</span>
                          <span className="font-semibold">{statistics.pepayaCount} Area</span>
                        </div>
                      )}
                      {statistics.jagungCount > 0 && (
                        <div className="flex justify-between">
                          <span>🌽 Jagung:</span>
                          <span className="font-semibold">{statistics.jagungCount} Area</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <div className="flex items-center mb-2">
                      <Leaf className="w-4 h-4 text-amber-600 mr-2" />
                      <span className="text-sm font-medium text-amber-800">Panduan Penggunaan</span>
                    </div>
                    <ul className="text-xs text-amber-700 space-y-1">
                      <li>• Hover untuk melihat detail lahan</li>
                      <li>• Gunakan scroll untuk zoom</li>
                      <li>• Filter berdasarkan jenis tanaman</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-3">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-green-200">
                  <div className="bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-xl shadow-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Navigation className="w-5 h-5 text-green-600 mr-2" />
                        <h3 className="text-lg font-semibold text-green-800">Peta Interaktif Lahan Pertanian Batu Kalang Utara</h3>
                      </div>
                      <div className="flex items-center space-x-2">
                        <ZoomIn className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-green-600">Scroll untuk zoom</span>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    {geojsonData && mapBounds ? (
                      <MapContainer
                        bounds={mapBounds}
                        scrollWheelZoom={true}
                        className="h-[600px] w-full"
                        style={{ borderRadius: '0 0 12px 12px' }}
                        zoomControl={false}
                      >
                        <TileLayer
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <GeoJSON
                          data={geojsonData}
                          style={style}
                          onEachFeature={onEachFeature}
                        />
                        <MapLabels geojsonData={geojsonData} />
                      </MapContainer>
                    ) : (
                      <div className="flex items-center justify-center h-[600px] bg-green-50">
                        <div className="text-center">
                          <Loader2 className="w-8 h-8 text-green-600 animate-spin mx-auto mb-4" />
                          <p className="text-green-600">Memuat data pertanian...</p>
                        </div>
                      </div>
                    )}
                    <div className="absolute top-4 right-4 flex flex-col space-y-2 z-[1000]">
                      <button 
                        onClick={() => {
                          const mapInstance = document.querySelector('.leaflet-container')?._leaflet_map;
                          if (mapInstance) mapInstance.zoomIn();
                        }}
                        className="bg-white/95 backdrop-blur-md rounded-lg shadow-lg p-2 border border-green-200 hover:bg-green-50 transition-colors"
                        title="Zoom In"
                      >
                        <ZoomIn className="w-4 h-4 text-green-600" />
                      </button>
                      <button 
                        onClick={() => {
                          const mapInstance = document.querySelector('.leaflet-container')?._leaflet_map;
                          if (mapInstance) mapInstance.zoomOut();
                        }}
                        className="bg-white/95 backdrop-blur-md rounded-lg shadow-lg p-2 border border-green-200 hover:bg-green-50 transition-colors"
                        title="Zoom Out"
                      >
                        <ZoomIn className="w-4 h-4 text-green-600 rotate-180" />
                      </button>
                      <button 
                        onClick={() => {
                          const mapInstance = document.querySelector('.leaflet-container')?._leaflet_map;
                          if (mapInstance && mapBounds) mapInstance.fitBounds(mapBounds);
                        }}
                        className="bg-white/95 backdrop-blur-md rounded-lg shadow-lg p-2 border border-green-200 hover:bg-green-50 transition-colors"
                        title="Fit to Bounds"
                      >
                        <Navigation className="w-4 h-4 text-green-600" />
                      </button>
                    </div>
                    {selectedFarm && (
                      <div className="absolute top-4 left-4 bg-green-50/95 backdrop-blur-md rounded-xl shadow-lg p-4 border-2 border-green-200 z-[1000]">
                        <div className="flex items-center">
                          <Sprout className="w-4 h-4 text-green-600 mr-2" />
                          <span className="font-medium text-green-800">{selectedFarm}</span>
                        </div>
                        <p className="text-xs text-green-600 mt-1">Klik untuk detail lengkap</p>
                      </div>
                    )}
                    <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md rounded-lg shadow-lg p-3 border border-green-200 z-[1000] max-w-[160px]">
                      <h4 className="font-bold text-green-800 text-xs mb-2 flex items-center">
                        Legend
                      </h4>
                      <div className="space-y-1">
                        {cropTypes.slice(0, 3).map((cropType, index) => {
                          const color = farmList.find(farm => farm.cropType === cropType)?.color || '#000000';
                          return (
                            <div key={index} className="flex items-center text-xs">
                              <div 
                                className="w-4 h-4 rounded-sm mr-2 border border-gray-300" 
                                style={{ backgroundColor: color }}
                              ></div>
                              <span className="text-green-700 text-[11px] truncate">{cropType}</span>
                            </div>
                          );
                        })}
                        {cropTypes.length > 3 && (
                          <div className="text-[11px] text-green-600 italic mt-1">
                            +{cropTypes.length - 3} lainnya
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .agricultural-tooltip {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
        }
        
        .leaflet-tooltip-top:before {
          border-top-color: rgba(240, 253, 244, 0.95) !important;
        }
        
        .agriculture-label-container {
          pointer-events: none;
        }

        .leaflet-container {
          font-family: inherit;
        }

        .leaflet-popup-content-wrapper {
          border-radius: 12px;
        }

        .leaflet-control-zoom {
          display: none;
        }

        .agriculture-label-container div {
          font-family: 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Inter', sans-serif;
          letter-spacing: 0.01em;
          transform: translate(-50%, -50%);
          position: relative;
          z-index: 100;
        }

        .agriculture-label-container .leaflet-div-icon {
          border: none !important;
          background: transparent !important;
        }

        .agriculture-label-container div:hover {
          transform: translate(-50%, -50%) scale(1.05) translateY(-2px);
          z-index: 1000;
        }

        .agriculture-label-container div * {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .agriculture-label-container span {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      `}</style>
    </div>
  );
};

export default AgriculturalMappingPage;