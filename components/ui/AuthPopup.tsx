import React from 'react';
import { X } from 'lucide-react';

interface VentanaEmergenteProps {
    abierto: boolean;
    cerrado: () => void;
    confirmar: () => void;
    titulo: string;
    children: React.ReactNode;
}

export default function VentanaEmergente({ abierto, cerrado, confirmar, titulo, children }: VentanaEmergenteProps) {
    if (!abierto) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-[#457b9d] rounded-lg shadow-lg w-[500px] p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl text-white font-bold">{titulo}</h2>
                    <button
                        onClick={cerrado}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <X
                            className='w-6 h-6 text-[#d9d9d9]'
                        >
                        </X>
                    </button>
                </div>
                <div className='text-white'>{children}</div>
                <div className="mt-4 flex justify-end space-x-4">
                    <button
                        onClick={confirmar}
                        className="w-full py-2 px-4 text-white rounded-md hover:bg-[#1d3557] bg-[#e63946] active:bg-[#a62633] transition"
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
}