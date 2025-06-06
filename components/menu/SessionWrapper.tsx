"use client";

// Componente
import { SessionProvider } from "next-auth/react";
// Tipo
import { ReactNode } from "react";

// Componente que envuelve a los hijos con el SessionProvider de NextAuth, 
// permitiendo el acceso a la sesión de usuario en toda la aplicación
export default function SessionWrapper({ children }: { children: ReactNode }) {
    return <SessionProvider>{children}</SessionProvider>;
}