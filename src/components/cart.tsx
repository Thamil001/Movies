import { useState } from "react";
import axios from "axios";
import api from "../api/api";
import { addMovie } from "../MovieSlice/MovieSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import PosterImage from "../assets/Poster.png";

type Movie = {
  Title: string;
  Year: string;
  Poster: string;
  imdbID: string;
  Type: string;
};

type CartProps = {
  movie: Movie;
};

const Cart = ({ movie }: CartProps) => {
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleClick = async (id: string) => {
    try {
      const res = await api.get("/", {
        params: { i: id },
      });
      dispatch(addMovie(res.data));
      navigate("/movieDetails");
      window.scrollTo(0, 0);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.Error || err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unexpected error occurred");
      }
    }
  };
  console.log(error);

  return (
    <>
      <div
        className="flex-col selection:bg-blue-900 bg-linear-to-r from-blue-500 to-cyan-400 rounded-sm outline outline-amber-50  sm:w-4/12 md:w-2/6 lg:w-80 overflow-hidden cursor-pointer"
        onClick={() => handleClick(movie.imdbID)}
      >
        <div>
          <img
            src={movie.Poster}
            alt={movie.Title}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = PosterImage;
            }}
            className="w-100 h-100 object-cover"
          />
        </div>

        <div className="flex-col flex justify-around items-center  ">
          <p className="text-1xl font-bold text-white">{movie.Year}</p>
          <h2 className="text-xl text-white font-[16px] font-mono text-center">
            {movie.Title}
          </h2>
        </div>
      </div>
    </>
  );
};

export default Cart;
