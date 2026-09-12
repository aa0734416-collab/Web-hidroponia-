/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { UserProfile, YouTubeVideo, Survey, DriveResource, HydroponicLog } from './types';
import { 
  INITIAL_VIDEOS, 
  INITIAL_SURVEYS, 
  INITIAL_DRIVES, 
  INITIAL_LOGS, 
  DEMO_USERS 
} from './data/initialData';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { KnowledgeSection } from './components/KnowledgeSection';
import { VideosSection } from './components/VideosSection';
import { SurveysSection } from './components/SurveysSection';
import { DrivesSection } from './components/DrivesSection';
import { MapsSection } from './components/MapsSection';
import { LogsSection } from './components/LogsSection';
import { AiChatbot } from './components/AiChatbot';
import { PlantDiagnosticModal } from './components/PlantDiagnosticModal';
import { GoogleAuthModal } from './components/GoogleAuthModal';
import { Footer } from './components/Footer';
import { Sparkles, Camera } from 'lucide-react';

export default function App() {
  // User Session State (Google Auth)
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('paquisha_user_session');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing user session', e);
      }
    }
    // Default to the first school account so user immediately experiences the personalized features
    return DEMO_USERS[0];
  });

  // Videos State
  const [videos, setVideos] = useState<YouTubeVideo[]>(() => {
    const saved = localStorage.getItem('paquisha_videos');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_VIDEOS;
  });

  // Surveys State
  const [surveys, setSurveys] = useState<Survey[]>(() => {
    const saved = localStorage.getItem('paquisha_surveys');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_SURVEYS;
  });

  // Google Drive Resources State
  const [drives, setDrives] = useState<DriveResource[]>(() => {
    const saved = localStorage.getItem('paquisha_drives');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_DRIVES;
  });

  // Hydroponic Logs State
  const [logs, setLogs] = useState<HydroponicLog[]>(() => {
    const saved = localStorage.getItem('paquisha_logs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_LOGS;
  });

  // Active Section for Navbar
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Modals & AI Windows State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isDiagnosisOpen, setIsDiagnosisOpen] = useState(false);

  // Sync to LocalStorage
  const handleLogin = (user: UserProfile) => {
    setCurrentUser(user);
    localStorage.setItem('paquisha_user_session', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('paquisha_user_session');
  };

  const handleAddVideo = (newVideo: YouTubeVideo) => {
    const updated = [newVideo, ...videos];
    setVideos(updated);
    localStorage.setItem('paquisha_videos', JSON.stringify(updated));
  };

  const handleAddDrive = (newRes: DriveResource) => {
    const updated = [newRes, ...drives];
    setDrives(updated);
    localStorage.setItem('paquisha_drives', JSON.stringify(updated));
  };

  const handleAddLog = (newLog: HydroponicLog) => {
    const updated = [newLog, ...logs];
    setLogs(updated);
    localStorage.setItem('paquisha_logs', JSON.stringify(updated));
  };

  const handleCreateSurvey = (newSurvey: Survey) => {
    const updated = [newSurvey, ...surveys];
    setSurveys(updated);
    localStorage.setItem('paquisha_surveys', JSON.stringify(updated));
  };

  const handleVoteSurvey = (surveyId: string, optionId: string) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }

    const updated = surveys.map((s) => {
      if (s.id !== surveyId) return s;

      // If user already voted on this exact option, do nothing
      if (s.userVotedOptionId === optionId) return s;

      const previousOptionId = s.userVotedOptionId;
      const newOptions = s.options.map((opt) => {
        if (opt.id === optionId) {
          return { ...opt, votes: opt.votes + 1 };
        }
        if (previousOptionId && opt.id === previousOptionId) {
          return { ...opt, votes: Math.max(0, opt.votes - 1) };
        }
        return opt;
      });

      return {
        ...s,
        totalVotes: previousOptionId ? s.totalVotes : s.totalVotes + 1,
        userVotedOptionId: optionId,
        options: newOptions,
      };
    });

    setSurveys(updated);
    localStorage.setItem('paquisha_surveys', JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-stone-50 font-['Plus_Jakarta_Sans'] text-stone-900 flex flex-col antialiased selection:bg-emerald-200 selection:text-emerald-950">
      
      {/* Top Navigation */}
      <Navbar
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenDiagnosis={() => setIsDiagnosisOpen(true)}
        onOpenChat={() => setIsChatOpen(true)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero & School Telemetry */}
        <HeroBanner
          currentUser={currentUser}
          onOpenAuth={() => setIsAuthModalOpen(true)}
          onOpenChat={() => setIsChatOpen(true)}
          onOpenDiagnosis={() => setIsDiagnosisOpen(true)}
        />

        {/* 2. Knowledge & Fertilizer Calculator */}
        <KnowledgeSection />

        {/* 3. YouTube Videos Section */}
        <VideosSection
          videos={videos}
          onAddVideo={handleAddVideo}
          currentUser={currentUser}
          onOpenAuth={() => setIsAuthModalOpen(true)}
        />

        {/* 4. Polls & Community Surveys Section */}
        <SurveysSection
          surveys={surveys}
          onVote={handleVoteSurvey}
          onCreateSurvey={handleCreateSurvey}
          currentUser={currentUser}
          onOpenAuth={() => setIsAuthModalOpen(true)}
        />

        {/* 5. Google Drives Repository Section */}
        <DrivesSection
          resources={drives}
          onAddResource={handleAddDrive}
          currentUser={currentUser}
          onOpenAuth={() => setIsAuthModalOpen(true)}
        />

        {/* 6. Google Maps & Campus Layout Section */}
        <MapsSection />

        {/* 7. pH & EC Logs Section */}
        <LogsSection
          logs={logs}
          onAddLog={handleAddLog}
          currentUser={currentUser}
          onOpenAuth={() => setIsAuthModalOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Action Buttons (AI Tutor and Camera) */}
      {!isChatOpen && (
        <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2.5">
          <button
            id="floating-diagnosis-btn"
            onClick={() => setIsDiagnosisOpen(true)}
            className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            title="Diagnosticar foto de planta con Gemini"
          >
            <Camera className="w-4 h-4 text-stone-950" />
            <span className="hidden sm:inline">Diagnosticar Planta</span>
          </button>

          <button
            id="floating-chat-btn"
            onClick={() => setIsChatOpen(true)}
            className="flex items-center gap-2.5 px-4 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold text-xs sm:text-sm shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 ring-2 ring-white/50"
          >
            <Sparkles className="w-4 h-4 text-emerald-300 animate-pulse" />
            <span>BioPaquisha AI</span>
          </button>
        </div>
      )}

      {/* Modals */}
      <GoogleAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />

      <AiChatbot
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        currentUser={currentUser}
      />

      <PlantDiagnosticModal
        isOpen={isDiagnosisOpen}
        onClose={() => setIsDiagnosisOpen(false)}
        currentUser={currentUser}
        onOpenChatWithQuery={(query) => {
          setIsChatOpen(true);
        }}
      />

    </div>
  );
}

