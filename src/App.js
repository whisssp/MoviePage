import { Fragment, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import "swiper/scss";
import Main from "./components/layouts/Main";
import Banner from "./components/banner/Banner";
// import HomePage from "./pages/HomePage";
// import MoviePage from "./pages/MoviePage";
// import MovieDetailPage from "./pages/MovieDetailPage";

const HomePage = lazy(() => import("./pages/HomePage"));
const MoviePageV2 = lazy(() => import("./pages/MoviePageV2"));
const MovieDetailPage = lazy(() => import("./pages/MovieDetailPage"));

// API key: d04664ded173f2361905d9d5aee94a5a
// https://api.themoviedb.org/3/movie/550?api_key=d04664ded173f2361905d9d5aee94a5a
function App() {
   return (
      <Fragment>
         <Suspense fallback={<></>}>
            <Routes>
               <Route element={<Main />}>
                  <Route
                     path="/"
                     element={
                        <>
                           <Banner />
                           <HomePage />
                        </>
                     }
                  ></Route>
                  <Route path="/movies" element={<MoviePageV2 />}></Route>
                  <Route
                     path="/movie/:movieId"
                     element={<MovieDetailPage />}
                  ></Route>
               </Route>
               <Route
                  path="/*"
                  element={
                     <>
                        <span className="text-white font-bold text-xl p-10 block">
                           Oops! Page Not Found
                        </span>
                     </>
                  }
               ></Route>
            </Routes>
         </Suspense>
      </Fragment>
   );
}

export default App;
