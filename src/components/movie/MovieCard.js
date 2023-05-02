import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Button from "components/button/Button";
import { tmdbAPI } from "../../config";
import { withErrorBoundary } from "react-error-boundary";
import LoadingSkeleton from "components/loading/LoadingSkeleton";

const MovieCard = ({ info }) => {
   const { original_title, poster_path, release_date, vote_average, id } = info;
   const navigate = useNavigate();
   return (
      <div className="movie-card bg-slate-800 p-3 rounded-lg select-none h-full flex flex-col gap-3">
         <img
            src={tmdbAPI.getImageOriginal(poster_path)}
            alt=""
            className="w-full h-[250px] object-cover mb-5 rounded-lg"
         />
         <div className="flex flex-col gap-4 text-white h-full">
            <h3 className="text-xl font-bold">{original_title}</h3>
            <div className="flex items-center justify-between text-sm">
               <span className="opacity-40">
                  {new Date(release_date).getFullYear()}
               </span>
               <span className="opacity-40">{vote_average}</span>
            </div>
            <Button onClick={() => navigate(`/movie/${id}`)} btnType="primary">
               Watch now
            </Button>
            {/* <button
               onClick={() => navigate(`/movie/${id}`)}
               className="bg-primary text-white text-xl text-center font-bold capitalize px-6 py-4 rounded-lg mt-auto"
            >
               Watch now
            </button> */}
         </div>
      </div>
   );
};

MovieCard.propTypes = {
   info: PropTypes.shape({
      original_title: PropTypes.string,
      poster_path: PropTypes.string,
      release_date: PropTypes.string,
      vote_average: PropTypes.number,
      id: PropTypes.number,
   }),
};

function FallbackComponent() {
   return (
      <p className="bg-red-50 text-red-500 px-4 py-2 font-medium">
         Some thing went wrong
      </p>
   );
}

export default withErrorBoundary(MovieCard, {
   FallbackComponent,
});

export const MovieSkeleton = () => {
   return (
      <div className="movie-card bg-slate-800 p-3 rounded-lg select-none flex flex-col gap-3 h-[300px]">
         <LoadingSkeleton
            width="100%"
            height="250px"
            radius="6px"
         ></LoadingSkeleton>
         <div className="flex flex-col gap-4 text-white h-full">
            <h3 className="text-xl font-bold">
               <LoadingSkeleton className="w-full h-[20px]"></LoadingSkeleton>
            </h3>
            <div className="flex items-center justify-between text-sm opacity-40">
               <span>
                  <LoadingSkeleton className="w-full h-[10px]"></LoadingSkeleton>
               </span>
               <span>
                  <LoadingSkeleton className="w-full h-[10px]"></LoadingSkeleton>
               </span>
            </div>
            <LoadingSkeleton className="w-full h-[60px] mt-auto rounded-lg"></LoadingSkeleton>
         </div>
      </div>
   );
};
