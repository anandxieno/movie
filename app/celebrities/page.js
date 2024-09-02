"use client";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Image from "next/image";
import Link from "next/link";


const Actor = () => {
  let [actors, setActors] = useState([]);

  useEffect(() => {
    const GetActors = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/person/popular?api_key=76c5b0ffbfb320a6cae2128a034b4d9d`
        );
        if (!response.ok) {
          console.log("Error aa gyi");
        }
        let data = await response.json();
        setActors(data.results || []);
      } catch {
      } finally {
      }
    };
    GetActors();
  });

  return (
    <>
      <Header />
      <div>
        <div className="grid grid-cols-12 gap-4 container">
          <div className="col-span-4"></div>
          <div className="col-span-8 grid grid-cols-4 gap-4">
            {
              actors.length > 0 ? 
              actors.map((actor, actorIndex)=>(
                   <div key={actorIndex}>
                      <Image src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} className="rounded-sm" width={200} height={300} alt=""></Image>
                       <span className="block">{actor.name}</span>
                       
                       <Link className="p-2 bg-yellow-600 rounded-md inline-block mt-4" href={`/celebrities/${actor.name.split(" ").join('+')}`}>See Detail</Link>
                   </div>
              ))
              : "No Actor Found"  
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default Actor;
