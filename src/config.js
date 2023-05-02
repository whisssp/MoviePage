export const fetcher = (...args) => fetch(...args).then((res) => res.json());
export const apiKey = "d04664ded173f2361905d9d5aee94a5a";
const tmdbEndpoint = "https://api.themoviedb.org/3/movie";
const tmdbImgEndpoint = "https://image.tmdb.org/t/p/";
const tmdbSearchEndpoint = "https://api.themoviedb.org/3/search/movie";
export const tmdbAPI = {
   getMovieList: (type, page = 1) =>
      `${tmdbEndpoint}/${type}?api_key=${apiKey}&page=${page}`,
   getMovieInfo: (movieId, type = "") =>
      `${tmdbEndpoint}/${movieId}${type ? `/${type}` : ``}?api_key=${apiKey}`,
   getImageOriginal: (path) => `${tmdbImgEndpoint}/original/${path}`,
   getGenres: () =>
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`,
   getMovieSearch: (query, page) =>
      `${tmdbSearchEndpoint}?api_key=${apiKey}&query=${query}&page=${page}`,
};

// https://api.themoviedb.org/3/genre/movie/list?api_key=d04664ded173f2361905d9d5aee94a5a
// https://image.tmdb.org/t/p/original/${backdrop_path})
