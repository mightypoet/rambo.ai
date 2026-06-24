import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Rocket,
  Palette,
  Share2,
  BarChart3,
  Building2,
  Settings,
  LogOut,
  User,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/Button';
import { supabase } from '@/lib/supabase';

export default function SidebarLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Campaigns', path: '/campaign-generator', icon: Rocket },
    { name: 'Creative Studio', path: '/creative-studio', icon: Palette },
    { name: 'Connected Channels', path: '/connected-channels', icon: Share2 },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
  ];

  const orgItems = [
    { name: 'Brands', path: '/brands', icon: Building2 },
    { name: 'Settings', path: '/settings', icon: Settings },
  ]

  const handleLogout = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    navigate('/');
  };

  return (
    <div className="flex h-screen w-full bg-[#F9FAFB] text-[#111827] font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 flex flex-col bg-[#111827] text-white shrink-0">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#FF6B00] flex items-center justify-center font-bold text-white italic">
            R
          </div>
          <span className="text-xl font-bold tracking-tight uppercase">Rambo.ai</span>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center px-4 py-3 rounded-lg text-sm transition-colors",
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                )}
              >
                <item.icon className={cn("mr-3 h-5 w-5 opacity-70", isActive ? "text-white" : "")} />
                {item.name}
              </Link>
            );
          })}

          <div className="pt-8">
            <p className="px-4 mb-2 text-xs font-semibold uppercase text-gray-500 tracking-wider">Organization</p>
            {orgItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center px-4 py-3 rounded-lg text-sm transition-colors",
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <item.icon className={cn("mr-3 h-5 w-5 opacity-70", isActive ? "text-white" : "")} />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="p-4 border-t border-white/5">
          <div className="bg-[#2D3748] rounded-xl p-4 mb-4">
            <p className="text-xs text-gray-400 mb-1">AI Credits</p>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold">420 / 1,000</span>
              <span className="text-[10px] bg-[#FF6B00]/20 text-[#FF6B00] px-1.5 py-0.5 rounded">Free Tier</span>
            </div>
            <div className="w-full bg-gray-700 h-1.5 rounded-full">
              <div className="bg-[#FF6B00] h-1.5 rounded-full" style={{ width: '42%' }}></div>
            </div>
          </div>
          
          <button 
            className="flex w-full items-center px-4 py-3 rounded-lg text-sm text-gray-400 hover:bg-white/5 hover:text-red-400 transition-colors"
            onClick={handleLogout}
          >
            <LogOut className="mr-3 h-5 w-5 opacity-70" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 px-8 flex items-center justify-between shrink-0">
          <div>
            <h1 className="text-lg font-bold text-gray-800">
              {navItems.find(item => item.path === location.pathname)?.name || 
               orgItems.find(item => item.path === location.pathname)?.name || 'Welcome'}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white shadow-sm flex items-center justify-center overflow-hidden">
               <User className="h-4 w-4 text-gray-500" />
            </div>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto h-full">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
