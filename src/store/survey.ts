import { create } from "zustand";

interface SurveyState {
  surveys: Array<Survey>;
  isLoading: boolean;
  fetchSurveys: (userId: string) => Array<Survey>;
}

interface Survey {
  id: string;
  title: string;
  description: string;
  limeSurveyUrl: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const useSurveyStore = create<SurveyState>((set) => ({
  surveys: [],
  isLoading: false,
  fetchSurveys: (userId: string) => {
    // Implement fetch surveys logic here
    set({ isLoading: true });
    console.log(userId);
    set({ isLoading: false });
    return [];
  },
}));
