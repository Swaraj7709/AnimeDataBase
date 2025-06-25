import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [animeList, setAnimeList] = useState([]);
  const [filters, setFilters] = useState({ genre: "", year: "", season: "", minRating: "" });

  useEffect(() => {
    fetchAnime();
  }, [filters]);

  const fetchAnime = async () => {
    const response = await axios.get("http://localhost:5000/api/anime", { params: filters });
    setAnimeList(response.data);
  };

  return (
    <div className="App">
      <h1>Anime Dashboard</h1>

      <div>
        <input placeholder="Genre" onChange={(e) => setFilters({ ...filters, genre: e.target.value })} />
        <input placeholder="Year" type="number" onChange={(e) => setFilters({ ...filters, year: e.target.value })} />
        <select onChange={(e) => setFilters({ ...filters, season: e.target.value })}>
          <option value="">All Seasons</option>
          <option value="Winter">Winter</option>
          <option value="Spring">Spring</option>
          <option value="Summer">Summer</option>
          <option value="Fall">Fall</option>
        </select>
        <input placeholder="Min Rating" type="number" step="0.1" onChange={(e) => setFilters({ ...filters, minRating: e.target.value })} />
      </div>

      <ul>
        {animeList.map((anime) => (
          <li key={anime.id}>
            {anime.title} ({anime.year}) - ⭐ {anime.mean}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
