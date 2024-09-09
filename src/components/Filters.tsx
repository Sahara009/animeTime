import React, { useEffect, useState } from "react";
import Slider from "@mui/material/Slider";
import { Box } from "@mui/material";
import { searchFilterAnime } from "../api";
import { ListArray } from "../types/schedule.type";

interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = () => {
  const [yearsRange, setYearsRange] = useState<number[]>([2004, 2023]);

  const [filterAnime, setFilterAnime] = useState<ListArray | undefined>([]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setYearsRange(newValue as number[]);
  };

  // Функция для получения всех годов между выбранными значениями
  const getYearsBetween = (start: number, end: number) => {
    const years = [];
    for (let year = start; year <= end; year++) {
      years.push(year);
    }
    return years;
  };

  const yearsBetweenString = getYearsBetween(yearsRange[0], yearsRange[1]).join(
    ","
  );

  const createFilter = async () => {
    const data = await searchFilterAnime(yearsBetweenString);
    console.log(data);
    if (data) {
      setFilterAnime(data);
    } else {
      console.log("ошикба");
    }
  };

  useEffect(() => {
    createFilter();
  }, [yearsBetweenString]);

  return (
    <div className="container">
      <Box className="filters">
        <Slider
          value={yearsRange}
          onChange={handleChange}
          valueLabelDisplay="auto"
          min={2004}
          max={2024}
          className="slider"
        />
        <div className="years">Выбранные годы: {yearsBetweenString}</div>
      </Box>
      <div>
        {filterAnime?.map((anime) => (
          <li key={anime.id}>{anime.names.ru}</li>
        ))}
      </div>
    </div>
  );
};
