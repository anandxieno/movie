"use client";
import { useEffect, useState } from "react";

import Movie from "../components/Movie";
import Header from "../components/Header";

export default function Movies() {
  let apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const [sorting, setSorting] = useState(null);
  const [sortable, setSortableItem] = useState([])
  const [movies, setMovies] = useState("");
  const [ListingMovies, setListingMovies] = useState([])
  const [movieSearch, setMovieSearch] = useState("");
  const [page, setPage] = useState(1);

  // let [ListingShow, setListingMovies] = useState([]);
  const [languageFilter, setLanguageFilter] = useState(false);
  const [selectedLanguageValue, setSelectedLanguageValue] = useState("");
  const [generFilter, setGenerFilter] = useState(false);
  const [selectedGenerValue, setSelectedGenerValue] = useState("");
  const AlllanguageCheckboxs = Array.from(document.getElementsByName("language"));
  const AllgenersCheckboxs = Array.from(document.getElementsByName("geners"));

  const fetchData = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${page}`
      );
      const data = await response.json();
      setMovies([...movies, ...data.results]);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const searchMovie = (e) => {
    setMovieSearch(e.target.value);
  };

  const filteredMovies =
    movieSearch !== ""
      ? ListingMovies.filter((movie) =>
        movie.title.toLowerCase().includes(movieSearch.toLowerCase())
      )
      : ListingMovies;


  /////////////////////////////////////////////
  /////// Filter data based on Language //////
  /////////////////////////////////////////////

  const HandleLanguagges = (e) => {
    let currentItem = e.target;
    
    AlllanguageCheckboxs.forEach((cuuBox) => {
      if (cuuBox !== currentItem) {
        return (cuuBox.checked = false);
      }
    });

    if (!e.currentTarget.checked) {
      currentItem.checked = false;
      setSelectedLanguageValue("");
    } else {
      currentItem.checked = true;
      setSelectedLanguageValue(currentItem.value);
    }
    setLanguageFilter(currentItem.checked);
  };

  const FilterSelectedLanguage = async () => {
    if (languageFilter) {
     
      let response;
      if (generFilter) {
        response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_original_language=${selectedLanguageValue}&with_genres=${selectedGenerValue}&page=${page}`
        );
      } else {
        response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_original_language=${selectedLanguageValue}&page=${page}`
        );
      }
      let data = await response.json();
      setListingMovies(data.results || []);
   
    } else if (generFilter) {
      let response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${selectedGenerValue}&page=${page}`
      );
      let data = await response.json();
      setListingMovies(data.results || []);
    } else {
      setListingMovies(movies);
    }
  };
  useEffect(() => {
    FilterSelectedLanguage();
  }, [selectedLanguageValue]);

  ////// Filter Data based on Geners /////////

  const HendleGenerFilter = async (e) => {
    let currentItem = e.target;
    
    AllgenersCheckboxs.forEach((cuuBox) => {
      if (cuuBox !== currentItem) {
        return (cuuBox.checked = false);
      }
    });

    if (!e.currentTarget.checked) {
      currentItem.checked = false;
      setSelectedGenerValue("");
    } else {
      currentItem.checked = true;
      setSelectedGenerValue(currentItem.value);
    }
    // currentItem.checked = !currentItem.checked;
    setGenerFilter(currentItem.checked);
  };

  const FilterSelectedGeners = async () => {
    if (generFilter) {
      let response;
      if (languageFilter) {
        response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_original_language=${selectedLanguageValue}&with_genres=${selectedGenerValue}&page=${page}`
        );
      } else {
        response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${selectedGenerValue}&page=${page}`
        );
      }
      let data = await response.json();
      setListingMovies(data.results || []);
    } else if (languageFilter) {
      let response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_original_language=${selectedLanguageValue}`
      );
      let data = await response.json();
      setListingMovies(data.results || []);
    } else {
      setListingMovies(movies);
    }
  };

  useEffect(() => {
    FilterSelectedGeners();
  }, [selectedGenerValue]);



 ////// Reset Filter ///
 function resetAllFilter(){
  setLanguageFilter(false);
  setGenerFilter(false);
  AlllanguageCheckboxs.forEach((cuuBox) => {return (cuuBox.checked = false)});
  AllgenersCheckboxs.forEach((cuuBox) => {return (cuuBox.checked = false);});
  setListingMovies(movies);
 }

///////////////////////////////////////
////////// Filter Ends ///////////////
////////////////////////////////////////






























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
    FilterSelectedLanguage();
    FilterSelectedGeners();
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
          setSortableItem(ListingMovies.sort((movie1, movie2) => {
            let movieA = movie1.title.toLowerCase();
            let movieB = movie2.title.toLowerCase();
            if (movieA < movieB) { return -1; }
            else if (movieA > movieB) { return 1; }
            else { return 0; }
          }));
          break;
        case "popularity":
          setSortableItem(ListingMovies.sort((movie1, movie2) => {
            if (movie1.popularity < movie2.popularity) { return -1; }
            else if (movie1.popularity > movie2.popularity) { return 1; }
            else { return 0; }
          }));
          break;

        case "release-date":
          setSortableItem(ListingMovies.sort((movie1, movie2) => {
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

  // useEffect(() => {
  //   setListingMovies(filteredMovies);
  // }, [searchMovie]);

  useEffect(() => {
    setListingMovies(movies);
  }, [movies]);

  


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
                  type="checkbox"
                  name="language"
                  id=""
                  value="en"
                  // onChange={(e) => setActiveLanguages(e.target.value)}
                   onChange={(e) => HandleLanguagges(e)}
                />
                English
              </label>
              <label>
                <input
                  type="checkbox"
                  name="language"
                  id=""
                  value="hi"
                  // onChange={(e) => setActiveLanguages(e.target.value)}
                   onChange={(e) => HandleLanguagges(e)}
                />
                Hindi
              </label>
              <label>
                <input
                  type="checkbox"
                  name="language"
                  id=""
                  value="fi"
                  // onChange={(e) => setActiveLanguages(e.target.value)}
                   onChange={(e) => HandleLanguagges(e)}
                />
                French
              </label>
            </div>

            <div className="geners mt-5">
              <div className="text-xl mb-2">Geners</div>
              <div className="flex flex-col gap-2">
                <label>
                  <input
                    type="checkbox"
                    name="geners"
                    value="28"
                    // onChange={(e) => setActiveGener(e.target.id)}
                    onChange={(e) => HendleGenerFilter(e)}
                  />
                  Action
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="geners"
                    value="12"
                    // onChange={(e) => setActiveGener(e.target.id)}
                    onChange={(e) => HendleGenerFilter(e)}
                  />
                  Adventure
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="geners"
                    value="16"
                    // onChange={(e) => setActiveGener(e.target.id)}
                    onChange={(e) => HendleGenerFilter(e)}
                  />
                  Animation
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="geners"
                    value="35"
                    // onChange={(e) => setActiveGener(e.target.id)}
                    onChange={(e) => HendleGenerFilter(e)}
                  />
                  Comedy
                </label>
              </div>
            </div>

            <div className="mt-5">
                 <button className={`bg-red-500 text-white py-2 px-4 text-sm ${(languageFilter || generFilter) ? "" : "hidden" }`} onClick={resetAllFilter} >Reset Filter</button>
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
            {ListingMovies.length > 0 ? 
              searchMovie.length > 0 ? 
              ListingMovies.filter((ListingMovie) => ListingMovie.title.toLowerCase().includes(movieSearch.toLocaleLowerCase())).map((movieValue, movieId) => (
                <Movie key={movieId} movieData={movieValue} />
              )) : ListingMovies.map((movieValue, movieId) => (
                <Movie key={movieId} movieData={movieValue} />
              ))
             :
              "Loading data"
          }
          </div>

        </div>
      </div>
    </>
  );
}
