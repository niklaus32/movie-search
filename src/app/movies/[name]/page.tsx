"use client";
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from "react";

interface Film {
    "#TITLE": string;
    "#YEAR": number;
    "#IMDB_ID": string;
    "#RANK": number;
    "#ACTORS": string;
    "#AKA": string;
    "#IMDB_URL": string;
    "#IMG_POSTER": string;
}

export default function MoviesPage() {
    const { name } = useParams();
    const decodedName = typeof name === "string" ? decodeURIComponent(name) : "";
    const [films, setFilms] = useState<Film[]>([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        if (!decodedName) return;
        async function fetchFilms() {
                try {
                    const res = await fetch(`https://imdb.iamidiotareyoutoo.com/search?q=${decodedName}`);
                    const data = await res.json();
                    if (!res.ok){
                        throw new Error("Failed to fetch data");
                    }
                    const films: Film[] = Array.isArray(data.description) ? data.description : [];
                    setFilms(films);
                } catch (error) {
                    console.error("Error fetching films:", error);
                    setFilms([]);
                } finally {
                    setLoading(false);
                }
            }
        fetchFilms();
    }, [decodedName]);

    if (loading) {
        return (
            <main className="flex items-center justify-center min-h-screen">
                <div className="flex flex-col items-center">
                    <h1 className="text-2xl font-semibold">Loading...</h1>
                </div>
            </main>
        );
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div>
                <h1 className="text-3xl font-semibold mb-6">Search: &quot;{decodedName}&quot;</h1>
                <Link href="/" className="flex justify-center hover:underline p-3">Go back</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {films.length === 0 ? (
                    <p>No movies found.</p>
                ) : (
                    films.map((film) => (
                        <div key={film["#IMDB_ID"]} className="border shadow-lg rounded-xl p-5 hover:shadow-xl transition duration-300 flex flex-col items-center">
                            <img src={film["#IMG_POSTER"]} alt={film["#TITLE"]} className="w-64 h-96 mb-5 object-cover rounded-lg"/>
                            <h2 className="text-xl font-semibold mb-2 text-center">{film["#TITLE"]}</h2>
                            <p className="text-gray-500 mb-1">Year: {film["#YEAR"]}</p>
                            <p className="text-gray-500 mb-2">Actors: {film["#ACTORS"]}</p>
                            <a href={film["#IMDB_URL"]} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">IMDB Link</a>
                        </div>
                    ))
                )}
            </div>
        </main>
    );
}