export interface User {
    id: number;
    email: string;
    username: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Profile {
    id: number;
    userId: number;
    name: string;
    firstSurname: string;
    secondSurname: string;
    bio: string;
    location: string;
    pronoun: string;
}

export interface Games {
    id: number;
    title: string;
    description: string | null;
    platform: string | null;
    releaseDate: Date | null;
    imageUrl: string | null;
    profiles?: Profile[];
}