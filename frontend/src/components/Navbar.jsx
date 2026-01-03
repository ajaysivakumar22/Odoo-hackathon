import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Search, User, LogOut, Map, Calendar, Users, Home, Compass } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const Navbar = () => {
    const { user, logout } = useAuth();
    const location = useLocation();

    const cn = (...inputs) => twMerge(clsx(inputs));

    const navItems = [
        { name: 'Dash', path: '/dashboard', icon: Home },
        { name: 'Trips', path: '/trips', icon: Map },
        { name: 'Explore', path: '/search', icon: Compass },
        { name: 'People', path: '/community', icon: Users },
        { name: 'Calendar', path: '/calendar', icon: Calendar },
    ];

    return (
        <div className="fixed top-0 left-0 right-0 z-50 px-4 py-6 pointer-events-none">
            <nav className="container mx-auto max-w-7xl bg-white/90 backdrop-blur-xl border border-slate-200 shadow-soft rounded-3xl px-8 py-3 flex items-center justify-between pointer-events-auto">
                <Link to="/" className="flex items-center space-x-3 group">
                    <div className="h-12 w-12 rounded-2xl bg-primary flex items-center justify-center text-white font-black italic shadow-glow-blue transform transition-transform group-hover:rotate-6 group-hover:scale-110">GT</div>
                    <span className="text-2xl font-black text-slate-800 tracking-tighter hidden sm:block">Globe<span className="text-primary">Trotter</span></span>
                </Link>

                <div className="hidden lg:flex items-center bg-slate-50 rounded-2xl p-1 border border-slate-100">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={cn(
                                "flex items-center space-x-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300",
                                location.pathname === item.path
                                    ? "bg-white text-primary shadow-soft"
                                    : "text-slate-500 hover:text-primary hover:bg-white/50"
                            )}
                        >
                            <item.icon size={18} />
                            <span>{item.name}</span>
                        </Link>
                    ))}
                </div>

                <div className="flex items-center space-x-4">
                    {user && (
                        <div className="flex items-center space-x-3 pl-4 border-l border-slate-100">
                            <Link to="/profile" className="flex items-center space-x-3 group">
                                <div className="text-right hidden sm:block">
                                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest leading-none">Traveler</p>
                                    <p className="text-sm font-bold text-slate-700">{user.username}</p>
                                </div>
                                <div className="h-10 w-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-soft overflow-hidden">
                                    {user.profile_image ? <img src={user.profile_image} className="h-full w-full object-cover" /> : <p className="font-bold">{user.username[0].toUpperCase()}</p>}
                                </div>
                            </Link>
                            <button
                                onClick={logout}
                                className="h-10 w-10 rounded-xl flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-all border border-transparent hover:border-rose-100"
                                title="Exit Expedition"
                            >
                                <LogOut size={20} />
                            </button>
                        </div>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
