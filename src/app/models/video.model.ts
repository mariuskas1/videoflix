export interface Video {
    id: number;
    created_at: string; 
    title: string;
    genre: string;
    description?: string;
    video_file?: string; 
    thumbnail?: string; 
    new: boolean;

    video_file_120p: string;
    video_file_360p: string;
    video_file_720p: string;
    video_file_1080p: string;
}