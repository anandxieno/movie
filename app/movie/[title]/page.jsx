"use client";
import Header from "@/app/components/Header";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Actor from "@/app/components/Actor";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function singleMovie() {
  const perms = useParams();
  let [movie, setMovie] = useState(null);
  let [moviewcasts, setMoviewcasts] = useState(null);
  let [moviewcrews, setMoviewcrews]= useState(null);
  let [movieTrailers, setMovieTrailers] = useState([]);

  const findMovie = async () => {
    let response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${perms.title}&api_key=76c5b0ffbfb320a6cae2128a034b4d9d`
    );
    let MovieData = await response.json();
    setMovie(MovieData.results[0]);
  };
  useEffect(() => {
    findMovie();
  }, []);
  ////// Get Movie Credites /////
  const GetMovieCredits = async () => {
    if (movie) {
      let response = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=76c5b0ffbfb320a6cae2128a034b4d9d`
      );
      let MovieCreditData = await response.json();
      setMoviewcasts(MovieCreditData.cast);
      setMoviewcrews(MovieCreditData.crew);
    }
  };

 

  


  /////// Get Movie Trailer ////
  const MovieTrailers = async () => {
    if (movie) {
          let response = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=76c5b0ffbfb320a6cae2128a034b4d9d`);
          let data = await response.json();
              data = data.results.filter(trailer => trailer.type == "Teaser");
          setMovieTrailers(data || []);
          console.log(movieTrailers);
    }
          
       
  };

  useEffect(() => {
    GetMovieCredits();
    MovieTrailers();
  }, [movie]);



  return (
    <>
      <Header />
      <div className="container pt-10">
        {movie !== null ? (
          <div className="movie-detail grid grid-cols-12 gap-6">
            <div className="col-span-4">
              <Image
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                width={400}
                height={400}
                alt="aga"
              ></Image>
            </div>
            <div className="col-span-8">
              <h1 className="mt-5 mb-3 text-2xl font-bold">{movie.title}</h1>
              <ul className="space-y-2">
                <li>Relese date : {movie.release_date}</li>
                <li>Rating : {movie.vote_average.toFixed()*10}</li>
                <li>Total Vote: {movie.vote_count}</li>
                <li>Original Lang: {movie.original_language}</li>
                <li>Total Budget: {movie.budget}</li>
                <li>Movie Id: {movie.id}</li>
                
              </ul>

              <div className="movie-trailer mt-5 flex flex-wrap gap-3">
                 {
                  movieTrailers.length > 0 ? 
                                <div className="">{
                                  <iframe width="750" height="350" src={`https://www.youtube.com/embed/${movieTrailers[0].key}`}></iframe>
                                }</div>
                            : "No Teaser Found"
                 }
              </div>
            </div>
            <div className="col-span-12">
              <div className="my-2">
                <h2 className="text-xl font-semibold mb-2">About the movie</h2>
                <p>{movie.overview}</p>
              </div>

              <div className="mt-5">
                <div className="my-2">
                  <h2 className="text-xl font-semibold mb-2">Casts:</h2>
                </div>
                {moviewcasts !== null ? (
                  <Swiper
                    slidesPerView={6}
                    spaceBetween={10}
                    navigation={true}
                    modules={[Navigation]}
                  >
                    {moviewcasts.map((cast, castIndex) => (
                      <SwiperSlide key={castIndex}>
                        <Actor ActorData={cast} key={castIndex} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                ) : (
                  "Loading Casts"
                )}
              </div>
              <div className="mt-5">
                <div className="my-2">
                  <h2 className="text-xl font-semibold mb-2">Crews:</h2>
                </div>
                {moviewcrews !== null ? (
                  <Swiper
                    slidesPerView={6}
                    spaceBetween={10}
                    navigation={true}
                    modules={[Navigation]}
                  >
                    {moviewcrews.map((crew, crewsIndex) => (
                      <SwiperSlide key={crewsIndex}>
                        <Actor ActorData={crew} key={crewsIndex} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                ) : (
                  "Loading Casts"
                )}
              </div>
            </div>
          </div>
        ) : (
          "Loading Detail"
        )}
      </div>
    </>
  );
}
