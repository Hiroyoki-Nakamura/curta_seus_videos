import axios, { AxiosError } from "axios";

interface VideoItem {
  snippet: {
    title: string;
    thumbnails: {
      medium: {
        url: string;
      };
    };
  };
}

const videos_services_ENDPOINT = "http://localhost:8080";

export async function fetchVideosFromBFF(
  query: string,
  useMockOnError: boolean = false
): Promise<{ title: string; url: string }[]> {
  try {
    const response = await axios.get(
      `${videos_services_ENDPOINT}/videos?q=${query}`
    );
    return response.data.items.map((item: any) => ({
      title: item.snippet.title,
      url: item.snippet.thumbnails.medium.url,
    }));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 403) {
        console.warn("Cota da API excedida. Usando dados de mock.");
      } else {
        console.warn("Erro ao buscar vídeos do BFF. Usando dados de mock.");
      }
      if (useMockOnError) {
        return loadMockVideos(query);
      } else {
        throw error;
      }
    } else {
      console.error("Erro ao buscar vídeos do BFF:", error);
      if (useMockOnError) {
        return loadMockVideos(query);
      } else {
        throw error;
      }
    }
  }
}

export function loadMockVideos(
  query: string
): { title: string; url: string }[] {
  try {
    const mockData = require("./mock.json");
    const filteredVideos = mockData.items.filter((item: VideoItem) =>
      item.snippet.title.toLowerCase().includes(query.toLowerCase())
    );
    const mockVideos = filteredVideos.map((item: VideoItem) => ({
      title: item.snippet.title,
      url: item.snippet.thumbnails.medium.url,
    }));
    return mockVideos;
  } catch (error) {
    console.error("Erro ao carregar dados de mock:", error);
    return [];
  }
}
