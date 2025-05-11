'use client';

import Footer from '@/components/menu/Footer';
import Navbar from '@/components/menu/Navbar';
import NavbarSettings from '@/components/settings/NavbarSettings';
import ProfileForm from '@/components/settings/profile/ProfileForm';

export default function PageProfile() {

    return (
        <>
            <Navbar />
                <NavbarSettings />
                <ProfileForm />
            <Footer />
        </>
    );
}