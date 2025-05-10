"use client";

import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import VentanaEmergente from '../../ui/VentanaEmergente';
import toast, { Toaster } from 'react-hot-toast';

export default function ProfileForm() {
    const { data: session } = useSession();
    const router = useRouter();
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
            favoriteGames: [],
            profileImage: null,
        }
    });

    const [seAbreVentana, setSeAbreVentana] = useState(false);
    const [mensajeVentana, setMensajeVentana] = useState('');

    useEffect(() => {
        const loadUserDetails = async () => {
            if (session?.user?.email) {
                try {
                    const responseUser = await fetch(`/api/users/by-email/${session.user.email}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    if (!responseUser.ok) {
                        throw new Error('Error al cargar los datos del usuario');
                    }

                    const dataUser = await responseUser.json();
                    console.log("User Data:", dataUser);

                    const reponseProfile = await fetch(`/api/profile/${session.user.email}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    if (!reponseProfile.ok) {
                        throw new Error('Error al cargar los datos del perfil');
                    }

                    const dataProfile = await reponseProfile.json();

                    if (dataUser.user) {
                        setValue('username', dataUser.user.username);
                        setValue('email', dataUser.user.email);
                        setValue('name', dataProfile.name);
                        setValue('firstSurname', dataProfile.firstSurname);
                        setValue('secondSurname', dataProfile.secondSurname);
                        setValue('location', dataProfile.location);
                        setValue('bio', dataProfile.bio);
                        setValue('pronoun', dataProfile.pronoun);
                        setValue('favoriteGames', dataProfile.favoriteGames ?? []);
                        setValue('profileImage', dataProfile.profileImage ?? null);
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        };

        loadUserDetails();
    }, [session, setValue]);

    const onSubmit = handleSubmit(() => {
        setMensajeVentana('¿Estás seguro de que quieres guardar tus datos?');
        setSeAbreVentana(true);
        // La confirmación se maneja en la ventana emergente
    });

    const handleConfirm = async () => {
        setSeAbreVentana(false);

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

        console.log("Form Data:", data);

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

    const handleCancel = () => {
        setSeAbreVentana(false);
    };

    return (
        <>
            <Toaster position="top-left" reverseOrder={false} />
            <form onSubmit={onSubmit} className="max-w-4xl mx-auto p-6 text-white space-y-6">
                <h1 className="text-2xl font-bold">Perfil</h1>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-semibold">Username</label>
                        <input
                            id="username"
                            {...register('username', {
                                required: {
                                    value: true,
                                    message: 'El nombre de usuario es obligatorio',
                                },
                            })}
                            className="w-full px-4 py-2 rounded transition-all bg-[#1d3557] text-[#F1FAEE] focus:bg-white focus:text-black focus:border focus:border-black focus:outline-none"
                        />
                        {errors.username && <span className="text-red-800 text-xs font-semibold mt-2">{errors.username.message}</span>}
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold">Correo electrónico</label>
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
                            disabled
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

                <button type="submit" className="px-4 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600">
                    Guardar cambios
                </button>
            </form>
            <VentanaEmergente
                abierto={seAbreVentana}
                cerrado={handleCancel}
                confirmar={handleConfirm}
                titulo="Confirmación"
            >
                <p>{mensajeVentana}</p>
            </VentanaEmergente>
        </>
    );
}