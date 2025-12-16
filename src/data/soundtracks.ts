interface soundtracksTypes {
    id: number;
    title: string;
    artist: string;
    url: string;
    imageUrl: string;
}

export const soundtracks:soundtracksTypes[] = [
    {
        id: 1,
        title: "Losing",
        artist: "Lonnex",
        url: "/sound/losing-lonnex.mp3",
        imageUrl: "/sound/covers/losing-lonnex.webp",
    },
    {
        id: 2,
        title: "Quiescent",
        artist: "Baton",
        url: "/sound/quiescent-baton.mp3",
        imageUrl: "/sound/covers/quiescent-baton.webp",
    },
];