import React, { useEffect, useState } from "react";
import { getAnimeUpdates } from "../api";
import { List } from "../types/schedule.type";
import InfiniteScroll from "react-infinite-scroll-component";

interface Props {
  className?: string;
}

export const AnimeList: React.FC<Props> = () => {
  const [list, setList] = useState<List[]>([]);
  const [error, setError] = useState<string | null>(null); // eslint-disable-line @typescript-eslint/no-unused-vars
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const createList = async (pageNumber: number) => {
    const data = await getAnimeUpdates(pageNumber);
    if (data) {
      setList((prevList) => [...prevList, ...data]);
      if (data.length === 0) {
        setHasMore(false);
      }
    } else {
      setError("Не удалось загрузить расписание");
    }
  };

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1); // Увеличиваем номер страницы
  };

  useEffect(() => {
    createList(page); // Загружаем данные при изменении страницы
  }, [page]);

  useEffect(() => {
    createList(page); // Загружаем данные при изменении страницы
  }, [page]);

  console.log(list);

  if (list.length == 0) {
    return <h1>soon</h1>;
  }
  return (
    <div>
      <nav>
        <InfiniteScroll
          dataLength={list.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
        >
          {list.map((anime, index) => (
            <li className="list_item" key={index}>
              {anime.names.en}
            </li>
          ))}
        </InfiniteScroll>
      </nav>
    </div>
  );
};
