'use client';

// Componentes
import Footer from '@/components/menu/Footer';
import Navbar from '@/components/menu/Navbar';
import NavbarSettings from '@/components/settings/NavbarSettings';
import EditProfileForm from '@/components/settings/profile/edit/EditProfileForm';

// Página para editar el perfil del usuario en la configuración de la cuenta
export default function PageProfile() {

    return (
        <>
            <Navbar />
                <NavbarSettings />
                <EditProfileForm />
            <Footer />
        </>
    );
}