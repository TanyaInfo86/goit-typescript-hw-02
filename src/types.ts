export type Image = {
    id: string;
    alt_description?: string;
    urls: {
        small: string;
        regular: string;
        full: string;
    };
    user: {
        name: string;
    };
    likes: number;
    description?: string;
};

export interface FetchImagesResponse {
    images: Image[];
    loadMore: boolean;
}
