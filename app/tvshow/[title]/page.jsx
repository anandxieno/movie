"use client";
import Header from "@/app/components/Header";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function SingleTvSeries() {
  const perms = useParams();
  let apiKey = process.env.NEXT_PUBLIC_API_KEY;
  let [movie, setMovie] = useState(null);
  let [moviewcasts, setMoviewcasts] = useState(null);
  let [moviewcrews, setMoviewcrews] = useState(null);
  let [similarMovies, setSimilarMovies] = useState([]);

  const findMovie = async () => {
    let response = await fetch(
      `https://api.themoviedb.org/3/search/tv?query=${perms.title}&api_key=${apiKey}`
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
        `https://api.themoviedb.org/3/tv/${movie.id}/credits?api_key=${apiKey}`
      );
      let MovieCreditData = await response.json();
      setMoviewcasts(MovieCreditData.cast);
      setMoviewcrews(MovieCreditData.crew);
    }
  };

  ///// Get Similer Movies /////

  const getSimilarMovies = async () => {
    try {
      let response = await fetch(
        `https://api.themoviedb.org/3/tv/${movie.id}/similar?api_key=${apiKey}`
      );
      if (!response.ok) {
        console.error("Throught new error");
      }
      let data = await response.json();
      setSimilarMovies(data.results || []);
      
    } catch (err) {
      console.log(err);
    } finally {
    }
  };

  useEffect(() => {
    GetMovieCredits();
    getSimilarMovies();
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
                alt={movie.name}
                priority={true}
              ></Image>
            </div>
            <div className="col-span-8">
              <h1 className="mt-5 mb-3 text-2xl font-bold">{movie.name}</h1>
              <ul className="space-y-2">
                <li>First Relese date : {movie.first_air_date}</li>
                <li>Rating : {movie.vote_average.toFixed() * 10}</li>
                <li>Total Vote: {movie.vote_count}</li>
                <li>Original Lang: {movie.original_language}</li>
                <li>Series Id: {movie.id}</li>
                <li>Vote average: {movie.vote_average}</li>
              </ul>
            </div>
            <div className="col-span-12">
              <div className="my-2">
                <h2 className="text-xl font-semibold mb-2">About the Series</h2>
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
                        <Link
                          href={`../celebrities/${cast.original_name
                            .split(" ")
                            .join("+")}`}
                        >
                          <div className="py-2 px-1">
                            <figure className="w-[120px] h-[120px] rounded-full mx-auto">
                              <Image
                                src={
                                  cast.profile_path
                                    ? `https://image.tmdb.org/t/p/w500/${cast.profile_path}`
                                    : "/120x120.svg"
                                }
                                width={120}
                                height={120}
                                alt={cast.original_name}
                                className="h-full object-cover object-top rounded-full"
                              ></Image>
                            </figure>

                            <h4 className="text-center">
                              {cast.original_name}
                            </h4>
                            <span className="text-center block text-gray-500">
                              {cast.known_for_department}
                            </span>
                          </div>
                        </Link>
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
                        <Link
                          href={`../celebrities/${crew.original_name
                            .split(" ")
                            .join("+")}`}
                        >
                          <div className="py-2 px-1">
                            <figure className="w-[120px] h-[120px] rounded-full mx-auto">
                              <Image
                                src={
                                  crew.profile_path
                                    ? `https://image.tmdb.org/t/p/w500/${crew.profile_path}`
                                    : "/120x120.svg"
                                }
                                width={120}
                                height={120}
                                alt={crew.original_name}
                                className="h-full object-cover object-top rounded-full"
                              ></Image>
                            </figure>

                            <h4 className="text-center">
                              {crew.original_name}
                            </h4>
                            <span className="text-center block text-gray-500">
                              {crew.known_for_department}
                            </span>
                          </div>
                        </Link>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                ) : (
                  "Loading Casts"
                )}
              </div>

              <div className="mt-5">
                <div className="my-2">
                  <h2 className="text-xl font-semibold mb-2">
                    Similar Tv Series:
                  </h2>
                </div>
                {similarMovies.length > 0 ? (
                  <Swiper
                    slidesPerView={4}
                    spaceBetween={10}
                    navigation={true}
                    modules={[Navigation]}
                  >
                    {similarMovies.map((movieValue, movieId) => (
                      <SwiperSlide key={movieId}>
                        <div className="border border-gray-600 rounded-md p-3">
                          <Image
                            src={`https://image.tmdb.org/t/p/w500/${movieValue.poster_path}`}
                            className="rounded-sm"
                            width={500}
                            height={400}
                            alt=""
                          ></Image>
                          <h2 className="mt-2 mb-1 text-lg font-semibold capitalize">
                            {movieValue.name}
                          </h2>
                          <p>{movieValue.overview.substring(0, 150)}</p>
                          <Link
                            href={`/tvshow/${movieValue.original_name
                                .split(" ")
                                .join("+")}`}
                            className="bg-green-500 text-white px-3 py-1.5 my-2 inline-block text-sm rounded-md"
                          >
                            Read More
                          </Link>
                        </div>
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
