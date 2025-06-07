"use client";

// Componentes
import AuthPopup from "../../ui/AuthPopup";
// Hooks
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useVerifyPassword } from "@/hooks/useVerifyPassword";
import { useUpdatePassword } from "@/hooks/useUpdatePassword";
// Librerías
import toast, { Toaster } from "react-hot-toast";


export default function PasswordForm() {
    // Obtener la sesión del usuario
    const { data: session } = useSession();
    // Si no hay sesión, mostrar un mensaje para iniciar sesión
    if (!session?.user) {
        return <div className="text-center text-white">Por favor, inicia sesión para ver tu perfil.</div>;
    }
    // Hooks personalizados para verificar y actualizar la contraseña
    const { checkPassword } = useVerifyPassword();
    const { changePassword } = useUpdatePassword();

    // Configuración del formulario con react-hook-form
    const { register, handleSubmit, getValues, reset, formState: { errors } } = useForm({
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        }
    });

    // Estado para manejar la ventana de confirmación
    const [seAbreVentana, setSeAbreVentana] = useState(false);
    const [mensajeVentana, setMensajeVentana] = useState('');

    // Función para manejar el envío del formulario
    const onSubmit = handleSubmit(() => {
        setMensajeVentana('¿Estás seguro de que quieres guardar tus datos?');
        setSeAbreVentana(true);
    });

    // Función para manejar la confirmación de la actualización de contraseña
    const handleConfirm = async () => { 
        // Cerrar la ventana de confirmación
        setSeAbreVentana(false);

        // Obtener los valores del formulario
        const data = getValues();
        const { currentPassword, newPassword, confirmPassword } = data;

        // Comprprobar que las contraseñas no coinciden, para mostrar un mensaje de error, y evitar errores
        if (newPassword !== confirmPassword) {
            toast.error("La contraseña nueva y la confirmación no coinciden");
            return;
        }

        try {
            // Verificar la contraseña actual
            const verifyResponse = await checkPassword(session?.user?.email ?? '', currentPassword);

            // Si la verificación falla, mostrar un mensaje de error
            if (!verifyResponse) {
                toast.error("La contraseña actual es incorrecta");
                return;
            }

            // Actualizar la contraseña usando el hook/action
            const updateResponse = await changePassword(
                session.user.id,
                newPassword,
            );

            // Si la actualización falla, mostrar un mensaje de error
            if (!updateResponse) {
                toast.error("Error al actualizar la contraseña");
                return;
            }
            // Si todo va bien, mostrar un mensaje de éxito y resetear el formulario
            toast.success("Tu contraseña ha sido actualizada correctamente");
            reset({
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
            });
        } catch (error) {
            console.error("Error al actualizar la contraseña:", error);
            toast.error("Error al actualizar la contraseña");
        }
    };

    // Función para manejar el cierre de la ventana de confirmación
    const handleCancel = () => {
        setSeAbreVentana(false);
    };

    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />
            <form onSubmit={onSubmit} className="space-y-4">
                <div>
                    <label htmlFor="current-password-label" className="text-white block text-sm font-semibold">Contraseña actual</label>
                    <input
                        type="password"
                        id="current-password"
                        {...register("currentPassword", {
                            required: "La contraseña actual es obligatoria",
                        })}
                        className="w-full px-4 py-2 rounded transition-all bg-[#1d3557] text-[#F1FAEE] focus:bg-white focus:text-black focus:border focus:border-black focus:outline-none"
                    />
                    {
                        errors.currentPassword && (
                            <span className="text-red-800 text-xs font-semibold mt-2">
                                {typeof errors.currentPassword?.message === "string" && errors.currentPassword.message}
                            </span>
                        )
                    }
                </div>

                <div>
                    <label htmlFor="new-password-label" className="text-white block text-sm font-semibold">Nueva contraseña</label>
                    <input
                        type="password"
                        id="new-password"
                        {...register("newPassword", {
                            required: {
                                value: true,
                                message: "La nueva contraseña es obligatoria"
                            },
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                                message: "Debes tener al menos 8 caracteres, una mayúscula, una minúscula y un número"
                            }
                        })}
                        className="w-full px-4 py-2 rounded transition-all bg-[#1d3557] text-[#F1FAEE] focus:bg-white focus:text-black focus:border focus:border-black focus:outline-none"
                    />
                    {
                        errors.newPassword && (
                            <span className="text-red-800 text-xs font-semibold mt-2">
                                {typeof errors.newPassword?.message === "string" && errors.newPassword.message}
                            </span>
                        )
                    }
                </div>

                <div>
                    <label htmlFor="confirm-password-label" className="text-white block text-sm font-semibold">Confirmar nueva contraseña</label>
                    <input
                        type="password"
                        id="confirm-password"
                        {...register("confirmPassword", {
                            required: "La confirmación de la nueva contraseña es obligatoria",
                        })}
                        className="w-full px-4 py-2 rounded transition-all bg-[#1d3557] text-[#F1FAEE] focus:bg-white focus:text-black focus:border focus:border-black focus:outline-none"
                    />
                    {
                        errors.confirmPassword && (
                            <span className="text-red-800 text-xs font-semibold mt-2">
                                {typeof errors.confirmPassword?.message === "string" && errors.confirmPassword.message}
                            </span>
                        )
                    }
                </div>

                <button
                    type="submit"
                    className="w-full py-2 px-4 text-white rounded-md hover:bg-[#1d3557] bg-[#e63946] active:bg-[#a8dadc] transition"
                >
                    Actualizar contraseña
                </button>
            </form>

            <AuthPopup
                abierto={seAbreVentana}
                cerrado={handleCancel}
                confirmar={handleConfirm}
                titulo="Confirmación"
            >
                <p>{mensajeVentana}</p>
            </AuthPopup>
        </>
    );
}