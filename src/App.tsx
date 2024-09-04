import { Route, Routes } from "react-router-dom";
import { AnimeInfo, AnimeList, Homepage, Layout } from "./components";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Homepage />} />
        <Route path="/serials/:code" element={<AnimeInfo />} />
        <Route path="/serials/" element={<AnimeList />} />
      </Route>
    </Routes>
  );
}
