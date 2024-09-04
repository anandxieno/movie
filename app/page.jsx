'use client'
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Movie from "@/app/components/Movie";
import Celebritie from "./components/Celebritie";
import Link from "next/link";


// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Tvshow from "./components/Tvshow";




export default function Home() {
  let apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTvshow, setTrendingTvshow] = useState([]);
  const [popularCelebrite, setPopularCelebrite] = useState([]);

  useEffect(() => {
    //// Get Popular Movies ////
    const getPopularMovies = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}&language=en-US`
      );
      let data = await response.json();
      setTrendingMovies(data.results || []);
    };

    ///// Get Popular TvShow //////

    const getPopularTvShow = async ()=>{
      const response = await fetch(`https://api.themoviedb.org/3/trending/tv/day?api_key=${apiKey}&language=en-US`);
       let data = await response.json();
       setTrendingTvshow(data.results || []);
    }

    ///// Get Popular celebritie's //////
    const getPopularCelebritie = async () =>{
      const response = await fetch(
        `https://api.themoviedb.org/3/person/popular?api_key=${apiKey}`
      );
      let data = await response.json();
      setPopularCelebrite(data.results || []);

    }
    getPopularMovies();
    getPopularTvShow();
    getPopularCelebritie();


  }, []);

  return (
    <>
      <Header />
      <div className="mt-20 container">
        <h1 className="text-5xl">Welcome to Movie App </h1>
        <h2 className="text-lg pl-2 pt-2">
          Expolre Movies, Tv Shows and stream{" "}
        </h2>

        <div className="featured-list mt-16">
          <div className="flex py-3 items-center justify-between">
            <h3 className="text-2xl font-semibold">Popular Movies</h3>
            <Link href="/movies" className="bg-green-500 text-white py-2 px-4 rounded-md" >View All</Link>
          </div>
          {
            trendingMovies.length > 0 ? (
            <Swiper
            slidesPerView={4}
            spaceBetween={10}
            navigation={true}
            modules={[Navigation]}
          >
            {trendingMovies.map((movie, movieIndex) => (
              <SwiperSlide key={movieIndex}>
                <Movie movieData={movie} />
              </SwiperSlide>
            ))}
          </Swiper> ) : "Loading Movies"
          }
          
        </div>

        <div className="featured-list mt-20">
          <div className="flex py-3 items-center justify-between">
            <h3 className="text-2xl font-semibold">Popular TvShow</h3>
            <Link href="/tvshow" className="bg-green-500 text-white py-2 px-4 rounded-md" >View All</Link>
          </div>
          {
            trendingTvshow.length > 0 ? (
            <Swiper
            slidesPerView={4}
            spaceBetween={10}
            navigation={true}
            modules={[Navigation]}
          >
            {trendingTvshow.map((show, showIndex) => (
              <SwiperSlide key={showIndex}>
                <Tvshow tvshowdata={show}/>
              </SwiperSlide>
            ))}
          </Swiper> ) : "No TvShows Found"
          }
          
        </div>

        <div className="featured-list mt-20">
          <div className="flex py-3 items-center justify-between">
            <h3 className="text-2xl font-semibold">Popular Celebritie</h3>
            <Link href="/celebrities" className="bg-green-500 text-white py-2 px-4 rounded-md" >View All</Link>
          </div>
          {
            popularCelebrite.length > 0 ? (
            <Swiper
            slidesPerView={6}
            spaceBetween={10}
            navigation={true}
            modules={[Navigation]}
          >
            {popularCelebrite.map((Celebrite, CelebriteIndex) => (
              <SwiperSlide key={CelebriteIndex}>
                <Celebritie CelebritieData={Celebrite} key={CelebriteIndex} />
              </SwiperSlide>
            ))}
          </Swiper> ) : "No TvShows Found"
          }
          
        </div>
      </div>
      <Footer />
    </>
  );
}
