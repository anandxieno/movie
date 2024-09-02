"use client";
import Header from "./components/Header";

export default function Home() {
  let apiKey = process.env.NEXT_PUBLIC_API_KEY;
   

  return (
    <>
      <Header />
      <div className="mt-20 container">
         <h1 className="text-5xl">Welcome to Movie App </h1>
         <h2 className="text-lg pl-2 pt-2">Expolre Movies, Tv Shows and stream </h2>
         <p className="pt-40">Its Created by <a href="https://xieno.com/" className="text-blue-500" target="_blank">Xieno</a> Team Using Next js</p>
      </div>
    </>
  );
}
