import api from "./api/api.ts";
import Cart from "./components/cart.tsx";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useRef } from "react";
import axios from "axios";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const currentYear: number = new Date().getFullYear();
  const searchInput = useRef<HTMLInputElement>(null);

  const search = async () => {
    if (!searchInput.current?.value.trim()) {
      setError("Please enter a movie searchInput.current.value");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await api.get("/", {
        params: { s: searchInput.current?.value, page: 1 },
      });

      if (res.data.Response === "True") {
        console.log(movies.length);

        setMovies(res.data.Search);
      } else {
        setMovies([]);
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
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadInitialMovies = async () => {
      setLoading(true);

      try {
        const res = await api.get("/", {
          params: {
            s: "movie",
            y: currentYear - 1,
            type: "movie",
          },
        });

        if (res.data.Response === "True") {
          setMovies(res.data.Search);
        } else {
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
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    loadInitialMovies();
  }, [currentYear]);

  return (
    <div className="flex max-sm:flex-col flex-wrap items-center gap-8">
      <div className=" w-screen sticky top-2 h-16 flex items-center px-6">
        <h1 className="text-[#e50914] font-light opacity-1 text-4xl">Movies</h1>
        <div
          className="
            absolute left-1/2 -translate-x-1/2  items-center
            rounded-4xl px-4 h-10
            flex
            bg-white opacity-75 hover:opacity-100
            outline-2 hover:outline-green-600
            sm:w-4/12 md:w-3/12 lg:w-2/12
          "
        >
          <input
            autoFocus
            autoComplete="on"
            className="outline-none border-none pr-4 rounded-md w-11/12"
            placeholder="Search..."
            ref={searchInput}
            onKeyDown={(e) => e.key === "Enter" && search()}
          />
          <FaSearch className="cursor-pointer" onClick={() => search()} />
        </div>
      </div>

      <div className="flex flex-row w-screen flex-wrap px-4 justify-center gap-8 ">
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="w-12 h-12 border-4 border-[#e50914] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : movies.length > 0 ? (
          movies.map((movie, index) => <Cart key={index} movie={movie} />)
        ) : (
          error && <h1 className="text-red-600 text-3xl">{error}</h1>
        )}
      </div>
    </div>
  );
};

export default App;
