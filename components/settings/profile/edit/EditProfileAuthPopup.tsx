"use client"

import { Lock, X } from "lucide-react"
import { useState } from "react";


interface EditProfileVentanaEmergenteProps {
    onClose: () => void,
    onAuthenticate: (password: string) => void;
    open: boolean;
}

export default function EditProfileVentanaEmergente({ onClose, onAuthenticate, open }: EditProfileVentanaEmergenteProps) {
    if (!open) return null;

    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        if (!password) {
            alert('Por favor ingresa una contraseña');
            return;
        }
        onAuthenticate(password);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-[#457b9d] rounded-lg shadow-lg w-[500px] p-6">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                        <Lock className="w-7 h-7 m-2 text-[#d9d9d9]" ></Lock>
                        <h2 className="mt-1 text-xl text-white font-bold">Autenticación Requerida</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <X className="w-6 h-6 text-[#d9d9d9]" />
                    </button>
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-semibold text-white">
                        Contraseña
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 rounded transition-all bg-[#1d3557] text-[#F1FAEE] focus:bg-white focus:text-black focus:border focus:border-black focus:outline-none"
                        placeholder="Introduce tu contraseña"
                    />
                </div>
                <div className="mt-4 flex justify-center space-x-4">
                    <button
                        onClick={handleSubmit}
                        className="w-full py-2 px-4 text-white rounded-md hover:bg-[#1d3557] bg-[#e63946] active:bg-[#a62633] transition"
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
}