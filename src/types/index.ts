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
    profileImage: string | null;
    createdAt: Date;
    updatedAt: Date;
    user?: User;
}

export interface Games {
    id: number;
    title: string;
    description: string | null;
    platform: string | null;
    genre: string | null;
    releaseDate: Date | null;
    imageUrl: string | null;
    profiles?: Profile[];
}

export interface ProfileGame {
    id: number;
    profileId: number;
    gameId: number;
    rating: number | null;
    liked: boolean | null;
    played: boolean | null;
    playing: boolean | null;
    wishlist: boolean | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface Comment {
    id: number;
    profileId: number;
    gameId: number;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    profile?: Profile;
    game?: Games;
}