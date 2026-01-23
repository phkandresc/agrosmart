import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import {
    Thermometer,
    TrendingUp,
    Droplets,
    CheckCircle,
    ArrowUp,
    Activity
} from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';

export default function DashboardPage() {
    const [latestReading, setLatestReading] = useState(null);
    const [loading, setLoading] = useState(true);

    // Helper for percentage mapping (0-1023 -> 0-100%)
    const toPercentage = (val) => val ? Math.round((val / 1023) * 100) : 0;

    // 1. Fetch Initial Data
    useEffect(() => {
        const fetchLatest = async () => {
            try {
                const { data, error } = await supabase
                    .from('readings')
                    .select('*')
                    .order('created_at', { ascending: false })
                    .limit(1);

                if (error) console.error('Error fetching data:', error);
                if (data && data.length > 0) {
                    setLatestReading(data[0]);
                }
            } catch (err) {
                console.error('Unexpected error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchLatest();
    }, []);

    // 2. Realtime Subscription
    useEffect(() => {
        const channel = supabase
            .channel('dashboard_readings')
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'readings' },
                (payload) => {
                    console.log('New reading received!', payload.new);
                    setLatestReading(payload.new);
                }
            )
            .subscribe((status) => {
                console.log('🔌 Supabase Realtime Status:', status);
            });

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const isLoading = loading && !latestReading;

    return (
        <main className="flex-1 px-5 py-6 md:px-10 md:py-8 space-y-8 overflow-y-auto max-w-7xl mx-auto w-full">

            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 animate-float" style={{ animationDuration: '4s' }}>
                <div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent font-sans tracking-tight">
                        Monitoreo
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium">
                        Vista general de sensores en tiempo real
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="text-right hidden md:block">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Estado</p>
                        <p className="text-xs text-gray-400 font-mono">
                            {latestReading ? new Date(latestReading.created_at).toLocaleTimeString() : '--:--:--'}
                        </p>
                    </div>
                    <Badge
                        variant={latestReading ? 'success' : 'default'}
                        pulse={!!latestReading}
                        className="h-8 pl-2 pr-3 text-sm shadow-sm"
                    >
                        {latestReading ? 'SISTEMA ONLINE' : 'OFFLINE'}
                    </Badge>
                </div>
            </div>

            {/* KPI Cards Grid */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                {/* Temperature Card */}
                <Card className="p-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
                        <Thermometer className="w-24 h-24 text-[#13ec80]" />
                    </div>

                    <div className="flex flex-col h-full justify-between relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2.5 bg-gradient-to-br from-[#13ec80]/20 to-[#13ec80]/5 rounded-xl text-[#0da85b] dark:text-[#13ec80] shadow-inner">
                                <Thermometer size={22} />
                            </div>
                            <span className="text-xs font-bold uppercase tracking-widest text-[#13ec80]">Temperatura</span>
                        </div>

                        <div className="space-y-1">
                            {isLoading ? (
                                <div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg" />
                            ) : (
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-bold text-gray-900 dark:text-white font-sans tracking-tighter">
                                        {latestReading?.temperature ? latestReading.temperature.toFixed(1) : '--'}
                                    </span>
                                    <span className="text-xl font-medium text-gray-400">°C</span>
                                </div>
                            )}

                            <div className="flex items-center gap-2 pt-2">
                                <Badge variant="success" className="px-1.5 py-0 text-[10px]">
                                    <TrendingUp size={10} className="mr-1" />
                                    <span>Estable</span>
                                </Badge>
                                <span className="text-[10px] text-gray-400">Rango ideal: 20-28°</span>
                            </div>
                        </div>
                    </div>

                    {/* Decorative progress bar */}
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-100 dark:bg-white/5">
                        <div
                            className="h-full bg-[#13ec80] transition-all duration-1000"
                            style={{ width: `${Math.min(((latestReading?.temperature || 0) / 40) * 100, 100)}%` }}
                        />
                    </div>
                </Card>

                {/* Humidity Card */}
                <Card className="p-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
                        <Droplets className="w-24 h-24 text-blue-500" />
                    </div>

                    <div className="flex flex-col h-full justify-between relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2.5 bg-gradient-to-br from-blue-500/20 to-blue-500/5 rounded-xl text-blue-600 dark:text-blue-400 shadow-inner">
                                <Droplets size={22} />
                            </div>
                            <span className="text-xs font-bold uppercase tracking-widest text-blue-500">Humedad</span>
                        </div>

                        <div className="space-y-1">
                            {isLoading ? (
                                <div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg" />
                            ) : (
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-bold text-gray-900 dark:text-white font-sans tracking-tighter">
                                        {latestReading?.humidity || '--'}
                                    </span>
                                    <span className="text-xl font-medium text-gray-400">%</span>
                                </div>
                            )}

                            <div className="flex items-center gap-2 pt-2">
                                <Badge variant="info" className="px-1.5 py-0 text-[10px] bg-blue-500/10 text-blue-500 border-blue-500/20">
                                    <CheckCircle size={10} className="mr-1" />
                                    <span>Óptimo</span>
                                </Badge>
                                <span className="text-[10px] text-gray-400">Ambiente saludable</span>
                            </div>
                        </div>
                    </div>

                    {/* Decorative progress bar */}
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-100 dark:bg-white/5">
                        <div
                            className="h-full bg-blue-500 transition-all duration-1000"
                            style={{ width: `${latestReading?.humidity || 0}%` }}
                        />
                    </div>
                </Card>

                {/* Simulated Air Quality Card (Placeholder for visual balance) */}
                <Card className="p-6 relative overflow-hidden group opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Activity className="w-24 h-24 text-purple-500" />
                    </div>
                    <div className="flex flex-col h-full justify-between relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2.5 bg-gradient-to-br from-purple-500/20 to-purple-500/5 rounded-xl text-purple-600 dark:text-purple-400 shadow-inner">
                                <Activity size={22} />
                            </div>
                            <span className="text-xs font-bold uppercase tracking-widest text-purple-500">Calidad Aire</span>
                        </div>
                        <div className="space-y-1">
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl font-bold text-gray-900 dark:text-white font-sans tracking-tighter">--</span>
                                <span className="text-xl font-medium text-gray-400">AQI</span>
                            </div>
                            <p className="text-[10px] text-gray-400 pt-2">Sensor no instalado</p>
                        </div>
                    </div>
                </Card>

            </section>

            {/* Chart Section */}
            <section className="grid grid-cols-1">
                <Card className="p-6 min-h-[350px] flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Tendencia de Humedad</h3>
                            <p className="text-xs text-gray-500">Histórico de las últimas 24 horas</p>
                        </div>

                        {/* Styled Toggle */}
                        <div className="hidden sm:flex p-1 bg-gray-100 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10">
                            <button className="px-4 py-1.5 text-xs font-medium rounded-lg text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">1H</button>
                            <button className="px-4 py-1.5 text-xs font-bold rounded-lg bg-white dark:bg-[#102219] text-[#13ec80] shadow-sm border border-black/5 dark:border-white/10">24H</button>
                            <button className="px-4 py-1.5 text-xs font-medium rounded-lg text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">7D</button>
                        </div>
                    </div>

                    {/* Chart Area */}
                    <div className="flex-1 w-full bg-gradient-to-b from-gray-50/50 to-transparent dark:from-white/5 dark:to-transparent rounded-2xl border border-dashed border-gray-200 dark:border-white/10 relative p-4 flex items-center justify-center group overflow-hidden">

                        {/* Background Grid Lines */}
                        <div className="absolute inset-0 flex flex-col justify-between p-6 pointer-events-none opacity-30">
                            {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-full h-px bg-gray-300 dark:bg-white/20 border-t border-dashed" />)}
                        </div>

                        {/* Beautiful SVG Curve */}
                        <div className="relative w-full h-full max-h-[200px] z-10">
                            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                                <defs>
                                    <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                                        <stop offset="0%" stopColor="#13ec80" stopOpacity="0.4"></stop>
                                        <stop offset="100%" stopColor="#13ec80" stopOpacity="0"></stop>
                                    </linearGradient>
                                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                                        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                                        <feMerge>
                                            <feMergeNode in="coloredBlur" />
                                            <feMergeNode in="SourceGraphic" />
                                        </feMerge>
                                    </filter>
                                </defs>
                                <path d="M0,70 Q10,65 20,60 T40,55 T60,40 T80,50 T100,45 V100 H0 Z" fill="url(#chartGradient)"></path>
                                <path
                                    className="drop-shadow-lg"
                                    d="M0,70 Q10,65 20,60 T40,55 T60,40 T80,50 T100,45"
                                    fill="none"
                                    stroke="#13ec80"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    filter="url(#glow)"
                                ></path>
                                <circle className="fill-[#102219] stroke-[#13ec80] stroke-[2px] animate-pulse-glow" cx="80" cy="50" r="3"></circle>
                            </svg>

                            {/* Floating Value Tooltip Simulation */}
                            <div className="absolute top-[40%] left-[80%] -translate-x-1/2 -translate-y-[100%] bg-[#102219] text-[#13ec80] border border-[#13ec80]/30 text-xs font-bold px-2 py-1 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                                67%
                            </div>
                        </div>
                    </div>

                    {/* X-Axis */}
                    <div className="flex justify-between text-[10px] text-gray-400 font-medium px-4 mt-4 uppercase tracking-wider">
                        <span>10:00 AM</span>
                        <span>02:00 PM</span>
                        <span>06:00 PM</span>
                        <span>10:00 PM</span>
                    </div>
                </Card>
            </section>

        </main>
    );
}
