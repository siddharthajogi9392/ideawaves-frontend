import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, Award, BookOpen, Edit2, Shield, Sparkles, Zap, Star, ArrowRight, Save, X, Lock } from 'lucide-react';
import { Button, Card, Input } from '../../components/common/Components';
import api from '../../services/api';

const Profile = () => {
 const { user, updateUser } = useAuth();
 const [isEditing, setIsEditing] = useState(false);
 const [formData, setFormData] = useState({
  name: user?.name || '',
  email: user?.email || '',
  password: '',
  skills: user?.skills?.join(', ') || ''
 });
 const [loading, setLoading] = useState(false);

 const handleChange = (e) => {
  setFormData({ ...formData, [e.target.id]: e.target.value });
 };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
   const res = await api.put('/auth/profile', formData);
   updateUser(res.data);
   setIsEditing(false);
    toast.success('Profile updated successfully!');
  } catch (error) {
   console.error(error);
    toast.error(error.response?.data?.message || 'Failed to update profile');
  } finally {
   setLoading(false);
  }
 };

 return (
  <div className="flex-1 bg-surface-50 min-h-screen overflow-y-auto selection:bg-brand-100">
   {/* Hero Banner Section */}
   <div className="relative">
    <div className="h-64 bg-gradient-to-br from-brand-600 via-brand-700 to-indigo-900 overflow-hidden">
     <div className="absolute inset-0 opacity-20 pointer-events-none">
      <svg className="w-full h-full" viewBox="0 0 1440 400" fill="none" xmlns="http://www.w3.org/2000/svg">
       <path d="M0 200C240 300 480 100 720 200C960 300 1200 100 1440 200V0H0V200Z" fill="white" />
      </svg>
     </div>
    </div>

    <div className="max-w-5xl mx-auto px-8">
     <div className="relative -mt-32 mb-12">
      <div className="flex flex-col md:flex-row items-end gap-8">
       <div className="relative group">
        <div className="w-44 h-44 rounded-[2.5rem] bg-white p-2 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
         <div className="w-full h-full rounded-[2rem] bg-gradient-to-br from-brand-500 to-indigo-600 flex items-center justify-center text-white text-6xl font-black shadow-inner">
          {user?.name?.[0] || 'U'}
         </div>
        </div>
        <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center text-brand-600 border border-surface-100">
         <Star className="w-6 h-6 fill-current" />
        </div>
       </div>

       <div className="flex-1 mb-4">
        <div className="flex items-center gap-3 mb-2">
         <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black text-white uppercase tracking-widest border border-white/10">
          ID: {user?._id?.slice(-6).toUpperCase()}
         </span>
         <div className="flex items-center gap-1.5 px-3 py-1 bg-teal-400 rounded-full text-[10px] font-black text-teal-900 uppercase tracking-widest">
          <Zap size={12} className="fill-current" /> Verified
         </div>
        </div>
        <h1 className="text-5xl font-black text-white tracking-tighter uppercase drop-shadow-md">
         {user?.name}
        </h1>
        <p className="text-brand-100 font-bold flex items-center gap-2 mt-2 opacity-90 tracking-wide">
         <Shield size={18} className="text-indigo-300" />
         Official Student Contributor @ SRIT
        </p>
       </div>

       <div className="flex gap-3 mb-4">
        <Button variant="outline" className="rounded-2xl h-12 px-6 bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-md">
         Share Profile
        </Button>
        <Button
         onClick={() => setIsEditing(!isEditing)}
         className={`rounded-2xl h-12 px-8 shadow-xl ${isEditing ? 'bg-surface-800 hover:bg-surface-900 shadow-surface-900/40' : 'bg-brand-600 hover:bg-brand-700 shadow-brand-900/40'}`}
        >
         {isEditing ? <X size={18} className="mr-2" /> : <Edit2 size={18} className="mr-2" />}
         {isEditing ? 'Cancel' : 'Edit Profile'}
        </Button>
       </div>
      </div>
     </div>
    </div>
   </div>

   {/* Main Content Grid */}
   <div className="max-w-5xl mx-auto px-8 pb-20">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

     {/* Left Column - Stats */}
     <div className="lg:col-span-4 space-y-8">
      <Card className="overflow-hidden border-none shadow-premium relative">
       <div className="absolute top-0 right-0 p-4 opacity-10"><Zap size={40} className="text-brand-600" /></div>
       <h3 className="text-[10px] font-black text-surface-400 uppercase tracking-[0.25em] mb-8">Ecosystem Analytics</h3>
       <div className="space-y-6">
        <div className="flex items-center justify-between group">
         <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center transition-colors group-hover:bg-orange-500 group-hover:text-white">
           <Award size={22} />
          </div>
          <div>
           <p className="text-[10px] font-black text-surface-400 uppercase tracking-tighter">Authored</p>
           <p className="font-black text-surface-900 text-lg uppercase leading-none">Ideas</p>
          </div>
         </div>
         <span className="text-3xl font-black text-surface-900 tracking-tighter">{user?.ideasCreatedCount || 0}</span>
        </div>

        <div className="flex items-center justify-between group text-brand-600">
         <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center transition-colors group-hover:bg-brand-600 group-hover:text-white">
           <BookOpen size={22} />
          </div>
          <div>
           <p className="text-[10px] font-black opacity-60 uppercase tracking-tighter">Active</p>
           <p className="font-black text-lg uppercase leading-none">Collabs</p>
          </div>
         </div>
         <span className="text-3xl font-black tracking-tighter">{user?.ideasJoinedCount || 0}</span>
        </div>
       </div>
      </Card>

     </div>

     {/* Right Column - User Data / Edit Form */}
     <div className="lg:col-span-8 space-y-8">
      {isEditing ? (
       <Card className="p-10 border-none shadow-premium animate-in">
        <form onSubmit={handleSubmit} className="space-y-8">
         <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-black text-surface-900 uppercase tracking-tighter">
           Update Repository
          </h3>
          <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center shadow-inner">
           <Edit2 size={24} />
          </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
           <label className="text-[10px] font-black text-surface-400 uppercase tracking-widest ml-1">Full Identity</label>
           <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-300 pointer-events-none" size={18} />
            <input
             id="name"
             type="text"
             required
             value={formData.name}
             onChange={handleChange}
             className="w-full pl-12 pr-4 py-4 bg-surface-50 border border-surface-200 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all"
            />
           </div>
          </div>

          <div className="space-y-2">
           <label className="text-[10px] font-black text-surface-400 uppercase tracking-widest ml-1">Endpoint Link</label>
           <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-300 pointer-events-none" size={18} />
            <input
             id="email"
             type="email"
             required
             value={formData.email}
             onChange={handleChange}
             className="w-full pl-12 pr-4 py-4 bg-surface-50 border border-surface-200 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all"
            />
           </div>
          </div>

          <div className="space-y-2">
           <label className="text-[10px] font-black text-surface-400 uppercase tracking-widest ml-1">Skill Inventory (Comma Separated)</label>
           <div className="relative">
            <Zap className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-300 pointer-events-none" size={18} />
            <input
             id="skills"
             type="text"
             value={formData.skills}
             onChange={handleChange}
             placeholder="React, Node, Figma..."
             className="w-full pl-12 pr-4 py-4 bg-surface-50 border border-surface-200 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all"
            />
           </div>
          </div>

          <div className="space-y-2">
           <label className="text-[10px] font-black text-surface-400 uppercase tracking-widest ml-1">New Security Key (Optional)</label>
           <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-300 pointer-events-none" size={18} />
            <input
             id="password"
             type="password"
             value={formData.password}
             onChange={handleChange}
             placeholder="Leave blank to maintain current"
             className="w-full pl-12 pr-4 py-4 bg-surface-50 border border-surface-200 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all"
            />
           </div>
          </div>
         </div>

         <div className="flex gap-4 pt-4">
          <Button
           type="submit"
           disabled={loading}
           className="flex-1 h-14 rounded-2xl shadow-xl shadow-brand-500/20 uppercase tracking-widest text-[10px] font-black"
          >
           {loading ? 'Transmitting...' : <><Save size={18} className="mr-2" /> Commit Changes</>}
          </Button>
          <Button
           onClick={() => setIsEditing(false)}
           variant="outline"
           className="h-14 px-8 rounded-2xl border-2 border-surface-100 text-surface-400 uppercase tracking-widest text-[10px] font-black hover:text-surface-900"
          >
           Abort
          </Button>
         </div>
        </form>
       </Card>
      ) : (
       <>
        <Card className="p-10 border-none shadow-premium animate-in">
         <h3 className="text-xl font-black text-surface-900 uppercase tracking-tighter mb-10 pb-6 border-b border-surface-50">
          Personal Repository
         </h3>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          <div className="space-y-1.5">
           <p className="text-[10px] font-black text-surface-400 uppercase tracking-widest">Primary Identity</p>
           <p className="text-surface-900 font-bold text-lg flex items-center gap-3">
            <User className="w-5 h-5 text-brand-600" /> {user?.name}
           </p>
          </div>
          <div className="space-y-1.5">
           <p className="text-[10px] font-black text-surface-400 uppercase tracking-widest">Endpoint Communication</p>
           <p className="text-surface-900 font-bold text-lg flex items-center gap-3">
            <Mail className="w-5 h-5 text-brand-600" /> {user?.email}
           </p>
          </div>
          <div className="space-y-1.5">
           <p className="text-[10px] font-black text-surface-400 uppercase tracking-widest">Operational Status</p>
           <div className="flex">
            <span className="bg-brand-50 text-brand-600 font-black text-[10px] px-4 py-2 rounded-xl border border-brand-100 flex items-center gap-2 group cursor-default">
             <div className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse"></div>
             DEPLOYED : ACTIVE INNOVATOR
            </span>
           </div>
          </div>
          <div className="space-y-1.5">
           <p className="text-[10px] font-black text-surface-400 uppercase tracking-widest">Session Registration</p>
           <p className="text-surface-900 font-black text-lg italic tracking-tight uppercase">Q1 / 2026 CYCLE</p>
          </div>
         </div>
        </Card>

        <Card className="p-10 border-none shadow-premium animate-in" style={{ animationDelay: '0.1s' }}>
         <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-black text-surface-900 uppercase tracking-tighter">Skill Stack</h3>
          <span className="text-[10px] font-black text-brand-600 uppercase tracking-widest">Self Verified</span>
         </div>
         <div className="flex flex-wrap gap-3">
          {user?.skills?.length > 0 ? (
           user.skills.map((skill, i) => (
            <div key={i} className="px-5 py-3 bg-surface-50 text-surface-800 font-black text-[10px] rounded-2xl border border-surface-100 hover:border-brand-500 hover:text-brand-600 hover:bg-white transition-all cursor-pointer uppercase tracking-widest shadow-sm group">
             {skill} <ArrowRight size={10} className="inline ml-1 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all font-bold" />
            </div>
           ))
          ) : (
           <p className="text-xs text-surface-400 font-bold uppercase tracking-widest italic">No skills listed in inventory.</p>
          )}
          <button onClick={() => setIsEditing(true)} className="px-5 py-3 bg-white text-brand-600 font-black text-[10px] rounded-2xl border-2 border-dashed border-brand-100 hover:border-brand-500 transition-all uppercase tracking-widest">
           + Add Capability
          </button>
         </div>
        </Card>
       </>
      )}
     </div>
    </div>
   </div>
  </div>
 );
};

export default Profile;
