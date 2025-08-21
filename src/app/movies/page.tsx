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
    const [loading, setLoading] = useState(true);
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
                setFilms([]);
            } finally {
                setLoading(false);
            }
        }
        fetchFilms();
    }, []);

    if (loading) {
        return (
            <main className="flex items-center justify-center min-h-screen bg-black">
                <div className="flex flex-col items-center">
                    <h1 className="text-2xl font-semibold text-white">Loading...</h1>
                </div>
            </main>
        );
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-black">
            <div>
                <h1 className="text-3xl font-semibold mb-6 text-white">Browse Movies</h1>
                <Link href="/" className="flex justify-center hover:underline p-3 text-white">Go back</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {films.length === 0 ? (
                    <p>No movies found.</p>
                ) : (
                    films.map((film) => (
                        <div key={film.id} className="border shadow-lg rounded-xl p-5 hover:shadow-xl transition duration-300 flex flex-col items-center bg-[#1a1a1a]">
                            <img src={film.primaryImage?.url || "/default-poster.png"} alt={film.originalTitle} className="w-64 h-96 mb-5 object-cover rounded-lg shadow-md"/>
                            <h2 className="text-xl font-semibold mb-2 text-center text-white">{film.originalTitle}</h2>
                            <p className="text-gray-500 mb-1">Type: {film.type}</p>
                            <a href={`https://www.imdb.com/title/${film.id}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">IMDB Link</a>
                        </div>
                    ))
                )}
            </div>
        </main>
    );
}