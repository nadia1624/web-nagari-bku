import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import { MapPin, Navigation, Info, Layers, ZoomIn, Loader2, Sparkles } from 'lucide-react';
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
      const labelText = feature.properties.label || feature.properties.name;
      
      const nameLabel = L.marker(center, {
        icon: L.divIcon({
          className: 'map-label-container',
          html: `<div class="
            bg-white/95 backdrop-blur-sm
            rounded-full px-1 py-1
            text-sm font-semibold text-center
            shadow-lg shadow-black/10
            border border-white/20
            transition-all duration-300 ease-out
            hover:scale-105 hover:shadow-xl hover:shadow-black/20
            whitespace-nowrap cursor-default
          " 
          data-korong-id="${feature.properties.id || feature.properties.name}"
          style="color: ${feature.properties.color || '#1f2937'};">
            ${labelText}
          </div>`,
          iconSize: [120, 32],
          iconAnchor: [60, 16]
        }),
        interactive: false
      });

      nameLabel.addTo(map);
      labelsRef.current.push(nameLabel);
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

const MappingPage = () => {
  const [geojsonData, setGeojsonData] = useState(null);
  const [mapBounds, setMapBounds] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedKorong, setSelectedKorong] = useState(null);
  const [korongList, setKorongList] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/api/geojson')
      .then(data => {
        setGeojsonData(data.data);
        
        const korongs = data.data.features?.map(feature => ({
          name: feature.properties.name,
          color: feature.properties.color || '#FED7AA'
        }));
        setKorongList(korongs);
        
        const geoJsonLayer = L.geoJSON(data.data);
        const bounds = geoJsonLayer.getBounds();
        setMapBounds(bounds);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching GeoJSON:", error);
        setLoading(false);
      });
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
    const korongName = feature.properties.name;

    if (korongName) {
      layer.bindTooltip(
        `<div class="bg-white/95 backdrop-blur-sm p-3 rounded-xl shadow-lg border border-white/30">
          <h3 class="font-bold text-gray-800 text-sm mb-1">${korongName}</h3>
          <p class="text-xs text-gray-600">Klik untuk info detail</p>
        </div>`,
        { 
          sticky: true,
          className: 'custom-tooltip',
          direction: 'top',
          offset: [0, -10]
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
          weight: 3,
          color: '#ffffff',
          fillOpacity: 0.85,
          fillColor: feature.properties.color || '#3b82f6'
        });
        setSelectedKorong(korongName);

        const labelElement = document.querySelector(`[data-korong-id="${feature.properties.id || feature.properties.name}"]`);
        if (labelElement) {
          labelElement.classList.add('scale-110', '-translate-y-1', 'shadow-2xl');
          labelElement.style.zIndex = '1000';
        }
      },
      mouseout: (e) => {
        e.target.setStyle(style(feature));
        setSelectedKorong(null);

        const labelElement = document.querySelector(`[data-korong-id="${feature.properties.id || feature.properties.name}"]`);
        if (labelElement) {
          labelElement.classList.remove('scale-110', '-translate-y-1', 'shadow-2xl');
          labelElement.style.zIndex = 'auto';
        }
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
                <Sparkles className="w-4 h-4 text-yellow-300 mr-2 animate-pulse" />
                <span className="text-white/90 text-sm font-medium">Peta Digital Nagari</span>
              </div>
              
              <div className="flex items-center mb-2">
                <MapPin className="w-8 h-8 mr-3" />
                <h1 className="text-4xl md:text-5xl font-bold">Pemetaan Wilayah</h1>
              </div>
              <p className="text-red-100 text-lg">
                Jelajahi setiap korong dalam wilayah Nagari Batu Kalang Utara dengan peta interaktif berlabel
              </p>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              
              <div className="lg:col-span-1">
                <div className="bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-xl shadow-lg p-6 border border-gray-200">
                  <div className="flex items-center mb-4">
                    <Layers className="w-5 h-5 text-red-600 mr-2" />
                    <h2 className="text-lg font-bold text-gray-800">Daftar Korong</h2>
                  </div>
                  
                  <div className="space-y-2">
                    {korongList?.map((korong, index) => (
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
                      <li>• Label muncul di tengah polygon</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 border-b">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Navigation className="w-5 h-5 text-gray-600 mr-2" />
                        <h3 className="text-lg font-semibold text-gray-800">Peta Interaktif dengan Label</h3>
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
                        <MapLabels geojsonData={geojsonData} />
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
                      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md rounded-xl shadow-lg p-4 border border-white/30 z-[1000]">
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
        .custom-tooltip {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
        }
        
        .leaflet-tooltip-top:before {
          border-top-color: rgba(255, 255, 255, 0.95) !important;
        }
        
        .map-label-container {
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};

export default MappingPage;