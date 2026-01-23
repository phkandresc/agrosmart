import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Eye, EyeOff, Leaf, User, Briefcase, ArrowRight } from 'lucide-react';
import { cn } from '../components/ui/Card';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

export default function RegisterPage() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const { register: registerUser } = useAuth();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [registerError, setRegisterError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Watch password to validate confirm password
    const password = watch("password");

    const onSubmit = async (data) => {
        setIsLoading(true);
        setRegisterError(null);
        try {
            await registerUser({
                nombre: data.fullName,
                email: data.email,
                password: data.password,
                rol: data.role
            });
            navigate('/'); // Redirect to dashboard/home after success
        } catch (err) {
            setRegisterError(err.message || 'Error al registrar usuario');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-gradient-to-br from-gray-50 to-gray-200 dark:from-[#0a0f0d] dark:to-[#121816] min-h-screen flex items-center justify-center p-6 antialiased font-sans transition-colors duration-300 relative overflow-hidden">

            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-[10%] -left-[10%] w-[60%] h-[60%] bg-[#13ec80]/5 blur-[100px] rounded-full animate-float"></div>
                <div className="absolute -bottom-[20%] -right-[10%] w-[70%] h-[70%] bg-blue-500/5 blur-[150px] rounded-full animate-float" style={{ animationDelay: '3s' }}></div>
            </div>

            <Card className="w-full max-w-[500px] p-8 relative z-10 flex flex-col gap-6 shadow-2xl border-white/40 dark:border-white/10" glass={true}>
                {/* Header Section */}
                <div className="flex flex-col items-center gap-2">
                    {/* Logo */}
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#13ec80] to-cyan-500 p-[2px] shadow-lg shadow-[#13ec80]/20 mb-2">
                        <div className="w-full h-full rounded-xl bg-white dark:bg-[#102219] flex items-center justify-center">
                            <Leaf className="text-[#13ec80] w-6 h-6" fill="currentColor" fillOpacity={0.2} />
                        </div>
                    </div>
                    <h1 className="text-gray-900 dark:text-white tracking-tight text-2xl font-bold text-center">
                        Crear Cuenta
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm text-center">
                        Únete a AgroSmart y empieza a optimizar tu cultivo.
                    </p>
                </div>

                {/* Form Section */}
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
                    {/* Error Alert */}
                    {registerError && (
                        <div className="bg-red-500/10 text-red-600 dark:text-red-400 p-3 rounded-xl text-sm font-medium border border-red-500/20 text-center animate-pulse">
                            {registerError}
                        </div>
                    )}

                    {/* Full Name Field */}
                    <div className="space-y-1">
                        <label className="text-gray-700 dark:text-gray-300 text-[10px] font-bold uppercase tracking-wider ml-1">
                            Nombre Completo
                        </label>
                        <div className="relative group">
                            <input
                                {...register("fullName", { required: "El nombre es requerido" })}
                                className={cn(
                                    "flex w-full rounded-xl text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-black/20 h-11 px-4 pl-10 transition-all focus:bg-white dark:focus:bg-[#1a2f24] focus:ring-2 focus:ring-[#13ec80]/50 focus:border-[#13ec80]",
                                    errors.fullName && "border-red-500 focus:ring-red-500/30"
                                )}
                                placeholder="Juan Pérez"
                                type="text"
                            />
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-focus-within:text-[#13ec80] transition-colors">
                                <User size={18} />
                            </div>
                        </div>
                        {errors.fullName && <span className="text-red-500 text-xs ml-1">{errors.fullName.message}</span>}
                    </div>

                    {/* Email Field */}
                    <div className="space-y-1">
                        <label className="text-gray-700 dark:text-gray-300 text-[10px] font-bold uppercase tracking-wider ml-1">
                            Email
                        </label>
                        <div className="relative group">
                            <input
                                {...register("email", {
                                    required: "El email es requerido",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Email inválido"
                                    }
                                })}
                                className={cn(
                                    "flex w-full rounded-xl text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-black/20 h-11 px-4 pl-10 transition-all focus:bg-white dark:focus:bg-[#1a2f24] focus:ring-2 focus:ring-[#13ec80]/50 focus:border-[#13ec80]",
                                    errors.email && "border-red-500 focus:ring-red-500/30"
                                )}
                                placeholder="usuario@agrosmart.com"
                                type="email"
                            />
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-focus-within:text-[#13ec80] transition-colors">
                                <Mail size={18} />
                            </div>
                        </div>
                        {errors.email && <span className="text-red-500 text-xs ml-1">{errors.email.message}</span>}
                    </div>

                    {/* Role Select */}
                    <div className="space-y-1">
                        <label className="text-gray-700 dark:text-gray-300 text-[10px] font-bold uppercase tracking-wider ml-1">
                            Rol
                        </label>
                        <div className="relative group">
                            <select
                                {...register("role", { required: "El rol es requerido" })}
                                className={cn(
                                    "flex w-full rounded-xl text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-black/20 h-11 px-4 pl-10 pr-10 transition-all focus:bg-white dark:focus:bg-[#1a2f24] focus:ring-2 focus:ring-[#13ec80]/50 focus:border-[#13ec80] appearance-none cursor-pointer",
                                    errors.role && "border-red-500 focus:ring-red-500/30"
                                )}
                                defaultValue=""
                            >
                                <option value="" disabled>Selecciona un rol...</option>
                                <option value="ADMIN_GRANJA">Administrador de Granja</option>
                                <option value="OPERADOR_CAMPO">Operador de Campo</option>
                            </select>
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-focus-within:text-[#13ec80] transition-colors">
                                <Briefcase size={18} />
                            </div>
                        </div>
                        {errors.role && <span className="text-red-500 text-xs ml-1">{errors.role.message}</span>}
                    </div>

                    {/* Password Fields Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-gray-700 dark:text-gray-300 text-[10px] font-bold uppercase tracking-wider ml-1">
                                Contraseña
                            </label>
                            <div className="relative group">
                                <input
                                    {...register("password", {
                                        required: "Requerido",
                                        minLength: { value: 6, message: "Mínimo 6 caracteres" }
                                    })}
                                    className={cn(
                                        "flex w-full rounded-xl text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-black/20 h-11 px-4 pr-10 transition-all focus:bg-white dark:focus:bg-[#1a2f24] focus:ring-2 focus:ring-[#13ec80]/50 focus:border-[#13ec80]",
                                        errors.password && "border-red-500"
                                    )}
                                    placeholder="••••••"
                                    type={showPassword ? "text" : "password"}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-0 top-0 h-full px-3 flex items-center justify-center text-gray-400 hover:text-[#13ec80] transition-colors focus:outline-none"
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                            {errors.password && <span className="text-red-500 text-[10px] ml-1">{errors.password.message}</span>}
                        </div>

                        <div className="space-y-1">
                            <label className="text-gray-700 dark:text-gray-300 text-[10px] font-bold uppercase tracking-wider ml-1">
                                Confirmar
                            </label>
                            <div className="relative group">
                                <input
                                    {...register("confirmPassword", {
                                        required: "Requerido",
                                        validate: (val) => {
                                            if (watch('password') != val) return "No coinciden";
                                        }
                                    })}
                                    className={cn(
                                        "flex w-full rounded-xl text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-black/20 h-11 px-4 pr-10 transition-all focus:bg-white dark:focus:bg-[#1a2f24] focus:ring-2 focus:ring-[#13ec80]/50 focus:border-[#13ec80]",
                                        errors.confirmPassword && "border-red-500"
                                    )}
                                    placeholder="••••••"
                                    type={showConfirmPassword ? "text" : "password"}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-0 top-0 h-full px-3 flex items-center justify-center text-gray-400 hover:text-[#13ec80] transition-colors focus:outline-none"
                                >
                                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                            {errors.confirmPassword && <span className="text-red-500 text-[10px] ml-1">{errors.confirmPassword.message}</span>}
                        </div>
                    </div>

                    {/* Action Button */}
                    <Button
                        type="submit"
                        isLoading={isLoading}
                        variant="primary"
                        size="lg"
                        className="w-full mt-4 group"
                    >
                        {!isLoading && <>
                            Registrarse
                            <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </>}
                    </Button>
                </form>

                {/* Footer */}
                <div className="text-center pt-2 border-t border-gray-100 dark:border-white/5">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                        ¿Ya tienes cuenta?
                        <Link to="/login" className="text-[#13ec80] font-bold hover:underline ml-1">Inicia Sesión</Link>
                    </p>
                </div>
            </Card>
        </div>
    );
}
