import { useState } from 'react';
import { Calendar, MapPin, Check, ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';

const CalendarView = () => {
    const [view, setView] = useState('Month');
    return (
        <div className="max-width-7xl mx-auto py-16 px-6 space-y-16 pb-40">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 bg-white p-12 rounded-[3.5rem] shadow-layered border border-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>

                <div className="relative z-10">
                    <div className="flex items-center text-secondary font-black uppercase tracking-[0.4em] text-xs mb-5">
                        <Calendar size={18} className="mr-3" />
                        Temporal Mapping
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-slate-800 tracking-tighter leading-tight mb-4">Trip <span className="text-gradient">Schedule</span></h1>
                    <p className="text-slate-500 font-medium text-xl max-w-xl">A panoramic view of your upcoming planetary transfers and exploration windows.</p>
                </div>

                <div className="flex bg-slate-50 p-2 rounded-3xl border border-slate-200 relative z-10 shadow-inner">
                    {['Month', 'Week', 'Day'].map(v => (
                        <button
                            key={v}
                            onClick={() => setView(v)}
                            className={`px-8 py-3.5 rounded-[1.25rem] text-sm font-black uppercase tracking-widest transition-all ${view === v ? 'bg-white text-primary shadow-soft' : 'text-slate-400 hover:text-primary'}`}
                        >
                            {v}
                        </button>
                    ))}
                </div>
            </div>

            <div className={`bg-white rounded-[4rem] p-12 md:p-16 shadow-layered border border-white overflow-hidden min-h-[700px] flex flex-col transition-all duration-700 relative ${view !== 'Month' ? 'opacity-60 scale-95' : ''}`}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-2 bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>

                <div className="flex items-center justify-between mb-16 px-4">
                    <div className="flex items-center space-x-8">
                        <button className="h-14 w-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-primary transition-all">
                            <ChevronLeft size={28} />
                        </button>
                        <h3 className="text-4xl font-black text-slate-800 tracking-tighter">{view === 'Month' ? 'January 2024' : `Staged ${view}`}</h3>
                        <button className="h-14 w-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-primary transition-all">
                            <ChevronRight size={28} />
                        </button>
                    </div>
                    {view !== 'Month' && (
                        <div className="flex items-center px-6 py-3 rounded-2xl bg-primary/5 text-primary text-xs font-black uppercase tracking-widest border border-primary/10 animate-pulse">
                            <Sparkles size={16} className="mr-3" />
                            Synchronization Required
                        </div>
                    )}
                </div>

                {view === 'Month' && (
                    <>
                        <div className="grid grid-cols-7 gap-6 mb-10 px-4">
                            {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
                                <div key={day} className="text-center text-xs font-black text-slate-400 tracking-[0.3em]">{day}</div>
                            ))}
                        </div>

                        <div className="grid grid-cols-7 gap-6 flex-1 px-4 pb-4">
                            {[...Array(35)].map((_, i) => (
                                <div key={i} className={`aspect-square rounded-[2rem] border-2 ${i === 15 ? 'bg-primary-50 border-primary/20 shadow-inner' : 'bg-slate-50/30 border-slate-50 hover:border-primary/10 hover:bg-white hover:shadow-soft transition-all duration-500'} p-6 relative group cursor-pointer overflow-hidden`}>
                                    <span className={`text-xl font-black ${i === 15 ? 'text-primary' : 'text-slate-300 group-hover:text-slate-500 transition-colors'}`}>{i + 1}</span>
                                    {i === 15 && (
                                        <div className="absolute inset-x-3 bottom-3 bg-white text-primary text-[9px] font-black p-3 rounded-2xl shadow-layered border border-primary/10 animate-float flex items-center">
                                            <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></div>
                                            SUMMER IN PARIS
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="bg-white p-10 rounded-[3rem] shadow-soft border border-white flex flex-col items-center group hover:shadow-layered transition-all">
                    <div className="h-16 w-16 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500 mb-6 group-hover:scale-110 transition-transform">
                        <Calendar size={32} />
                    </div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1">Active Transfers</p>
                    <h4 className="text-3xl font-black text-slate-800 tracking-tight">4 Expeditions</h4>
                </div>
                <div className="bg-white p-10 rounded-[3rem] shadow-soft border border-white flex flex-col items-center group hover:shadow-layered transition-all">
                    <div className="h-16 w-16 rounded-2xl bg-primary-50 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                        <MapPin size={32} />
                    </div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1">Planned Coordinates</p>
                    <h4 className="text-3xl font-black text-slate-800 tracking-tight">12 Destinations</h4>
                </div>
                <div className="bg-white p-10 rounded-[3rem] shadow-soft border border-white flex flex-col items-center group hover:shadow-layered transition-all">
                    <div className="h-16 w-16 rounded-2xl bg-secondary/5 flex items-center justify-center text-secondary mb-6 group-hover:scale-110 transition-transform">
                        <Check size={32} />
                    </div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1">Mission Milestones</p>
                    <h4 className="text-3xl font-black text-slate-800 tracking-tight">140 Activities</h4>
                </div>
            </div>
        </div>
    );
};

export default CalendarView;
