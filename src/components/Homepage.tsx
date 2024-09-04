import React, { useEffect, useState } from "react";
import { getTitleSchedule } from "../api";
import { ScheduleArray } from "../types/schedule.type";
import { AnimeCard } from "./AnimeCard";

interface Props {
  className?: string;
}
const daysOfWeek: string[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const Homepage: React.FC<Props> = () => {
  const [schedule, setSchedule] = useState<ScheduleArray>([]);
  console.log(schedule);
  const [error, setError] = useState<string | null>(null);

  const createSchedule = async () => {
    const data = await getTitleSchedule();
    if (data) {
      setSchedule(data);
    } else {
      setError("Не удалось загрузить расписание");
    }
  };

  useEffect(() => {
    createSchedule();
  }, []);

  return (
    <>
      <div className="home">
        <div className="container">
          <h1 className="title_main">Episode Schedules</h1>
          {error && <p>{error}</p>}
          <ul>
            {daysOfWeek.map((day, index) => (
              <li className="days" key={index}>
                <p className="day">{day}:</p>
                <ul className="posters">
                  {schedule[index]?.list?.map((item) => (
                    <AnimeCard key={item.id} item={item} />
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
