'use client';

import Footer from '@/components/menu/Footer';
import Navbar from '@/components/menu/Navbar';
import NavbarSettings from '@/components/settings/NavbarSettings';
import EditProfileForm from '@/components/settings/profile/edit/EditProfileForm';

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