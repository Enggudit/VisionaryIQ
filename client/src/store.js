import create from 'zustand';

export const useStore = create((set) => ({
  questionCount: 15, // Default number of questions
  setQuestionCount: (count) => set({ questionCount: count }),
  selectedTopics: [],
  setSelectedTopics: (topics) => set({ selectedTopics: topics }),
}));
