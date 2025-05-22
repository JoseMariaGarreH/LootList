"use client";

import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import AuthPopup from '../../ui/AuthPopup';
import toast, { Toaster } from 'react-hot-toast';
import { Pencil } from 'lucide-react';
import ProfileAuthPopup from './ProfileAuthPopup';

export default function ProfileForm() {
    const { data: session } = useSession();
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

    const [seAbreVentanaProfile, setSeAbreVentanaProfile] = useState(false);
    const [seAbreVentanaConfirmacion, setSeAbreVentanaConfirmacion] = useState(false);
    const [mensajeVentana, setMensajeVentana] = useState('');
    const [campoEditable, setCampoEditable] = useState<'username' | 'email' | null>(null);
    const [modificarUsername, setModificarUsername] = useState(false);
    const [modificarEmail, setModificarEmail] = useState(false);

    useEffect(() => {
        const loadUserDetails = async () => {
            if (session?.user) {
                try {
                    const responseUser = await fetch(`/api/users/${session.user.id}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    const dataUser = await responseUser.json();

                    const responseProfile = await fetch(`/api/profile/${session.user.id}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    const dataProfile = await responseProfile.json();

                    if (dataUser.user) {
                        setValue('username', dataUser.user.username);
                        setValue('email', dataUser.user.email);
                        setValue('name', dataProfile.name);
                        setValue('firstSurname', dataProfile.firstSurname);
                        setValue('secondSurname', dataProfile.secondSurname);
                        setValue('location', dataProfile.location);
                        setValue('bio', dataProfile.bio);
                        setValue('pronoun', dataProfile.pronoun);
                    }

                } catch (error) {
                    console.error(error);
                }
            }
        };

        loadUserDetails();
    }, [session, setValue]);

    const handleEditClick = (campo: 'username' | 'email') => {
        setCampoEditable(campo);
        setSeAbreVentanaProfile(true); // Abre solo ProfileVentanaEmergente
    };

    const handleAuthenticate = async (password: string) => {
        if (!campoEditable) return;

        try {
            // Verificar la contraseña
            const verifyResponse = await fetch(`/api/users/verify-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: session?.user?.email,
                    password,
                }),
            });

            if (!verifyResponse.ok) {
                toast.error("La contraseña es incorrecta");
                return;
            }

            if (campoEditable === 'username') {
                setModificarUsername(true);
            } else if (campoEditable === 'email') {
                setModificarEmail(true);
            }

            setCampoEditable(null);
            setSeAbreVentanaProfile(false); // Cierra ProfileVentanaEmergente
        } catch (error) {
            console.error(`Error al actualizar el ${campoEditable}:`, error);
            toast.error(`Error al actualizar el ${campoEditable}`);
        }
    };

    const handleCancelProfile = () => {
        setSeAbreVentanaProfile(false); // Cierra ProfileVentanaEmergente
        setCampoEditable(null);
    };

    const onSubmit = handleSubmit(() => {
        setMensajeVentana('¿Estás seguro de que quieres guardar tus datos?');
        setSeAbreVentanaConfirmacion(true); // Abre solo VentanaEmergente
    });

    const handleConfirm = async () => {
        setSeAbreVentanaConfirmacion(false); // Cierra VentanaEmergente

        const data = getValues();
        const {
            username,
            email,
            name,
            firstSurname,
            secondSurname,
            bio,
            location,
            pronoun,
        } = data;

        try {
            const response = await fetch(`/api/profile/${email}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    email,
                    name,
                    firstSurname,
                    secondSurname,
                    bio,
                    location,
                    pronoun,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.log("Error al actualizar el perfil:", errorData.message);
                return;
            }
            toast.success("Perfil actualizado correctamente");
        } catch (error) {
            console.error("Error al actualizar el perfil:", error);
        }
    };

    const handleCancelConfirmacion = () => {
        setSeAbreVentanaConfirmacion(false); // Cierra VentanaEmergente
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
                            <Pencil onClick={() => handleEditClick('username')} className='w-5 h-5 mb-1' ></Pencil>
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
                            <Pencil onClick={() => handleEditClick('email')} className='w-5 h-5 mb-1' ></Pencil>
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
            <ProfileAuthPopup
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