import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Plus, User, Award, Globe, Heart, Settings, Shield, Sparkles } from 'lucide-react';

const Profile = () => {
    const { user } = useAuth();

    return (
        <div className="max-w-7xl mx-auto py-16 px-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-40">
            <div className="flex flex-col lg:flex-row gap-16">
                {/* Left Column: Profile Identity */}
                <div className="lg:w-1/3 space-y-12">
                    <div className="bg-white rounded-[4rem] p-12 text-center relative overflow-hidden shadow-layered border border-white">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>

                        <div className="relative mx-auto h-56 w-56 rounded-[3.5rem] border-8 border-slate-50 shadow-soft overflow-hidden mb-10 group bg-slate-100 flex items-center justify-center text-6xl font-black text-slate-300 transform transition-all duration-700 hover:scale-105">
                            {user?.profile_image ? (
                                <img src={user.profile_image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000" />
                            ) : (
                                user?.username?.[0].toUpperCase()
                            )}
                        </div>

                        <div className="space-y-3 mb-10">
                            <h1 className="text-4xl font-black text-slate-800 tracking-tighter leading-none">{user?.first_name} {user?.last_name}</h1>
                            <div className="flex items-center justify-center space-x-2">
                                <span className="text-primary font-black text-[10px] uppercase tracking-[0.4em] bg-primary/5 px-4 py-1.5 rounded-xl border border-primary/10">
                                    @{user?.username}
                                </span>
                                <div className="h-6 w-6 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-500 shadow-sm">
                                    <Shield size={12} />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-5 text-left bg-slate-50/50 p-8 rounded-[2.5rem] border border-slate-100 shadow-inner">
                            <div className="flex items-center group">
                                <div className="h-12 w-12 rounded-2xl bg-white flex items-center justify-center mr-4 shadow-soft border border-slate-100 group-hover:scale-110 transition-transform">
                                    <Mail size={18} className="text-primary" />
                                </div>
                                <div className="overflow-hidden">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Authorization Hub</p>
                                    <p className="text-sm font-bold text-slate-700 truncate">{user?.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center group">
                                <div className="h-12 w-12 rounded-2xl bg-white flex items-center justify-center mr-4 shadow-soft border border-slate-100 group-hover:scale-110 transition-transform">
                                    <MapPin size={18} className="text-secondary" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Standard Coordinates</p>
                                    <p className="text-sm font-bold text-slate-700">{user?.city}, {user?.country}</p>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => alert("Interface adjustment protocol initialized.")}
                            className="bg-white w-full mt-10 py-5 rounded-[2rem] text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] border-2 border-slate-100 hover:border-primary/20 hover:text-primary transition-all flex items-center justify-center space-x-3 shadow-soft group"
                        >
                            <Settings size={14} className="group-hover:rotate-90 transition-transform" />
                            <span>Recalibrate Identity</span>
                        </button>
                    </div>

                    <div className="bg-white rounded-[3rem] p-10 shadow-layered border border-white">
                        <div className="flex items-center space-x-4 mb-10">
                            <div className="h-10 w-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                <Award size={20} />
                            </div>
                            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">Operational Metrics</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="p-8 bg-slate-50 rounded-[2.5rem] text-center group hover:bg-white hover:shadow-soft border border-transparent hover:border-slate-100 transition-all">
                                <p className="text-4xl font-black text-primary mb-2 tracking-tighter">12</p>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-tight">Missions<br />Completed</p>
                            </div>
                            <div className="p-8 bg-slate-50 rounded-[2.5rem] text-center group hover:bg-white hover:shadow-soft border border-transparent hover:border-slate-100 transition-all">
                                <p className="text-4xl font-black text-secondary mb-2 tracking-tighter">08</p>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-tight">Sectors<br />Explored</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Narrative & Log Access */}
                <div className="lg:w-2/3 space-y-16">
                    <section>
                        <div className="flex items-center space-x-4 mb-10">
                            <div className="h-14 w-14 bg-secondary/5 rounded-2xl flex items-center justify-center text-secondary shadow-soft border border-secondary/10">
                                <Heart size={28} />
                            </div>
                            <h2 className="text-4xl font-black text-slate-800 tracking-tighter">Explorer Narrative</h2>
                        </div>
                        <div className="bg-white rounded-[4rem] p-14 shadow-layered border border-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                            <p className="text-slate-500 text-xl font-medium leading-[1.8] italic relative z-10 selection:bg-secondary/10 selection:text-secondary">
                                "{user?.additional_info || "Scanning for travel personality... Broadcast your travel style to receive tailored coordinates for your next jump."}"
                            </p>
                            <div className="mt-10 flex items-center text-slate-300 font-black text-[10px] uppercase tracking-[0.4em]">
                                <Sparkles size={14} className="mr-3" />
                                Memory Encrypted
                            </div>
                        </div>
                    </section>

                    <section>
                        <div className="flex items-center justify-between mb-10">
                            <div className="flex items-center space-x-4">
                                <div className="h-14 w-14 bg-primary/5 rounded-2xl flex items-center justify-center text-primary shadow-soft border border-primary/10">
                                    <Globe size={28} />
                                </div>
                                <h2 className="text-4xl font-black text-slate-800 tracking-tighter">Mission Queue</h2>
                            </div>
                            <Link to="/trips" className="h-12 px-8 bg-slate-50 rounded-2xl flex items-center text-[10px] font-black text-slate-400 uppercase tracking-widest hover:bg-primary/5 hover:text-primary transition-all border border-slate-100 shadow-soft">
                                Browse Archives
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                            <Link to="/trips/new" className="bg-white rounded-[3.5rem] h-64 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-12 text-center group cursor-pointer hover:border-primary/40 hover:bg-primary/5 transition-all duration-500">
                                <div className="h-20 w-20 rounded-[2rem] bg-primary/10 flex items-center justify-center text-primary mb-6 shadow-soft group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                    <Plus size={32} />
                                </div>
                                <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] group-hover:text-primary transition-colors">Digital Log Initialization</h4>
                            </Link>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Profile;
