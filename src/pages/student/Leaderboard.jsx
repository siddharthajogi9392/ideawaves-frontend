import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { Trophy, Medal, Award, TrendingUp, Sparkles, Star, Target, ChevronRight, User as UserIcon, Layers, Users } from 'lucide-react';
import Sidebar from '../../components/layout/Sidebar';
import { Card } from '../../components/common/Components';
import { useAuth } from '../../context/AuthContext';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user: currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const res = await api.get('/ideas/leaderboard');
      setLeaderboard(res.data);
    } catch (error) {
      console.error('Failed to fetch leaderboard', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (index) => {
    switch (index) {
      case 0: return <Trophy className="w-6 h-6 text-yellow-500 fill-current" />;
      case 1: return <Medal className="w-6 h-6 text-slate-400 fill-current" />;
      case 2: return <Award className="w-6 h-6 text-amber-600 fill-current" />;
      default: return <span className="text-xs font-black text-surface-400">#{index + 1}</span>;
    }
  };

  const getRankColor = (index) => {
    switch (index) {
      case 0: return 'text-yellow-600 bg-yellow-50 border-yellow-100';
      case 1: return 'text-slate-600 bg-slate-50 border-slate-100';
      case 2: return 'text-amber-700 bg-amber-50 border-amber-100';
      default: return 'text-surface-600 bg-surface-50 border-surface-100';
    }
  };

  return (
    <div className="flex min-h-screen bg-surface-50">
      <Sidebar />

      <div className="flex-1 ml-72 flex flex-col selection:bg-brand-100">
        {/* Modern Header */}
        <header className="bg-white/80 backdrop-blur-xl border-b border-surface-200/50 sticky top-0 z-50 px-10 py-10">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-brand-600 mb-2">
                <Sparkles size={16} className="animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] ml-1 opacity-60 italic">Elite Ranking System</span>
              </div>
              <h1 className="text-4xl font-black text-surface-900 tracking-tighter uppercase flex items-center gap-3">
                Innovation <span className="text-brand-600">Leaderboard</span> <Trophy className="text-yellow-500 animate-bounce" size={32} />
              </h1>
              <p className="text-xs font-bold text-surface-400 uppercase tracking-widest">Celebrating the top contributors and visionary minds of <span className="text-surface-900 italic">IdeaWaves Q1 Cycle</span>.</p>
            </div>

            <div className="bg-surface-900 rounded-2xl px-6 py-4 text-white shadow-xl shadow-indigo-900/20 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <Target size={20} className="text-brand-400" />
              </div>
              <div>
                <p className="text-[10px] font-black opacity-40 uppercase tracking-widest">Next Milestone</p>
                <p className="text-sm font-black tracking-tight">Reach 500 XP for Level 4</p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-10">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-40 gap-6">
              <div className="w-16 h-16 border-4 border-brand-100 border-t-brand-600 rounded-full animate-spin"></div>
              <p className="text-xs font-black text-surface-400 uppercase tracking-widest animate-pulse">Calculating Global Influence...</p>
            </div>
          ) : leaderboard.length === 0 ? (
            <div className="max-w-2xl mx-auto text-center py-24 bg-white rounded-[3rem] shadow-premium border border-surface-100">
              <Trophy className="w-20 h-20 text-surface-200 mx-auto mb-6" />
              <h3 className="text-2xl font-black text-surface-900 uppercase tracking-tighter mb-2">The Stage is Empty</h3>
              <p className="text-surface-500 font-medium">Be the first to submit an idea and claim your spot!</p>
            </div>
          ) : (
            <div className="max-w-5xl mx-auto space-y-16">
              {/* High-Impact Podium */}
              {leaderboard.length >= 3 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end pt-10 px-4">
                  {/* 2nd Place */}
                  <div className="order-2 md:order-1 flex flex-col items-center group">
                    <div className="relative mb-6">
                      <div className="w-32 h-32 rounded-[2rem] bg-white p-2 shadow-xl border border-slate-100 transform transition-transform group-hover:scale-105 group-hover:-rotate-3 duration-500">
                        <div className="w-full h-full rounded-[1.5rem] bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center text-white text-4xl font-black shadow-inner">
                          {leaderboard[1].name[0]}
                        </div>
                      </div>
                      <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-white rounded-2xl shadow-lg border border-slate-100 flex items-center justify-center text-slate-400">
                        <Medal size={24} className="fill-current" />
                      </div>
                    </div>
                    <div className="text-center">
                      <h3 className="text-xl font-black text-surface-900 tracking-tighter uppercase leading-none mb-1">{leaderboard[1].name}</h3>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Master Builderr</p>
                      <div className="mt-4 bg-slate-50 border border-slate-100 rounded-2xl px-6 py-2 shadow-sm">
                        <span className="text-lg font-black text-slate-900 tracking-tighter">{leaderboard[1].engagementScore}</span>
                        <span className="ml-1 text-[10px] font-black text-slate-400 uppercase tracking-widest">XP</span>
                      </div>
                    </div>
                  </div>

                  {/* 1st Place - The Apex */}
                  <div className="order-1 md:order-2 flex flex-col items-center group relative -mt-8">
                    <div className="absolute -top-16 animate-bounce"><Trophy size={48} className="text-yellow-500 drop-shadow-lg" /></div>
                    <div className="relative mb-8">
                      <div className="w-44 h-44 rounded-[2.5rem] bg-white p-2.5 shadow-2xl border-2 border-yellow-200 transform transition-all group-hover:scale-110 duration-700">
                        <div className="w-full h-full rounded-[2rem] bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 flex items-center justify-center text-white text-6xl font-black shadow-inner relative overflow-hidden">
                          <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                          <span className="relative z-10">{leaderboard[0].name[0]}</span>
                        </div>
                      </div>
                      <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-white rounded-[1.5rem] shadow-2xl border border-yellow-100 flex items-center justify-center text-yellow-500">
                        <Star size={32} className="fill-current animate-pulse" />
                      </div>
                    </div>
                    <div className="text-center">
                      <h3 className="text-2xl font-black text-surface-900 tracking-tighter uppercase leading-none mb-1">{leaderboard[0].name}</h3>
                      <p className="text-[10px] font-black text-yellow-600 uppercase tracking-[0.2em] flex items-center gap-1.5 justify-center">
                        <Sparkles size={10} /> Grand Innovator <Sparkles size={10} />
                      </p>
                      <div className="mt-6 premium-gradient rounded-3xl px-10 py-3 shadow-xl shadow-brand-500/30 transform transition-transform group-hover:scale-105">
                        <span className="text-2xl font-black text-white tracking-tighter">{leaderboard[0].engagementScore}</span>
                        <span className="ml-2 text-xs font-black text-white/70 uppercase tracking-widest">Impact XP</span>
                      </div>
                    </div>
                  </div>

                  {/* 3rd Place */}
                  <div className="order-3 md:order-3 flex flex-col items-center group">
                    <div className="relative mb-6">
                      <div className="w-32 h-32 rounded-[2rem] bg-white p-2 shadow-xl border border-amber-50 transform transition-transform group-hover:scale-105 group-hover:rotate-3 duration-500">
                        <div className="w-full h-full rounded-[1.5rem] bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center text-white text-4xl font-black shadow-inner">
                          {leaderboard[2].name[0]}
                        </div>
                      </div>
                      <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-white rounded-2xl shadow-lg border border-amber-50 flex items-center justify-center text-amber-600">
                        <Award size={24} className="fill-current" />
                      </div>
                    </div>
                    <div className="text-center">
                      <h3 className="text-xl font-black text-surface-900 tracking-tighter uppercase leading-none mb-1">{leaderboard[2].name}</h3>
                      <p className="text-[10px] font-black text-amber-600 uppercase tracking-[0.2em]">Elite Architect</p>
                      <div className="mt-4 bg-amber-50 border border-amber-100 rounded-2xl px-6 py-2 shadow-sm">
                        <span className="text-lg font-black text-amber-700 tracking-tighter">{leaderboard[2].engagementScore}</span>
                        <span className="ml-1 text-[10px] font-black text-amber-500 uppercase tracking-widest">XP</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Enhanced Rankings List */}
              <div className="space-y-4 pt-10">
                <div className="px-8 flex items-center text-[10px] font-black text-surface-400 uppercase tracking-[0.25em]">
                  <div className="w-12 text-center">Rank</div>
                  <div className="flex-1 ml-10">Contributor Identity</div>
                  <div className="w-32 text-center">Engagement Stats</div>
                  <div className="w-24 text-right">Influence</div>
                </div>

                <div className="space-y-3">
                  {leaderboard.map((user, index) => {
                    const isCurrentUser = user._id === currentUser?._id;
                    const rankStyle = getRankColor(index);

                    return (
                      <div
                        key={user._id}
                        className={`group flex items-center gap-6 px-8 py-5 rounded-[2rem] transition-all duration-500 border-2 ${isCurrentUser
                          ? 'bg-brand-50 border-brand-200 shadow-xl shadow-brand-500/10'
                          : 'bg-white border-transparent hover:border-surface-200 hover:shadow-premium'
                          }`}
                      >
                        {/* Rank Circle */}
                        <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 ${rankStyle}`}>
                          {getRankIcon(index)}
                        </div>

                        {/* User Meta */}
                        <div className="flex items-center gap-5 flex-1 min-w-0 ml-4">
                          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black text-white shadow-lg overflow-hidden relative ${index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-slate-500' : index === 2 ? 'bg-amber-600' : 'bg-surface-800'
                            }`}>
                            {user.name[0]}
                            {isCurrentUser && (
                              <div className="absolute inset-x-0 bottom-0 h-1 bg-brand-400"></div>
                            )}
                          </div>
                          <div className="truncate">
                            <div className="flex items-center gap-3">
                              <h4 className="font-black text-surface-900 uppercase tracking-tight text-lg leading-none">{user.name}</h4>
                              {isCurrentUser && (
                                <span className="px-2 py-0.5 bg-brand-600 text-white text-[8px] font-black uppercase tracking-widest rounded-lg">YOU</span>
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-[10px] text-surface-400 mt-2 font-black uppercase tracking-widest">
                              <span className="flex items-center gap-1"><Layers size={10} /> {user.ideasCreated} Created</span>
                              <span className="flex items-center gap-1"><Users size={10} /> {user.ideasJoined} Joined</span>
                            </div>
                          </div>
                        </div>

                        {/* Mini Stats Grid */}
                        <div className="hidden lg:flex w-32 items-center justify-center gap-2">
                          {Array.from({ length: Math.min(5, Math.ceil(user.engagementScore / 100)) }).map((_, i) => (
                            <div key={i} className={`w-1.5 h-6 rounded-full ${index < 3 ? 'bg-brand-500' : 'bg-surface-200'}`}></div>
                          ))}
                        </div>

                        {/* Score Section */}
                        <div className="text-right flex items-center gap-6">
                          <div className="space-y-0.5">
                            <div className={`text-2xl font-black tracking-tighter ${isCurrentUser ? 'text-brand-600' : 'text-surface-900'}`}>{user.engagementScore}</div>
                            <div className="text-[9px] uppercase tracking-[0.2em] text-surface-400 font-bold">Points</div>
                          </div>
                          <button className="p-3 bg-surface-50 text-surface-300 rounded-2xl group-hover:bg-brand-600 group-hover:text-white transition-all">
                            <ChevronRight size={18} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Promotion Banner */}
              <div className="p-10 rounded-[3rem] premium-gradient text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-110 transition-transform duration-1000">
                  <Trophy size={200} />
                </div>
                <div className="relative z-10 max-w-xl">
                  <h2 className="text-3xl font-black tracking-tighter uppercase italic mb-4">Wanna top the charts?</h2>
                  <p className="text-white/80 font-bold mb-8 leading-relaxed">Engagement is the key. Collaborate on new ideas, complete your milestones, and submit visionary projects to climb the global rankings.</p>
                  <div className="flex gap-4">
                    <button onClick={() => navigate('/dashboard')} className="px-8 py-3 bg-white text-brand-600 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-brand-900/40 hover:-translate-y-1 transition-all">Explore Ideas</button>
                    <button onClick={() => navigate('/new-idea')} className="px-8 py-3 bg-brand-400/20 backdrop-blur-md border border-white/20 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all">Create Project</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Leaderboard;
