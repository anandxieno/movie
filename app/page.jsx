"use client";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Movie from "./components/Movie";

export default function Home() {
  let apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const [loading, setLoading] = useState(true); // Start with loading set to true
  const [movies, setMovies] = useState([]);
  const [movieSearch, setMovieSearch] = useState("");
  const [error, setError] = useState(null); // State for handling errors

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
        const data = await response.json();
        setMovies(data.results || [] );
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array to fetch only once on mount

  const searchMovie = (e) => {
    setMovieSearch(e.target.value);
  };

  const filteredMovies =
    movieSearch !== ""
      ? movies.filter((movie) =>
          movie.title.toLowerCase().includes(movieSearch.toLowerCase())
        )
      : movies;

  // Example language filter function
  const handleFilterLanguage = (e) => {
    const selectedLanguage = e.target.value;
    // Implement filtering logic based on language
  };

  return (
    <>
      <Header />
      <div className="movie-listing container grid grid-cols-12 mt-10 gap-3">
        <div className="col-span-3">
          <div>
            <span className="text-xl font-semibold">Search</span>
            <input
              type="search"
              className="border py-1 px-2 focus:outline-none"
              onChange={searchMovie}
              value={movieSearch}
            />
          </div>

          <div className="mt-5">
            <div className="text-xl">Languages</div>
            <input
              type="checkbox"
              value="english"
              name="language"
              className="w-5 h-5 mr-1.5"
              onChange={handleFilterLanguage}
            />
            <label>English</label>
            <br />
            <input
              type="checkbox"
              value="hindi"
              name="language"
              className="w-5 h-5 mr-1.5"
              onChange={handleFilterLanguage}
            />
            <label>Hindi</label>
            <br />
          </div>
        </div>
        <div className="col-span-9 grid grid-cols-3 gap-3">
          {loading ? (
            "Loading movies..."
          ) : error ? (
            <div className="col-span-12 text-red-500">
              Error: {error}
            </div>
          ) : filteredMovies.length > 0 ? (
            filteredMovies.map((movieValue, movieId) => (
              <Movie key={movieId} movieData={movieValue} />
            ))
          ) : (
            "No Data Found"
          )}
        </div>
      </div>
    </>
  );
}
