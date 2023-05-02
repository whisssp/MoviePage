import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard, { MovieSkeleton } from "./MovieCard";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "../../config";
import PropTypes from "prop-types";
// https://api.themoviedb.org/3/movie/550?api_key=d04664ded173f2361905d9d5aee94a5a
const MovieList = ({ type = "now_playing" }) => {
   const { data, isLoading } = useSWR(tmdbAPI.getMovieList(type), fetcher);
   const movies = data?.results || [];
   return (
      <div className="movie-list">
         {isLoading && (
            <Swiper
               grabCursor={"true"}
               spaceBetween={40}
               slidesPerView={"auto"}
            >
               <SwiperSlide>
                  <MovieSkeleton />
               </SwiperSlide>
               <SwiperSlide>
                  <MovieSkeleton />
               </SwiperSlide>
               <SwiperSlide>
                  <MovieSkeleton />
               </SwiperSlide>
               <SwiperSlide>
                  <MovieSkeleton />
               </SwiperSlide>
               <SwiperSlide>
                  <MovieSkeleton />
               </SwiperSlide>
            </Swiper>
         )}

         {!isLoading && (
            <Swiper
               grabCursor={"true"}
               spaceBetween={40}
               slidesPerView={"auto"}
            >
               {movies.length > 0 &&
                  movies.map((item) => {
                     return (
                        <SwiperSlide key={item.id}>
                           <MovieCard info={item}></MovieCard>
                        </SwiperSlide>
                     );
                  })}
            </Swiper>
         )}
      </div>
   );
};

MovieList.propTypes = {
   type: PropTypes.string.isRequired,
};

export default MovieList;
