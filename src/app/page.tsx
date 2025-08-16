"use client";
import { useState, FormEvent } from "react";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter()
  const [inputVal, setInputVal] = useState("");
  const {push} = useRouter()
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    router.push(`/movies/${inputVal}`)
  };
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="border rounded-xl p-4 shadow-sm">
        <h1 className="font-bold text-3xl mb-3 text-center">Find a Movie</h1>
          <form onSubmit={handleSubmit}>
            <input 
            type="text" 
            placeholder="Search movies..." 
            className="border p-2 rounded-md mb-6 w-full max-w-md"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}/>
            <div className="flex justify-center">
              <button type="submit" className=" bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-3 rounded">Find Movie</button>
            </div>
          </form>
      </div>
    </div>
  );
}
