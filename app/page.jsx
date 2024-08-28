"use client";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Movie from "./components/Movie";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "./redux/slice";

export default function Home() {
  let apiKey = process.env.NEXT_PUBLIC_API_KEY;
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
            `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=${activeLanguages}&with_genres=${activeGener}&page=${page}`
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
            `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=${activeLanguages}&with_genres=${activeGener}&page=${page}`
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


  ///////////// Get redux value /////////////



  //////// set redux value ///////
  const dispatch = useDispatch();
  
  // Function to dispatch a static value
//   function handleAddUser() {
//     // Dispatching a static value "John Doe"
//     dispatch(addUser("John Doe"));
//   }
//   useEffect(()=>{
//     handleAddUser();
//     console.log("one time");
    
//   }, [])
//   let selector = useSelector((state) => state.usersData);
//   useEffect(()=>{
//     console.log(selector);
//  }, [selector])

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
            <div className="text-base mb-2">Languages</div>
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
              <div className="text-base mb-2">Geners</div>
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
        <div className="col-span-9 grid grid-cols-3 gap-3">
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
    </>
  );
}
