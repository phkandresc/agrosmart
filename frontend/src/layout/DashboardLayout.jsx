import React from 'react';
import { useAuth } from '../context/AuthContext';
import {
    LayoutDashboard,
    Bell,
    Sprout,
    User,
    LogOut,
    Leaf,
    ChevronLeft,
    Settings,
    Server,
    Menu
} from 'lucide-react';
import { cn } from '../components/ui/Card'; // Use clean component import
import { Link, Outlet, useLocation } from 'react-router-dom';

export default function DashboardLayout() {
    const { user, logout } = useAuth();
    const location = useLocation();

    return (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-[#0a0f0d] dark:to-[#121816] min-h-screen transition-colors duration-300 font-sans flex flex-col md:flex-row">

            {/* Desktop Sidebar - Now floating and detached looking */}
            <aside className="hidden md:flex flex-col w-72 h-[calc(100vh-2rem)] m-4 rounded-3xl bg-white/80 dark:bg-[#1a2f24]/80 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-2xl sticky top-4 z-30">
                <div className="flex items-center gap-3 p-8">
                    <div className="w-10 h-10 rounded-xl bg-[#13ec80] flex items-center justify-center shadow-[0_0_15px_rgba(19,236,128,0.4)]">
                        <Leaf className="text-[#0d1b14] w-6 h-6" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">AgroSmart</h1>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    <NavItem
                        to="/dashboard"
                        icon={<LayoutDashboard size={20} />}
                        label="Dashboard"
                        active={location.pathname === '/dashboard'}
                    />
                    <NavItem
                        to="/controls"
                        icon={<Server size={20} />}
                        label="Control Manual"
                        active={location.pathname === '/controls'}
                    />
                    <div className="pt-4 pb-2">
                        <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-widest">General</p>
                    </div>
                    <NavItem icon={<Bell size={20} />} label="Alertas" hasBadge />
                    <NavItem icon={<Sprout size={20} />} label="Cultivos" />
                    <NavItem icon={<User size={20} />} label="Perfil" />
                </nav>

                <div className="p-4 mt-auto">
                    <div className="rounded-2xl bg-gray-50/50 dark:bg-black/20 p-4 border border-gray-100 dark:border-white/5">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#13ec80] to-cyan-400 p-[2px]">
                                <div className="w-full h-full rounded-full bg-white dark:bg-[#1a2f24] flex items-center justify-center text-xs font-bold">
                                    {user?.nombre?.charAt(0) || 'U'}
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{user?.nombre || 'Usuario'}</p>
                                <p className="text-xs text-gray-500 truncate">{user?.rol}</p>
                            </div>
                        </div>
                        <button
                            onClick={logout}
                            className="flex items-center justify-center gap-2 text-red-500 hover:text-white hover:bg-red-500 transition-all w-full p-2 rounded-xl text-sm font-medium bg-red-500/10"
                        >
                            <LogOut size={16} />
                            <span>Cerrar Sesión</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content Wrapper */}
            <div className="flex-1 flex flex-col min-w-0 max-w-[100vw]">

                {/* Mobile Header */}
                <header className="md:hidden flex items-center justify-between px-6 py-4 bg-white/80 dark:bg-[#102219]/80 backdrop-blur-md sticky top-0 z-40 border-b border-gray-100 dark:border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#13ec80] flex items-center justify-center shadow-lg">
                            <Leaf className="text-[#0d1b14] w-5 h-5" />
                        </div>
                        <span className="font-bold text-lg dark:text-white">AgroSmart</span>
                    </div>
                    <button className="p-2 text-gray-600 dark:text-gray-300">
                        <Menu size={24} />
                    </button>
                </header>

                {/* Desktop Header - Transparent */}
                <header className="hidden md:flex items-center justify-end px-10 py-6 sticky top-0 z-20 pointer-events-none">
                    <div className="flex items-center gap-4 pointer-events-auto">
                        <button className="w-10 h-10 rounded-full bg-white dark:bg-[#1a2f24] border border-gray-100 dark:border-white/10 flex items-center justify-center text-gray-500 hover:text-[#13ec80] shadow-sm hover:shadow-lg transition-all">
                            <Bell size={20} />
                        </button>
                        <button className="w-10 h-10 rounded-full bg-white dark:bg-[#1a2f24] border border-gray-100 dark:border-white/10 flex items-center justify-center text-gray-500 hover:text-[#13ec80] shadow-sm hover:shadow-lg transition-all">
                            <Settings size={20} />
                        </button>
                    </div>
                </header>

                {/* Main Content Area */}
                <Outlet />

                {/* Mobile Spacing for Bottom Nav */}
                <div className="h-24 md:hidden"></div>

                {/* Bottom Navigation (Mobile Only) */}
                <nav className="fixed bottom-4 left-4 right-4 bg-black/80 dark:bg-white/90 backdrop-blur-xl text-white dark:text-black rounded-2xl shadow-2xl p-4 flex justify-around items-center z-50 md:hidden">
                    <Link to="/dashboard" className={`p-2 rounded-xl transition-all ${location.pathname === '/dashboard' ? 'bg-[#13ec80] text-black scale-110' : 'text-gray-400'}`}>
                        <LayoutDashboard size={24} />
                    </Link>
                    <Link to="/controls" className={`p-2 rounded-xl transition-all ${location.pathname === '/controls' ? 'bg-[#13ec80] text-black scale-110' : 'text-gray-400'}`}>
                        <Server size={24} />
                    </Link>
                    <div className="w-px h-8 bg-white/20 dark:bg-black/10 mx-2"></div>
                    <button className="p-2 text-gray-400">
                        <Bell size={24} />
                    </button>
                    <button className="p-2 text-gray-400" onClick={logout}>
                        <LogOut size={24} />
                    </button>
                </nav>
            </div >
        </div >
    );
}

// Subcomponents
function NavItem({ icon, label, active, hasBadge, to }) {
    return (
        <Link to={to || '#'} className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden",
            active
                ? "bg-gradient-to-r from-[#13ec80] to-[#0da85b] text-[#0d1b14] font-bold shadow-lg shadow-[#13ec80]/20"
                : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white"
        )}>
            <div className="relative z-10 flex items-center gap-3">
                {icon}
                <span className="text-sm">{label}</span>
            </div>

            {/* Hover Glow Effect */}
            {!active && (
                <div className="absolute inset-0 bg-gradient-to-r from-[#13ec80]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            )}

            {hasBadge && (
                <span className="absolute top-3 right-3 h-2 w-2 rounded-full bg-red-500 border-2 border-white dark:border-[#1a2f24] z-10"></span>
            )}
        </Link>
    )
}
