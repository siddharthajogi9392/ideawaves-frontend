import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Card, Button } from '../../components/common/Components';
import { Bell, MessageSquare, ArrowRight, Zap, Sparkles, Clock, CheckCircle, Flame, Layers } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Notifications = () => {
 const [notifications, setNotifications] = useState([]);
 const [loading, setLoading] = useState(true);
 const navigate = useNavigate();

 useEffect(() => {
  const fetchNotifications = async () => {
   try {
    const res = await api.get('/notifications');
    setNotifications(res.data);
   } catch (error) {
    console.error("Error fetching notifications", error);
   } finally {
    setLoading(false);
   }
  };
  fetchNotifications();
 }, []);

 return (
  <div className="flex-1 bg-surface-50 min-h-screen py-16 px-8 selection:bg-brand-100">
   <div className="max-w-3xl mx-auto">

    {/* Modern Header */}
    <div className="flex items-end justify-between gap-4 mb-16 px-2">
     <div className="space-y-1">
      <div className="flex items-center gap-2 text-brand-600 mb-2">
       <Zap size={14} className="animate-pulse" />
       <span className="text-[10px] font-black uppercase tracking-[0.3em] ml-1 opacity-60">Real-time Feed</span>
      </div>
      <h1 className="text-4xl font-black text-surface-900 tracking-tighter uppercase flex items-center gap-4 py-1">
       System <span className="text-brand-600">Radar</span> <Bell className="text-surface-900" size={32} />
      </h1>
      <p className="text-xs font-bold text-surface-400 uppercase tracking-widest">Tracking your innovation impact & collaboration alerts.</p>
     </div>
     <div className="bg-white px-5 py-3 rounded-2xl shadow-premium border border-surface-100 flex items-center gap-3">
      <div className="w-2 h-2 rounded-full bg-brand-500 animate-ping"></div>
      <span className="text-[10px] font-black text-surface-900 uppercase tracking-widest">Active Link</span>
     </div>
    </div>

    {loading ? (
     <div className="flex flex-col items-center justify-center py-40 gap-6">
      <div className="w-16 h-16 border-4 border-brand-100 border-t-brand-600 rounded-full animate-spin"></div>
      <p className="text-xs font-black text-surface-400 uppercase tracking-widest animate-pulse">Syncing Alerts...</p>
     </div>
    ) : notifications.length === 0 ? (
     <div className="text-center py-24 bg-white rounded-[3rem] shadow-premium border border-surface-100 px-10">
      <div className="w-20 h-20 bg-surface-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8">
       <Bell size={32} className="text-surface-200" />
      </div>
      <h3 className="text-2xl font-black text-surface-900 uppercase tracking-tighter mb-2 italic">Radar is clear</h3>
      <p className="text-surface-400 font-bold text-sm uppercase tracking-widest leading-loose">No mission updates yet. Start participating to see activity!</p>
      <Button onClick={() => navigate('/dashboard')} className="mt-10 rounded-2xl px-8 h-12 uppercase tracking-widest text-[10px]">Back To Hub</Button>
     </div>
    ) : (
     <div className="space-y-4">
      {notifications.map((notif, idx) => {
       const isApproval = notif.message.toLowerCase().includes('approved');
       const isNewIdea = notif.message.toLowerCase().includes('idea');

       return (
        <div
         key={notif._id}
         className={`group relative p-8 rounded-[2.5rem] border-2 transition-all duration-500 hover:-translate-y-1 ${!notif.read
           ? 'bg-white border-brand-100 shadow-xl shadow-brand-500/10'
           : 'bg-white/60 border-transparent hover:border-surface-200'
          }`}
         style={{ animationDelay: `${idx * 0.05}s` }}
        >
         <div className="flex items-center gap-8">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg ${isApproval ? 'bg-green-500 text-white' :
            isNewIdea ? 'bg-brand-600 text-white' : 'bg-surface-800 text-white'
           }`}>
           {isApproval ? <CheckCircle size={24} /> : isNewIdea ? <Sparkles size={24} /> : <MessageSquare size={24} />}
          </div>

          <div className="flex-1 min-w-0">
           <div className="flex items-center gap-3 mb-1">
            <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded-lg ${isApproval ? 'bg-green-50 text-green-600' : 'bg-brand-50 text-brand-600'
             }`}>
             {isApproval ? 'Approval Alert' : 'Ecosystem Update'}
            </span>
            <span className="text-[10px] font-black text-surface-300 flex items-center gap-1.5 uppercase tracking-tighter">
             <Clock size={10} /> {new Date(notif.createdAt).toLocaleDateString()}
            </span>
           </div>
           <p className={`text-lg font-black tracking-tight leading-tight ${!notif.read ? 'text-surface-900' : 'text-surface-500'}`}>
            {notif.message}
           </p>
          </div>

          <div className="flex items-center">
           {isApproval ? (
            <Button onClick={() => navigate('/dashboard')} className="h-12 w-12 rounded-2xl bg-brand-600 group-hover:bg-brand-500 text-white p-0 shadow-xl shadow-brand-500/30">
             <MessageSquare size={20} />
            </Button>
           ) : (
            <button className="h-12 w-12 rounded-2xl bg-surface-50 text-surface-300 group-hover:bg-brand-600 group-hover:text-white transition-all flex items-center justify-center">
             <ArrowRight size={20} />
            </button>
           )}
          </div>
         </div>

         {!notif.read && (
          <div className="absolute top-8 right-8 w-2 h-2 bg-brand-500 rounded-full animate-ping"></div>
         )}
        </div>
       );
      })}

      <div className="pt-10 text-center">
       <Card className="p-10 border-none bg-surface-900 text-white overflow-hidden relative group rounded-[3rem]">
        <div className="absolute right-0 top-0 p-8 opacity-10 group-hover:scale-110 transition-transform"><Flame size={120} className="text-orange-500" /></div>
        <div className="relative z-10 max-w-md mx-auto">
         <h4 className="text-xl font-black uppercase tracking-tighter mb-4 italic">Fuel your ranking</h4>
         <p className="text-xs font-bold text-white/60 uppercase tracking-widest leading-relaxed mb-8">Higher engagement leads to more XP. Respond to your notifications swiftly to climb the Leaderboard.</p>
         <Button onClick={() => navigate('/leaderboard')} variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-2xl px-8 h-12 uppercase tracking-widest text-[10px] font-black">Open Leaderboard</Button>
        </div>
       </Card>
      </div>
     </div>
    )}
   </div>
  </div>
 );
};

export default Notifications;
