"use client";

import Header from "@/app/components/Header";
import Movie from "@/app/components/Movie";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function Actor() {
  let apiKey = process.env.NEXT_PUBLIC_API_KEY;
  let perms = useParams();

  let [actordetail, setActordetail] = useState(null);
  let [moviesList, setMoviesList] = useState([]);

  const getActorData = async () => {
    let response = await fetch(
      `https://api.themoviedb.org/3/search/person?query=${perms.title}&api_key=${apiKey}`
    );
    let resData = await response.json();
    setActordetail(resData.results[0]);
  };

  useEffect(() => {
    getActorData();
  }, []);

  const getMoviesList = async () => {
    if (actordetail) {
      let response = await fetch(
        `https://api.themoviedb.org/3/person/${actordetail.id}/movie_credits?api_key=${apiKey}`
      );
      let MoviesRes = await response.json();
      setMoviesList(MoviesRes.cast);
    }
  };

  useEffect(() => {
    getMoviesList();
  }, [actordetail]);

  return (
    <>
      <Header />
      <div className="container mt-10">
        {actordetail !== null ? (
          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-4">
              <div className="w-[300px] h-[300px] object-cover">
                <Image
                  src={`https://image.tmdb.org/t/p/w500/${actordetail.profile_path}`}
                  width={400}
                  height={300}
                  alt={actordetail.name}
                  className="object-contain w-full h-full object-top"
                ></Image>
              </div>
            </div>
            <div className="col-span-8">
              <h2 className="text-xl font-semibold">{actordetail.name}</h2>

              <ul className="space-y-3 mt-3">
                {/* <li>Sub Names:<ol className="ml-5 flex gap-x-3 flex-wrap">{
                                actordetail.also_known_as.map((names, namesIndex)=>(
                                        <li key={namesIndex} >{names},</li>
                                ))
                            }</ol></li> */}
                <li>Birthday: {actordetail.birthday}</li>
                <li>Department: {actordetail.known_for_department}</li>
                <li>Birth place: {actordetail.place_of_birth}</li>
                <li>Popularity: {actordetail.popularity}</li>
              </ul>

              <div className="grid grid-cols-3 gap-4"></div>
            </div>

            <div className="col-span-12">
              <div className="mt-5">
                <div className="my-2">
                  <h2 className="text-xl font-semibold mb-2">Movies:</h2>
                </div>
                {moviesList.length > 0 ? (
                  <Swiper
                    slidesPerView={4}
                    spaceBetween={20}
                    navigation={true}
                    modules={[Navigation]}
                  >
                    {moviesList.map((MovieVal, MovieIndex) => (
                      <SwiperSlide>
                        <Movie key={MovieIndex} movieData={MovieVal} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                ) : (
                  "No Movies Found"
                )}
              </div>
            </div>
          </div>
        ) : (
          "Detail Loading"
        )}
      </div>
    </>
  );
}
