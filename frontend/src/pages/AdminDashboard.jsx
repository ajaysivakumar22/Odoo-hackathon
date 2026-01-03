import { useState, useEffect } from 'react';
import api from '../api/axios';
import { Users, Map, LayoutGrid, Plus, Settings, FileText, Activity, Globe, ShieldCheck } from 'lucide-react';

const AdminDashboard = () => {
    const [stats] = useState({ users: 1284, trips: 3592, cities: 32 });

    useEffect(() => {
        // Stats fetch implementation placeholder
    }, []);

    return (
        <div className="max-w-7xl mx-auto py-16 px-6 space-y-16 pb-40">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 bg-white p-14 rounded-[3.5rem] shadow-layered border border-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>

                <div className="relative z-10 flex-1">
                    <div className="flex items-center text-primary font-black uppercase tracking-[0.4em] text-xs mb-5">
                        <ShieldCheck size={18} className="mr-3" />
                        System Architecture
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-slate-800 tracking-tighter leading-tight mb-4">Admin <span className="text-gradient">Console</span></h1>
                    <p className="text-slate-500 font-medium text-xl max-w-xl">Centralized authorization and data orchestration for the global network.</p>
                </div>

                <div className="flex items-center space-x-4 bg-emerald-50 px-8 py-4 rounded-3xl border border-emerald-100 relative z-10">
                    <span className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-sm font-black text-emerald-600 uppercase tracking-widest">Mainframe Operational</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {[
                    { label: 'Network Explorers', value: stats.users, icon: Users, color: 'primary', bg: 'bg-primary/5' },
                    { label: 'Active Routes', value: stats.trips, icon: Map, color: 'emerald', bg: 'bg-emerald-50' },
                    { label: 'Strategic Cities', value: stats.cities, icon: LayoutGrid, color: 'indigo', bg: 'bg-indigo-50' }
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-10 rounded-[3rem] shadow-soft border border-white relative overflow-hidden group hover:shadow-layered transition-all duration-500">
                        <div className={`absolute -right-6 -bottom-6 h-32 w-32 ${stat.bg} rounded-full group-hover:scale-150 transition-transform duration-700`}></div>
                        <div className={`h-16 w-16 rounded-2xl ${stat.bg} flex items-center justify-center text-${stat.color === 'primary' ? 'primary' : stat.color + '-500'} mb-8 relative z-10`}>
                            <stat.icon size={32} />
                        </div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2 relative z-10">{stat.label}</p>
                        <p className="text-5xl font-black text-slate-800 relative z-10 tracking-tighter">{stat.value.toLocaleString()}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-10">
                    <div className="bg-white p-14 rounded-[3.5rem] shadow-layered border border-white">
                        <div className="flex items-center justify-between mb-12">
                            <div className="flex items-center space-x-4">
                                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                    <Activity size={24} />
                                </div>
                                <h3 className="text-2xl font-black text-slate-800 tracking-tight">User Acquisition</h3>
                            </div>
                            <select className="bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-3 text-xs font-black text-slate-500 outline-none hover:border-primary/20 transition-all">
                                <option>Current Interval: 30D</option>
                            </select>
                        </div>
                        <div className="h-72 flex items-end justify-between gap-4">
                            {[40, 65, 45, 90, 65, 80, 55, 100, 85, 70, 95, 110].map((h, i) => (
                                <div key={i} className="flex-1 bg-primary/5 rounded-2xl relative group transition-all hover:bg-primary/20" style={{ height: `${h}%` }}>
                                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] font-black px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100 whitespace-nowrap z-20 shadow-xl">
                                        {h * 10} EXPLORERS
                                    </div>
                                    <div className="absolute bottom-0 inset-x-0 h-1/4 bg-primary/10 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="bg-white p-12 rounded-[3.5rem] shadow-soft border border-white flex flex-col items-center justify-center hover:shadow-layered transition-all">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-10">Network Saturation</p>
                            <div className="relative h-56 w-56 rounded-full border-[1.5rem] border-slate-50 flex items-center justify-center shadow-inner">
                                <svg className="absolute inset-0 h-full w-full -rotate-90">
                                    <circle
                                        cx="112"
                                        cy="112"
                                        r="90"
                                        fill="transparent"
                                        stroke="currentColor"
                                        strokeWidth="24"
                                        className="text-primary/20"
                                    />
                                    <circle
                                        cx="112"
                                        cy="112"
                                        r="90"
                                        fill="transparent"
                                        stroke="currentColor"
                                        strokeWidth="24"
                                        strokeDasharray="565.48"
                                        strokeDashoffset="203.57"
                                        strokeLinecap="round"
                                        className="text-primary transition-all duration-1000"
                                    />
                                </svg>
                                <div className="text-center relative z-10">
                                    <p className="text-5xl font-black text-slate-800 leading-none">64%</p>
                                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mt-2">Activity</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-12 rounded-[3.5rem] shadow-soft border border-white hover:shadow-layered transition-all">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-10">Strategic Sectors</p>
                            <div className="space-y-8">
                                {[
                                    { label: 'Europe', val: 78, color: 'primary' },
                                    { label: 'Asia', val: 45, color: 'emerald' },
                                    { label: 'Americas', val: 92, color: 'indigo' }
                                ].map((reg, i) => (
                                    <div key={i} className="space-y-3">
                                        <div className="flex justify-between text-xs font-black uppercase tracking-widest">
                                            <span className="text-slate-500">{reg.label}</span>
                                            <span className="text-slate-800">{reg.val}%</span>
                                        </div>
                                        <div className="h-3 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                                            <div className={`h-full bg-${reg.color === 'primary' ? 'primary' : reg.color + '-500'} transition-all duration-1000 rounded-full`} style={{ width: `${reg.val}%` }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-10">
                    <div className="bg-white p-12 rounded-[3.5rem] shadow-layered border border-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                        <h3 className="text-2xl font-black text-slate-800 mb-10 relative z-10 tracking-tight">Orchestration</h3>
                        <div className="space-y-4 relative z-10">
                            <button
                                onClick={() => alert("Coordinate registry initialization forthcoming.")}
                                className="w-full text-left p-6 bg-slate-50 rounded-[2rem] border-2 border-transparent hover:border-primary/20 hover:bg-white transition-all flex items-center justify-between group/action"
                            >
                                <div className="flex items-center">
                                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mr-4 group-hover/action:scale-110 transition-transform">
                                        <Globe size={20} />
                                    </div>
                                    <span className="text-sm font-black text-slate-700 tracking-tight">Register Cities</span>
                                </div>
                                <Plus size={20} className="text-primary/40 group-hover/action:text-primary transition-colors" />
                            </button>
                            <button
                                onClick={() => alert("Protocol broadcast initialization.")}
                                className="w-full text-left p-6 bg-slate-50 rounded-[2rem] border-2 border-transparent hover:border-primary/20 hover:bg-white transition-all flex items-center justify-between group/action"
                            >
                                <div className="flex items-center">
                                    <div className="h-10 w-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500 mr-4 group-hover/action:scale-110 transition-transform">
                                        <Activity size={20} />
                                    </div>
                                    <span className="text-sm font-black text-slate-700 tracking-tight">Broadcast Alerts</span>
                                </div>
                                <Settings size={20} className="text-slate-300 group-hover/action:text-primary transition-colors" />
                            </button>
                        </div>
                    </div>

                    <div className="bg-white p-12 rounded-[3.5rem] shadow-layered border border-white">
                        <h3 className="text-2xl font-black text-slate-800 mb-10 tracking-tight">Data Logs</h3>
                        <div className="space-y-6">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="flex items-center space-x-6 group cursor-pointer">
                                    <div className="h-14 w-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-300 group-hover:text-primary group-hover:border-primary/20 transition-all">
                                        <FileText size={24} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-black text-slate-800 group-hover:text-primary transition-colors">Manifest_Sector_{i}.dat</p>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Status: Verified · 4.2 MB</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-10 py-5 bg-slate-50 rounded-2xl text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] hover:bg-slate-100 transition-all">
                            Archive History
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
