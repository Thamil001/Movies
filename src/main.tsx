import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Routes, Route } from "react-router";
import MoviePage from "./Pages/MoviePage.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<MoviePage />} />
        <Route path="/movieDetails" element={<MoviePage />} />
      </Routes>
    </BrowserRouter>
  </Provider>,
);
