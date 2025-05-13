import { Users, Profiles } from "@prisma/client";

export type User = Users & {
    id: number;
    email: string;
    username: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
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
}