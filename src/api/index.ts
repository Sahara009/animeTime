import axios from "axios";
import { List, ListArray, ScheduleArray } from "../types/schedule.type";

export const axiosUrl = axios.create({
  baseURL: "https://api.anilibria.tv/v3/",
});

// список аниме по рассписанию
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
// информация об аниме тайтле
export const getTitleInfo = async (code: string) => {
  try {
    const response = await axiosUrl.get(
      `title?code=${code}&playlist_type=array`
    );
    return response.data as List;
  } catch (error) {
    console.error("Error fetching title schedule:", error);
  }
};
// получение последних обновлений тайтлов
export const getAnimeUpdates = async (pageNumber: number) => {
  try {
    const response = await axiosUrl.get(
      `title/updates?limit=15&page=${pageNumber}`
    );
    return response.data.list as List[];
  } catch (error) {
    console.error("Error fetching title schedule:", error);
  }
};
export const getRandomTitle = async () => {
  try {
    const response = await axiosUrl.get(`title/random`);
    console.log(response.data);
    return response.data as List | undefined;
  } catch (error) {
    console.error("Error fetching title schedule:", error);
  }
};
export const searchAnime = async (query: string) => {
  try {
    const response = await axiosUrl.get(`title/search?search=${query}`);
    console.log(response.data);
    return response.data.list as ListArray | undefined;
  } catch (error) {
    console.error("Error fetching title schedule:", error);
  }
};

export const searchFilterAnime = async (years: string) => {
  try {
    const response = await axiosUrl.get(`title/search?year=${years}&limit=20`);
    console.log(response.data);
    return response.data.list as List[] | undefined;
  } catch (error) {
    console.error("Error fetching title schedule:", error);
  }
};
