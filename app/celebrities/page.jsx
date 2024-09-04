"use client";
import React, { useEffect, useState, useCallback } from "react";
import Header from "../components/Header";
import Image from "next/image";
import Link from "next/link";

const Actor = () => {
  let apiKey = process.env.NEXT_PUBLIC_API_KEY;

  let [loading, setLoading] = useState(true);
  let [actors, setActors] = useState([]);
  let [search, setSearch] = useState("");
  let [page, setPage] = useState(1);

  const GetActors = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/person/popular?api_key=${apiKey}&page=${page}`
      );

      if (!response.ok) {
        console.log("Error occurred");
        return;
      }

      let data = await response.json();

      if (page === 1) {
        setActors(data.results || []);
      } else {
        setActors((prevActors) => [...prevActors, ...data.results]);
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const HandleSort = (e) => {
    let Getvalue = e.target.value;

    let SortableItem;
    if (Getvalue === "popularity") {
      SortableItem = [...actors].sort(
        (person1, person2) => person2.popularity - person1.popularity
      );
    } else if (Getvalue === "name") {
      SortableItem = [...actors].sort((person1, person2) => {
        const nameA = person1.name.toUpperCase();
        const nameB = person2.name.toUpperCase();
        if (nameA < nameB) {return -1;}
        if (nameA > nameB) {return 1;}
        return 0;
      });
    }
    setActors(SortableItem);
  };

  const HandleSearch = (e) => {
    let Getvalue = e.target.value;
    setSearch(Getvalue);
  };

  function handlescroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.scrollHeight
    ) {
      setPage((prev) => prev + 1);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handlescroll);
    return () => window.removeEventListener("scroll", handlescroll);
  }, []);

  useEffect(() => {
      GetActors();
  }, [page]);

  return (
    <>
      <Header />
      <div>
        <div className="grid grid-cols-12 gap-4 container">
          <div className="col-span-12">
            <div className="sortListing flex flex-col sm:flex-row gap-3 justify-between sm:items-center py-4">
              <select
                className="border w-48 p-1"
                onChange={(e) => {
                  HandleSort(e);
                }}
              >
                <option>Sort</option>
                <option value="name">Name</option>
                <option value="popularity">Popularity</option>
              </select>

              <div>
                <input
                  type="search"
                  id="searchItem"
                  className="border p-2 focus:outline-none"
                  placeholder="Search here..."
                  onChange={(e) => {
                    HandleSearch(e);
                  }}
                  value={search}
                />
              </div>
            </div>
            <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {loading && page === 1 ? (
                "Loading Data"
              ) : actors.length > 0 ? (
                search.length !== "" ? (
                  actors
                    .filter((actor) =>
                      actor.name.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((actor, actorIndex) => (
                      <div key={actorIndex}>
                        <Image
                          src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                          className="rounded-sm"
                          width={200}
                          height={300}
                          alt={actor.name}
                        ></Image>
                        <span className="block">{actor.name}</span>

                        <Link
                          className="p-2 bg-yellow-600 rounded-md inline-block mt-4"
                          href={`/celebrities/${actor.name
                            .split(" ")
                            .join("+")}`}
                        >
                          See Detail
                        </Link>
                      </div>
                    ))
                ) : (
                  actors.map((actor, actorIndex) => (
                    <div key={actorIndex}>
                      <Image
                        src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                        className="rounded-sm"
                        width={200}
                        height={300}
                        alt={actor.name}
                      ></Image>
                      <span className="block">{actor.name}</span>

                      <Link
                        className="p-2 bg-yellow-600 rounded-md inline-block mt-4"
                        href={`/celebrities/${actor.name
                          .split(" ")
                          .join("+")}`}
                      >
                        See Detail
                      </Link>
                    </div>
                  ))
                )
              ) : (
                "No Actor Found"
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Actor;
