import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { Button, Input, Card } from '../../components/common/Components';
import { Upload, X, ImageIcon, Sparkles, Zap, Plus, ArrowLeft, Target, Rocket } from 'lucide-react';

const CreateIdea = () => {
 const navigate = useNavigate();
 const [formData, setFormData] = useState({
  title: '',
  description: '',
  category: '',
  requiredSkills: '',
  contactEmail: '',
 });
 const [imageFile, setImageFile] = useState(null);
 const [imagePreview, setImagePreview] = useState(null);
 const [isSubmitting, setIsSubmitting] = useState(false);

 const handleChange = (e) => {
  setFormData({ ...formData, [e.target.id]: e.target.value });
 };

 const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
   setImageFile(file);
   const reader = new FileReader();
   reader.onloadend = () => {
    setImagePreview(reader.result);
   };
   reader.readAsDataURL(file);
  }
 };

 const removeImage = () => {
  setImageFile(null);
  setImagePreview(null);
 };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
   const data = new FormData();
   data.append('title', formData.title);
   data.append('description', formData.description);
   data.append('category', formData.category);
   data.append('contactEmail', formData.contactEmail);
   data.append('requiredSkills', formData.requiredSkills);

   if (imageFile) {
    data.append('image', imageFile);
   }

   await api.post('/ideas', data, {
    headers: {
     'Content-Type': 'multipart/form-data',
    },
   });
   toast.success('Your vision has been deployed!');

   navigate('/dashboard');
  } catch (error) {
   console.error(error);
   toast.error(error.response?.data?.message || 'Failed to create idea');
  } finally {
   setIsSubmitting(false);
  }
 };

 return (
  <div className="flex-1 bg-surface-50 min-h-screen py-16 px-8 selection:bg-brand-100">
   <div className="max-w-3xl mx-auto">

    {/* Header Section */}
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
     <div className="space-y-1">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-surface-400 font-black text-[10px] uppercase tracking-widest hover:text-brand-600 transition-colors mb-4">
       <ArrowLeft size={14} /> Back to Hub
      </button>
      <h1 className="text-4xl font-black text-surface-900 tracking-tighter uppercase flex items-center gap-3 leading-none">
       Spawn <span className="text-brand-600">New Idea</span> <Sparkles className="text-brand-500" size={28} />
      </h1>
      <p className="text-xs font-bold text-surface-400 uppercase tracking-widest">Deploy your vision to the <span className="text-surface-900 italic">IdeaWaves Ecosystem</span>.</p>
     </div>

     <div className="hidden md:flex items-center gap-3 p-4 bg-white rounded-2xl shadow-premium border border-surface-100">
      <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center">
       <Target size={20} />
      </div>
      <div>
       <p className="text-[10px] font-black text-surface-400 uppercase tracking-tight">Project Score</p>
       <p className="text-sm font-black text-surface-900">+50 XP Potential</p>
      </div>
     </div>
    </div>

    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-8">

     {/* Main Info */}
     <div className="md:col-span-8 space-y-8">
      <Card className="p-10 border-none shadow-premium animate-in">
       <div className="space-y-8">
        <div className="space-y-2">
         <label className="text-[10px] font-black text-surface-400 uppercase tracking-widest ml-1">Project Identity</label>
         <input
          id="title"
          required
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g. Decentralized Voting Platform"
          className="w-full px-6 py-4 bg-surface-50 border border-surface-200 rounded-2xl text-lg font-black tracking-tight focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all placeholder:text-surface-200"
         />
        </div>

        <div className="space-y-2">
         <label className="text-[10px] font-black text-surface-400 uppercase tracking-widest ml-1">Core Vision</label>
         <textarea
          id="description"
          required
          rows="6"
          value={formData.description}
          onChange={handleChange}
          placeholder="Explain the problem you're solving and how your idea works..."
          className="w-full px-6 py-4 bg-surface-50 border border-surface-200 rounded-2xl text-sm font-bold leading-relaxed focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all placeholder:text-surface-200 resize-none no-scrollbar"
         />
        </div>
       </div>
      </Card>

      <Card className="p-10 border-none shadow-premium animate-in" style={{ animationDelay: '0.1s' }}>
       <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="space-y-2">
         <label className="text-[10px] font-black text-surface-400 uppercase tracking-widest ml-1">Domain Category</label>
         <input
          id="category"
          required
          value={formData.category}
          onChange={handleChange}
          placeholder="e.g. Fintech, EdTech"
          className="w-full px-5 py-3.5 bg-surface-50 border border-surface-200 rounded-2xl text-xs font-black uppercase tracking-widest focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all"
         />
        </div>
        <div className="space-y-2">
         <label className="text-[10px] font-black text-surface-400 uppercase tracking-widest ml-1">Support Endpoint</label>
         <input
          id="contactEmail"
          type="email"
          required
          value={formData.contactEmail}
          onChange={handleChange}
          placeholder="your@email.com"
          className="w-full px-5 py-3.5 bg-surface-50 border border-surface-200 rounded-2xl text-xs font-black tracking-widest focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all"
         />
        </div>
       </div>
      </Card>

      <Card className="p-10 border-none shadow-premium animate-in" style={{ animationDelay: '0.2s' }}>
       <div className="space-y-2">
        <label className="text-[10px] font-black text-surface-400 uppercase tracking-widest ml-1">Required Stack / Capabilities</label>
        <input
         id="requiredSkills"
         required
         value={formData.requiredSkills}
         onChange={handleChange}
         placeholder="e.g. Solidity, React, Python (comma separated)"
         className="w-full px-6 py-4 bg-surface-50 border border-surface-200 rounded-2xl text-sm font-black tracking-tight focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all placeholder:text-surface-200"
        />
       </div>
      </Card>
     </div>

     {/* Media & Submit */}
     <div className="md:col-span-4 space-y-8">
      <Card className="p-8 border-none shadow-premium bg-white animate-in" style={{ animationDelay: '0.3s' }}>
       <label className="text-[10px] font-black text-surface-400 uppercase tracking-widest block mb-4">Visual Asset</label>
       {!imagePreview ? (
        <label htmlFor="image-upload" className="flex flex-col items-center justify-center w-full h-56 border-2 border-dashed border-surface-200 rounded-[2.5rem] bg-surface-50 hover:bg-white hover:border-brand-500 hover:shadow-xl transition-all cursor-pointer group group">
         <div className="text-center group-hover:scale-105 transition-transform">
          <Upload className="w-10 h-10 text-surface-300 group-hover:text-brand-600 mx-auto mb-3" />
          <p className="text-[10px] font-black text-surface-400 uppercase tracking-widest">Drop Image</p>
         </div>
         <input id="image-upload" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
        </label>
       ) : (
        <div className="relative group rounded-[2.5rem] overflow-hidden shadow-2xl">
         <img src={imagePreview} alt="Preview" className="w-full h-56 object-cover" />
         <button type="button" onClick={removeImage} className="absolute top-4 right-4 p-3 bg-red-500 text-white rounded-2xl shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:scale-110">
          <X size={18} />
         </button>
         <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
          <p className="text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
           <ImageIcon size={12} /> Asset Uploaded
          </p>
         </div>
        </div>
       )}
      </Card>

      <div className="space-y-4">
       <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-20 rounded-[2.5rem] text-sm font-black uppercase tracking-[0.2em] shadow-xl shadow-brand-500/30 flex items-center justify-center gap-3"
       >
        {isSubmitting ? (
         <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
        ) : (
         <>
          <Rocket size={20} /> DEPLOY IDEA
         </>
        )}
       </Button>
       <Button
        onClick={() => navigate(-1)}
        variant="outline"
        className="w-full h-14 rounded-2xl border-2 border-surface-200 text-surface-400 hover:text-surface-900 font-black tracking-widest text-[10px] uppercase"
       >
        Abort Operation
       </Button>
      </div>

      <div className="p-6 bg-surface-900 rounded-[2rem] text-white overflow-hidden relative group">
       <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:rotate-12 transition-transform"><Zap size={40} className="text-brand-400" /></div>
       <p className="text-[10px] font-black opacity-40 uppercase tracking-widest mb-3 italic">Innovation Tip</p>
       <p className="text-xs font-bold leading-relaxed">Projects with clear tech stacks and cover images get <span className="text-brand-400">4x more</span> join requests.</p>
      </div>
     </div>

    </form>
   </div>
  </div>
 );
};

export default CreateIdea;
