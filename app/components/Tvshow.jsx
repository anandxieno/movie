import React from "react";
import Link from "next/link";
import Image from "next/image";

const Tvshow = ({tvshowdata}) => {
  return (
    <div className="border border-gray-600 rounded-md p-3">
      <Image
        src={`https://image.tmdb.org/t/p/w500/${tvshowdata.poster_path}`}
        className="rounded-sm"
        width={500}
        height={400}
        alt={tvshowdata.original_name}
        priority={true}
      ></Image>
      <h2 className="mt-2 mb-1 text-lg font-semibold capitalize">
        {tvshowdata.original_name}
      </h2>
      <p>{tvshowdata.overview.substring(0, 150)}</p>
      <Link
        href={`/tvshow/${tvshowdata.original_name.split(" ").join("+")}`}
        className="bg-green-500 text-white px-3 py-1.5 my-2 inline-block text-sm rounded-md"
      >
        Read More
      </Link>
    </div>
  );
};

export default Tvshow;
