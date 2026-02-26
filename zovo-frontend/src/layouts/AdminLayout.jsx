// frontend/src/layouts/AdminLayout.jsx
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AdminProvider } from '../context/AdminContext';
import logo from '../assets/zovo_logo.png';
import { LogOut, Home, Users, Briefcase, User, Tag, DollarSign, Map, Star } from 'lucide-react';

const AdminLayoutContent = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { path: '/admin', label: 'Stats', icon: Home },
    { path: '/admin/jobs', label: 'Work', icon: Briefcase },
    { path: '/admin/users', label: 'Users', icon: Users },
    { path: '/admin/pricing-rules', label: 'Pricing', icon: DollarSign },
  ];

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#1A1A1A] overflow-hidden font-sans text-[#E0E0E0]">
      {/* Sidebar - Desktop Only */}
      <aside className="hidden md:flex w-64 bg-white border-r border-gray-100 flex-col shadow-xl relative z-20">
        <div className="flex justify-center items-center h-20 relative z-0 mt-4 mb-2">
          <img src={logo} alt="Zovo" className="w-full scale-[1.5] object-contain drop-shadow-md" />
        </div>

        <nav className="flex-1 px-4 space-y-3 py-6 relative z-10 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3.5 rounded-2xl transition-all duration-300 group ${active
                  ? 'bg-[#007AFF] text-white shadow-lg shadow-blue-500/30 scale-[1.02] font-semibold'
                  : 'text-[#1D1D1F] hover:bg-gray-100/80 hover:text-black hover:shadow-sm'
                  }`}
              >
                {/* Fallback if Icon is string, though we imported components. If string, render text/emoji */}
                {typeof Icon === 'string' ? <span className="mr-3">{Icon}</span> : <Icon className={`w-6 h-6 mr-3 transition-transform duration-300 ${active ? 'animate-pulse' : 'group-hover:scale-110'}`} />}

                <span className="tracking-wide">{item.label}</span>
                {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white animate-ping" />}
              </Link>
            );
          })}
        </nav>

        {/* User Profile Summary */}
        <div className="p-4 m-4 bg-gray-50 rounded-2xl border border-gray-100 shadow-inner relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shadow-lg">
              {user?.name?.[0] || 'A'}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-[#1D1D1F] truncate">{user?.name || 'Admin'}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email || 'admin@zovo.com'}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="mt-4 w-full flex items-center justify-center px-5 py-2.5 bg-gray-200/50 hover:bg-red-50 text-gray-600 hover:text-red-600 rounded-xl transition-all duration-300 font-medium border border-transparent hover:border-red-100"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-transparent mb-16 md:mb-0">
        {/* Header */}
        <header className="h-16 md:h-20 bg-[#1A1A1A]/90 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-4 md:px-8 z-10 shrink-0">
          <div className="flex items-center gap-3">
            {/* Mobile Logo */}
            <div className="md:hidden w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center overflow-hidden">
              <img src={logo} alt="Z" className="w-12 h-12 object-contain scale-[2.5]" />
            </div>
            <div>
              <h1 className="text-lg md:text-2xl font-bold text-white truncate max-w-[150px] md:max-w-none">
                {user?.name?.split(' ')[0] || 'Admin'}
              </h1>
              <p className="hidden md:block text-sm text-gray-400">Here's what's happening today.</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="md:hidden p-2 text-gray-400 hover:text-white"
          >
            <LogOut size={20} />
          </button>
          <div className="hidden md:block text-sm text-gray-400">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-4 md:p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto space-y-6 md:space-y-8 animate-fade-in-up">
            <Outlet />
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#000000]/80 backdrop-blur-xl border-t border-white/10 flex justify-around items-center h-16 px-2 z-50">
        {menuItems.slice(0, 4).map((item) => {
          const Icon = item.icon;
          const active = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-all duration-300 ${active ? 'text-blue-500' : 'text-gray-500'}`}
            >
              <Icon size={20} className={active ? 'scale-110 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]' : ''} />
              <span className="text-[10px] font-medium">{item.label}</span>
              {active && <div className="w-1 h-1 rounded-full bg-blue-500 mt-0.5" />}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

// Wrap with AdminProvider
const AdminLayout = () => {
  return (
    <AdminProvider>
      <AdminLayoutContent />
    </AdminProvider>
  );
};

export default AdminLayout;