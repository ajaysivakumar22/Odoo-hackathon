import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MapPin, Mail, Phone, User, Lock, ArrowRight, AlertCircle, Globe, Sparkles } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        city: '',
        country: '',
        additional_info: ''
    });
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(formData);
            navigate('/login');
        } catch (err) {
            setError('We encountered an error while processing your application.');
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-background py-20 px-4 relative overflow-hidden">
            <div className="glow-primary -top-20 -left-20"></div>
            <div className="glow-secondary -bottom-20 -right-20"></div>

            <div className="w-full max-w-4xl relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="bg-white rounded-[3rem] p-10 md:p-14 shadow-layered border border-white">
                    <div className="mb-14 text-center">
                        <div className="mx-auto mb-6 h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                            <Sparkles size={32} />
                        </div>
                        <h1 className="text-5xl font-black tracking-tighter text-slate-800 mb-3">
                            Join the <span className="text-primary">Expedition</span>
                        </h1>
                        <p className="text-slate-500 font-medium text-lg">Create your explorer profile to start planning stops</p>
                    </div>

                    {error && (
                        <div className="mb-10 rounded-2xl bg-rose-50 border border-rose-100 p-6 text-sm text-rose-600 animate-in zoom-in-95 duration-300 flex items-center justify-center">
                            <AlertCircle size={24} className="mr-3 shrink-0" />
                            <p className="font-bold">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-10">
                        <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2">
                            <div className="space-y-3">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-1">First Identity</label>
                                <div className="relative group">
                                    <User className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
                                    <input
                                        name="first_name"
                                        placeholder="John"
                                        className="input-field !pl-16 bg-slate-50"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Family Identity</label>
                                <div className="relative group">
                                    <User className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
                                    <input
                                        name="last_name"
                                        placeholder="Doe"
                                        className="input-field !pl-16 bg-slate-50"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Neural Mail</label>
                                <div className="relative group">
                                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
                                    <input
                                        name="email"
                                        type="email"
                                        placeholder="john@example.com"
                                        className="input-field !pl-16 bg-slate-50"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Comm Channel</label>
                                <div className="relative group">
                                    <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
                                    <input
                                        name="phone"
                                        placeholder="+1 234 567 890"
                                        className="input-field !pl-16 bg-slate-50"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Handle</label>
                                <div className="relative group">
                                    <User className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
                                    <input
                                        name="username"
                                        placeholder="starlord77"
                                        className="input-field !pl-16 bg-slate-50"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Access Pass</label>
                                <div className="relative group">
                                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
                                    <input
                                        name="password"
                                        type="password"
                                        placeholder="••••••••"
                                        className="input-field !pl-16 bg-slate-50"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Current Sector</label>
                                <div className="relative group">
                                    <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
                                    <input
                                        name="city"
                                        placeholder="New York"
                                        className="input-field !pl-16 bg-slate-50"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Region</label>
                                <div className="relative group">
                                    <Globe className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
                                    <input
                                        name="country"
                                        placeholder="United States"
                                        className="input-field !pl-16 bg-slate-50"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Expedition Notes</label>
                            <textarea
                                name="additional_info"
                                placeholder="What kind of traveler are you? (e.g., Solo Adventurer, Group Planner)"
                                rows="3"
                                className="input-field resize-none !rounded-[2rem] !p-8 bg-slate-50"
                                onChange={handleChange}
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="btn-primary w-full !py-6 text-xl font-black uppercase tracking-widest flex items-center justify-center space-x-4 group/btn shadow-layered"
                        >
                            <span>Commission Account</span>
                            <ArrowRight size={28} className="group-hover/btn:translate-x-1 transition-transform" />
                        </button>

                        <div className="text-center mt-12 pt-8 border-t border-slate-50">
                            <p className="text-slate-500 font-medium">
                                Already enlisted? <Link to="/login" className="font-black text-primary hover:text-primary-600 transition-colors">Return to Base</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
