"use client";

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import AjaxLoader from './AjaxLoader';

export default function PageLoader({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(false);
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