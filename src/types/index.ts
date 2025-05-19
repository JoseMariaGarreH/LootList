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
    description: string;
    platform: string;
    releaseDate: Date;
    imageUrl: string;
    profiles?: Profile[];
}