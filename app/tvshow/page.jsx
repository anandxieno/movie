"use client";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Image from "next/image";
import Link from "next/link";
import Tvshow from "../components/Tvshow";

const TvShow = () => {
   
  let apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const [error, setError] = useState(null);
  let [allshow, setAllShow] = useState([]);
  let [page, setPage] = useState(1)
  let [search, setSearch] = useState("");
  let [ListingShow, setListingShow] = useState([])
  let [activeFilter, setactiveFilter] = useState(false);
  const [activeLanguages, setActiveLanguages] = useState(null);
  const [activeGener, setActiveGener] = useState(null);

  const getShowList = async () => {
    let response = await fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&page=${page}`
    );

    let data = await response.json();

    if(page === 1){
      setAllShow(data.results || []);
    }else{
      setAllShow((prevShow) => [...prevShow, ...data.results]);
    }
  };














   /////// Filter data based on Language //////
   const selectedLanguageFilter = async () => {
    if (activeLanguages !== null) {
      try {
      
        let response;
        if (activeGener == null) {
          response = await fetch(
            `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_original_language=${activeLanguages}&page=${page}`
          );
        } else {
          response = await fetch(
            `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_original_language=${activeLanguages}&with_genres=${activeGener}&page=${page}`
          );
        }
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
        const data = await response.json();
        setListingShow(data.results || []);
      } catch (err) {
        setError(err.message);
      } finally {
      
      }
    }
  };

  useEffect(() => {
    selectedLanguageFilter(activeLanguages);
  }, [activeLanguages]);

  ///// Handle Filter by geners ////////
  const filterMovieGeners = async () => {
    
    if (activeGener !== null) {
      try {
       
        let response;
        if (activeLanguages == null) {
          response = await fetch(
            `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=${activeGener}&page=${page}`
          );
          
        } else {
          response = await fetch(
            `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_original_language=${activeLanguages}&with_genres=${activeGener}&page=${page}`
          );
        }
        
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
        let data = await response.json();
        setListingShow(data.results || []);
       
        
      } catch (err) {
        setError(err.message);
      } finally {
      }
    }else{
      
    }
  };

  useEffect(() => {
    filterMovieGeners(activeGener);
    
    
  }, [activeGener]);

















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
        if (nameA < nameB) {return -1;}
        if (nameA > nameB) {return 1;}
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
  const HandleScroll = ()=>{
      if(window.innerHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight  ){
           setPage((prev) => prev + 1);
      }
  }

  useEffect(() => {
    getShowList();

    window.addEventListener('scroll', HandleScroll)
    return ()=> window.removeEventListener('scroll', HandleScroll);
  }, []);

  useEffect(() => {
    getShowList();
}, [page]);

 useEffect(()=>{
  setListingShow(allshow)
 }, [allshow])

  return (
    <>
      <Header />
      <div className="container">
        <div className="grid grid-cols-12 mt-10">
          <div className="col-span-4">
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
              <div className="text-base mb-2">Geners </div>
              <div className="flex flex-col gap-2">
                <label>
                  <input
                    type="radio"
                    name="geners"
                    id="10759"
                    onChange={(e) => setActiveGener(e.target.id)
                    }
                  />
                  Action & Adventure
                </label>
                <label>
                  <input
                    type="radio"
                    name="geners"
                    id="18"
                    onChange={(e) => setActiveGener(e.target.id)}
                  />
                  Drama
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
                ? search.length == "" ? ListingShow.map((showData, showIndex) => (
                    <Tvshow tvshowdata={showData} key={showIndex}/>
                  )) : 
                  ListingShow.filter((listshow) => listshow.original_name.toLowerCase().includes(search) ).map((showData, showIndex) => (
                      <Tvshow tvshowdata={showData} key={showIndex}/>
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
