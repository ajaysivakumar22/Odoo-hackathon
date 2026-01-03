import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { MapPin, Calendar, Check, Plus, Rocket, ArrowRight, History, Compass } from 'lucide-react';

const TripListing = () => {
    const [trips, setTrips] = useState([]);
    const [activeTab, setActiveTab] = useState('ongoing');

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

    const filterTrips = (status) => {
        const now = new Date();
        return trips.filter(trip => {
            const start = new Date(trip.start_date);
            const end = new Date(trip.end_date);
            if (status === 'ongoing') return start <= now && end >= now;
            if (status === 'upcoming') return start > now;
            if (status === 'completed') return end < now;
            return true;
        });
    };

    const StatusBadge = ({ status }) => {
        const styles = {
            ongoing: 'bg-emerald-50 text-emerald-600 border-emerald-100',
            upcoming: 'bg-primary-50 text-primary-600 border-primary-100',
            completed: 'bg-slate-50 text-slate-400 border-slate-100'
        };
        return (
            <span className={`px-4 py-1.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border shadow-soft ${styles[status]}`}>
                {status}
            </span>
        );
    };

    return (
        <div className="max-w-7xl mx-auto space-y-16 py-16 px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 bg-white p-14 rounded-[3.5rem] shadow-layered border border-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>

                <div className="relative z-10 flex-1">
                    <div className="flex items-center text-primary font-black uppercase tracking-[0.4em] text-xs mb-5">
                        <Compass size={18} className="mr-3" />
                        Expedition Command
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-slate-800 tracking-tighter leading-tight mb-4">Your <span className="text-gradient">Journeys</span></h1>
                    <p className="text-slate-500 font-medium text-xl max-w-xl">Curate your travel history and manage upcoming planetary transfers.</p>
                </div>

                <div className="flex bg-slate-50 p-2 rounded-3xl border border-slate-200 relative z-10 shadow-inner">
                    {[
                        { id: 'ongoing', label: 'Active', icon: MapPin },
                        { id: 'upcoming', label: 'Staged', icon: Calendar },
                        { id: 'completed', label: 'Archived', icon: Check }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center px-8 py-3.5 rounded-[1.25rem] text-sm font-black uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-white text-primary shadow-soft' : 'text-slate-400 hover:text-primary'}`}
                        >
                            <tab.icon size={18} className="mr-2" /> {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-12">
                {filterTrips(activeTab).length > 0 ? (
                    filterTrips(activeTab).map(trip => (
                        <div key={trip.id} className="bg-white rounded-[3rem] shadow-soft border border-white flex flex-col md:flex-row overflow-hidden group hover:shadow-layered transition-all duration-500">
                            <div className="md:w-[400px] h-72 md:h-auto bg-slate-50 relative shrink-0 overflow-hidden">
                                {trip.cover_image ? (
                                    <img src={trip.cover_image} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="" />
                                ) : (
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5"></div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
                                <div className="absolute top-8 left-8 z-20">
                                    <StatusBadge status={activeTab} />
                                </div>
                            </div>

                            <div className="p-12 flex-1 flex flex-col justify-between">
                                <div className="space-y-6">
                                    <div className="flex items-start justify-between">
                                        <h3 className="text-4xl font-black text-slate-800 tracking-tighter group-hover:text-primary transition-colors leading-tight">{trip.title}</h3>
                                        <div className="h-14 w-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-300 font-black italic">
                                            {new Date(trip.start_date).getFullYear()}
                                        </div>
                                    </div>
                                    <p className="text-slate-500 font-medium text-lg leading-relaxed max-w-2xl">
                                        {trip.description || "The log entry for this expedition remains remarkably brief. No mission details have been recorded by the explorer at this sector."}
                                    </p>
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8 pt-10 border-t border-slate-50 mt-10">
                                    <div className="flex items-center space-x-6">
                                        <div className="flex items-center bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100">
                                            <Calendar size={18} className="mr-3 text-primary" />
                                            <span className="text-sm font-black text-slate-600 uppercase tracking-widest">
                                                {new Date(trip.start_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} — {new Date(trip.end_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </span>
                                        </div>
                                    </div>
                                    <Link to={`/trips/${trip.id}/itinerary`} className="btn-primary !px-12 group/btn">
                                        <span>Resume Mission</span>
                                        <ArrowRight size={22} className="ml-3 group-hover/btn:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="bg-white rounded-[4rem] p-32 text-center border-2 border-dashed border-slate-200 shadow-soft flex flex-col items-center">
                        <div className="h-24 w-24 bg-slate-50 rounded-[2rem] flex items-center justify-center mb-8 border border-slate-100">
                            <History size={40} className="text-slate-300" />
                        </div>
                        <h3 className="text-3xl font-black text-slate-800 tracking-tighter uppercase mb-4">No records in {activeTab} sector</h3>
                        <p className="text-slate-500 text-lg max-w-md font-medium leading-relaxed">Initiate a new planetary transfer to populate your expedition logs.</p>
                        <Link to="/trips/new" className="mt-12 btn-secondary !px-10">
                            <Plus size={20} className="mr-2" /> Start New Journey
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TripListing;
