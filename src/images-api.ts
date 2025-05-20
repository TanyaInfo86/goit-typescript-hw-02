import axios from "axios";
import { FetchImagesResponse, Image } from "./types";

const ACCESS_KEY = 'RM0s4GBS6UGTPN7jBLCiK6xk39We0MPQMSsnywK9wZg';
axios.defaults.baseURL = "https://api.unsplash.com/";

type UnsplashResponse = {
    results: Image[];
    total_pages: number;
};

export const fetchImagesWithTopic = async (
    topic: string,
    page: number
): Promise<FetchImagesResponse> => {
    const response = await axios.get<UnsplashResponse>("/search/photos", {
        params: {
            query: topic,
            per_page: 12,
            page,
            client_id: ACCESS_KEY,
        },
    });

    return {
        images: response.data.results,
        loadMore: response.data.total_pages > page,
    };
};
