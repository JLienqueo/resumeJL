// App.tsx - Versión más limpia para CV
import React from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/Header';
import MainContent from './components/MainContent';

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gray-900">
        <Header />
        <MainContent />
      </div>
    </LanguageProvider>
  );
}

export default App;