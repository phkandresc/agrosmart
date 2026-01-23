import React, { useState } from 'react';
import { toast } from 'sonner';
import { Droplets, LayoutDashboard, Sprout, Power, Lock, Settings } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

export default function ControlsPage() {
    // Local state for UI feedback simulation
    const [status, setStatus] = useState({
        pump: false,
        fan: false,
        light: false
    });

    // Command Handler
    const handleCommand = async (type, payload) => {
        try {
            // Optimistic Update
            if (type === 'WATER_PUMP') setStatus(prev => ({ ...prev, pump: !prev.pump }));
            if (type === 'SERVO_WINDOW') setStatus(prev => ({ ...prev, fan: !prev.fan }));
            if (type === 'GROW_LIGHT') setStatus(prev => ({ ...prev, light: !prev.light }));

            const response = await fetch('http://localhost:3000/api/commands', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    device_id: 'invernadero_1',
                    command_type: type,
                    payload: payload
                }),
            });

            const result = await response.json();
            if (result.success) {
                toast.success(`Comando ${type} enviado exitosamente`);
            } else {
                toast.error('Error al enviar comando');
                // Revert state on error? For now just notify.
            }

        } catch (error) {
            console.error('Error sending command:', error);
            toast.error('Error de conexión con el Backend');
        }
    };

    return (
        <main className="flex-1 px-5 py-6 md:px-10 md:py-8 space-y-8 overflow-y-auto max-w-7xl mx-auto w-full">

            {/* Header */}
            <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent font-sans tracking-tight">
                    Control Manual
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium">
                    Gestión directa de actuadores del invernadero
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Water Pump Control */}
                <Card className="p-6 relative overflow-hidden flex flex-col items-center text-center gap-4 group">
                    <div className="absolute inset-0 bg-blue-500/5 rotate-12 scale-150 transform origin-center pointer-events-none" />

                    <div className="p-4 bg-gradient-to-br from-blue-500/20 to-blue-500/10 rounded-full text-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                        <Droplets size={32} />
                    </div>

                    <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Sistema de Riego</h3>
                        <p className="text-xs text-gray-500">Bomba de Agua Principal</p>
                    </div>

                    <div className="flex-1 w-full flex items-end justify-center pt-4">
                        <Button
                            variant={status.pump ? 'primary' : 'outline'}
                            onClick={() => handleCommand('WATER_PUMP', { action: 'TOGGLE' })}
                            className={`w-full gap-2 ${!status.pump && 'hover:bg-blue-500/10 hover:border-blue-500 hover:text-blue-500'}`}
                        >
                            <Power size={16} />
                            {status.pump ? 'ACTIVADO' : 'ACTIVAR'}
                        </Button>
                    </div>

                    {status.pump && (
                        <div className="absolute top-4 right-4 animate-pulse">
                            <Badge variant="info">Riegando</Badge>
                        </div>
                    )}
                </Card>

                {/* Window/Servo Control */}
                <Card className="p-6 relative overflow-hidden flex flex-col items-center text-center gap-4 group">
                    <div className="absolute inset-0 bg-purple-500/5 rotate-12 scale-150 transform origin-center pointer-events-none" />

                    <div className="p-4 bg-gradient-to-br from-purple-500/20 to-purple-500/10 rounded-full text-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                        <LayoutDashboard size={32} />
                    </div>

                    <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Ventilación</h3>
                        <p className="text-xs text-gray-500">Servo Motor (Ventana)</p>
                    </div>

                    <div className="flex-1 w-full flex items-end justify-center pt-4">
                        <div className="w-full grid grid-cols-2 gap-2">
                            <Button
                                variant="outline"
                                onClick={() => handleCommand('SERVO_WINDOW', { angle: 0 })}
                                className="text-xs"
                            >
                                <Lock size={14} className="mr-1" /> Cerrar
                            </Button>
                            <Button
                                variant={status.fan ? 'primary' : 'outline'} // Reusing 'fan' state for servo open logic visual
                                onClick={() => handleCommand('SERVO_WINDOW', { angle: 90 })}
                                className="text-xs hover:border-purple-500 hover:text-purple-500"
                            >
                                <Settings size={14} className="mr-1" /> Abrir
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* Light Control */}
                <Card className="p-6 relative overflow-hidden flex flex-col items-center text-center gap-4 group">
                    <div className="absolute inset-0 bg-amber-500/5 rotate-12 scale-150 transform origin-center pointer-events-none" />

                    <div className="p-4 bg-gradient-to-br from-amber-500/20 to-amber-500/10 rounded-full text-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                        <Sprout size={32} />
                    </div>

                    <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Iluminación</h3>
                        <p className="text-xs text-gray-500">Luces de Crecimiento LED</p>
                    </div>

                    <div className="flex-1 w-full flex items-end justify-center pt-4">
                        <Button
                            variant={status.light ? 'primary' : 'outline'}
                            onClick={() => handleCommand('GROW_LIGHT', { state: 'ON' })}
                            className={`w-full gap-2 ${!status.light && 'hover:bg-amber-500/10 hover:border-amber-500 hover:text-amber-500'}`}
                        // Simplified toggle logic for demo
                        >
                            <Power size={16} />
                            {status.light ? 'ENCENDIDO' : 'ENCENDER'}
                        </Button>
                    </div>

                    {status.light && (
                        <div className="absolute top-4 right-4">
                            <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,1)]"></div>
                        </div>
                    )}
                </Card>
            </div>

            {/* System Status Banner */}
            <Card className="p-6 bg-[#13ec80]/5 border-[#13ec80]/10 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-[#13ec80] flex items-center justify-center text-black shadow-[0_0_20px_rgba(19,236,128,0.4)] animate-pulse-glow">
                        <Settings size={24} />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Estado del Controlador</h3>
                        <p className="text-sm text-gray-500">Todos los sistemas responden correctamente.</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-gray-400">ID: INV-001</span>
                    <Badge variant="success">ACTIVO</Badge>
                </div>
            </Card>
        </main>
    );
}
