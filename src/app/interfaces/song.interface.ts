export interface Song {
    _id: string;
    name: string;
    artist: string;
    album: string;
    releaseDate: number;
    genre: string;
    duration: number;
    images: string[];
    href: string;
    popularity: number;
    geolocation: [number, number];
    comments: Comment[];
};