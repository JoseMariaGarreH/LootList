"use client"

// Hooks
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
// Librerías
import toast, { Toaster } from "react-hot-toast";

export default function UserForm() {
    // Importamos los hooks necesarios de react-hook-form, para manejar el formulario
    const { register, handleSubmit, formState: { errors } } = useForm();
    // Importamos el hook useRouter de next navigation, para redirigir al usuario después de registrarse
    const router = useRouter();

    // Definimos la función onSubmit que se ejecutará al enviar el formulario
    const onSubmit = handleSubmit(async (data) => {
        // Cargamos los datos del formulario
        const {
            username,
            email,
            password,
            confirmPassword
        } = data;

        // Comprobamos que las cotraseñas coincidan
        if (password !== confirmPassword) {
            toast.error("Las contraseñas no coinciden");
            return;
        }
        // Realizamos la petición al backend para registrar al usuario, enviando los datos del formulario, que se han insertado
        const respuesta = await fetch("/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, email, password })
        })

        // Si la respuesta es exitosa, redirigimos al usuario a la página de inicio de sesión
        if (respuesta.ok) {
            router.push("/auth/login"); // Redirigimos al usuario a la página de inicio de sesión
        } else {
            toast.error("Error al registrarse, el nombre de usuario o el correo ya están en uso");
        }

        // Log de la respuesta para depuración
        console.log(respuesta);
    })


    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />
            <form onSubmit={onSubmit} className="space-y-4 border rounded border-[#a8dadc] bg-[#355f7a] shadow-lg p-5">
                <div>
                    <label htmlFor="username_label" className="block text-sm font-semibold text-white">
                        Nombre de usuario
                    </label>
                    <input
                        type="text"
                        id="username"
                        className="w-full px-4 py-2 rounded transition-all
                    bg-[#1d3557] text-[#F1FAEE]
                    focus:bg-white focus:text-black focus:border focus:border-black focus:outline-none
                    disabled:bg-[#D9D9D9] disabled:text-[#A0A0A0]"
                        autoComplete="new-username"
                        {...register("username", {
                            required: {
                                value: true,
                                message: "El nombre de usuario es obligatorio"
                            },
                            pattern: {
                                value: /^[a-zA-Z0-9_-]+$/,
                                message: "Solo letras, números, guiones y guiones bajos"
                            }

                        })}

                    />

                    {
                        errors.username && (
                            <span className="text-red-800 text-xs font-semibold mt-2">
                                {typeof errors.username?.message === "string" && errors.username.message}
                            </span>
                        )
                    }
                </div>

                <div>
                    <label htmlFor="email_label" className="block text-sm font-semibold text-white">
                        Correo electrónico
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-2 rounded transition-all
                    bg-[#1d3557] text-[#F1FAEE]
                    focus:bg-white focus:text-black focus:border focus:border-black focus:outline-none
                    disabled:bg-[#D9D9D9] disabled:text-[#A0A0A0]"
                        autoComplete="new-email"
                        {...register("email", {
                            required: {
                                value: true,
                                message: "El correo electrónico es obligatorio"
                            }
                        })}
                    />

                    {
                        errors.email && (
                            <span className="text-red-800 text-xs font-semibold mt-2">
                                {typeof errors.email?.message === "string" && errors.email.message}
                            </span>
                        )
                    }

                </div>

                <div>
                    <label htmlFor="password_label" className="block text-sm font-semibold text-white">
                        Contraseña
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="w-full px-4 py-2 rounded transition-all
                        bg-[#1d3557] text-[#F1FAEE]
                        focus:bg-white focus:text-black focus:border focus:border-black focus:outline-none
                        disabled:bg-[#D9D9D9] disabled:text-[#A0A0A0]"
                        autoComplete="password"
                        {...register("password", {
                            required: {
                                value: true,
                                message: "La contraseña es obligatoria"
                            },
                            pattern: {
                                // Expresión regular para validar, comprueba que tenga al menos 8 caracteres, una mayúscula, una minúscula y un número
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                                message: "Debes tener al menos 8 caracteres, una mayúscula, una minúscula y un número"
                            }
                        })}
                    />

                    {
                        errors.password && (
                            <span className="text-red-800 text-xs font-semibold mt-2">
                                {typeof errors.password?.message === "string" && errors.password.message}
                            </span>
                        )
                    }
                </div>

                <div>
                    <label htmlFor="confirmPassword_label" className="block text-sm font-semibold text-white">
                        Confirmar contraseña
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        className="w-full px-4 py-2 rounded transition-all
                    bg-[#1d3557] text-[#F1FAEE]
                    focus:bg-white focus:text-black focus:border focus:border-black focus:outline-none
                    disabled:bg-[#D9D9D9] disabled:text-[#A0A0A0]"
                        autoComplete="new-confirmPassword"
                        {...register("confirmPassword", {
                            required: {
                                value: true,
                                message: "La confirmación de contraseña es obligatoria"
                            }
                        })}
                    />
                    {
                        errors.confirmPassword && (
                            <span className="text-red-800 text-xs font-semibold mt-2">
                                {typeof errors.confirmPassword?.message === "string" && errors.confirmPassword.message}
                            </span>
                        )
                    }
                </div>

                <div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 text-white rounded-md hover:bg-[#1d3557] bg-[#e63946] active:bg-[#a8dadc] transition"
                    >
                        Registrarse
                    </button>
                </div>
            </form>
        </>
    )
}