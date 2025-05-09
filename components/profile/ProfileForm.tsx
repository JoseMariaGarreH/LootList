"use client"

import { useForm } from 'react-hook-form';
import { signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfileForm() {

    const { data: session } = useSession();
    const router = useRouter();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        defaultValues: {
            username: '',
            email: '',
            name: '',
            firstName: '',
            secondName: '',
            location: '',
            bio: '',
            pronoun: '',
            favoriteGames: [],
            profileImage: null,
        }
    });

    // useEffect(() => {
    //     const loadUserDetails = async () => {
    //         if (session?.user?.email) {
    //             const response = await fetch(`/api/users/by-email/${session.user.email}`);
    //             const data = await response.json();
    //             console.log("User Data:", data);
    //             if (data.user) {
    //                 setValue('username', data.user.username);
    //                 setValue('email', data.user.email);
    //                 setValue('name', data.user.name ?? '');
    //                 setValue('firstName', data.user.firstName ?? '');
    //                 setValue('secondName', data.user.secondName ?? '');
    //                 setValue('location', data.user.location ?? '');
    //                 setValue('bio', data.user.bio ?? '');
    //                 setValue('pronoun', data.user.pronoun ?? 'any');
    //                 setValue('favoriteGames', data.user.favoriteGames ?? []);
    //                 setValue('profileImage', data.user.profileImage ?? null);
    //             }
    //         }
    //     };
    //     loadUserDetails();
    // }, [session]);


    const onSubmit = handleSubmit( async (data) => {
        const {
            name,
            firstName,
            secondName,
            bio,
            location,
            pronoun,
            favoriteGames,
            profileImage
        } = data;

        console.log("Form Data:", data);

        const respuesta = await fetch('/api/profile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                firstName,
                secondName,
                bio,                    
                location,
                pronoun,
                favoriteGames,
                profileImage  
            })
        });

        if(respuesta.ok){
            console.log("Perfil actualizado correctamente");
            router.refresh();
        }
    })

    return (
        <>
            <form onSubmit={onSubmit} className="max-w-2xl mx-auto p-6 text-white space-y-6">
                <h1 className="text-2xl font-bold">Profile</h1>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-semibold">Username</label>
                        <input
                            id="username"
                            {...register('username', {
                                required: {
                                    value: true,
                                    message: 'El nombre de usuario es obligatorio'
                                }
                            })}
                            className="w-full px-4 py-2 rounded transition-all bg-[#1d3557] text-[#F1FAEE] focus:bg-white focus:text-black focus:border focus:border-black focus:outline-none"
                        />
                        {errors.username && <span className="text-red-500 text-xs">{errors.username.message}</span>}
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold">Correo electrónico</label>
                        <input
                            id="email"
                            type="email"
                            {...register('email', {
                                required: {
                                    value: true,
                                    message: 'El correo electrónico es obligatorio'
                                }
                            })}
                            className="w-full px-4 py-2 rounded transition-all bg-[#1d3557] text-[#F1FAEE] focus:bg-white focus:text-black focus:border focus:border-black focus:outline-none"
                        />
                        {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
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
                        <label htmlFor="firstName" className="block text-sm font-semibold">Primer Apellido</label>
                        <input
                            id="firstName"
                            {...register('firstName')}
                            className="w-full px-4 py-2 rounded transition-all bg-[#1d3557] text-[#F1FAEE] focus:bg-white focus:text-black focus:border focus:border-black focus:outline-none"
                        />
                    </div>
                    <div>
                        <label htmlFor="secondName" className="block text-sm font-semibold">Segundo Apellido</label>
                        <input
                            id="secondName"
                            {...register('secondName')}
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

                <div>
                    <h2 className="text-lg font-semibold mb-2">Juegos Favoritos</h2>
                    <div className="grid grid-cols-4 gap-4">

                    </div>
                </div>

                <button type="submit" className="px-4 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600">
                    Save Changes
                </button>

                <button type="button" onClick={() => signOut()} className="ml-3 px-5 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600">
                    Log out
                </button>
            </form>
        </>
    )
}