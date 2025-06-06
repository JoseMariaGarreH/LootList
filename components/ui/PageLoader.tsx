"use client";

// Componentes
import AjaxLoader from './AjaxLoader';
// Hooks
import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';


export default function PageLoader({ children }: { children: React.ReactNode }) {
    // Estado para controlar la carga de la página
    const [isLoading, setIsLoading] = useState(false);
    
    // Hooks de Next.js para obtener la ruta y los parámetros de búsqueda
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        setIsLoading(true);
        // Simulamos un tiempo de carga mínimo
        const timer = setTimeout(() => setIsLoading(false), 500);
        return () => clearTimeout(timer);
    }, [pathname, searchParams]);

    return (
        <>
            {isLoading ? <AjaxLoader></AjaxLoader> : children}
        </>
    );
}