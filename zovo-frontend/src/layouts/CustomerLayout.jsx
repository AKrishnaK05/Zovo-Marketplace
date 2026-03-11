import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/zovo_symbol.png';
import { LogOut, Home, Calendar, User, ChevronLeft, ChevronRight, Menu } from 'lucide-react';
import { useState } from 'react';

const CustomerLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { path: '/customer/home', label: 'Home', icon: Home },
    { path: '/customer/history', label: 'Bookings', icon: Calendar },
    { path: '/customer/profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#001126] overflow-hidden font-sans text-[#F9FAFB]">
      {/* Sidebar - Desktop Only */}
      <aside className={`hidden md:flex flex-col bg-white m-4 rounded-3xl shadow-2xl relative z-20 transition-all duration-500 ease-in-out border border-white/10 ${isCollapsed ? 'w-24' : 'w-72'}`}>
        {/* Toggle Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-10 bg-[#007AFF] text-white p-1.5 rounded-full shadow-lg hover:scale-110 transition-transform z-30 border-2 border-white"
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>

        <div className={`flex justify-center items-center h-40 mt-4 transition-all duration-500 ${isCollapsed ? 'scale-75' : 'scale-100'}`}>
          <img src={logo} alt="Zovo" className={`${isCollapsed ? 'h-24 w-24' : 'h-40 w-40'} object-contain drop-shadow-2xl transition-all duration-500`} />
        </div>

        <nav className="flex-1 px-4 space-y-3 pt-2 pb-6 relative z-10 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                title={isCollapsed ? item.label : ''}
                className={`flex items-center rounded-2xl transition-all duration-300 group overflow-hidden ${isCollapsed ? 'justify-center p-3.5 mx-2' : 'px-5 py-4 mx-4'
                  } ${active
                    ? 'bg-[#007AFF] text-white shadow-lg shadow-blue-500/30 scale-[1.02] font-semibold'
                    : 'text-[#1D1D1F] hover:bg-gray-100/80 hover:text-black hover:shadow-sm'
                  }`}
              >
                <Icon className={`w-6 h-6 shrink-0 transition-transform duration-300 ${active ? 'animate-pulse' : 'group-hover:scale-110'}`} />
                {!isCollapsed && <span className="ml-3 tracking-wide whitespace-nowrap opacity-100 transition-opacity duration-300">{item.label}</span>}
                {!isCollapsed && active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white animate-ping" />}
              </Link>
            );
          })}
        </nav>

        {/* User Profile Summary */}
        <div className={`p-4 m-4 bg-gray-50 rounded-2xl border border-gray-100 shadow-inner relative z-10 transition-all duration-500 ${isCollapsed ? 'items-center justify-center p-2' : ''}`}>
          <div className={`flex items-center gap-3 ${isCollapsed ? 'flex-col' : ''}`}>
            <div className={`w-10 h-10 rounded-full bg-[#007AFF] flex items-center justify-center text-white font-bold shadow-lg shrink-0 ${isCollapsed ? 'mb-2' : ''}`}>
              {user?.name?.[0] || 'C'}
            </div>
            {!isCollapsed && (
              <div className="overflow-hidden">
                <p className="text-sm font-bold text-[#1D1D1F] truncate">{user?.name || 'Customer'}</p>
                <p className="text-xs text-gray-500 truncate">{user?.email || 'customer@zovo.com'}</p>
              </div>
            )}
          </div>
          <button
            onClick={handleLogout}
            title={isCollapsed ? 'Sign Out' : ''}
            className={`mt-4 flex items-center justify-center bg-gray-200/50 hover:bg-red-50 text-gray-600 hover:text-red-600 rounded-xl transition-all duration-300 font-medium border border-transparent hover:border-red-100 ${isCollapsed ? 'w-10 h-10 p-0' : 'w-full px-5 py-2.5'
              }`}
          >
            <LogOut className={`${isCollapsed ? 'w-5 h-5' : 'w-4 h-4 mr-2'}`} />
            {!isCollapsed && 'Sign Out'}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-transparent mb-16 md:mb-0">
        {/* Header */}
        <header className="h-16 md:h-20 bg-[#001126]/90 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-4 md:px-8 z-10 shrink-0">
          <div className="flex items-center gap-4">
            {/* Mobile Logo */}
            <div className="md:hidden w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center overflow-hidden shadow-lg">
              <img src={logo} alt="Z" className="w-10 h-10 object-contain" />
            </div>
            <div>
              <h1 className="text-lg md:text-2xl font-bold text-white truncate max-w-[150px] md:max-w-none">
                Hi, {user?.name?.split(' ')[0] || 'Customer'}
              </h1>
              <p className="hidden md:block text-sm text-gray-400">Find the perfect service for you.</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="text-xs md:text-sm font-medium text-gray-300 bg-white/5 px-3 py-1.5 md:px-4 md:py-2 rounded-xl border border-white/10 shadow-sm">
              <span className="md:inline hidden">Credits:</span> <span className="text-[#007AFF] font-bold">{user?.credits || 0}</span>
            </div>
            <button
              onClick={handleLogout}
              className="md:hidden p-2 text-gray-400 hover:text-white"
            >
              <LogOut size={20} />
            </button>
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
        {navItems.map((item) => {
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

export default CustomerLayout;