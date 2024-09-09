import React, { useEffect, useState } from "react";
import { ListArray } from "../types/schedule.type";

import { searchAnime } from "../api";

interface Props {
  className?: string;
}

export const Input: React.FC<Props> = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [animeList, setAnimeList] = useState<ListArray | undefined>([]);

  useEffect(() => {
    const fetchAnime = async () => {
      if (searchTerm) {
        const data = await searchAnime(searchTerm);
        setAnimeList(data);
      } else {
        setAnimeList([]);
      }
    };

    fetchAnime();
  }, [searchTerm]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value) {
      setSearchTerm(value);
    } else {
      setSearchTerm("");
    }
  };

  return (
    <div className="input_wrapper" style={{ position: "relative" }}>
      <input
        type="text"
        className="input-anime"
        placeholder="Найти аниме"
        value={searchTerm}
        onChange={handleInputChange}
      />

      <div
        className="popover"
        style={{ position: "absolute", top: "100%", left: 0, zIndex: 1 }}
      >
        {/* показать кнопку еще но толкьо если их больше 3 */}
        <ul className="search_items">
          {animeList?.slice(0, 3).map((anime) => (
            <div className="search_item" key={anime.id}>
              <img
                src={`https://static-libria.weekstorm.one${anime?.posters.original.url}`}
                alt=""
              />
              <div className="search_item-info">
                <h4>{anime.names.ru}</h4>
                <div className="search_genres">
                  {anime.genres.map((genr, index) => (
                    <li key={index}>{genr}</li>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};
