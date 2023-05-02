import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "../../config";
import Button from "components/button/Button";
import { useNavigate } from "react-router-dom";

// https://api.themoviedb.org/3/genre/movie/list?api_key=d04664ded173f2361905d9d5aee94a5a

const Banner = () => {
   const { data } = useSWR(tmdbAPI.getMovieList("upcoming"), fetcher);

   const { data: dataGenres } = useSWR(tmdbAPI.getGenres(), fetcher);
   const genres = dataGenres?.genres || [];
   console.log(genres);

   const banners = data?.results || [];
   console.log(banners);
   return (
      <section className="banner h-[800px] page-container mb-20">
         <Swiper>
            {banners.length > 0 &&
               banners.map((item) => {
                  return (
                     <SwiperSlide key={item.id}>
                        <BannerItem
                           item={item}
                           dataGenres={genres}
                        ></BannerItem>
                     </SwiperSlide>
                  );
               })}
         </Swiper>
      </section>
   );
};

const BannerItem = ({ item, dataGenres }) => {
   const { original_title, backdrop_path, id } = item;
   const genreItems = dataGenres.filter((genre) =>
      item?.genre_ids.includes(genre.id)
   );
   const navigate = useNavigate();
   console.log(genreItems);
   return (
      <div className="w-full h-full rounded-lg bg-white relative">
         <div className="overlay absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.1)] to-[rgba(0,0,0,0.6)]"></div>
         <img
            src={tmdbAPI.getImageOriginal(backdrop_path)}
            alt=""
            className="w-full h-full object-cover rounded-lg"
         />
         <div className="absolute bottom-8 left-14 w-full text-white">
            <h2 className="font-bold text-3xl mb-5">{original_title}</h2>
            <div className="flex items-center gap-x-5 mb-8">
               {genreItems.length > 0 &&
                  genreItems.map((genre) => (
                     <GenreItem key={genre.id} text={genre.name}></GenreItem>
                  ))}
            </div>
            <Button onClick={() => navigate(`/movie/${id}`)} btnType="primary">
               Watch now
            </Button>
         </div>
      </div>
   );
};

const GenreItem = ({ text }) => {
   return (
      <span className="px-6 py-2 border border-white rounded-md">{text}</span>
   );
};

export default Banner;
