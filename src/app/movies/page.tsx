"use client";
import { useEffect, useState } from "react";
import Link from 'next/link';

interface Film {
    id: string;
    originalTitle: string;
    primaryTitle: string;
    type: string;
    primaryImage?: { url: string };
}

export default function Movies() {
    const [films, setFilms] = useState<Film[]>([]);
    useEffect(() => {
        async function fetchFilms() {
            try {
                const res = await fetch("https://api.imdbapi.dev/titles");
                const data = await res.json();
                if (!res.ok){
                    throw new Error("Failed to fetch data");
                }
                const films: Film[] = Array.isArray(data.titles) ? data.titles : [];
                setFilms(films);
            } catch (error) {
                console.error("Error fetching films:", error);
            }
        }
        fetchFilms();
    }, []);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div>
                <h1 className="text-3xl font-semibold mb-6">Browse Movies</h1>
                <Link href="/" className="flex justify-center hover:underline p-3">Go back</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {films.length === 0 ? (
                    <p>No movies found.</p>
                ) : (
                    films.map((film) => (
                        <div key={film.id} className="border shadow-lg rounded-xl p-5 hover:shadow-xl transition duration-300 flex flex-col items-center">
                            <img src={film.primaryImage?.url || "/default-poster.png"} alt={film.originalTitle} className="w-64 h-96 mb-5 object-cover rounded-lg"/>
                            <h2 className="text-xl font-semibold mb-2 text-center">{film.originalTitle}</h2>
                            <p className="text-gray-500 mb-1">Year: {film.type}</p>
                            <a href={`https://www.imdb.com/title/${film.id}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">IMDB Link</a>
                        </div>
                    ))
                )}
            </div>
        </main>
    );
}