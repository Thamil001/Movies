
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Routes, Route } from "react-router";
import MoviePage from "./Pages/MoviePage.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { PostHogProvider } from "@posthog/react";


const options = {
  api_host: import.meta.env.VITE_POSTHOG_HOST,
  defaults: '2026-08-30',
  capture_pageview: true,
} as const

createRoot(document.getElementById("root")!).render(
  <PostHogProvider
    apiKey={import.meta.env.VITE_POSTHOG_PROJECT_TOKEN}
    options={options}
  >
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/home" element={<MoviePage />} />
          <Route path="/movieDetails" element={<MoviePage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </PostHogProvider>
);
