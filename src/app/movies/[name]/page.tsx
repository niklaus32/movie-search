"use client";
import {useParams} from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect, useState, use } from "react";

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
    const [films, setFilms] = useState<Film[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function fetchFilms() {
                try {
                    const res = await fetch(`https://imdb.iamidiotareyoutoo.com/search?q=spiderman`);
                    const data = await res.json();
                    if (!res.ok){
                        throw new Error("Failed to fetch data");
                    }
                    let films: Film[] = Array.isArray(data.description) ? data.description : [];
                    setFilms(films);
                    console.log(films);
                } catch (error) {
                    console.error("Error fetching films:", error);
                    setFilms([]);
                } finally {
                    setLoading(false);
                }
            }
        fetchFilms();
    }, []);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1 className="text-3xl font-semibold mb-6">Movie List</h1>
            <div>
                {films.length === 0 ? (
                    <p>No movies found.</p>
                ) : (
                    films.map((film) => (
                        <div key={film["#IMDB_ID"]} className="border rounded-xl p-4 shadow-sm hover:shadow-md mb-4">
                            <img src={film["#IMG_POSTER"]} alt={film["#TITLE"]} className="mb-2 max-w-xs" />
                            <h2 className="text-xl font-medium">{film["#TITLE"]}</h2>
                            <p className="text-gray-600">Year: {film["#YEAR"]}</p>
                            <p className="text-gray-600">Actors: {film["#ACTORS"]}</p>
                            <a href={film["#IMDB_URL"]} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">IMDB Link</a>
                        </div>
                    ))
                )}
            </div>
        </main>
    );
}