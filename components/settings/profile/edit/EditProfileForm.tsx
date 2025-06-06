"use client";

// Componentes
import AuthPopup from '../../../ui/AuthPopup';
import EditProfileAuthPopup from './EditProfileAuthPopup';

// Hooks
import { useForm } from 'react-hook-form';
import { useSession } from "next-auth/react";
import { useEffect, useState } from 'react';
import { useUserById } from '@/hooks/useUserById';
import { useProfileById } from '@/hooks/useProfileById';
import { useVerifyPassword } from "@/hooks/useVerifyPassword";
import { useUpdateProfile } from "@/hooks/useUpdateProfile";
// Librerías
import toast, { Toaster } from 'react-hot-toast';
// Iconos
import { Pencil } from 'lucide-react';


export default function ProfileForm() {
    // Datos de la sesión
    const { data: session, update } = useSession();

    // Hooks personalizados para obtener datos del usuario y perfil
    const { user } = useUserById(session?.user?.id || "");
    const { profile } = useProfileById(session?.user?.id || "");
    // y para verificar la contraseña y actualizar el perfil
    const { checkPassword } = useVerifyPassword();
    const { changeProfile } = useUpdateProfile();

    // Declaración del formulario con react-hook-form
    const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm({
        defaultValues: {
            username: '',
            email: '',
            name: '',
            firstSurname: '',
            secondSurname: '',
            location: '',
            bio: '',
            pronoun: '',
        }
    });

    // hooks de estado
    const [seAbreVentanaProfile, setSeAbreVentanaProfile] = useState(false);
    const [seAbreVentanaConfirmacion, setSeAbreVentanaConfirmacion] = useState(false);
    const [mensajeVentana, setMensajeVentana] = useState('');
    const [campoEditable, setCampoEditable] = useState<'username' | 'email' | null>(null);
    const [modificarUsername, setModificarUsername] = useState(false);
    const [modificarEmail, setModificarEmail] = useState(false);

    // useEffect para cargar los datos del usuario y perfil en el formulario
    useEffect(() => {
        if (user && profile) {
            setValue('username', user.username);
            setValue('email', user.email);
            setValue('name', profile.name);
            setValue('firstSurname', profile.firstSurname);
            setValue('secondSurname', profile.secondSurname);
            setValue('location', profile.location);
            setValue('bio', profile.bio);
            setValue('pronoun', profile.pronoun);
        }
    }, [user, profile, setValue]); // Se ejecuta cuando cambian user, profile o se actualiza el valor

    // Funciones para manejar la edición de campos
    const handleEditClick = (campo: 'username' | 'email') => {
        setCampoEditable(campo);
        setSeAbreVentanaProfile(true);
    };

    // Función para manejar la autenticación antes de permitir la edición, de campos sensibles como username y email
    const handleAuthenticate = async (password: string) => {
        // Verifica si hay un campo editable seleccionado
        if (!campoEditable) return;
        // Verifica la contraseña del usuario
        const ok = await checkPassword(session?.user?.email ?? '', password);
        // Si la contraseña es incorrecta, muestra un mensaje de error
        if (!ok) {
            toast.error("La contraseña es incorrecta");
            return;
        }

        // Si la contraseña es correcta, permite la edición del campo correspondiente
        if (campoEditable === 'username') {
            setModificarUsername(true);
        } else if (campoEditable === 'email') {
            setModificarEmail(true);
        }

        // Cierra la ventana de autenticación
        setCampoEditable(null);
        setSeAbreVentanaProfile(false);
    };

    // Función para cancelar la edición del perfil
    const handleCancelProfile = () => {
        setSeAbreVentanaProfile(false);
        setCampoEditable(null);
    };

    // Función para manejar el envío del formulario
    const onSubmit = handleSubmit(() => {
        setMensajeVentana('¿Estás seguro de que quieres guardar tus datos?');
        setSeAbreVentanaConfirmacion(true);
    });

    // Función para manejar la confirmación de los cambios
    const handleConfirm = async () => {
        // Cierra la ventana de confirmación
        setSeAbreVentanaConfirmacion(false);

        // Obtiene los valores del formulario
        const data = getValues();
        const {
            name,
            firstSurname,
            secondSurname,
            bio,
            location,
            pronoun,
            username,
            email
        } = data;

        
        try {
            // Actualiza el perfil del usuario con los datos del formulario
            const updateResponse = await changeProfile(
                session?.user?.id || '',
                { name, firstSurname, secondSurname, bio, location, pronoun, username, email }
            );
            // Si la actualización falla, muestra un mensaje de error
            if (!updateResponse) {
                toast.error("Error al actualizar el perfil");
                return;
            }

            // Restablece los modos de edición tras guardar
            setModificarUsername(false);
            setModificarEmail(false);

            // Actualiza los datos de la sesión con el nuevo username y email
            await update({ email, username });
            // Muestra un mensaje de éxito
            toast.success("Perfil actualizado correctamente");
        } catch (error) {
            console.error("Error al actualizar el perfil:", error);
            toast.error("Error al actualizar el perfil");
        }
    };

    // Función para manejar la cancelación de la confirmación
    const handleCancelConfirmacion = () => {
        setSeAbreVentanaConfirmacion(false);
    };

    return (
        <>
            <Toaster position="top-left" reverseOrder={false} />
            <form onSubmit={onSubmit} className="max-w-4xl mx-auto p-6 text-white space-y-6">
                <h1 className="text-2xl font-bold">Perfil</h1>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <div className='flex justify-between'>
                            <label htmlFor="username" className="block text-sm font-semibold">Username</label>
                            {!modificarUsername && (
                                <button
                                    type="button"
                                    onClick={() => handleEditClick('username')}
                                    className="text-white hover:text-[#a8dadc] transition-colors"
                                >
                                    <Pencil className='w-5 h-5 mb-1 cursor-pointer' />
                                </button>
                            )}
                        </div>
                        <input
                            id="username"
                            {...register('username', {
                                required: {
                                    value: true,
                                    message: 'El nombre de usuario es obligatorio',
                                },
                            })}
                            className="w-full px-4 py-2 rounded transition-all bg-[#1d3557] text-[#F1FAEE] focus:bg-white focus:text-black focus:border focus:border-black focus:outline-none"
                            disabled={!modificarUsername}
                        />
                        {errors.username && <span className="text-red-800 text-xs font-semibold mt-2">{errors.username.message}</span>}
                    </div>
                    <div>
                        <div className='flex justify-between'>
                            <label htmlFor="email" className="block text-sm font-semibold">Correo electrónico</label>
                            {!modificarEmail && (
                                <button
                                    type="button"
                                    onClick={() => handleEditClick('email')}
                                    className="text-white hover:text-[#a8dadc] transition-colors"
                                >
                                    <Pencil className='w-5 h-5 mb-1 cursor-pointer' />
                                </button>
                            )}
                        </div>
                        <input
                            id="email"
                            type="email"
                            {...register('email', {
                                required: {
                                    value: true,
                                    message: 'El correo electrónico es obligatorio',
                                },
                            })}
                            className="w-full px-4 py-2 rounded transition-all bg-[#1d3557] text-[#F1FAEE] focus:bg-white focus:text-black focus:border focus:border-black focus:outline-none"
                            disabled={!modificarEmail}
                        />
                        {errors.email && <span className="text-red-800 text-xs font-semibold mt-2">{errors.email.message}</span>}
                    </div>
                    <div>
                        <label htmlFor="name" className="block text-sm font-semibold">Nombre</label>
                        <input
                            id="name"
                            {...register('name')}
                            className="w-full px-4 py-2 rounded transition-all bg-[#1d3557] text-[#F1FAEE] focus:bg-white focus:text-black focus:border focus:border-black focus:outline-none"
                        />
                    </div>
                    <div>
                        <label htmlFor="firstSurname" className="block text-sm font-semibold">Primer Apellido</label>
                        <input
                            id="firstSurname"
                            {...register('firstSurname')}
                            className="w-full px-4 py-2 rounded transition-all bg-[#1d3557] text-[#F1FAEE] focus:bg-white focus:text-black focus:border focus:border-black focus:outline-none"
                        />
                    </div>
                    <div>
                        <label htmlFor="secondSurname" className="block text-sm font-semibold">Segundo Apellido</label>
                        <input
                            id="secondSurname"
                            {...register('secondSurname')}
                            className="w-full px-4 py-2 rounded transition-all bg-[#1d3557] text-[#F1FAEE] focus:bg-white focus:text-black focus:border focus:border-black focus:outline-none"
                        />
                    </div>
                    <div>
                        <label htmlFor="location" className="block text-sm font-semibold">Localización</label>
                        <input
                            id="location"
                            {...register('location')}
                            className="w-full px-4 py-2 rounded transition-all bg-[#1d3557] text-[#F1FAEE] focus:bg-white focus:text-black focus:border focus:border-black focus:outline-none"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="bio" className="block text-sm font-semibold">Biografía</label>
                    <textarea
                        id="bio"
                        {...register('bio')}
                        rows={4}
                        className="w-full px-4 py-2 rounded transition-all bg-[#1d3557] text-[#F1FAEE] focus:bg-white focus:text-black focus:border focus:border-black focus:outline-none"
                    />
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label htmlFor="pronoun" className="block text-sm font-semibold">Pronombres</label>
                        <select
                            id="pronoun"
                            {...register('pronoun')}
                            className="w-full px-4 py-2 rounded transition-all bg-[#1d3557] text-[#F1FAEE] focus:bg-white focus:text-black focus:border focus:border-black focus:outline-none"
                        >
                            <option value="any">any</option>
                            <option value="They / their">They / their</option>
                            <option value="He / his">He / his</option>
                            <option value="She / her">She / her</option>
                            <option value="Xe / xyr">Xe / xyr</option>
                            <option value="Ze / zir">Ze / zir</option>
                            <option value="It / its">It / its</option>
                        </select>
                    </div>
                </div>

                <button type="submit" className="px-4 py-1.5 border border-white/30 hover:border-white hover:bg-green-600 text-sm text-white font-medium rounded transition">
                    Guardar cambios
                </button>
            </form>
            <EditProfileAuthPopup
                onClose={handleCancelProfile}
                onAuthenticate={handleAuthenticate}
                open={seAbreVentanaProfile && campoEditable !== null}
            />
            <AuthPopup
                abierto={seAbreVentanaConfirmacion}
                cerrado={handleCancelConfirmacion}
                confirmar={handleConfirm}
                titulo="Confirmación"
            >
                <p>{mensajeVentana}</p>
            </AuthPopup>
        </>
    );
}