import { Users, Profiles } from "@prisma/client";

export type User = Users & {
    id: number;
    email: string;
    username: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    profile?: Profile | null;
}

export type Profile = Profiles & {
    id: number;
    userId: number;
    name: string;
    firstSurname: string;
    secondSurname: string;
    bio: string;
    location: string;
    pronoun: string;
    profileImage: string;
}