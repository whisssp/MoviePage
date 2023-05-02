import React from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "../config";
import MovieCard from "components/movie/MovieCard";

// https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key

const MovieDetailPage = () => {
   const { movieId } = useParams();
   const { data } = useSWR(tmdbAPI.getMovieInfo(movieId), fetcher);

   if (!data) return null;
   const { backdrop_path, poster_path, original_title, genres, overview } =
      data;
   return (
      <div className="px-10 py-5">
         <div className="w-full h-[780px] relative mb-10 -z-10">
            <div className="overlay absolute inset-0 bg-black opacity-50"></div>
            <div
               className="w-full h-full bg-no-repeat bg-center bg-cover rounded-lg"
               style={{
                  backgroundImage: `url(${tmdbAPI.getImageOriginal(
                     backdrop_path
                  )})`,
               }}
            ></div>
         </div>
         <div className="w-full mx-auto -mt-[260px] max-w-[770px] h-[360px]  mb-10">
            <img
               src={tmdbAPI.getImageOriginal(poster_path)}
               alt=""
               className="w-full h-full object-cover rounded-lg"
            />
         </div>
         <h1 className="text-white text-center font-bold text-3xl mb-10">
            {original_title}
         </h1>
         <div className="flex items-center gap-x-8 justify-center mb-10 text-primary">
            {genres.length > 0 &&
               genres.map((genre) => {
                  return (
                     <span
                        className="px-6 py-3 border-2 border-primary  text-center rounded-lg cursor-pointer"
                        key={genre.id}
                     >
                        {genre.name}
                     </span>
                  );
               })}
         </div>
         <p className="w-full max-w-[70%] mx-auto text-center text-white leading-relaxed text-xl mb-10">
            {overview}
         </p>
         <MovieMeta type="credits"></MovieMeta>
         <MovieMeta type="videos"></MovieMeta>
         <MovieMeta type="similar"></MovieMeta>
      </div>
   );
};

function MovieMeta({ type = "videos" }) {
   const { movieId } = useParams();
   const { data } = useSWR(tmdbAPI.getMovieInfo(movieId, type), fetcher);
   if (!data) return null;
   if (type === "credits") {
      const { cast } = data;
      if (!cast || cast.length <= 0) return null;
      return (
         <div className="text-white text-center font-bold mb-10">
            <h1 className="text-3xl mb-8">Cast</h1>
            <div className="grid grid-cols-4 gap-8">
               {data.cast.slice(0, 4).map((cast) => {
                  return (
                     <div
                        className="flex flex-col items-center gap-3"
                        key={cast.id}
                     >
                        <img
                           src={tmdbAPI.getImageOriginal(cast.profile_path)}
                           alt=""
                           className="w-full h-[350px] object-cover rounded-lg"
                        />
                        <h2 className="text-xl">{cast.name}</h2>
                     </div>
                  );
               })}
            </div>
         </div>
      );
   } else {
      const { results } = data;
      if (!results || results.length <= 0) return null;
      if (type === "videos") {
         return (
            <div className="mb-10 text-white font-bold text-3xl">
               <h2 className="text-center mb-10">Trailer</h2>
               <div className="w-full flex flex-col gap-8">
                  {results.length > 0 &&
                     results.slice(0, 3).map((trailer) => {
                        return (
                           <div key={trailer.id} className="w-full">
                              <h3 className="text-2xl mb-5 w-fit bg-secondary px-5 py-2 rounded-md">
                                 {trailer.name}
                              </h3>
                              <div className="trailer-item aspect-video w-full">
                                 <iframe
                                    width="100%"
                                    height="100%"
                                    src={`https://www.youtube.com/embed/${trailer.id}`}
                                    title={trailer.name}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                 ></iframe>
                              </div>
                           </div>
                        );
                     })}
               </div>
            </div>
         );
      } else if (type === "similar") {
         return (
            <div className="py-10">
               <h2 className="text-white text-center font-bold text-3xl mb-10">
                  Similar Movie
               </h2>
               <div className="movie-list">
                  <Swiper
                     grabCursor={true}
                     slidesPerView={"auto"}
                     spaceBetween={40}
                  >
                     {results.length > 0 &&
                        results.map((item) => {
                           return (
                              <SwiperSlide key={item.id}>
                                 <MovieCard info={item}></MovieCard>
                              </SwiperSlide>
                           );
                        })}
                  </Swiper>
               </div>
            </div>
         );
      }
   }
   return null;
}

function MovieCredit() {
   const { movieId } = useParams();
   const { data } = useSWR(tmdbAPI.getMovieInfo(movieId, "credits"), fetcher);
   if (!data || data.cast.length <= 0) return null;
   return (
      <div className="text-white text-center font-bold mb-10">
         <h1 className="text-3xl mb-8">Cast</h1>
         <div className="grid grid-cols-4 gap-8">
            {data.cast.slice(0, 4).map((cast) => {
               return (
                  <div
                     className="flex flex-col items-center gap-3"
                     key={cast.id}
                  >
                     <img
                        src={tmdbAPI.getImageOriginal(cast.profile_path)}
                        alt=""
                        className="w-full h-[350px] object-cover rounded-lg"
                     />
                     <h2 className="text-xl">{cast.name}</h2>
                  </div>
               );
            })}
         </div>
      </div>
   );
}

// https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key
function MovieVideos() {
   const { movieId } = useParams();
   const { data } = useSWR(tmdbAPI.getMovieInfo(movieId, "videos"), fetcher);
   if (!data) return null;
   console.log(data);
   return (
      <div className="mb-10 text-white font-bold text-3xl">
         <h2 className="text-center mb-10">Trailer</h2>
         <div className="w-full flex flex-col gap-8">
            {data.results.length > 0 &&
               data.results.slice(0, 3).map((trailer) => {
                  return (
                     <div key={trailer.id} className="w-full">
                        <h3 className="text-2xl mb-5 w-fit bg-secondary px-5 py-2 rounded-md">
                           {trailer.name}
                        </h3>
                        <div className="trailer-item aspect-video w-full">
                           <iframe
                              width="100%"
                              height="100%"
                              src={`https://www.youtube.com/embed/${trailer.id}`}
                              title={trailer.name}
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              allowFullScreen
                           ></iframe>
                        </div>
                     </div>
                  );
               })}
         </div>
      </div>
   );
}

function SimilarMovie() {
   const { movieId } = useParams();
   const { data } = useSWR(tmdbAPI.getMovieInfo(movieId, "similar"), fetcher);
   if (!data) return null;
   console.log(data);
   return (
      <div className="py-10">
         <h2 className="text-white text-center font-bold text-3xl mb-10">
            Similar Movie
         </h2>
         <div className="movie-list">
            <Swiper grabCursor={true} slidesPerView={"auto"} spaceBetween={40}>
               {data.results.length > 0 &&
                  data.results.map((item) => {
                     return (
                        <SwiperSlide key={item.id}>
                           <MovieCard info={item}></MovieCard>
                        </SwiperSlide>
                     );
                  })}
            </Swiper>
         </div>
      </div>
   );
}

export default MovieDetailPage;
