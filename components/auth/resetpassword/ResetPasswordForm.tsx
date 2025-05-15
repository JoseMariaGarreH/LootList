import { useForm } from "react-hook-form";

export default function ResetPasswordForm() {

    const { register, handleSubmit, formState: { errors } } = useForm();

    return(
        <>
            <form onSubmit={() => ("")} className="space-y-4 border rounded border-[#a8dadc] w-[90%] max-w-[450px] shadow-lg p-5">
                    <div className="">
                        <label htmlFor="password_label" className="block text-left text-sm font-semibold text-white">
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
                        <label htmlFor="confirmPassword_label" className="block text-left text-sm font-semibold text-white">
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
                            className="w-full mt-4 py-2 px-4 text-white rounded-md hover:bg-[#1d3557] bg-[#e63946] active:bg-[#a8dadc] transition"
                        >
                            Cambiar contraseña
                        </button>
                    </div>
                </form>
        </>
    )
}