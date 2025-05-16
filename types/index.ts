export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  faithJourney?: {
    startDate: Date;
    level: 'beginner' | 'intermediate' | 'advanced';
    interests: string[];
  };
  savedVerses?: SavedVerse[];
  searchHistory?: SearchHistoryItem[];
}

export interface SavedVerse {
  id: string;
  reference: string;
  text: string;
  notes?: string;
  dateAdded: Date;
  tags: string[];
}

export interface SearchHistoryItem {
  id: string;
  query: string;
  timestamp: Date;
  isFavorite: boolean;
  category?: string;
}

export interface SpiritualGuidance {
  id: string;
  query: string;
  response: string;
  verses: {
    reference: string;
    text: string;
    interpretation: string;
  }[];
  applications: string[];
  context?: string;
  timestamp: Date;
}

export interface AnalyticsData {
  dailyActiveUsers: number[];
  monthlyActiveUsers: number[];
  topQueries: {
    query: string;
    count: number;
  }[];
  userEngagement: {
    date: string;
    queries: number;
    savedVerses: number;
  }[];
  spiritualTopics: {
    name: string;
    count: number;
  }[];
}