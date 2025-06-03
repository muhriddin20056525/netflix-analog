"use client";

import { MovieProps } from "@/types";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode, Pagination } from "swiper/modules";
import { useState } from "react";
import DetailModal from "./DetailModal";

type MovieSectionProps = {
  title: string;
  data: MovieProps[];
};

function MovieSection({ title, data }: MovieSectionProps) {
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);
  const [movie, setMovie] = useState<MovieProps | null>(null);

  return (
    <div className="mb-10 px-4">
      <h3 className="text-2xl text-white font-semibold mb-4">{title}</h3>
      <Swiper
        slidesPerView={5}
        spaceBetween={20}
        freeMode={true}
        pagination={{ clickable: true }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        {data.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div className="relative group cursor-pointer transition-transform hover:scale-105">
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "/no-image.png"
                }
                alt={movie.title || movie.name}
                className="rounded-lg shadow-md w-full h-[250px] object-cover"
              />
              <div className="mt-2 text-white text-sm">
                <h4 className="font-medium line-clamp-1">
                  {movie.title || movie.name}
                </h4>
                <p className="text-gray-400 text-xs">
                  ⭐ {movie.vote_average?.toFixed(1)} •{" "}
                  {(movie.release_date || movie.first_air_date || "").slice(
                    0,
                    4
                  )}
                </p>
              </div>

              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-sm rounded-lg">
                <span
                  onClick={() => {
                    setMovie(movie);
                    setShowDetailModal(true);
                  }}
                  className="mb-3"
                >
                  View Details
                </span>
                <button className="bg-blue-800 text-white py-1 px-3">
                  Add To Favorites
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {showDetailModal && (
        <DetailModal movie={movie} setShowDetailModal={setShowDetailModal} />
      )}
    </div>
  );
}

export default MovieSection;
