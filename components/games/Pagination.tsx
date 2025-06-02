interface PaginationProps {
    page: number;
    totalPages: number;
    setPage: (p: number) => void;
}

export default function Pagination({ page, totalPages, setPage }: PaginationProps) {
    return (
        <div className="flex justify-center items-center gap-4 mt-6">
            <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1 || totalPages === 0}
                className="px-4 py-2 rounded bg-[#1d3557] text-white disabled:opacity-50"
            >
                Anterior
            </button>
            <span className="text-white">
                Página {page} de {totalPages}
            </span>
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