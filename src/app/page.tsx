"use client"
import { useState, FormEvent } from "react"
import { useRouter } from 'next/navigation'
import { useAppDispatch } from "./lib/hooks"
import { setMovieName } from "./lib/features/movieNameSlice"

export default function Home() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [inputVal, setInputVal] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (inputVal == "") {
      router.push('/movies')
    } else {
      const searchTerm = inputVal
      dispatch(setMovieName(searchTerm)) 
      router.push(`/movies/${searchTerm}`)
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="border bg-[#1a1a1a] rounded-xl p-9">
        <h1 className="font-bold text-3xl mb-3 text-center text-[#efefef]">Find a Movie</h1>
          <form onSubmit={handleSubmit}>
            <input 
            type="text" 
            placeholder="Search movies..." 
            className="border p-2 rounded-md mb-6 w-full max-w-md bg-white"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}/>
            <div className="flex justify-center">
              <button type="submit" className=" bg-green-700 hover:bg-green-800 text-neutral-300 font-bold py-2 px-3 rounded-md">Search</button>
            </div>
          </form>
      </div>
    </div>
  );
}
