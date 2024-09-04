"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Movie({ movieData }) {
  const [href, setHref] = useState("/");
  useEffect(() => {
    if (movieData.title) {
      setHref(movieData.title.split(" ").join("+"));
    }
  }, [movieData.title]);

  return (
    <Link href={`/movies/${href}`}>
      <div className="border border-gray-600 rounded-md p-3">
        <Image
          src={`${
            movieData.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movieData.poster_path}`
              : "https://via.placeholder.com/263x394"
          } `}
          className="rounded-sm"
          width={500}
          height={400}
          priority={true}
          alt=""
        ></Image>
        <h2 className="mt-2 mb-1 text-lg font-semibold capitalize">
          {movieData.title}
        </h2>
        <p>{movieData.overview.substring(0, 150)}</p>
        <span className="bg-green-500 text-white px-3 py-1.5 my-2 inline-block text-sm rounded-md">Read More</span>
      </div>
      
    </Link>
  );
}
