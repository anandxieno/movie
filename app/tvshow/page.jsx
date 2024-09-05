"use client";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Tvshow from "../components/Tvshow";

const TvShow = () => {
  let apiKey = process.env.NEXT_PUBLIC_API_KEY;

  
  let [allshow, setAllShow] = useState([]);
  let [page, setPage] = useState(1);
  let [search, setSearch] = useState("");
  let [ListingShow, setListingShow] = useState([]);
  const [languageFilter, setLanguageFilter] = useState(false);
  const [selectedLanguageValue, setSelectedLanguageValue] = useState("");
  const [generFilter, setGenerFilter] = useState(false);
  const [selectedGenerValue, setSelectedGenerValue] = useState("");
  const [AllgenersCheckboxs, setAllgenersCheckboxes] =useState([]);
  const [AlllanguageCheckboxs, setAlllanguageCheckboxes] = useState([]);
  useEffect(() => {
    setAlllanguageCheckboxes(Array.from(document.getElementsByName("language")));
    setAllgenersCheckboxes(Array.from(document.getElementsByName("geners")));
  }, []);

  const getShowList = async () => {
    let response = await fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&page=${page}`
    );

    let data = await response.json();

    if (page === 1) {
      setAllShow(data.results || []);
    } else {
      setAllShow((prevShow) => [...prevShow, ...data.results]);
    }
  };
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
          `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_original_language=${selectedLanguageValue}&with_genres=${selectedGenerValue}&page=${page}`
        );
      } else {
        response = await fetch(
          `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_original_language=${selectedLanguageValue}`
        );
      }
      let data = await response.json();
      if (page === 1) {
        setListingShow(data.results || []);
      } else {
        setListingShow((prevShow) => [...ListingShow, ...data.results]);
      }
    } else if (generFilter) {
      let response = await fetch(
        `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=${selectedGenerValue}&page=${page}`
      );
      let data = await response.json();
      // setListingShow(data.results || []);
      if (page === 1) {
        setListingShow(data.results || []);
      } else {
        setListingShow((prevShow) => [...ListingShow, ...data.results]);
      }
    } else {
      setListingShow(allshow);
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
          `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_original_language=${selectedLanguageValue}&with_genres=${selectedGenerValue}&page=${page}`
        );
      } else {
        response = await fetch(
          `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=${selectedGenerValue}&page=${page}`
        );
      }
      let data = await response.json();
      // setListingShow(data.results || []);
      if (page === 1) {
        setListingShow(data.results || []);
      } else {
        setListingShow((prevShow) => [...ListingShow, ...data.results]);
      }
    } else if (languageFilter) {
      let response = await fetch(
        `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_original_language=${selectedLanguageValue}`
      );
      let data = await response.json();
      // setListingShow(data.results || []);
      if (page === 1) {
        setListingShow(data.results || []);
      } else {
        setListingShow((prevShow) => [...ListingShow, ...data.results]);
      }
    } else {
      setListingShow(allshow);
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
  setListingShow(allshow);
 }

///////////////////////////////////////
////////// Filter Ends ///////////////
////////////////////////////////////////



  //////// Handle Sorting ////////
  const HandleSort = (e) => {
    let Getvalue = e.target.value;

    let SortableItem;
    if (Getvalue === "popularity") {
      SortableItem = [...ListingShow].sort(
        (person1, person2) => person2.popularity - person1.popularity
      );
      setListingShow(SortableItem);
    } else if (Getvalue === "name") {
      SortableItem = [...ListingShow].sort((person1, person2) => {
        const nameA = person1.name.toUpperCase();
        const nameB = person2.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      setListingShow(SortableItem);
    }
  };

  /// Handle Search ////
  const HandleSearch = (e) => {
    let Getvalue = e.target.value;
    setSearch(Getvalue);
  };

  ////// Infinite scroll ///////
  const HandleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.scrollHeight
    ) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    getShowList();

    window.addEventListener("scroll", HandleScroll);
    return () => window.removeEventListener("scroll", HandleScroll);
  }, []);

  useEffect(() => {
    getShowList();
  }, [page]);

  useEffect(() => {
    setListingShow(allshow);
  }, [allshow]);




  return (
    <>
      <Header />
      <div className="container">
        <div className="grid grid-cols-12 mt-10">
          <div className="col-span-4">
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
                <div className="text-xl mb-2">Geners </div>
                <div className="flex flex-col gap-2">
                  <label>
                    <input
                      type="checkbox"
                      name="geners"
                      value="10759"
                      // onChange={(e) => setActiveGener(e.target.id)}
                      onChange={(e) => HendleGenerFilter(e)}
                    />
                    Action & Adventure
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="geners"
                      value="18"
                      // onChange={(e) => setActiveGener(e.target.id)}
                      onChange={(e) => HendleGenerFilter(e)}
                    />
                    Drama
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
          <div className="col-span-8 ">
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
            <div className="grid grid-cols-3 gap-2">
              {ListingShow.length > 0
                ? search.length == ""
                  ? ListingShow.map((showData, showIndex) => (
                      <Tvshow tvshowdata={showData} key={showIndex} />
                    ))
                  : ListingShow.filter((listshow) =>
                      listshow.original_name.toLowerCase().includes(search)
                    ).map((showData, showIndex) => (
                      <Tvshow tvshowdata={showData} key={showIndex} />
                    ))
                : ""}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TvShow;
