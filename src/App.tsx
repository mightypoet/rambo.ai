import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SidebarLayout from './components/SidebarLayout';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import CampaignGenerator from './pages/CampaignGenerator';
import CreativeStudio from './pages/CreativeStudio';
import ConnectedChannels from './pages/ConnectedChannels';
import Analytics from './pages/Analytics';
import Brands from './pages/Brands';
import Settings from './pages/Settings';
import { Toaster } from './components/ui/sonner';
import { AuthProvider } from './components/AuthProvider';
import { ProtectedRoute } from './components/ProtectedRoute';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          
          <Route element={<ProtectedRoute />}>
            <Route element={<SidebarLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/campaign-generator" element={<CampaignGenerator />} />
              <Route path="/creative-studio" element={<CreativeStudio />} />
              <Route path="/connected-channels" element={<ConnectedChannels />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/brands" element={<Brands />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
          </Route>
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster position="top-right" />
      </BrowserRouter>
    </AuthProvider>
  );
}
