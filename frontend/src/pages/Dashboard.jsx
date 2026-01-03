import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, Plus, Star, Compass, ArrowUpRight, TrendingUp, History, Calendar, Globe, Sparkles } from 'lucide-react';
import api from '../api/axios';

const Dashboard = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeRegion, setActiveRegion] = useState('Europe');
    const [trips, setTrips] = useState([]);
    const [suggestions] = useState([
        { id: 1, name: 'Paris, France', cost: '$$$', rating: 4.8, region: 'Europe', img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=400&q=80' },
        { id: 2, name: 'Tokyo, Japan', cost: '$$$$', rating: 4.9, region: 'Asia', img: 'https://plus.unsplash.com/premium_photo-1661964177687-57387c2cbd14?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { id: 3, name: 'Bali, Indonesia', cost: '$$', rating: 4.7, region: 'Asia', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&q=80' },
        { id: 4, name: 'Rome, Italy', cost: '$$$', rating: 4.8, region: 'Europe', img: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=400&q=80' },
        { id: 5, name: 'New York, USA', cost: '$$$$', rating: 4.6, region: 'Americas', img: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=400&q=80' },
        { id: 6, name: 'Cusco, Peru', cost: '$$', rating: 4.9, region: 'Americas', img: 'https://images.unsplash.com/photo-1587595431973-160d0d94adb1?auto=format&fit=crop&w=400&q=80' }
    ]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const response = await api.get('trips/trips/');
                setTrips(response.data);
            } catch (err) {
                console.error("Failed to fetch trips", err);
            }
        };
        fetchTrips();
    }, []);

    return (
        <div className="space-y-24 pb-20 pt-10">
            {/* Hero Section */}
            <div className="relative h-[700px] w-full rounded-[4.5rem] overflow-hidden group border border-white shadow-layered bg-white">
                <img
                    src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[4s] group-hover:scale-110"
                    alt="Hero"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent"></div>
                <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/40 to-transparent"></div>

                {/* Floating Ornaments */}
                <div className="absolute top-20 left-20 h-24 w-24 bg-white/20 backdrop-blur-md rounded-3xl border border-white/30 animate-float shadow-2xl hidden lg:flex items-center justify-center text-white">
                    <Globe size={40} className="animate-spin-slow" />
                </div>
                <div className="absolute top-40 right-40 h-16 w-16 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 animate-pulse-slow shadow-2xl hidden lg:flex items-center justify-center text-white">
                    <Sparkles size={24} />
                </div>

                <div className="absolute inset-x-0 bottom-0 p-12 md:p-32 flex flex-col items-center text-center">
                    <div className="mb-10 inline-flex items-center px-8 py-3 rounded-2xl bg-white/90 backdrop-blur-md border border-white shadow-soft text-primary text-[10px] font-black tracking-[0.4em] uppercase">
                        <TrendingUp size={16} className="mr-3 text-secondary animate-pulse" />
                        Next Gen Planetary Itineraries
                    </div>
                    <h1 className="text-7xl md:text-[10rem] font-black text-slate-800 mb-14 tracking-tighter leading-[0.8] selection:bg-primary selection:text-white">
                        Chart Your <br />
                        <span className="text-gradient drop-shadow-2xl">Azure Horizon</span>
                    </h1>

                    <form onSubmit={handleSearch} className="w-full max-w-4xl relative z-20">
                        <div className="relative flex items-center bg-white/80 backdrop-blur-2xl border-4 border-slate-50/50 rounded-[3rem] px-10 py-6 shadow-layered transition-all duration-700 focus-within:border-primary/20 focus-within:shadow-glow-blue focus-within:scale-[1.02] focus-within:bg-white">
                            <Compass className="text-primary mr-6 animate-spin-slow" size={40} />
                            <input
                                placeholder="Enter your next coordinates..."
                                className="bg-transparent border-none focus:outline-none w-full text-3xl font-black text-slate-800 placeholder:text-slate-300 tracking-tight"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button type="submit" className="bg-primary text-white h-20 w-24 rounded-[1.5rem] ml-6 shadow-glow-blue hover:bg-primary-600 active:scale-95 transition-all flex items-center justify-center group/btn">
                                <Search size={32} className="group-hover/btn:scale-110 transition-transform" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Suggestions Section */}
            <section className="relative px-4">
                <div className="glow-primary -top-40 -right-40"></div>
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <div>
                        <div className="flex items-center text-secondary font-black uppercase tracking-[0.3em] text-xs mb-4">
                            <Globe size={16} className="mr-2" />
                            Curated Sectors
                        </div>
                        <h2 className="text-5xl md:text-6xl font-black text-slate-800 tracking-tighter">Prime Destinations</h2>
                    </div>
                    <div className="flex bg-slate-100 p-1.5 rounded-3xl border border-slate-200 shadow-inner">
                        {['Europe', 'Asia', 'Americas'].map((region) => (
                            <button
                                key={region}
                                onClick={() => setActiveRegion(region)}
                                className={`px-8 py-3 rounded-[1.25rem] text-sm font-black tracking-widest uppercase transition-all ${activeRegion === region ? 'bg-white text-primary shadow-soft' : 'text-slate-500 hover:text-primary hover:bg-white/50'}`}
                            >
                                {region}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                    {suggestions.filter(s => s.region === activeRegion).map((city) => (
                        <Link to={`/search?q=${encodeURIComponent(city.name)}`} key={city.id} className="card-premium group relative flex flex-col h-full bg-white">
                            <div className="relative h-80 overflow-hidden">
                                <img src={city.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125" alt={city.name} />
                                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-0 group-hover:opacity-40 transition-opacity"></div>
                                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl text-sm font-black text-slate-800 flex items-center shadow-soft border border-white">
                                    <Star size={16} className="text-primary fill-primary mr-2" />
                                    {city.rating}
                                </div>
                            </div>
                            <div className="p-10 flex-grow flex flex-col justify-between">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="font-black text-3xl text-slate-800 group-hover:text-primary transition-colors tracking-tight">{city.name}</h3>
                                    <div className="h-12 w-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary transform group-hover:-rotate-12 transition-all">
                                        <ArrowUpRight size={24} />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                                    <p className="text-primary font-black text-xl">{city.cost}</p>
                                    <span className="text-slate-400 text-xs font-black uppercase tracking-[0.2em] group-hover:text-primary transition-colors">Launch Odyssey</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Recent Trips Section */}
            <section className="relative px-4">
                <div className="glow-secondary -bottom-40 -left-40"></div>
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-8">
                    <div>
                        <div className="flex items-center text-primary font-black uppercase tracking-[0.3em] text-xs mb-4">
                            <History size={16} className="mr-2" />
                            Expedition Log
                        </div>
                        <h2 className="text-5xl md:text-6xl font-black text-slate-800 tracking-tighter">Your Adventures</h2>
                    </div>
                    <Link to="/trips/new" className="btn-primary">
                        <Plus size={24} className="mr-2" />
                        Plan New Trip
                    </Link>
                </div>

                {trips.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {trips.map(trip => (
                            <div key={trip.id} className="card-premium group bg-white border-2 border-transparent hover:border-primary/10">
                                <div className="h-64 bg-slate-50 relative overflow-hidden flex items-center justify-center">
                                    {trip.cover_image ? (
                                        <img src={trip.cover_image} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="" />
                                    ) : (
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5"></div>
                                    )}
                                    <div className="relative z-10 h-20 w-20 rounded-3xl bg-white/30 backdrop-blur-md border border-white flex items-center justify-center text-white/50 group-hover:scale-125 transition-all duration-500">
                                        <MapPin size={32} className="text-primary" />
                                    </div>
                                </div>
                                <div className="p-10">
                                    <h3 className="text-3xl font-black mb-4 text-slate-800 tracking-tighter group-hover:text-primary transition-colors leading-tight">{trip.title}</h3>
                                    <div className="flex items-center text-slate-400 text-sm font-black uppercase tracking-widest mb-10">
                                        <Calendar size={16} className="mr-2 text-primary" />
                                        {new Date(trip.start_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} – {new Date(trip.end_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                    </div>
                                    <Link to={`/trips/${trip.id}/itinerary`} className="btn-secondary w-full uppercase tracking-[0.2em] text-sm py-5">
                                        Resume Odyssey
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-[4rem] p-24 text-center border-2 border-dashed border-slate-200 shadow-soft">
                        <div className="h-28 w-28 bg-primary/5 rounded-[2rem] flex items-center justify-center mx-auto mb-10">
                            <MapPin size={56} className="text-primary" />
                        </div>
                        <h3 className="text-5xl font-black text-slate-800 mb-6 tracking-tighter">No Active Expeditions</h3>
                        <p className="text-slate-500 mb-12 max-w-lg mx-auto text-xl font-medium leading-relaxed">The horizon is beckoning. Start your first journey today and chart a course for something extraordinary.</p>
                        <Link to="/trips/new" className="btn-primary px-14 py-6 text-xl mx-auto shadow-layered">
                            Start Journey
                        </Link>
                    </div>
                )}
            </section>
        </div>
    );
};

export default Dashboard;
