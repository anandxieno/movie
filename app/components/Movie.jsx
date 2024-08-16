"use client"

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Movie({movieData}) {
  const [href, setHref] = useState('/');
  useEffect(()=>{
    if (movieData.title) {
        setHref(movieData.title.split(" ").join('+'));
    }
  }, [movieData.title])

  return (
    <div className="border border-gray-600 rounded-md p-3">
      <Image src={`https://image.tmdb.org/t/p/w500/${movieData.poster_path}`} className="rounded-sm" width={500} height={400} alt=""></Image>
      <h2 className="mt-2 mb-1 text-lg font-semibold capitalize">{movieData.title}</h2>
      <p>{movieData.overview.substring(0, 150)}</p>
      <Link href={`/movie/${href}`} className="bg-green-500 text-white px-3 py-1.5 my-2 inline-block text-sm rounded-md">Read More</Link>
    </div>
  );
}
