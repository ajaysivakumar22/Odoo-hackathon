import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, User, Lock, AlertCircle, ArrowRight } from 'lucide-react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(username, password);
            navigate('/dashboard');
        } catch (err) {
            setError('The credentials provided do not match our records.');
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4 py-20 relative overflow-hidden">
            <div className="glow-primary -top-20 -left-20"></div>
            <div className="glow-secondary -bottom-20 -right-20"></div>

            <div className="w-full max-w-lg relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="bg-white rounded-[3rem] p-12 shadow-layered border border-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16"></div>

                    <div className="mb-12">
                        <div className="flex items-center space-x-4 mb-4">
                            <div className="h-14 w-14 rounded-2xl bg-primary flex items-center justify-center text-white shadow-glow-blue transform rotate-6">
                                <span className="text-2xl font-black italic">GT</span>
                            </div>
                            <div>
                                <h1 className="text-4xl font-black tracking-tighter text-slate-800 leading-tight">
                                    Member <span className="text-primary">Portal</span>
                                </h1>
                                <p className="text-slate-500 font-medium">Coordinate your next expedition</p>
                            </div>
                        </div>
                    </div>

                    {error && (
                        <div className="mb-8 rounded-2xl bg-rose-50 border border-rose-100 p-5 text-sm text-rose-600 animate-in shake duration-500 flex items-center">
                            <AlertCircle size={20} className="mr-3 shrink-0" />
                            <p className="font-bold">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="space-y-3">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Universal Identifier</label>
                            <div className="relative group">
                                <User className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
                                <input
                                    type="text"
                                    placeholder="Username"
                                    className="input-field !pl-16 bg-slate-50 border-2 border-transparent focus:bg-white focus:border-primary/20"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Security Key</label>
                                <button type="button" className="text-xs font-black text-primary hover:underline uppercase tracking-widest">Reset?</button>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="input-field !pl-16 bg-slate-50 border-2 border-transparent focus:bg-white focus:border-primary/20"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn-primary w-full !py-5 text-xl font-black flex items-center justify-center space-x-3 group"
                        >
                            <span>Initialize Session</span>
                            <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    <div className="mt-12 pt-8 border-t border-slate-50 text-center">
                        <p className="text-slate-500 font-medium">
                            New Explorer? <Link to="/register" className="font-black text-primary hover:text-primary-600 transition-colors">Apply for Account</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
