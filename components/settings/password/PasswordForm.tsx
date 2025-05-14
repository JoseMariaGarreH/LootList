"use client";

import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useState } from "react";
import AuthPopup from "../../ui/AuthPopup";
import toast, { Toaster } from "react-hot-toast";

export default function PasswordForm() {
    const { data: session } = useSession();
    const { register, handleSubmit, getValues, reset, formState: { errors } } = useForm({
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        }
    });

    const [seAbreVentana, setSeAbreVentana] = useState(false);
    const [mensajeVentana, setMensajeVentana] = useState('');

    const onSubmit = handleSubmit(() => {
        setMensajeVentana('¿Estás seguro de que quieres guardar tus datos?');
        setSeAbreVentana(true);
    });

    const handleConfirm = async () => {
        setSeAbreVentana(false);

        const data = getValues();
        const { currentPassword, newPassword, confirmPassword } = data;

        console.log("Datos del formulario:", data);

        if (newPassword !== confirmPassword) {
            toast.error("La contraseña nueva y la confirmación no coinciden");
            return;
        }

        try {
            // Verificar la contraseña actual
            const verifyResponse = await fetch(`/api/users/verify-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: session?.user?.email,
                    password: currentPassword,
                }),
            });

            console.log("verifyResponse:", verifyResponse);

            if (!verifyResponse.ok) {
                toast.error("La contraseña actual es incorrecta");
                return;
            }

            // Actualizar la contraseña
            const updateResponse = await fetch(`/api/users/by-email/${session?.user?.email}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    password: newPassword,
                }),
            });
            console.log("updateResponse:", updateResponse);

            if (!updateResponse.ok) {
                const errorData = await updateResponse.json();
                console.log(`Error: ${errorData.message}`);
                return;
            }

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

    const handleCancel = () => {
        setSeAbreVentana(false);
    };

    return (
        <>
            <Toaster position="top-left" reverseOrder={false} />
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
                    {errors.currentPassword && <span className="text-red-800 text-xs font-semibold mt-2">{errors.currentPassword.message}</span>}
                </div>

                <div>
                    <label htmlFor="new-password-label" className="text-white block text-sm font-semibold">Nueva contraseña</label>
                    <input
                        type="password"
                        id="new-password"
                        {...register("newPassword", {
                            required: "La nueva contraseña es obligatoria",
                        })}
                        className="w-full px-4 py-2 rounded transition-all bg-[#1d3557] text-[#F1FAEE] focus:bg-white focus:text-black focus:border focus:border-black focus:outline-none"
                    />
                    {errors.newPassword && <span className="text-red-800 text-xs font-semibold mt-2">{errors.newPassword.message}</span>}
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
                    {errors.confirmPassword && <span className="text-red-800 text-xs font-semibold mt-2">{errors.confirmPassword.message}</span>}
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