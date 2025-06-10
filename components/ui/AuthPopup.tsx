"use client"

// Iconos
import { X } from 'lucide-react';

// Definición de las props para la ventana emergente de autenticación
interface VentanaEmergenteProps {
    abierto: boolean;
    cerrado: () => void;
    confirmar: () => void;
    titulo: string;
    children: React.ReactNode;
}

export default function VentanaEmergente({ abierto, cerrado, confirmar, titulo, children }: VentanaEmergenteProps) {
    // Si no está abierta, no renderiza nada
    if (!abierto) return null;

    return (
        // Fondo oscuro y centrado para la ventana emergente
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-[#457b9d] rounded-lg shadow-lg w-[500px] p-6 relative">
                {/* Botón de cerrar arriba a la derecha */}
                <button
                    type="button"
                    onClick={cerrado}
                    className="absolute top-2 right-2 bg-black/60 rounded-full p-1 hover:bg-[#a8dadc]/80 transition"
                    aria-label="Cerrar"
                >
                    <X className="w-6 h-6 text-[#f1faee]" />
                </button>
                {/* Cabecera con título */}
                <div className="mb-4">
                    <h2 className="text-xl text-white font-bold">{titulo}</h2>
                </div>
                {/* Contenido pasado como children */}
                <div className='text-white'>{children}</div>
                {/* Botón de confirmación */}
                <div className="mt-4 flex justify-end space-x-4">
                    <button
                        onClick={confirmar}
                        className="py-2 px-4 w-full text-white rounded-md hover:bg-[#1d3557] bg-[#e63946] active:bg-[#a62633] transition"
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
}