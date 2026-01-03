import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import { Calendar, MapPin, Plus, ChevronRight, ArrowRight, ArrowLeft, MoreHorizontal, Wallet, Sparkles } from 'lucide-react';

const ItineraryBuilder = () => {
    const { id } = useParams();
    const [trip, setTrip] = useState(null);
    const [stops, setStops] = useState([]);
    const [cities, setCities] = useState([]);
    const [showStopModal, setShowStopModal] = useState(false);
    const [newStop, setNewStop] = useState({ city: '', arrival_date: '', departure_date: '', budget_limit: 0 });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [tripRes, stopsRes, citiesRes] = await Promise.all([
                    api.get(`trips/trips/${id}/`),
                    api.get(`trips/stops/?trip=${id}`),
                    api.get('geo/cities/')
                ]);
                setTrip(tripRes.data);
                setStops(stopsRes.data);
                setCities(citiesRes.data);
            } catch (err) {
                console.error("Failed to fetch itinerary data", err);
            }
        };
        fetchData();
    }, [id]);

    const handleAddStop = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('trips/stops/', {
                ...newStop,
                trip: id,
                order: stops.length + 1
            });
            setStops([...stops, res.data]);
            setShowStopModal(false);
            setNewStop({ city: '', arrival_date: '', departure_date: '', budget_limit: 0 });
        } catch (err) {
            console.error("Failed to add stop", err);
        }
    };

    const totalBudget = stops.reduce((sum, stop) => sum + parseFloat(stop.budget_limit || 0), 0);

    if (!trip) return (
        <div className="flex h-screen items-center justify-center bg-background">
            <div className="relative">
                <div className="h-16 w-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center text-primary font-black italic text-xs">GT</div>
            </div>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto py-16 px-6 space-y-16 pb-40">
            {/* Trip Context Card */}
            <div className="bg-white rounded-[3rem] p-12 shadow-layered border border-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>

                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
                    <div>
                        <div className="flex items-center space-x-3 mb-6">
                            <span className="px-5 py-2 rounded-2xl bg-primary/10 text-primary text-xs font-black uppercase tracking-widest border border-primary/10">
                                Planning Active
                            </span>
                            <span className="h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-black text-slate-800 tracking-tighter mb-4 leading-tight">{trip.title}</h1>
                        <div className="flex flex-wrap items-center gap-6 text-slate-500 font-bold">
                            <div className="flex items-center bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                                <Calendar size={20} className="mr-3 text-primary" />
                                <span>{new Date(trip.start_date).toLocaleDateString(undefined, { month: 'long', day: 'numeric' })} — {new Date(trip.end_date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                            </div>
                            <div className="flex items-center bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                                <MapPin size={20} className="mr-3 text-primary" />
                                <span>{stops.length} Strategic Stops</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-6">
                        <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 flex flex-col items-center justify-center shadow-inner min-w-[200px]">
                            <Wallet size={24} className="text-primary mb-3" />
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Total Allocated</p>
                            <p className="text-4xl font-black text-slate-800 tracking-tight">${totalBudget.toLocaleString()}</p>
                        </div>
                        <button className="h-14 w-14 rounded-2xl bg-white border border-slate-200 shadow-soft flex items-center justify-center text-slate-400 hover:text-primary transition-all">
                            <MoreHorizontal size={28} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Itinerary Visualization */}
            <div className="space-y-12">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-4xl font-black text-slate-800 tracking-tight">Expedition Route</h2>
                        <p className="text-slate-500 font-medium">Coordinate your planetary movements</p>
                    </div>
                    <button
                        onClick={() => setShowStopModal(true)}
                        className="btn-primary flex items-center shadow-glow-blue !px-10"
                    >
                        <Plus size={24} className="mr-3" /> Insert Destination
                    </button>
                </div>

                <div className="space-y-10 relative">
                    {/* Visual Connector Line */}
                    <div className="absolute left-[39px] top-12 bottom-12 w-1.5 bg-slate-100 rounded-full hidden lg:block"></div>

                    {stops.length > 0 ? (
                        stops.sort((a, b) => a.order - b.order).map((stop, index) => (
                            <div key={stop.id} className="relative lg:pl-24 animate-in fade-in slide-in-from-left-12 duration-700" style={{ animationDelay: `${index * 150}ms` }}>
                                {/* Stop Marker */}
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[80px] w-[80px] rounded-full bg-white border-2 border-slate-100 shadow-soft hidden lg:flex items-center justify-center z-10 group cursor-pointer hover:border-primary transition-all">
                                    <div className="h-12 w-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary font-black italic text-xl">
                                        {index + 1}
                                    </div>
                                </div>

                                <div className="bg-white rounded-[2.5rem] p-10 shadow-layered border border-white group hover:scale-[1.01] transition-all duration-500">
                                    <div className="flex flex-col md:flex-row justify-between items-start gap-12">
                                        <div className="flex-1 space-y-6">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-4">
                                                    <div className="h-12 w-12 rounded-2xl bg-primary flex items-center justify-center text-white shadow-glow-blue lg:hidden">
                                                        <span className="font-black">{index + 1}</span>
                                                    </div>
                                                    <h3 className="text-3xl font-black text-slate-800 tracking-tight">
                                                        {cities.find(c => c.id === stop.city)?.name || 'Processing...'}
                                                    </h3>
                                                </div>
                                                <div className="flex flex-col items-end">
                                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Sector Budget</span>
                                                    <p className="text-2xl font-black text-primary">${parseFloat(stop.budget_limit).toLocaleString()}</p>
                                                </div>
                                            </div>

                                            <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-2xl">
                                                Exploring the coordinates of {cities.find(c => c.id === stop.city)?.name}. Your stay is scheduled for {Math.ceil((new Date(stop.departure_date) - new Date(stop.arrival_date)) / (1000 * 60 * 60 * 24))} solar cycles.
                                            </p>

                                            <div className="flex flex-wrap gap-4">
                                                <div className="flex items-center px-6 py-3 bg-slate-50 rounded-2xl border border-slate-100 text-sm font-black text-slate-600">
                                                    <ArrowRight size={18} className="mr-3 text-primary" />
                                                    {new Date(stop.arrival_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </div>
                                                <div className="flex items-center px-6 py-3 bg-slate-50 rounded-2xl border border-slate-100 text-sm font-black text-slate-600">
                                                    <ArrowLeft size={18} className="mr-3 text-secondary rotate-45" />
                                                    {new Date(stop.departure_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="lg:w-80 space-y-6 pt-10 md:pt-0 md:pl-12 md:border-l border-slate-50">
                                            <div className="flex items-center justify-between mb-2">
                                                <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Mission Tasks</h4>
                                                <Sparkles size={16} className="text-primary/40" />
                                            </div>
                                            <div className="space-y-3">
                                                <div className="p-5 bg-slate-50 rounded-2xl border border-transparent flex items-center justify-between group/task cursor-pointer hover:bg-white hover:shadow-soft hover:border-primary/10 transition-all">
                                                    <span className="text-sm font-bold text-slate-700">Exploration Phase 1</span>
                                                    <ChevronRight size={18} className="text-slate-300 group-hover/task:text-primary transition-colors" />
                                                </div>
                                                <button
                                                    onClick={() => alert("Task initialization protocols coming soon.")}
                                                    className="w-full p-4 border-2 border-dashed border-slate-200 rounded-2xl text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] hover:border-primary/30 hover:text-primary hover:bg-primary/5 transition-all"
                                                >
                                                    + Initialize Protocol
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="bg-white rounded-[4rem] p-32 text-center border-2 border-dashed border-slate-200 shadow-soft">
                            <div className="h-24 w-24 bg-primary/5 rounded-[2rem] flex items-center justify-center mx-auto mb-10 text-primary">
                                <Sparkles size={48} />
                            </div>
                            <h3 className="text-4xl font-black text-slate-800 mb-4 tracking-tighter">Itinerary Empty</h3>
                            <p className="text-slate-500 mb-12 max-w-sm mx-auto text-lg font-medium">Your expedition log is missing coordinates. Begin by adding your first planetary stop.</p>
                            <button onClick={() => setShowStopModal(true)} className="btn-primary !px-12 !py-6 text-xl mx-auto shadow-layered">
                                Add First Stop
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* New Stop Modal */}
            {showStopModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-xl animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-2xl rounded-[3.5rem] p-14 shadow-layered relative overflow-hidden animate-in zoom-in-95 duration-500">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full -mr-24 -mt-24 blur-3xl"></div>

                        <div className="flex items-center space-x-4 mb-12">
                            <div className="h-14 w-14 rounded-2xl bg-primary flex items-center justify-center text-white shadow-glow-blue">
                                <Plus size={32} />
                            </div>
                            <div>
                                <h2 className="text-4xl font-black text-slate-800 tracking-tighter">Add Stop</h2>
                                <p className="text-slate-500 font-medium">Define your next destination coordinates</p>
                            </div>
                        </div>

                        <form onSubmit={handleAddStop} className="space-y-10">
                            <div className="space-y-3">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Sector Coordinates</label>
                                <div className="relative">
                                    <select
                                        className="input-field appearance-none bg-slate-50 border-2 border-transparent focus:bg-white focus:border-primary/20"
                                        value={newStop.city}
                                        onChange={(e) => setNewStop({ ...newStop, city: e.target.value })}
                                        required
                                    >
                                        <option value="">Select a planet/city...</option>
                                        {cities.map(city => <option key={city.id} value={city.id}>{city.name}, {city.country}</option>)}
                                    </select>
                                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                        <ChevronRight size={20} className="rotate-90" />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-10">
                                <div className="space-y-3">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Arrival Cycle</label>
                                    <input type="date" className="input-field bg-slate-50 border-2 border-transparent focus:bg-white focus:border-primary/20" value={newStop.arrival_date} onChange={(e) => setNewStop({ ...newStop, arrival_date: e.target.value })} required />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Departure Cycle</label>
                                    <input type="date" className="input-field bg-slate-50 border-2 border-transparent focus:bg-white focus:border-primary/20" value={newStop.departure_date} onChange={(e) => setNewStop({ ...newStop, departure_date: e.target.value })} required />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Budget Allocation ($)</label>
                                <input type="number" placeholder="500" className="input-field bg-slate-50 border-2 border-transparent focus:bg-white focus:border-primary/20" value={newStop.budget_limit} onChange={(e) => setNewStop({ ...newStop, budget_limit: e.target.value })} />
                            </div>

                            <div className="flex space-x-6 pt-6">
                                <button type="button" onClick={() => setShowStopModal(false)} className="btn-secondary !px-10 flex-1">Abort</button>
                                <button type="submit" className="btn-primary !px-10 flex-2">Confirm Coordinates</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ItineraryBuilder;
