import { useSelector } from "react-redux";
import { useState, useEffect, useMemo } from "react";
import type { RootState } from "../store/store";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import api from "../api/api";
import PosterImage from "../assets/Poster.png";

const MoviePage = () => {
  const [searchMovies, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const movieData = useSelector((state: RootState) => state.movie);

  const search = async (title: string) => {
    if (!title.trim()) {
      setError("Please enter a movie title");
      return;
    }

    try {
      const res = await api.get("/", {
        params: { s: title, page: 1 },
      });
      if (res.data.Response === "True") {
        setError("");
        const id = res.data.Search[0].imdbID;
        const searchedMovie = await api.get("/", {
          params: { i: id },
        });
        setMovies(searchedMovie.data);
        window.scrollTo(0, 0);
      } else {
        window.scrollTo(0, 0);
        setError(res.data.Error);
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.Error || err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unexpected error occurred");
      }
      window.scrollTo(0, 0);
      setMovies([]);
    }
  };
  useEffect(() => {
    if (Object.keys(movieData).length !== 0) {
      sessionStorage.setItem("val", JSON.stringify(movieData));
    }
    if (Object.keys(movies).length !== 0) {
      sessionStorage.setItem("val", JSON.stringify(movies));
    }
  }, [movieData, movies, searchMovies]);

  const movie = useMemo(() => {
    if (Object.keys(movies).length !== 0) {
      return movies;
    }

    if (Object.keys(movieData).length !== 0) {
      return movieData;
    }

    const stored = sessionStorage.getItem("val");
    return stored ? JSON.parse(stored) : null;
  }, [movieData, movies]);

  if (!movie) {
    return (
      <main className="min-h-dvh bg-linear-to-r from-blue-500 to-cyan-400 flex items-center justify-center">
        <h1 className="text-white text-xl">Select a movie</h1>
      </main>
    );
  }

  return (
    <main className="min-h-dvh bg-linear-to-r from-blue-500 to-cyan-400">
      <section className="flex flex-col items-center justify-center pt-3 sticky top-2">
        <div className="flex-row items-center flex rounded-4xl px-4 sticky top-4 h-10 md:w-3/12 bg-white opacity-75 hover:outline-green-600 outline-2 hover:opacity-100">
          <input
            autoFocus
            autoComplete="on"
            className="outline-none border-none pr-4 rounded-md md:w-11/12"
            placeholder="Search..."
            value={searchMovies}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && searchMovies !== "" && search(searchMovies)
            }
          />
          <FaSearch
            className="text-gray-1000 cursor-pointer"
            onClick={() => search(searchMovies)}
          />
        </div>
        <div className="py-3">
          {error !== "" && (
            <h1 className="text-red-600 text-xl font-bold">{error}</h1>
          )}
        </div>
      </section>
      <div className="flex justify-center pt-2">
        <section className="flex flex-col md:flex-row items-center justify-around w-full min-h-dvh p-4 gap-6">
          <figure className="flex justify-center w-full md:w-1/2">
            <img
              src={movie.Poster}
              alt={movie.Title}
              className="w-full max-w-md rounded-2xl shadow-lg"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = PosterImage;
              }}
            />
          </figure>

          <section className="w-full md:w-1/2 px-4">
            <article className="flex flex-col gap-3">
              <h2 className="text-2xl font-bold text-white">
                Name: <span className="text-slate-100">{movie.Title}</span>
              </h2>

              <h2 className="text-lg font-medium text-white/90">
                Director:{" "}
                <span className="text-slate-200">{movie.Director}</span>
              </h2>

              <h2 className="text-lg font-medium text-white/90">
                IMDb Rating:
                <span className="text-amber-300 font-semibold">
                  {movie.imdbRating}
                </span>
              </h2>

              <h2 className="text-lg font-medium text-white/90">
                IMDb Votes:{" "}
                <span className="text-slate-200">{movie.imdbVotes}</span>
              </h2>

              <h2 className="text-lg font-medium text-white/90">
                Language:{" "}
                <span className="text-slate-200">{movie.Language}</span>
              </h2>

              <h2 className="text-lg font-medium text-white/90">
                Actors: <span className="text-slate-200">{movie.Actors}</span>
              </h2>

              <h2 className="text-lg font-medium text-white/90">
                Year: <span className="text-slate-200">{movie.Year}</span>
              </h2>

              <h2 className="text-lg font-medium text-white/90">
                Plot:
                <span className="block mt-1 text-slate-200 font-normal leading-relaxed">
                  {movie.Plot}
                </span>
              </h2>

              <h2 className="text-lg font-medium text-white/90">
                Awards: <span className="text-slate-200">{movie.Awards}</span>
              </h2>

              <h2 className="text-lg font-medium text-white/90">
                Writer: <span className="text-slate-200">{movie.Writer}</span>
              </h2>

              <h2 className="text-lg font-medium text-white/90">
                Runtime: <span className="text-slate-200">{movie.Runtime}</span>
              </h2>

              <h2 className="text-lg font-medium text-white/90">
                Released:{" "}
                <span className="text-slate-200">{movie.Released}</span>
              </h2>

              <h2 className="text-lg font-medium text-white/90">
                Rated: <span className="text-slate-200">{movie.Rated}</span>
              </h2>
            </article>
          </section>
        </section>
      </div>
    </main>
  );
};

export default MoviePage;
