import React from "react";
import { List } from "../types/schedule.type";
import { Link } from "react-router-dom";

interface Props {
  className?: string;
  item?: List;
}

export const AnimeCard: React.FC<Props> = ({ item }) => {
  return (
    <div key={item?.id} style={{ width: 265 }}>
      <Link to={`/serials/${item?.code}`}>
        <img
          className="posters-item"
          src={`https://static-libria.weekstorm.one${item?.posters.original.url}`}
          alt="картинка"
        />
        <p className="anime_name">{item?.names.en}</p>
      </Link>
    </div>
  );
};
