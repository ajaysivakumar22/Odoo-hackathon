import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Share2, Compass, Users, Sparkles, MapPin } from 'lucide-react';

const Community = () => {
    const navigate = useNavigate();
    const [trips] = useState([
        { id: 1, title: 'Summer in Tuscany', author: 'Elena R.', likes: 124, img: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=400&q=80' },
        { id: 2, title: 'Tokyo Neon Nights', author: 'Kenji S.', likes: 89, img: 'https://plus.unsplash.com/premium_photo-1661964177687-57387c2cbd14?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { id: 3, title: 'Icelandic Roadtrip', author: 'Magnus O.', likes: 256, img: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&w=400&q=80' }
    ]);
    const [liked, setLiked] = useState([]);

    const toggleLike = (id) => {
        setLiked(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    return (
        <div className="max-w-7xl mx-auto py-16 px-6 space-y-16 pb-40">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 bg-white p-14 rounded-[3.5rem] shadow-layered border border-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>

                <div className="relative z-10 flex-1">
                    <div className="flex items-center text-primary font-black uppercase tracking-[0.4em] text-xs mb-5">
                        <Users size={18} className="mr-3" />
                        Collective Intelligence
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-slate-800 tracking-tighter leading-tight mb-4">Traveler <span className="text-gradient">Feed</span></h1>
                    <p className="text-slate-500 font-medium text-xl max-w-xl">Decode successful itineraries from the most active explorers in the network.</p>
                </div>

                <div className="flex -space-x-4 relative z-10">
                    {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className="h-14 w-14 rounded-2xl border-4 border-white bg-slate-100 shadow-soft overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
                            <img src={`https://i.pravatar.cc/100?u=${i + 10}`} className="w-full h-full object-cover" alt="" />
                        </div>
                    ))}
                    <div className="h-14 w-14 rounded-2xl border-4 border-white bg-primary flex items-center justify-center text-xs font-black text-white shadow-glow-blue z-10 animate-pulse">+2k</div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {trips.map(trip => (
                    <div key={trip.id} className="bg-white rounded-[3rem] shadow-soft border border-white overflow-hidden group hover:shadow-layered transition-all duration-500">
                        <div className="h-80 relative overflow-hidden">
                            <img src={trip.img} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-125" alt={trip.title} />
                            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-0 group-hover:opacity-40 transition-opacity"></div>

                            {/* Author Overlay */}
                            <div className="absolute bottom-8 left-8 flex items-center space-x-4 bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-white shadow-soft">
                                <div className="h-10 w-10 rounded-xl overflow-hidden border-2 border-primary/20">
                                    <img src={`https://i.pravatar.cc/100?u=${trip.id + 20}`} className="w-full h-full object-cover" alt="" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-slate-400 text-[8px] font-black uppercase tracking-widest">Architect</span>
                                    <span className="text-slate-800 text-xs font-black">{trip.author}</span>
                                </div>
                            </div>

                            <div className="absolute top-8 right-8">
                                <div className="h-12 w-12 rounded-2xl bg-white/90 backdrop-blur-md flex items-center justify-center text-primary shadow-soft border border-white">
                                    <Sparkles size={20} />
                                </div>
                            </div>
                        </div>

                        <div className="p-10">
                            <div className="flex items-start justify-between mb-8">
                                <h3 className="text-2xl font-black text-slate-800 leading-tight group-hover:text-primary transition-colors tracking-tight">
                                    {trip.title}
                                </h3>
                                <div className="flex items-center text-xs font-bold text-slate-400">
                                    <MapPin size={14} className="mr-1 text-primary" />
                                    COORD: {trip.id * 14}.22
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-8 border-t border-slate-50">
                                <button
                                    onClick={() => toggleLike(trip.id)}
                                    className={`flex items-center space-x-3 px-5 py-2.5 rounded-2xl transition-all ${liked.includes(trip.id) ? 'bg-secondary/5 text-secondary border border-secondary/10' : 'text-slate-400 hover:bg-slate-50'}`}
                                >
                                    <Heart size={20} className="transition-transform active:scale-150" fill={liked.includes(trip.id) ? "currentColor" : "none"} />
                                    <span className="text-xs font-black tracking-widest uppercase">{liked.includes(trip.id) ? trip.likes + 1 : trip.likes}</span>
                                </button>

                                <button
                                    onClick={() => navigate(`/trips/new?city=${encodeURIComponent(trip.title.replace('Summer in ', '').replace(' Neon Nights', '').replace(' Icelandic Roadtrip', ''))}`)}
                                    className="flex items-center space-x-3 text-primary font-black text-xs uppercase tracking-widest bg-primary/5 px-6 py-3 rounded-2xl border border-primary/10 hover:bg-primary hover:text-white hover:shadow-glow-blue transition-all"
                                >
                                    <Share2 size={18} />
                                    <span>Sync Route</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Inspiration CTA */}
            <div className="bg-gradient-to-br from-primary to-blue-600 rounded-[4rem] p-20 text-center relative overflow-hidden shadow-layered">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full -ml-48 -mb-48 blur-3xl"></div>

                <div className="relative z-10 max-w-2xl mx-auto">
                    <div className="h-20 w-20 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center mx-auto mb-10 text-white shadow-2xl">
                        <Compass size={40} className="animate-spin-slow" />
                    </div>
                    <h2 className="text-5xl font-black text-white mb-6 tracking-tighter">Broadcast Your Odyssey</h2>
                    <p className="text-white/80 text-xl font-medium mb-12">Your travel algorithms could inspire the next generation of explorers. Share your completed mission logs today.</p>
                    <button className="bg-white text-primary px-12 py-5 rounded-2xl font-black text-lg shadow-2xl hover:scale-105 active:scale-95 transition-all">
                        Initialize Dataset Upload
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Community;
