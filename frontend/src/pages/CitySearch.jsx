import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { Search, MapPin, ArrowUpRight, Globe, Sparkles } from 'lucide-react';

const CitySearch = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const initialQuery = queryParams.get('q') || '';

    const [query, setQuery] = useState(initialQuery);
    const [cities, setCities] = useState([]);

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await api.get(`geo/cities/?search=${query}`);
                setCities(response.data);
            } catch (err) {
                console.error("Failed to search cities", err);
            }
        };
        const timeout = setTimeout(fetchCities, 300);
        return () => clearTimeout(timeout);
    }, [query]);

    return (
        <div className="max-w-7xl mx-auto py-16 px-6 space-y-16 pb-40">
            <div className="text-center space-y-6 max-w-3xl mx-auto">
                <div className="flex items-center justify-center text-primary font-black uppercase tracking-[0.4em] text-xs mb-4">
                    <Globe size={18} className="mr-3" />
                    Global Coordinate Search
                </div>
                <h1 className="text-6xl md:text-8xl font-black text-slate-800 tracking-tighter leading-tight">
                    Map Your <span className="text-gradient">Horizon</span>
                </h1>
                <p className="text-slate-500 font-medium text-xl leading-relaxed">Access our comprehensive database of planetary settlements and topological coordinates.</p>
            </div>

            <div className="max-w-4xl mx-auto relative group">
                <div className="absolute inset-0 bg-primary/10 rounded-[3rem] blur-3xl opacity-0 group-focus-within:opacity-100 transition-all duration-700 -z-10"></div>
                <div className="relative flex items-center bg-white rounded-[3rem] px-10 py-8 shadow-layered border-4 border-slate-50 focus-within:border-primary/20 transition-all duration-500">
                    <Search className="text-primary mr-6" size={36} />
                    <input
                        placeholder="Enter destination name..."
                        className="bg-transparent border-none focus:outline-none w-full text-3xl font-black text-slate-800 placeholder:text-slate-200 tracking-tight"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <div className="hidden md:flex items-center text-[10px] font-black text-slate-300 uppercase tracking-widest bg-slate-50 px-4 py-2 rounded-xl">
                        CMD + K
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {cities.length > 0 ? cities.map(city => (
                    <div key={city.id} className="bg-white rounded-[3.5rem] shadow-soft border border-white overflow-hidden group hover:shadow-layered transition-all duration-700">
                        <div className="h-80 relative overflow-hidden">
                            <img src={`https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80`} className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000" alt="" />
                            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-40"></div>

                            <div className="absolute bottom-10 left-10">
                                <h3 className="text-3xl font-black text-slate-800 tracking-tighter mb-1 group-hover:text-primary transition-colors">{city.name}</h3>
                                <p className="text-slate-400 text-xs font-black uppercase tracking-[0.3em]">{city.country}</p>
                            </div>

                            <button
                                onClick={() => navigate(`/trips/new?city=${encodeURIComponent(city.name)}`)}
                                className="absolute top-10 right-10 h-16 w-16 bg-white shadow-layered rounded-2xl flex items-center justify-center text-primary transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 hover:bg-primary hover:text-white"
                            >
                                <ArrowUpRight size={28} />
                            </button>
                        </div>

                        <div className="p-10 border-t border-slate-50">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center space-x-3">
                                    <div className="h-8 w-8 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-500">
                                        <MapPin size={16} />
                                    </div>
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Validated Sector</span>
                                </div>
                                <div className="text-[10px] font-black text-primary uppercase tracking-[0.2em] animate-pulse">
                                    Live
                                </div>
                            </div>

                            <button
                                onClick={() => navigate(`/trips/new?city=${encodeURIComponent(city.name)}`)}
                                className="w-full py-5 bg-slate-50 text-slate-400 group-hover:bg-primary group-hover:text-white group-hover:shadow-glow-blue rounded-[2rem] font-black text-xs uppercase tracking-[0.4em] transition-all duration-500 border border-slate-100"
                            >
                                Initialize Journey
                            </button>
                        </div>
                    </div>
                )) : (
                    <div className="col-span-full py-32 text-center space-y-8 bg-slate-50/50 rounded-[4rem] border-4 border-dashed border-slate-100">
                        <div className="h-24 w-24 bg-white rounded-3xl shadow-soft flex items-center justify-center mx-auto text-slate-200 animate-float">
                            <Sparkles size={48} />
                        </div>
                        <div className="space-y-4">
                            <p className="text-2xl font-black text-slate-400 tracking-tighter">Transmission Interrupted</p>
                            <p className="text-slate-300 font-bold max-w-xs mx-auto text-sm">Awaiting valid destination signals from the planetary network...</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CitySearch;
