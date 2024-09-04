import React from "react";
import Image from "next/image";
import Link from "next/link";

const Celebritie = ({CelebritieData}) => {
  return (
    <div>
      <Image
        src={`https://image.tmdb.org/t/p/w500${CelebritieData.profile_path}`}
        className="rounded-sm"
        width={200}
        height={300}
        alt={CelebritieData.name}
      ></Image>
      <span className="block text-xl font-medium">{CelebritieData.name}</span>
      <p className="text-lg">{CelebritieData.known_for_department}</p>
      <Link
        className="bg-green-500 text-white px-3 py-1.5 my-2 inline-block text-sm rounded-md"
        href={`/celebrities/${CelebritieData.name.split(" ").join("+")}`}
      >
        See Detail
      </Link>
    </div>
  );
};

export default Celebritie;
