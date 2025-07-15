import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import { MapPin, Navigation, Info, Layers, ZoomIn, Loader2, Sparkles, Eye, ChevronDown } from 'lucide-react';
import L from 'leaflet';

const MappingPage = () => {
  const [geojsonData, setGeojsonData] = useState(null);
  const [mapBounds, setMapBounds] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedKorong, setSelectedKorong] = useState(null);
  const [korongList, setKorongList] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  useEffect(async() => {
     await api.get('/api/geojson')
      .then(data => {
        setGeojsonData(data.data);
        
        const korongs = data.features.map(feature => ({
          name: feature.properties.name,
          color: feature.properties.color || '#FED7AA'
        }));
        setKorongList(korongs);
        
        // Calculate map bounds
        const geoJsonLayer = L.geoJSON(data);
        const bounds = geoJsonLayer.getBounds();
        setMapBounds(bounds);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching GeoJSON:", error);
        setLoading(false);
      });
  }, []);

  // Mouse tracking for interactive effects
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
    const korongName = feature.properties.name;

    if (korongName) {
      layer.bindTooltip(
        `<div class="bg-white p-2 rounded shadow-lg border">
          <h3 class="font-bold text-gray-800">${korongName}</h3>
          <p class="text-sm text-gray-600">Klik untuk info detail</p>
        </div>`,
        { 
          sticky: true,
          className: 'custom-tooltip',
          direction: 'top'
        }
      );
    }

    layer.on({
      click: () => {
        setSelectedKorong(korongName);
        const urlFriendlyKorongName = korongName.toLowerCase().replace(/\s/g, '-');
        setTimeout(() => {
          navigate(`/korong/${urlFriendlyKorongName}`);
        }, 300);
      },
      mouseover: (e) => {
        e.target.setStyle({
          weight: 4,
          color: '#651F26',
          fillOpacity: 0.9,
          fillColor: '#ef4444'
        });
        setSelectedKorong(korongName);
      },
      mouseout: (e) => {
        e.target.setStyle(style(feature));
        setSelectedKorong(null);
      }
    });
  };

  const style = (feature) => {
    return {
      fillColor: feature.properties.color || '#FED7AA',
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
    };
  };

  const handleKorongClick = (korongName) => {
    const urlFriendlyKorongName = korongName.toLowerCase().replace(/\s/g, '-');
    navigate(`/korong/${urlFriendlyKorongName}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-100/40 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-red-600 animate-spin mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Memuat Peta Wilayah</h2>
          <p className="text-gray-600">Mohon tunggu sebentar...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-100/40 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-purple-900/5 to-red-900/5"></div>
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full animate-float"
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
          
          {/* Enhanced Header - Similar to ProfilePage */}
          <div className="relative bg-gradient-to-r from-red-800 via-red-700 to-red-900 text-white p-8 overflow-hidden">
            {/* Interactive background overlay */}
            <div 
              className="absolute inset-0 opacity-20 transition-all duration-300"
              style={{
                background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255,255,255,0.3) 0%, transparent 50%)`
              }}
            />
            
            {/* Geometric patterns */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 right-20 w-32 h-32 border-2 border-white rounded-full animate-pulse"></div>
              <div className="absolute bottom-10 left-20 w-24 h-24 border-2 border-white transform rotate-45"></div>
              <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-white/20 rounded-lg transform rotate-12"></div>
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-md rounded-full mb-4">
                <Sparkles className="w-4 h-4 text-yellow-300 mr-2 animate-pulse" />
                <span className="text-white/90 text-sm font-medium">Peta Digital Nagari</span>
              </div>
              
              <div className="flex items-center mb-2">
                <MapPin className="w-8 h-8 mr-3" />
                <h1 className="text-4xl md:text-5xl font-bold">Pemetaan Wilayah</h1>
              </div>
              <p className="text-red-100 text-lg">
                Jelajahi setiap korong dalam wilayah Nagari Batu Kalang Utara dengan peta interaktif
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-xl shadow-lg p-6 border border-gray-200">
                  <div className="flex items-center mb-4">
                    <Layers className="w-5 h-5 text-red-600 mr-2" />
                    <h2 className="text-lg font-bold text-gray-800">Daftar Korong</h2>
                  </div>
                  
                  <div className="space-y-2">
                    {korongList.map((korong, index) => (
                      <button
                        key={index}
                        onClick={() => handleKorongClick(korong.name)}
                        className={`w-full text-left p-3 rounded-lg transition-all duration-200 border ${
                          selectedKorong === korong.name
                            ? 'bg-red-50 border-red-300 text-red-700 shadow-md'
                            : 'bg-white/60 hover:bg-gray-50 border-gray-200 text-gray-700'
                        }`}
                      >
                        <div className="flex items-center">
                          <div 
                            className="w-4 h-4 rounded-full mr-3 border-2 border-white shadow-sm"
                            style={{ backgroundColor: korong.color }}
                          ></div>
                          <span className="font-medium">{korong.name}</span>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center mb-2">
                      <Info className="w-4 h-4 text-blue-600 mr-2" />
                      <span className="text-sm font-medium text-blue-800">Cara Penggunaan</span>
                    </div>
                    <ul className="text-xs text-blue-700 space-y-1">
                      <li>• Arahkan kursor ke area peta</li>
                      <li>• Klik untuk melihat detail korong</li>
                      <li>• Gunakan scroll untuk zoom in/out</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Map Section */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 border-b">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Navigation className="w-5 h-5 text-gray-600 mr-2" />
                        <h3 className="text-lg font-semibold text-gray-800">Peta Interaktif</h3>
                      </div>
                      <div className="flex items-center space-x-2">
                        <ZoomIn className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Scroll untuk zoom</span>
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
                      </MapContainer>
                    ) : (
                      <div className="flex items-center justify-center h-[600px] bg-gray-100">
                        <div className="text-center">
                          <Loader2 className="w-8 h-8 text-red-600 animate-spin mx-auto mb-4" />
                          <p className="text-gray-600">Memuat data peta...</p>
                        </div>
                      </div>
                    )}

                    {selectedKorong && (
                      <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-4 border border-gray-200 z-[1000]">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 text-red-600 mr-2" />
                          <span className="font-medium text-gray-800">{selectedKorong}</span>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">Klik untuk info detail</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

        
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-15px) rotate(5deg); }
          66% { transform: translateY(5px) rotate(-5deg); }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  );
};

export default MappingPage;