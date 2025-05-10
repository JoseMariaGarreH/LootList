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
            <div className="bg-white rounded-lg shadow-lg w-[500px] p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">{titulo}</h2>
                    <button
                        onClick={cerrado}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <X
                            className='w-6 h-6'
                        >

                        </X>
                    </button>
                </div>
                <div>{children}</div>
                <div className="mt-4 flex justify-end space-x-4">
                    <button
                        onClick={cerrado}
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={confirmar}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
}