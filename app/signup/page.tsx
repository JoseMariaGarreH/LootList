import Logo from "@/components/ui/Logo";
import Link from "next/link";

export default function SignupPage() {
    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-[#457b9d]">
                <div className="w-full max-w-md p-8 space-y-6">
                    <div className="flex justify-center">
                        <Link href="/">
                            <Logo />
                        </Link>
                    </div>

                    <h2 className="text-center text-xl font-semibold text-[#e63946] text-[26px]">
                        Crear una cuenta
                    </h2>

                    <form className="space-y-4 border rounded border-[#a8dadc] shadow-lg p-5">
                        <div>
                            <label htmlFor="username_label" className="block text-sm font-light text-black">
                                Nombre de usuario
                            </label>
                            <input
                                type="text"
                                id="username"
                                className="w-full px-4 py-2 rounded transition-all
                                    bg-[#1d3557] text-[#F1FAEE]
                                    focus:bg-white focus:text-black focus:border focus:border-black focus:outline-none
                                    disabled:bg-[#D9D9D9] disabled:text-[#A0A0A0]"
                            />
                        </div>

                        <div>
                            <label htmlFor="email_label" className="block text-sm font-light text-black">
                                Correo electrónico
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="w-full px-4 py-2 rounded transition-all
                                    bg-[#1d3557] text-[#F1FAEE]
                                    focus:bg-white focus:text-black focus:border focus:border-black focus:outline-none
                                    disabled:bg-[#D9D9D9] disabled:text-[#A0A0A0]"
                            />
                        </div>

                        <div>
                            <label htmlFor="password_label" className="block text-sm font-light text-black">
                                Contraseña
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="w-full px-4 py-2 rounded transition-all
                                    bg-[#1d3557] text-[#F1FAEE]
                                    focus:bg-white focus:text-black focus:border focus:border-black focus:outline-none
                                    disabled:bg-[#D9D9D9] disabled:text-[#A0A0A0]"
                            />
                        </div>

                        <div>
                            <label htmlFor="confirmPassword_label" className="block text-sm font-light text-black">
                                Confirmar contraseña
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                className="w-full px-4 py-2 rounded transition-all
                                    bg-[#1d3557] text-[#F1FAEE]
                                    focus:bg-white focus:text-black focus:border focus:border-black focus:outline-none
                                    disabled:bg-[#D9D9D9] disabled:text-[#A0A0A0]"
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full py-2 px-4 text-white rounded-md hover:bg-[#1d3557] bg-[#e63946] active:bg-[#a62633] transition"
                            >
                                Registrarse
                            </button>
                        </div>
                    </form>

                    <div className="flex justify-center text-sm border rounded border-[#a8dadc] shadow-lg p-5">
                        <p className="mr-2 text-black font-light">¿Ya tienes una cuenta?</p>
                        <Link href="/login" className="text-[#a8dadc] hover:underline">
                            Iniciar sesión
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}