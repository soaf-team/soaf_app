import { EmotionKey } from './emotion';

export type MoodRating = 1 | 2 | 3 | 4 | 5;

export type DiaryFormType = {
  id?: string;
  rating: MoodRating | null;
  title: string;
  content: string;
  photos: string[];
  emotions: EmotionKey[];
  reactions: {
    [key: string]: string[];
  };
  date: string;
  isPublic: boolean;
};
