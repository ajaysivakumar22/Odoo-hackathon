import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../api/axios';
import { Calendar, MapPin, Sparkles, Plus, Rocket, Compass, CheckCircle2, ChevronRight, Globe } from 'lucide-react';

const CreateTrip = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialTitle = queryParams.get('city') ? `My Trip to ${queryParams.get('city')}` : '';

    const [title, setTitle] = useState(initialTitle);
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('trips/trips/', {
                title,
                description,
                start_date: startDate,
                end_date: endDate,
                is_public: false
            });
            navigate(`/trips/${response.data.id}/itinerary`);
        } catch (err) {
            console.error("Failed to create trip", err);
        }
    };

    return (
        <div className="max-w-7xl mx-auto py-16 px-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-40">
            <div className="bg-white p-14 rounded-[4rem] shadow-layered border border-white relative overflow-hidden mb-16">
                <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full -mr-40 -mt-40 blur-3xl"></div>

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10">
                    <div>
                        <div className="flex items-center text-primary font-black uppercase tracking-[0.4em] text-xs mb-6">
                            <Rocket size={20} className="mr-3" />
                            Mission Initiation
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-slate-800 tracking-tighter leading-tight">Create New <span className="text-gradient">Adventure</span></h1>
                        <p className="text-slate-500 font-medium text-xl mt-4 max-w-xl">Configure the core parameters for your next planetary expedition.</p>
                    </div>
                    <div className="h-24 w-24 bg-primary rounded-[2.5rem] flex items-center justify-center text-white shadow-glow-blue animate-float">
                        <Sparkles size={40} />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                <div className="lg:col-span-2 space-y-12">
                    <form onSubmit={handleSubmit} className="bg-white rounded-[3.5rem] p-12 md:p-16 shadow-layered border border-white space-y-12">
                        <div className="space-y-6">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] ml-2 block italic">Expedition Designation</label>
                            <div className="relative group/field">
                                <input
                                    placeholder="e.g. Summer in Santorini"
                                    className="w-full px-10 py-8 bg-slate-50 border-4 border-transparent text-3xl font-black text-slate-800 rounded-[2.5rem] transition-all duration-500 focus:outline-none focus:border-primary/20 focus:bg-white focus:shadow-soft placeholder:text-slate-200"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                            <div className="space-y-6">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] ml-2 block flex items-center italic">
                                    <Calendar size={16} className="mr-3 text-primary" /> Departure Time
                                </label>
                                <input
                                    type="date"
                                    className="w-full px-8 py-6 bg-slate-50 border-2 border-slate-100/50 text-slate-700 rounded-3xl transition-all duration-300 focus:outline-none focus:border-primary/30 focus:bg-white focus:shadow-soft"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-6">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] ml-2 block flex items-center italic">
                                    <Calendar size={16} className="mr-3 text-primary" /> Return Window
                                </label>
                                <input
                                    type="date"
                                    className="w-full px-8 py-6 bg-slate-50 border-2 border-slate-100/50 text-slate-700 rounded-3xl transition-all duration-300 focus:outline-none focus:border-primary/30 focus:bg-white focus:shadow-soft"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-6">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] ml-2 block italic">Mission Objective</label>
                            <textarea
                                placeholder="State your primary goals and desired outcomes..."
                                className="w-full px-10 py-8 bg-slate-50 border-2 border-slate-100/50 text-slate-700 rounded-[2.5rem] transition-all duration-500 focus:outline-none focus:border-primary/30 focus:bg-white focus:shadow-soft min-h-[200px] resize-none leading-relaxed text-lg"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>

                        <button type="submit" className="w-full bg-primary text-white py-8 rounded-[2.5rem] text-xl font-black uppercase tracking-[0.4em] flex items-center justify-center space-x-4 shadow-layered hover:shadow-glow-blue hover:scale-[1.02] active:scale-95 transition-all duration-500 group">
                            <Globe size={28} className="group-hover:rotate-12 transition-transform" />
                            <span>Confirm Coordinates</span>
                        </button>
                    </form>
                </div>

                <div className="space-y-12">
                    <div className="bg-gradient-to-br from-primary to-blue-600 rounded-[3.5rem] p-12 text-white shadow-layered relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-24 -mt-24 blur-3xl group-hover:bg-white/20 transition-all duration-700"></div>
                        <div className="h-16 w-16 bg-white/20 backdrop-blur-xl border border-white/20 rounded-[1.5rem] flex items-center justify-center mb-8 shadow-2xl">
                            <Compass size={32} className="text-white" />
                        </div>
                        <h3 className="text-3xl font-black mb-4 tracking-tight leading-tight">Navigation Guidance</h3>
                        <p className="text-white/80 text-lg font-medium leading-[1.7] mb-8">
                            Start with high-level coordinates. Specific sub-sectors and daily missions can be recalibrated once you enter the builder stage.
                        </p>
                        <div className="flex items-center text-xs font-black uppercase tracking-[0.3em] text-white/60">
                            Protocol Alpha · V.2.0
                        </div>
                    </div>

                    <div className="bg-white rounded-[3.5rem] p-12 shadow-layered border border-white">
                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-10 flex items-center italic">
                            <Sparkles size={14} className="mr-2 text-primary" /> Advanced Features
                        </h3>
                        <ul className="space-y-8">
                            {[
                                'Relational Log Management',
                                'Budgetary Simulation',
                                'Activity Threading',
                                'Neural Map Sync'
                            ].map((item, i) => (
                                <li key={i} className="flex items-start text-sm font-black text-slate-700 group cursor-default">
                                    <div className="h-7 w-7 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-500 mr-5 mt-0.5 border border-emerald-100 group-hover:scale-110 transition-transform shadow-sm">
                                        <CheckCircle2 size={16} />
                                    </div>
                                    <span className="leading-tight group-hover:text-primary transition-colors">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <section className="mt-32">
                <div className="flex items-center justify-between mb-12 px-2">
                    <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 bg-secondary/5 rounded-2xl flex items-center justify-center text-secondary border border-secondary/10 shadow-soft">
                            <MapPin size={24} />
                        </div>
                        <h2 className="text-4xl font-black text-slate-800 tracking-tighter">Nearby Sectors</h2>
                    </div>
                    <button className="flex items-center text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] hover:text-primary transition-colors">
                        Expand All <ChevronRight size={14} className="ml-2" />
                    </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
                    {[
                        { name: 'Swiss Alps', img: 'https://images.unsplash.com/photo-1531310197839-ccf54634509e?auto=format&fit=crop&w=200&q=80' },
                        { name: 'Kyoto', img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=200&q=80' },
                        { name: 'Amalfi Coast', img: 'https://images.unsplash.com/photo-1633321088355-d0f81134ca3b?auto=format&fit=crop&w=200&q=80' },
                        { name: 'Iceland', img: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&w=200&q=80' },
                        { name: 'Chefchaouen', img: 'https://images.unsplash.com/photo-1548661762-43ce9c5b2484?auto=format&fit=crop&w=200&q=80' },
                        { name: 'Santorini', img: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5fe?auto=format&fit=crop&w=200&q=80' }
                    ].map((place, i) => (
                        <div
                            key={i}
                            onClick={() => setTitle(`Exploration of ${place.name}`)}
                            className="group relative aspect-[3/4.5] rounded-[2.5rem] overflow-hidden cursor-pointer shadow-soft hover:shadow-layered transition-all duration-700 border border-white"
                        >
                            <img src={place.img} className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000" alt="" />
                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-white via-white/80 to-transparent transition-opacity group-hover:opacity-90"></div>
                            <div className="absolute bottom-8 left-8 right-8">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1">Sector</p>
                                <p className="text-xl font-black text-slate-800 leading-tight tracking-tight group-hover:text-primary transition-colors">{place.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default CreateTrip;
