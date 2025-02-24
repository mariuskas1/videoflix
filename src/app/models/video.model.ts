export interface Video {
    id: number;
    created_at: string; 
    title: string;
    genre: string;
    description?: string;
    video_file?: string; 
    thumbnail?: string; 
    new: boolean;

}