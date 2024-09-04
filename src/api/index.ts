import axios from "axios";
import { List, ScheduleArray } from "../types/schedule.type";

export const axiosUrl = axios.create({
  baseURL: "https://api.anilibria.tv/v3/",
});

export const getTitleSchedule = async (): Promise<
  ScheduleArray | undefined
> => {
  try {
    const response = await axiosUrl.get("title/schedule");
    return response.data as ScheduleArray;
  } catch (error) {
    console.error("Error fetching title schedule:", error);
  }
};

export const getTitles = async (code: string) => {
  try {
    const response = await axiosUrl.get(
      `title?code=${code}&playlist_type=array`
    );
    return response.data as List;
  } catch (error) {
    console.error("Error fetching title schedule:", error);
  }
};

export const getAnimeUpdates = async (pageNumber: number) => {
  try {
    const response = await axiosUrl.get(
      `title/updates?limit=20&page=${pageNumber}`
    );
    console.log(response.data);
    return response.data.list as List[];
  } catch (error) {
    console.error("Error fetching title schedule:", error);
  }
};
