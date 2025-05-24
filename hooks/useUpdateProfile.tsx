"use client";

import updateProfile from "@/src/actions/put-updateProfile-action";

export function useUpdateProfile() : {
    changeProfile: (
        userId: string,
        profileData: {
            name: string;
            firstSurname: string;
            secondSurname: string;
            bio: string;
            location: string;
            pronoun: string;
        }
    ) => Promise<boolean>;
}  {

    const changeProfile = async (
        userId: string,
        profileData: {
            name: string;
            firstSurname: string;
            secondSurname: string;
            bio: string;
            location: string;
            pronoun: string;
        }
    ) => {
        const result = await updateProfile(userId, profileData);
        return result;
    };

    return { changeProfile };
}