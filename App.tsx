import React, { useState } from 'react';
import { GameId, GameConfig, FlashcardWord } from './types';
import { IntroScreen } from './components/IntroScreen';
import { Dashboard } from './components/Dashboard';
import { FlashcardGameEngine } from './engine/FlashcardGameEngine';
import { Game7TypingSentences } from './games/Game7TypingSentences';
import { hasSeenIntro, markIntroSeen } from './utils/storage';

// Import JSON datasets directly
import c1Data from './data/navigate-c1.json';
import b2Data from './data/navigate-b2.json';
import v78Data from './data/vocab-7-8.json';
import mapData from './data/listening-map.json';
import synData from './data/synonyms-100.json';
import giCardData from './data/gerund-infinitive.json';

const gameConfigs: Record<string, GameConfig> = {
  'navigate-c1': {
    id: 'navigate-c1',
    title: "Navigate C1 — So'z boyligi",
    shortTitle: "Navigate C1",
    description: "Oxford Navigate C1 Coursebook 1–12 Unit so'zlari",
    storageKey: "navigateC1FlashcardsData_v2",
    unitLabelPrefix: "Unit",
    unitChipFormat: u => `U${u}`,
    questionLabel: "English",
    answerLabel: "O'zbekcha",
    initialData: c1Data as FlashcardWord[],
  },
  'navigate-b2': {
    id: 'navigate-b2',
    title: "Navigate B2 — So'z boyligi",
    shortTitle: "Navigate B2",
    description: "Oxford Navigate B2 Coursebook 1–12 Unit so'zlari",
    storageKey: "navigateB2FlashcardsData_v1",
    unitLabelPrefix: "Unit",
    unitChipFormat: u => `U${u}`,
    questionLabel: "English",
    answerLabel: "O'zbekcha",
    initialData: b2Data as FlashcardWord[],
  },
  'vocab-7-8': {
    id: 'vocab-7-8',
    title: "7+ 8+ Vocabulary",
    shortTitle: "7+ 8+ Vocab",
    description: "IELTS 7+ va 8+ akademik so'zlar ro'yxati (22 ta mavzu)",
    storageKey: "vocab78TopicsData_v1",
    unitLabelPrefix: "Topic",
    unitChipFormat: u => `T${u}`,
    questionLabel: "English",
    answerLabel: "O'zbekcha",
    initialData: v78Data as FlashcardWord[],
  },
  'listening-map': {
    id: 'listening-map',
    title: "Listening Map Vocabulary",
    shortTitle: "Listening Map",
    description: "Listening xarita (map) topshiriqlari uchun 100 ta lug'at",
    storageKey: "listeningMapVocabData_v1",
    unitLabelPrefix: "Mavzu",
    unitChipFormat: u => `T${u}`,
    unitNames: {
      1: "Yo'nalish (Directions)",
      2: "Joylashuv (Location)",
      3: "Joyning o'rni (Positioning)",
      4: "Yo'llar va transport (Roads & Transport)",
      5: "Binolar va joylar (Buildings & Places)",
      6: "Do'kon va xizmatlar (Shops & Services)",
      7: "Dam olish joylari (Leisure & Outdoor)",
      8: "Transport va infratuzilma (Transport & Infrastructure)",
      9: "Tabiiy joylar (Natural Features)",
      10: "Foydali iboralar (Useful Phrases)"
    },
    questionLabel: "English",
    answerLabel: "O'zbekcha",
    initialData: mapData as FlashcardWord[],
  },
  'synonyms-100': {
    id: 'synonyms-100',
    title: "100 ta \"oltin\" sinonim",
    shortTitle: "100 ta sinonim",
    description: "B1 so'zlarning C1 akademik sinonimlari",
    storageKey: "synonyms100Data_v1",
    unitLabelPrefix: "Qism",
    unitChipFormat: u => `Q${u}`,
    unitNames: {
      1: "Eng ko'p chalg'ituvchi fe'llar (Action Verbs)",
      2: "Kuchaytirilgan sifatlar (Adjectives)",
      3: "Muammo va yechimlar (Academic Nouns)",
      4: "Bog'lovchilar va ravishlar (Linking words & Adverbs)"
    },
    directionLabelEN_UZ: "B1 → C1",
    directionLabelUZ_EN: "C1 → B1",
    questionLabel: "Oddiy so'z (B1)",
    answerLabel: "Akademik sinonimlar (C1)",
    showTrOnCardBack: true,
    trLabel: "O'zbekcha ma'nosi",
    initialData: synData as FlashcardWord[],
  },
  'gerund-infinitive-card': {
    id: 'gerund-infinitive-card',
    title: "Gerund & To-infinitive (Kartochka)",
    shortTitle: "Gerund / To-inf (card)",
    description: "Gerund (-ing) va To-infinitive fe'llari",
    storageKey: "gerundInfinitiveData_v1",
    unitLabelPrefix: "Qism",
    unitChipFormat: u => (String(u) === '1' ? 'Gerund (-ing)' : 'To infinitive'),
    questionLabel: "Fe'l",
    answerLabel: "O'zbekcha",
    showTrOnCardBack: true,
    trLabel: "Misol gap",
    initialData: giCardData as FlashcardWord[],
  }
};

export const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState(() => !hasSeenIntro());
  const [currentScreen, setCurrentScreen] = useState<GameId | 'dashboard'>('dashboard');

  const handleStartIntro = () => {
    markIntroSeen();
    setShowIntro(false);
  };

  return (
    <div className="min-h-screen bg-paper text-ink font-serif selection:bg-gold selection:text-ink">
      {/* Intro Overlay if first visit or manually opened */}
      {showIntro && <IntroScreen onStart={handleStartIntro} />}

      {/* Main View Router */}
      <main className="min-h-screen">
        {currentScreen === 'dashboard' && (
          <Dashboard
            onSelectGame={gameId => setCurrentScreen(gameId)}
            onOpenIntro={() => setShowIntro(true)}
          />
        )}

        {currentScreen !== 'dashboard' && currentScreen !== 'gerund-infinitive-typing' && (
          <FlashcardGameEngine
            key={currentScreen}
            config={gameConfigs[currentScreen]}
            onBackToDashboard={() => setCurrentScreen('dashboard')}
          />
        )}

        {currentScreen === 'gerund-infinitive-typing' && (
          <Game7TypingSentences
            onBackToDashboard={() => setCurrentScreen('dashboard')}
          />
        )}
      </main>
    </div>
  );
};
