export interface FlashcardWord {
  id: number;
  unit: number | string;
  en: string;
  uz: string;
  tr?: string;
}

export type GameId = 
  | 'navigate-c1'
  | 'navigate-b2'
  | 'vocab-7-8'
  | 'listening-map'
  | 'synonyms-100'
  | 'gerund-infinitive-card'
  | 'gerund-infinitive-typing';

export interface GameConfig {
  id: GameId;
  title: string;
  shortTitle: string;
  description: string;
  storageKey: string;
  unitLabelPrefix: string; // e.g. "Unit", "Topic", "Qism"
  unitChipFormat?: (unit: number | string) => string;
  unitNames?: Record<string | number, string>;
  directionLabelEN_UZ?: string; // Default: "EN → UZ", for Game 5: "B1 → C1"
  directionLabelUZ_EN?: string; // Default: "UZ → EN", for Game 5: "C1 → B1"
  questionLabel?: string; // Default: "English", for Game 5: "Oddiy so'z (B1)"
  answerLabel?: string;   // Default: "O'zbekcha", for Game 5: "Akademik sinonimlar (C1)"
  showTrOnCardBack?: boolean;
  trLabel?: string;
  typingPlaceholder?: string;
  initialData: FlashcardWord[];
}

export interface SentenceItem {
  id: number;
  p: 'G' | 'I'; // G = Gerund, I = To infinitive
  s: string;   // Full sentence with [[target]]
  b: string;   // Base verb
  u: string;   // Uzbek translation
}

export type StudyMode = 'fill' | 'sentence' | 'copy';
