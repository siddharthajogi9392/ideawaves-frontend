import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../../services/api';
import { Button, Card } from '../../components/common/Components';
import {
  Send,
  CheckCircle,
  Clock,
  ArrowLeft,
  Users,
  Sparkles,
  MessageSquare,
  Mail,
  Shield,
  Layers,
  Zap,
  Star,
  Activity
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const IdeaDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [idea, setIdea] = useState(null);
  const [requestStatus, setRequestStatus] = useState(null); // 'Pending', 'Approved', 'Rejected', or null
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const fetchIdeaAndStatus = async () => {
      try {
        const ideaRes = await api.get(`/ideas/${id}`);
        setIdea(ideaRes.data);

        if (ideaRes.data.myRequestStatus) {
          setRequestStatus(ideaRes.data.myRequestStatus);
        }
      } catch (err) {
        console.error("Failed to load idea", err);
      } finally {
        setLoading(false);
      }
    };
    fetchIdeaAndStatus();
  }, [id]);

  const handleJoinRequest = async () => {
    setSending(true);
    try {
      await api.post('/requests/send', { ideaId: id });
      setRequestStatus('Pending');
      toast.success('Join request sent successfully! The owner will review your profile.');
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to send request');
    } finally {
      setSending(false);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-40 gap-6">
      <div className="w-16 h-16 border-4 border-brand-100 border-t-brand-600 rounded-full animate-spin"></div>
      <p className="text-xs font-black text-surface-400 uppercase tracking-widest animate-pulse">Initializing Interface...</p>
    </div>
  );

  if (!idea) return (
    <div className="max-w-xl mx-auto py-40 text-center">
      <Card className="p-12">
        <Layers className="w-16 h-16 text-surface-200 mx-auto mb-6" />
        <h1 className="text-2xl font-black text-surface-900 uppercase tracking-tighter mb-2">Idea Not Found</h1>
        <p className="text-surface-500 mb-8">This project might have been removed or the link is incorrect.</p>
        <Button onClick={() => navigate('/dashboard')} variant="primary" className="rounded-2xl px-8">Back to Dashboard</Button>
      </Card>
    </div>
  );

  const isOwner = idea.ownerId?._id === user._id || idea.ownerId === user._id;
  const isContributor = idea.contributors?.some(c => (c._id || c) === user._id);
  const progress = idea.status === 'Completed' ? 100 : (idea.status === 'In Progress' ? 60 : 15);

  return (
    <div className="flex-1 bg-surface-50 min-h-screen">
      {/* Hero Header Section */}
      <div className="relative">
        <div className="h-96 md:h-[450px] overflow-hidden relative group">
          {idea.image ? (
            <img src={idea.image} alt={idea.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full premium-gradient flex items-center justify-center relative">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
              <Layers className="w-32 h-32 text-white opacity-20" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-surface-900 via-surface-900/40 to-transparent"></div>

          <div className="absolute top-8 left-8">
            <button onClick={() => navigate(-1)} className="p-3 bg-white/20 backdrop-blur-md rounded-2xl text-white hover:bg-white/30 transition-all group">
              <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="absolute bottom-12 left-0 w-full px-8 md:px-12">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-wrap items-center gap-3 mb-6 animate-in">
                <span className="px-4 py-1.5 bg-brand-600 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">
                  {idea.category}
                </span>
                <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg flex items-center gap-2 ${idea.status === 'Completed' ? 'bg-green-500 text-white' :
                    idea.status === 'In Progress' ? 'bg-brand-500 text-white' : 'bg-gray-800 text-white'
                  }`}>
                  <div className={`w-2 h-2 rounded-full ${idea.status === 'Completed' ? 'bg-white' : 'bg-white animate-pulse'}`}></div>
                  {idea.status}
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-tight mb-4 animate-in" style={{ animationDelay: '0.1s' }}>
                {idea.title}
              </h1>
              <div className="flex items-center gap-6 text-white/70 font-bold animate-in" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-center gap-2 text-white">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white font-black border border-white/20 overflow-hidden">
                    {idea.ownerId?.name?.[0] || 'U'}
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] uppercase tracking-widest leading-none mb-1 opacity-60">Architect</p>
                    <p className="text-sm font-black tracking-tight">{idea.ownerId?.name || 'Unknown'}</p>
                  </div>
                </div>
                <div className="h-8 w-px bg-white/20"></div>
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <p className="text-xs uppercase tracking-widest">Active Since Oct 2025</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="max-w-6xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Left Column - Details */}
          <div className="lg:col-span-8 space-y-12">
            <section className="animate-in" style={{ animationDelay: '0.3s' }}>
              <h2 className="text-xs font-black text-surface-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
                <Activity size={16} className="text-brand-600" /> Executive Summary
              </h2>
              <p className="text-xl text-surface-800 leading-relaxed font-medium italic opacity-90 border-l-4 border-brand-500 pl-8">
                "{idea.description}"
              </p>
            </section>

            <section className="animate-in" style={{ animationDelay: '0.4s' }}>
              <h2 className="text-xs font-black text-surface-400 uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                <Zap size={16} className="text-brand-600" /> Tech Stack & Capability
              </h2>
              <div className="flex flex-wrap gap-3">
                {idea.requiredSkills?.map((skill, i) => (
                  <div key={i} className="px-6 py-4 bg-white border border-surface-200/50 rounded-2xl shadow-sm hover:border-brand-500 group transition-all cursor-default">
                    <p className="text-xs font-black text-surface-900 uppercase tracking-widest flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-brand-500"></span> {skill}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="animate-in" style={{ animationDelay: '0.5s' }}>
              <h2 className="text-xs font-black text-surface-400 uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                <Users size={16} className="text-brand-600" /> Operational Team
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6 border-none shadow-premium flex items-center gap-5 group hover:bg-brand-50 transition-all duration-500">
                  <div className="w-14 h-14 rounded-2xl bg-brand-600 text-white flex items-center justify-center text-xl font-black shadow-lg">
                    {idea.ownerId?.name?.[0] || 'U'}
                  </div>
                  <div className="text-left">
                    <p className="text-lg font-black text-surface-900 leading-none mb-1 group-hover:text-brand-600 transition-colors uppercase tracking-tight">{idea.ownerId?.name}</p>
                    <p className="text-[10px] font-black text-brand-600 uppercase tracking-widest">Project Lead</p>
                  </div>
                </Card>
                {idea.contributors?.map((contributor, i) => (
                  <Card key={i} className="p-6 border-none shadow-premium flex items-center gap-5 group hover:bg-brand-50 transition-all duration-500">
                    <div className="w-14 h-14 rounded-2xl bg-surface-800 text-white flex items-center justify-center text-xl font-black shadow-lg">
                      {contributor.name?.[0] || 'U'}
                    </div>
                    <div className="text-left">
                      <p className="text-lg font-black text-surface-900 leading-none mb-1 group-hover:text-brand-600 transition-colors uppercase tracking-tight">{contributor.name}</p>
                      <p className="text-[10px] font-black text-surface-400 uppercase tracking-widest">Contributor</p>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Status/Actions */}
          <div className="lg:col-span-4 space-y-8 animate-in" style={{ animationDelay: '0.6s' }}>
            <Card className="p-10 border-none shadow-premium bg-surface-900 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10"><Sparkles size={100} className="text-brand-400" /></div>

              <h3 className="text-[10px] font-black opacity-40 uppercase tracking-[0.3em] mb-10">Project Engine</h3>

              <div className="space-y-10">
                <div className="space-y-3">
                  <div className="flex justify-between items-end">
                    <p className="text-[10px] font-black opacity-60 uppercase tracking-widest">Global Progress</p>
                    <p className="text-xl font-black text-brand-400 tracking-tighter">{progress}%</p>
                  </div>
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-400 shadow-[0_0_15px_rgba(129,140,248,0.5)] transition-all duration-1000" style={{ width: `${progress}%` }}></div>
                  </div>
                </div>

                <div className="space-y-6 pt-6 border-t border-white/10">
                  {isOwner ? (
                    <div className="space-y-4">
                      <div className="flex items-start gap-4 p-5 bg-white/5 rounded-2xl border border-white/10">
                        <Shield className="text-brand-400 flex-shrink-0" size={24} />
                        <p className="text-xs font-bold leading-relaxed">System recognizes you as the <span className="text-brand-400 font-black">Authorized Owner</span>. Administrative panels are active.</p>
                      </div>
                      <Button onClick={() => navigate('/requests')} className="w-full h-14 rounded-2xl bg-white text-surface-900 hover:bg-brand-50 shadow-xl font-black tracking-widest">
                        MANAGE CREW
                      </Button>
                      {idea.status !== 'Requested' && (
                        <Button onClick={() => navigate(`/chat/${idea._id}`)} variant="outline" className="w-full h-14 rounded-2xl border-2 border-white/20 text-white hover:bg-white/10 font-black tracking-widest">
                          <MessageSquare className="mr-2" size={18} /> OPEN COMMS
                        </Button>
                      )}
                    </div>
                  ) : idea.status === 'Completed' ? (
                    <div className="space-y-4 text-center">
                      <div className="p-8 bg-white/5 rounded-[2rem] border border-white/10">
                        <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                        <p className="text-xs font-black uppercase tracking-widest text-green-400 mb-2">Cycle Concluded</p>
                        <p className="text-xs font-bold opacity-60">This project has reached its deployment phase and the team is finalized.</p>
                      </div>
                      {(isContributor || requestStatus === 'Approved') && (
                        <Button onClick={() => navigate(`/chat/${idea._id}`)} variant="outline" className="w-full h-14 rounded-2xl border-2 border-white/20 text-white hover:bg-white/10 font-black tracking-widest">
                          VIEW HISTORY
                        </Button>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {requestStatus === 'Approved' || isContributor ? (
                        <div className="space-y-4">
                          <div className="p-5 bg-green-500/10 border border-green-500/30 rounded-2xl flex items-center gap-3">
                            <Zap size={20} className="text-green-400" />
                            <p className="text-xs font-black text-green-400 uppercase tracking-widest">Access Granted</p>
                          </div>
                          <Button onClick={() => navigate(`/chat/${idea._id}`)} className="w-full h-14 rounded-2xl bg-brand-500 text-white hover:bg-brand-600 shadow-xl font-black tracking-widest">
                            <MessageSquare className="mr-2" size={18} /> TEAM CHAT
                          </Button>
                        </div>
                      ) : requestStatus === 'Pending' ? (
                        <div className="p-8 bg-amber-500/10 border border-amber-500/30 rounded-3xl text-center">
                          <Clock className="w-10 h-10 text-amber-400 mx-auto mb-4 animate-pulse" />
                          <p className="text-xs font-black text-amber-400 uppercase tracking-widest mb-1">Authorization Pending</p>
                          <p className="text-[10px] font-bold opacity-60 uppercase tracking-tighter">Owner is currently reviewing your profile.</p>
                        </div>
                      ) : requestStatus === 'Rejected' ? (
                        <div className="p-8 bg-red-500/10 border border-red-500/30 rounded-3xl text-center">
                          <XCircle className="w-10 h-10 text-red-400 mx-auto mb-4" />
                          <p className="text-xs font-black text-red-400 uppercase tracking-widest">Review Cycle Ended</p>
                          <p className="text-[10px] font-bold opacity-60 uppercase tracking-tighter">The team has reached capacity or your stack didn't match.</p>
                        </div>
                      ) : (
                        <Button
                          onClick={handleJoinRequest}
                          disabled={sending}
                          className="w-full h-16 rounded-3xl bg-white text-surface-900 hover:bg-brand-50 shadow-2xl shadow-white/10 font-black tracking-[0.2em] transform active:scale-95 transition-all"
                        >
                          {sending ? 'TRANSMITTING...' : 'REQUEST JOIN'}
                        </Button>
                      )}
                    </div>
                  )}

                  <div className="pt-6 border-t border-white/10 space-y-3">
                    <p className="text-[10px] font-black opacity-40 uppercase tracking-[0.3em]">Operational Endpoint</p>
                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl text-brand-100">
                      <Mail size={16} />
                      <span className="text-xs font-black tracking-tight">{idea.contactEmail}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8 border-none shadow-premium bg-white">
              <div className="flex justify-between items-center mb-6">
                <h4 className="text-[10px] font-black text-surface-400 uppercase tracking-widest">Ecosystem Activity</h4>
                <span className="text-xs font-black text-brand-600 tracking-tighter italic">LIVE</span>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-1 h-1 rounded-full bg-brand-500 mt-2"></div>
                  <p className="text-[10px] font-bold text-surface-700 leading-tight">Project reached <span className="font-black">60% milestone</span> yesterday.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1 h-1 rounded-full bg-brand-500 mt-2"></div>
                  <p className="text-[10px] font-bold text-surface-700 leading-tight">New contributor <span className="font-black text-brand-600">vyshnavi</span> joined the crew.</p>
                </div>
                <div className="flex items-start gap-3 opacity-40">
                  <div className="w-1 h-1 rounded-full bg-brand-500 mt-2"></div>
                  <p className="text-[10px] font-bold text-surface-700 leading-tight">Initial repository deployment successfully validated.</p>
                </div>
              </div>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
};

const XCircle = ({ size, className }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);

export default IdeaDetails;
