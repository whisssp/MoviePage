import React, { Fragment, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "../config";
import MovieCard from "components/movie/MovieCard";
import useDebounce from "hooks/useDebounce";
import useSWRInfinite from "swr/infinite";
import Button from "components/button/Button";

const itemsPerPage = 20;
const MoviePageV2 = () => {
   const [pageCount, setPageCount] = useState(0);
   const [nextPage, setNextPage] = useState(1);
   const [filter, setFilter] = useState("");
   const [url, setUrl] = useState(tmdbAPI.getMovieList("popular", nextPage));
   const handleChange = (e) => {
      setFilter(e.target.value);
   };
   const filterChange = useDebounce(filter, 1000);

   const { data, isLoading, setSize, size } = useSWRInfinite(
      (index) => url.replace("page=1", `page=${index + 1}`),
      fetcher
   );
   const movies = data ? data.reduce((a, b) => a.concat(b.results), []) : [];
   const isEmpty = data?.[0]?.length === 0;
   const isReachingEnd =
      isEmpty || (data && data[data.length - 1]?.results.length < itemsPerPage);
   console.log(data);
   console.log(isEmpty, isReachingEnd);

   useEffect(() => {
      if (filterChange) setUrl(tmdbAPI.getMovieSearch(filterChange, nextPage));
      else setUrl(tmdbAPI.getMovieList("popular", nextPage));
   }, [filterChange, nextPage]);
   // const movies = data?.results || [];
   // const { page, total_pages } = data;

   const [itemOffset, setItemOffset] = useState(0);
   useEffect(() => {
      if (!data || !data.total_pages) return;
   }, [data, itemOffset]);

   // Invoke when user click to request another page.
   const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % data.total_pages;
      setItemOffset(newOffset);
      setNextPage(event.selected + 1);
   };
   return (
      <Fragment>
         <div className="page-container py-10">
            <div className="mb-5  flex flex-1">
               <input
                  type="text"
                  className="outline-none bg-slate-800 text-white roundedL-md px-6 py-4 w-full"
                  placeholder="Type Movies's Name"
                  onChange={handleChange}
               />
               <button className="bg-primary text-white font-bold text-center rounded-r-md px-6  py-4">
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24"
                     strokeWidth="1.5"
                     stroke="currentColor"
                     className="w-6 h-6"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                     />
                  </svg>
               </button>
            </div>
            {isLoading && (
               <div className="w-10 h-10 border-4 border-primary border-t-4 border-t-transparent rounded-full animate-spin mx-auto my-[100px]"></div>
            )}
            <div className="w full grid grid-cols-4 gap-5">
               {movies.length > 0 &&
                  movies.map((item) => {
                     return <MovieCard info={item} key={item.id}></MovieCard>;
                  })}
            </div>
         </div>
         <div className="text-white text-center">
            <Button
               onClick={() => (isReachingEnd ? {} : setSize(size + 1))}
               className={`${isReachingEnd ? "bg-slate-300" : ""}`}
               disable={isReachingEnd}
            >
               Load More
            </Button>
         </div>
      </Fragment>
   );
};

export default MoviePageV2;
