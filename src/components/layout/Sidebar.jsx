import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
 Home,
 Layers,
 Share2,
 Clock,
 CheckCircle,
 Award,
 Info,
 LogOut,
 Sparkles,
 Zap,
 ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
 const { user, logout } = useAuth();
 const navigate = useNavigate();

 const handleLogout = () => {
  logout();
  navigate('/login');
 };

 const navItems = [
  { icon: <Home size={20} />, label: 'Home', path: '/dashboard' },
  { icon: <Layers size={20} />, label: 'My Ideas', path: '/dashboard?tab=my-ideas' },
  { icon: <Share2 size={20} />, label: 'Requested Icons', path: '/dashboard?tab=requested' },
  { icon: <Clock size={20} />, label: 'In Progress', path: '/dashboard?tab=progress' },
  { icon: <CheckCircle size={20} />, label: 'Completed', path: '/dashboard?tab=completed' },
  { icon: <Award size={20} />, label: 'Leaderboard', path: '/leaderboard' },
  { icon: <Info size={20} />, label: 'About', path: '/about' },
 ];

 return (
  <div className="w-72 bg-white min-h-screen border-r border-surface-200/50 flex flex-col fixed left-0 top-0 z-[60] shadow-sm">
   {/* Brand Header */}
   <div className="p-8 flex items-center gap-3">
    <div className="w-10 h-10 premium-gradient rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-500/30">
     <Sparkles className="w-6 h-6 fill-current" />
    </div>
    <span className="text-2xl font-black text-surface-900 tracking-tighter uppercase italic">
     Idea<span className="text-brand-600">Waves</span>
    </span>
   </div>

   {/* Navigation Space */}
   <nav className="flex-1 px-4 space-y-1.5 mt-4">
    <div className="px-4 mb-4">
     <p className="text-[10px] font-black text-surface-400 uppercase tracking-[0.2em]">Platform Hub</p>
    </div>
    {navItems.map((item) => (
     <NavLink
      key={item.label}
      to={item.path}
      className={({ isActive }) =>
       `flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 font-bold text-sm group ${isActive
        ? 'bg-brand-50 text-brand-600 shadow-sm'
        : 'text-surface-500 hover:bg-surface-50 hover:text-surface-900 outline-none'
       }`
      }
     >
      <div className="flex items-center gap-3">
       <span className="transition-transform duration-300 group-hover:scale-110">{item.icon}</span>
       {item.label}
      </div>
      <ChevronRight size={14} className={`opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 font-black`} />
     </NavLink>
    ))}
   </nav>


  </div>
 );
};

export default Sidebar;
