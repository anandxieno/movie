"use client";
import { useEffect, useState } from "react";

import Movie from "../components/Movie";
import Header from "../components/Header";

export default function Movies() {
  let apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const [sorting, setSorting] = useState(null);
  const [sortable, setSortableItem] = useState([])
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState("");
  const [movieSearch, setMovieSearch] = useState("");
  const [error, setError] = useState(null);
  const [activeLanguages, setActiveLanguages] = useState(null);
  const [activeGener, setActiveGener] = useState(null);
  const [page, setPage] = useState(1);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${page}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      const data = await response.json();
      setMovies([...movies, ...data.results]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const searchMovie = (e) => {
    setMovieSearch(e.target.value);
  };

  const filteredMovies =
    movieSearch !== ""
      ? movies.filter((movie) =>
        movie.title.toLowerCase().includes(movieSearch.toLowerCase())
      )
      : movies;

  /////// Filter data based on Language //////
  const selectedLanguageFilter = async () => {
    if (activeLanguages !== null) {
      try {
        setLoading(true);
        let response;
        if (activeGener == null) {
          response = await fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_original_language=${activeLanguages}&page=${page}`
          );
        } else {
          response = await fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_original_language=${activeLanguages}&with_genres=${activeGener}&page=${page}`
          );
        }
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
        const data = await response.json();
        setMovies(data.results || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    selectedLanguageFilter(activeLanguages);
  }, [activeLanguages]);

  ///// Handle Filter by geners ////////
  const filterMovieGeners = async () => {
    if (activeGener != null) {
      try {
        setLoading(true);
        let response;
        if (activeLanguages == null) {
          response = await fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${activeGener}&page=${page}`
          );
        } else {
          response = await fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_original_language=${activeLanguages}&with_genres=${activeGener}&page=${page}`
          );
        }
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
        let data = await response.json();
        setMovies(data.results || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    filterMovieGeners(activeGener);
  }, [activeGener]);

  /////////////  Infinite scroll ///////////
  function handlescroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop + 20 >=
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
    fetchData();
    selectedLanguageFilter(activeLanguages);
    filterMovieGeners(activeGener);
  }, [page]);

  ///// Handle Sorting /////

  const HandleSorting = (e) => {
    let getValue = e.target.value;
    setSorting(getValue);
  }

  useEffect(() => {
    if (sorting !== null) {
      switch (sorting) {
        case "name":
          setSortableItem(filteredMovies.sort((movie1, movie2) => {
            let movieA = movie1.title.toLowerCase();
            let movieB = movie2.title.toLowerCase();
            if (movieA < movieB) { return -1; }
            else if (movieA > movieB) { return 1; }
            else { return 0; }
          }));
          break;
        case "popularity":
          setSortableItem(filteredMovies.sort((movie1, movie2) => {
            if (movie1.popularity < movie2.popularity) { return -1; }
            else if (movie1.popularity > movie2.popularity) { return 1; }
            else { return 0; }
          }));
          break;

        case "release-date":
          setSortableItem(filteredMovies.sort((movie1, movie2) => {
            if (movie1.release_date < movie2.release_date) { return 1; }
            else if (movie1.release_date > movie2.release_date) { return -1; }
            else { return 0; }
          }));
          break;

        default:
        // default code block;
      }
      setSorting("");
    }
  }, [sorting])


  return (
    <>
      <Header />
      <div className="movie-listing container grid grid-cols-12 mt-10 gap-3">
        <div className="col-span-12 md:col-span-3">


          <div className="mt-5">
            <div className="text-xl mb-2">Languages</div>
            <div className="flex flex-col gap-2">
              <label>
                <input
                  type="radio"
                  name="language"
                  id=""
                  value="en"
                  onChange={(e) => setActiveLanguages(e.target.value)}
                />
                English
              </label>
              <label>
                <input
                  type="radio"
                  name="language"
                  id=""
                  value="hi"
                  onChange={(e) => setActiveLanguages(e.target.value)}
                />
                Hindi
              </label>
              <label>
                <input
                  type="radio"
                  name="language"
                  id=""
                  value="fi"
                  onChange={(e) => setActiveLanguages(e.target.value)}
                />
                French
              </label>
            </div>

            <div className="geners mt-5">
              <div className="text-xl mb-2">Geners</div>
              <div className="flex flex-col gap-2">
                <label>
                  <input
                    type="radio"
                    name="geners"
                    id="28"
                    onChange={(e) => setActiveGener(e.target.id)}
                  />
                  Action
                </label>
                <label>
                  <input
                    type="radio"
                    name="geners"
                    id="12"
                    onChange={(e) => setActiveGener(e.target.id)}
                  />
                  Adventure
                </label>
                <label>
                  <input
                    type="radio"
                    name="geners"
                    id="16"
                    onChange={(e) => setActiveGener(e.target.id)}
                  />
                  Animation
                </label>
                <label>
                  <input
                    type="radio"
                    name="geners"
                    id="35"
                    onChange={(e) => setActiveGener(e.target.id)}
                  />
                  Comedy
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 md:col-span-9">
          <div className="flex justify-between flex-col sm:flex-row sm:items-center pb-5">
            <div>
              <select
                className="border w-48 p-1"
                onChange={(e) => {
                  HandleSorting(e);
                }}
              >
                <option>Sort</option>
                <option value="name">Name</option>
                <option value="popularity">Popularity</option>
                <option value="release-date">Release Date</option>
              </select>
            </div>
            <div>
              <span className="text-xl font-semibold">Search : </span>
              <input
                type="search"
                className="border py-1 px-2 focus:outline-none"
                onChange={searchMovie}
                value={movieSearch}
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {loading ? (
              "Loading movies..."
            ) : error ? (
              <div className="col-span-12 text-red-500">Error: {error}</div>
            ) : filteredMovies.length > 0 ? (
              filteredMovies.map((movieValue, movieId) => (
                <Movie key={movieId} movieData={movieValue} />
              ))
            ) : (
              "No Data Found"
            )}
          </div>

        </div>
      </div>
    </>
  );
}
