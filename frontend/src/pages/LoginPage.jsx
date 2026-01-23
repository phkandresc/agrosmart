import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Eye, EyeOff, Leaf, ArrowRight } from 'lucide-react';
import { cn } from '../components/ui/Card';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

export default function LoginPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { login } = useAuth();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data) => {
        setIsLoading(true);
        setLoginError(null);
        try {
            await login(data.email, data.password);
            navigate('/'); // Redirect to dashboard/home after login
        } catch (err) {
            setLoginError(err.message || 'Error al iniciar sesión');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-gradient-to-br from-gray-50 to-gray-200 dark:from-[#0a0f0d] dark:to-[#121816] min-h-screen flex items-center justify-center p-6 antialiased font-sans transition-colors duration-300 relative overflow-hidden">

            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] bg-[#13ec80]/10 blur-[150px] rounded-full animate-float"></div>
                <div className="absolute top-[40%] -right-[20%] w-[60%] h-[60%] bg-[#13ec80]/5 blur-[120px] rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
            </div>

            <Card className="w-full max-w-[450px] p-8 md:p-12 relative z-10 flex flex-col gap-8 shadow-2xl border-white/40 dark:border-white/10" glass={true}>
                {/* Header Section */}
                <div className="flex flex-col items-center gap-3">
                    {/* Logo */}
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#13ec80] to-cyan-500 p-[2px] shadow-lg shadow-[#13ec80]/20 mb-2">
                        <div className="w-full h-full rounded-2xl bg-white dark:bg-[#102219] flex items-center justify-center">
                            <Leaf className="text-[#13ec80] w-8 h-8" fill="currentColor" fillOpacity={0.2} />
                        </div>
                    </div>
                    {/* Headline */}
                    <h1 className="text-gray-900 dark:text-white tracking-tight text-3xl font-bold text-center">
                        Bienvenido
                    </h1>
                    {/* Body Text */}
                    <p className="text-gray-500 dark:text-gray-400 text-sm text-center max-w-[280px]">
                        Ingresa a tu panel de control AgroSmart para monitorear tus cultivos.
                    </p>
                </div>

                {/* Form Section */}
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full">
                    {/* Error Alert */}
                    {loginError && (
                        <div className="bg-red-500/10 text-red-600 dark:text-red-400 p-3 rounded-xl text-sm font-medium border border-red-500/20 text-center animate-pulse">
                            {loginError}
                        </div>
                    )}

                    {/* Email Field */}
                    <div className="space-y-1.5">
                        <label className="text-gray-700 dark:text-gray-300 text-xs font-bold uppercase tracking-wider ml-1">
                            Email
                        </label>
                        <div className="relative group">
                            <input
                                {...register("email", { required: "El email es requerido" })}
                                className={cn(
                                    "flex w-full rounded-xl text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-black/20 h-12 px-4 pl-12 transition-all focus:bg-white dark:focus:bg-[#1a2f24] focus:ring-2 focus:ring-[#13ec80]/50 focus:border-[#13ec80]",
                                    errors.email && "border-red-500 focus:ring-red-500/30"
                                )}
                                placeholder="usuario@agrosmart.com"
                                type="email"
                                autoComplete="email"
                            />
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-focus-within:text-[#13ec80] transition-colors">
                                <Mail size={18} />
                            </div>
                        </div>
                        {errors.email && <span className="text-red-500 text-xs ml-1">{errors.email.message}</span>}
                    </div>

                    {/* Password Field */}
                    <div className="space-y-1.5">
                        <div className="flex justify-between items-center ml-1">
                            <label className="text-gray-700 dark:text-gray-300 text-xs font-bold uppercase tracking-wider">
                                Contraseña
                            </label>
                            <a href="#" className="text-xs text-[#13ec80] hover:text-[#0da85b] font-medium transition-colors">
                                ¿Olvidaste tu contraseña?
                            </a>
                        </div>
                        <div className="relative group">
                            <input
                                {...register("password", { required: "La contraseña es requerida" })}
                                className={cn(
                                    "flex w-full rounded-xl text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-black/20 h-12 px-4 pl-12 pr-12 transition-all focus:bg-white dark:focus:bg-[#1a2f24] focus:ring-2 focus:ring-[#13ec80]/50 focus:border-[#13ec80]",
                                    errors.password && "border-red-500 focus:ring-red-500/30"
                                )}
                                placeholder="••••••••••"
                                type={showPassword ? "text" : "password"}
                                autoComplete="current-password"
                            />
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-focus-within:text-[#13ec80] transition-colors">
                                <EyeOff size={18} />{/* Using generic lock icon concept or keeping mail consistency */}
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-0 top-0 h-full px-4 flex items-center justify-center text-gray-400 hover:text-[#13ec80] transition-colors focus:outline-none"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        {errors.password && <span className="text-red-500 text-xs ml-1">{errors.password.message}</span>}
                    </div>

                    {/* Action Button */}
                    <Button
                        type="submit"
                        isLoading={isLoading}
                        variant="primary"
                        size="lg"
                        className="w-full mt-2 group"
                    >
                        {!isLoading && <>
                            Iniciar Sesión
                            <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </>}
                    </Button>
                </form>

                {/* Footer */}
                <div className="text-center pt-2 border-t border-gray-100 dark:border-white/5">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                        ¿No tienes una cuenta?
                        <Link to="/register" className="text-[#13ec80] font-bold hover:underline ml-1">Regístrate</Link>
                    </p>
                </div>
            </Card>
        </div>
    );
}
