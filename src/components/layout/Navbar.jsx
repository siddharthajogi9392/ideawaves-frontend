import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LogOut, LayoutDashboard, MessageSquare, Sparkles } from 'lucide-react';

const Navbar = () => {
 const { user, logout } = useAuth();
 const navigate = useNavigate();

 const handleLogout = () => {
  logout();
  navigate('/login');
 };

 return (
  <nav className="bg-white/70 backdrop-blur-md border-b border-surface-200/50 sticky top-0 z-[100]">
   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between h-20">
     <div className="flex">
      <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
       <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-500/30 group-hover:scale-110 transition-transform">
        <Sparkles size={20} className="fill-current" />
       </div>
       <span className="text-xl font-display font-black tracking-tighter text-surface-900">
        IDEA<span className="text-brand-600">WAVES</span>
       </span>
      </Link>
     </div>
     <div className="flex items-center space-x-8">
      {user ? (
       <div className="flex items-center gap-6">
        <div className="text-right hidden sm:block">
         <p className="text-sm font-bold text-surface-900 leading-none">{user.name}</p>
         <p className="text-[10px] font-black text-brand-600 uppercase tracking-[0.2em] mt-1.5 flex items-center justify-end gap-1.5">
          <div className="w-1 h-1 rounded-full bg-brand-600"></div>
          {user.role || 'Student'}
         </p>
        </div>

        <div className="h-10 w-px bg-surface-200/50"></div>

        <button
         onClick={handleLogout}
         className="flex items-center gap-2.5 text-surface-500 hover:text-red-500 transition-all font-bold text-xs uppercase tracking-widest hover:scale-105 active:scale-95"
        >
         <div className="p-2.5 bg-surface-50 rounded-xl group-hover:bg-red-50 transition-colors">
          <LogOut size={16} />
         </div>
         <span className="hidden md:block">Sign Out</span>
        </button>
       </div>
      ) : (
       <div className="flex items-center gap-4">
        <Link to="/login" className="text-surface-600 hover:text-brand-600 px-4 py-2 rounded-xl text-sm font-bold transition-colors">Sign In</Link>
        <Link to="/register" className="bg-brand-600 text-white hover:bg-brand-700 px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-brand-500/20 transition-all hover:scale-105 active:scale-95">Start Creating</Link>
       </div>
      )}
     </div>
    </div>
   </div>
  </nav>
 );
};

export default Navbar;
