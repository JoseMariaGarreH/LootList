"use client"

// Definición de las propiedades del componente Pagination
interface PaginationProps {
    page: number;
    totalPages: number;
    setPage: (p: number) => void;
}

export default function Pagination({ page, totalPages, setPage }: PaginationProps) {
    return (
        <div className="flex justify-center items-center gap-4 mt-6 mb-5">
            {/* Botón para ir a la página anterior */}
            <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1 || totalPages === 0}
                className="px-4 py-2 rounded bg-[#1d3557] text-white disabled:opacity-50"
            >
                Anterior
            </button>
            {/* Texto que muestra la página actual y el total de páginas */}
            <span className="text-white">
                Página {totalPages === 0 ? 0 : page} de {totalPages}
            </span>
            {/* Botón para ir a la página siguiente */}
            <button
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages || totalPages === 0}
                className="px-4 py-2 rounded bg-[#1d3557] text-white disabled:opacity-50"
            >
                Siguiente
            </button>
        </div>
    );
}