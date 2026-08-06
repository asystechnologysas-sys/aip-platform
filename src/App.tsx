import React, { useState, useEffect } from 'react';
import { useAuthStore } from './store/useAuthStore';
import { useThemeStore } from './store/useThemeStore';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { EmpresasPage } from './pages/EmpresasPage';
import { ProspeccionPage } from './pages/ProspeccionPage';
import { AuditorIAPage } from './pages/AuditorIAPage';
import { DiagnosticosPage } from './pages/DiagnosticosPage';
import { ImagenesPage } from './pages/ImagenesPage';
import { DocumentosPage } from './pages/DocumentosPage';
import { CampanasPage } from './pages/CampanasPage';
import { WhatsAppPage } from './pages/WhatsAppPage';
import { IAConversacionalPage } from './pages/IAConversacionalPage';
import { CRMPage } from './pages/CRMPage';
import { AnaliticaPage } from './pages/AnaliticaPage';
import { AlertasPage } from './pages/AlertasPage';
import { UsuariosPage } from './pages/UsuariosPage';
import { ConfiguracionPage } from './pages/ConfiguracionPage';
import { EstadoSistemaPage } from './pages/EstadoSistemaPage';
import { LogsPage } from './pages/LogsPage';
import { AutomatizacionesPage } from './pages/AutomatizacionesPage';
import { CopilotButton } from './components/copilot/CopilotButton';
import { CopilotDrawer } from './components/copilot/CopilotDrawer';

export default function App() {
  const { isAuthenticated, checkAuth } = useAuthStore();
  const { isDarkMode } = useThemeStore();
  const [currentPath, setCurrentPath] = useState<string>('/dashboard');
  const [isCopilotOpen, setIsCopilotOpen] = useState<boolean>(false);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  const renderCurrentView = () => {
    switch (currentPath) {
      case '/dashboard':
        return <DashboardPage onNavigate={setCurrentPath} />;
      case '/empresas':
        return <EmpresasPage onNavigate={setCurrentPath} />;
      case '/prospeccion':
        return <ProspeccionPage onNavigate={setCurrentPath} />;
      case '/auditor-ia':
        return <AuditorIAPage onNavigate={setCurrentPath} />;
      case '/diagnosticos':
        return <DiagnosticosPage onNavigate={setCurrentPath} />;
      case '/imagenes':
        return <ImagenesPage onNavigate={setCurrentPath} />;
      case '/documentos':
        return <DocumentosPage onNavigate={setCurrentPath} />;
      case '/campanas':
        return <CampanasPage onNavigate={setCurrentPath} />;
      case '/automatizaciones':
        return <AutomatizacionesPage onNavigate={setCurrentPath} />;
      case '/whatsapp':
        return <WhatsAppPage onNavigate={setCurrentPath} />;
      case '/ia-conversacional':
        return <IAConversacionalPage onNavigate={setCurrentPath} />;
      case '/crm':
        return <CRMPage onNavigate={setCurrentPath} />;
      case '/analitica':
        return <AnaliticaPage onNavigate={setCurrentPath} />;
      case '/alertas':
        return <AlertasPage onNavigate={setCurrentPath} />;
      case '/usuarios':
        return <UsuariosPage onNavigate={setCurrentPath} />;
      case '/configuracion':
        return <ConfiguracionPage onNavigate={setCurrentPath} />;
      case '/estado-sistema':
        return <EstadoSistemaPage onNavigate={setCurrentPath} />;
      case '/logs':
        return <LogsPage onNavigate={setCurrentPath} />;
      default:
        return <DashboardPage onNavigate={setCurrentPath} />;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#070a12] text-slate-900 dark:text-slate-100 flex transition-colors relative">
      <Sidebar currentPath={currentPath} onNavigate={setCurrentPath} />

      {/* Main Content Area */}
      <div className="flex-1 ml-64 min-h-screen flex flex-col transition-all">
        <Header />
        <main className="flex-1 p-6 md:p-8 overflow-y-auto max-w-7xl w-full mx-auto">
          {renderCurrentView()}
        </main>
      </div>

      {/* Copilot Floating Button & Slide-over Panel */}
      <CopilotButton onClick={() => setIsCopilotOpen(true)} isOpen={isCopilotOpen} />
      <CopilotDrawer
        isOpen={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
        onNavigate={setCurrentPath}
        currentPath={currentPath}
      />
    </div>
  );
}
