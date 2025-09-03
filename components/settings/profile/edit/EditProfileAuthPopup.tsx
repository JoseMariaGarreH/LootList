"use client"

import { useState } from 'react';
import toast from 'react-hot-toast';

// Definir las props del componente
interface EditProfileAuthPopupProps {
    onClose: () => void;
    onAuthenticate: (password: string) => Promise<void>;
    open: boolean;
}

export default function EditProfileAuthPopup({ onClose, onAuthenticate, open }: EditProfileAuthPopupProps) {
    // Estado para manejar la contraseña ingresada (SIEMPRE se llama)
    const [password, setPassword] = useState('');

    // Si la ventana emergente no está abierta, no renderizar nada
    if (!open) return null;

    // Función para manejar el envío del formulario
    const handleSubmit = async () => {
        // Validamos que la contraseña no esté vacía
        if (!password) {
            toast.error('Por favor ingresa una contraseña');
            return;
        }
        // Llamamos a la función onAuthenticate con la contraseña ingresada, si es válida
        await onAuthenticate(password);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full mx-4">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">
                    Verificación de contraseña
                </h2>
                <p className="text-gray-600 mb-4">
                    Por favor, ingresa tu contraseña para confirmar los cambios.
                </p>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Contraseña actual"
                    className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            handleSubmit();
                        }
                    }}
                />
                <div className="flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
}