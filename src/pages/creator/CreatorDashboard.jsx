import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import Sidebar from '../../components/layout/Sidebar';
import { Search, Plus, MoreHorizontal } from 'lucide-react';
import { Button } from '../../components/common/Components';

const CreatorDashboard = () => {
 const [ideas, setIdeas] = useState([]);
 const [loading, setLoading] = useState(true);
 const [search, setSearch] = useState('');

 // Form State for "Quick Create"
 const [formData, setFormData] = useState({
  title: '',
  description: '',
  category: 'Technology',
  requiredSkills: '',
  contactEmail: '',
  image: null // Changed to store File object
 });
 const [isSubmitting, setIsSubmitting] = useState(false);
 const navigate = useNavigate();

 // Fetch Ideas
 useEffect(() => {
  const fetchIdeas = async () => {
   try {
    const res = await api.get('/ideas');
    setIdeas(res.data);
   } catch (err) {
    console.error("Failed to fetch ideas", err);
   } finally {
    setLoading(false);
   }
  };
  fetchIdeas();
 }, []);

 // Handle Create Form
 const handleFormChange = (e) => {
  setFormData({ ...formData, [e.target.id]: e.target.value });
 };

 // Handle File Change
 const handleFileChange = (e) => {
  setFormData({ ...formData, image: e.target.files[0] });
 };


 const handleCreate = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  try {
   const data = new FormData();
   data.append('title', formData.title);
   data.append('description', formData.description);
   data.append('category', formData.category);
   // Split skills here before appending or let backend handle comma string if we send as string. 
   // Sending as string and letting backend split (or splitting here and sending multiple entries)
   // My backend logic: Array.isArray(requiredSkills) ? ... : .split(',')
   // So better to send as string if that's what backend can handle, OR loop.
   // Let's send regular string fields, and single file.
   data.append('requiredSkills', formData.requiredSkills);
   data.append('contactEmail', formData.contactEmail);
   if (formData.image) {
    data.append('image', formData.image);
   }

   const res = await api.post('/ideas', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
   });
   setIdeas([res.data, ...ideas]); // Add new idea to top of list
   setFormData({
    title: '',
    description: '',
    category: 'Technology',
    requiredSkills: '',
    contactEmail: '',
    image: null
   });
   // Reset file input (manual DOM reset or React ref would be better, but this is quick fix)
   document.getElementById('image').value = '';

   toast.success('Idea created successfully!');
  } catch (error) {
   console.error(error);
   toast.error('Failed to create idea');
  } finally {
   setIsSubmitting(false);
  }
 };

 return (
  <div className="flex bg-gray-50 min-h-screen font-sans">
   {/* Left Sidebar */}
   <Sidebar />

   <div className="flex-1 ml-64 flex">
    {/* Center Content: Feed */}
    <main className="flex-1 p-8 max-w-4xl">
     <div className="flex justify-between items-center mb-8">
      <h1 className="text-2xl font-bold text-gray-900">Home</h1>
      <div className="flex gap-4">
       <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
         type="text"
         placeholder="Search ideas..."
         className="pl-10 pr-4 py-2 rounded-lg border-none bg-gray-200/50 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
         value={search}
         onChange={(e) => setSearch(e.target.value)}
        />
       </div>
       <Button variant="primary" className="bg-blue-600 hover:bg-blue-700 text-sm px-4 rounded-lg flex items-center">
        <Plus className="w-4 h-4 mr-2" /> New Idea
       </Button>
      </div>
     </div>

     <h2 className="text-lg font-bold text-gray-800 mb-6">Trending Ideas</h2>

     <div className="space-y-6">
      {loading ? (
       <p>Loading...</p>
      ) : ideas.length === 0 ? (
       <p className="text-center text-gray-500 py-10">No ideas yet. Create your first one!</p>
      ) : (
       ideas.map((idea) => (
        <div key={idea._id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-6 hover:shadow-md transition-shadow">
         {/* Image */}
         <div className="w-full sm:w-48 h-48 sm:h-auto flex-shrink-0 bg-gray-100 rounded-xl overflow-hidden relative">
          {idea.image ? (
           <img src={idea.image} alt={idea.title} className="w-full h-full object-cover" />
          ) : (
           <div className="w-full h-full flex items-center justify-center text-gray-300">
            <ImageIcon className="w-12 h-12" />
           </div>
          )}
         </div>

         {/* Content */}
         <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-start">
           <h3 className="text-xl font-bold text-gray-900 mb-2">{idea.title}</h3>
           <button className="text-gray-400 hover:text-gray-600">
            <MoreHorizontal size={20} />
           </button>
          </div>

          <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
           {idea.description}
          </p>

          <div className="mb-2">
           <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Required Skills:</p>
           <div className="flex flex-wrap gap-2">
            {idea.requiredSkills.slice(0, 3).map((skill, idx) => (
             <span key={idx} className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-md font-medium">
              {skill}
             </span>
            ))}
            {idea.requiredSkills.length > 3 && (
             <span className="text-xs text-gray-400 py-1">+ {idea.requiredSkills.length - 3} more</span>
            )}
           </div>
          </div>

          <div className="mt-auto pt-4 flex justify-between items-center">
           <div className="flex -space-x-2">
            {/* Mock Avatars */}
            {[1, 2, 3].map((i) => (
             <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs text-gray-500">
             </div>
            ))}
           </div>
           <button className="text-blue-600 font-semibold text-sm hover:underline">
            View Details
           </button>
          </div>
         </div>
        </div>
       ))
      )}
     </div>
    </main>

    {/* Right Panel: Create Idea */}
    <aside className="w-96 bg-white border-l border-gray-100 p-8 h-screen sticky top-0 overflow-y-auto hidden xl:block">
     <h2 className="text-xl font-bold text-gray-900 mb-6">Create New Idea</h2>

     <form onSubmit={handleCreate} className="space-y-4">
      <div>
       <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
       <input
        type="text"
        id="title"
        placeholder="e.g., Sustainable Packaging"
        className="w-full bg-gray-50 border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500"
        value={formData.title}
        onChange={handleFormChange}
        required
       />
      </div>

      <div>
       <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
       <textarea
        id="description"
        rows="4"
        placeholder="Describe your brilliant idea..."
        className="w-full bg-gray-50 border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 resize-none"
        value={formData.description}
        onChange={handleFormChange}
        required
       ></textarea>
      </div>

      <div>
       <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">Image Upload</label>
       <input
        type="file"
        id="image"
        accept="image/*"
        className="w-full bg-gray-50 border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500"
        onChange={handleFileChange}
       />
      </div>

      <div>
       <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
       <div className="relative">
        <select
         id="category"
         className="w-full bg-gray-50 border-none rounded-lg px-4 py-3 text-sm appearance-none focus:ring-2 focus:ring-blue-500"
         value={formData.category}
         onChange={handleFormChange}
        >
         <option>Technology</option>
         <option>Health</option>
         <option>Education</option>
         <option>Environment</option>
         <option>Social Impact</option>
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
         <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </div>
       </div>
      </div>

      <div>
       <label htmlFor="requiredSkills" className="block text-sm font-medium text-gray-700 mb-1">Required Skills</label>
       <input
        type="text"
        id="requiredSkills"
        placeholder="e.g., JavaScript, Python"
        className="w-full bg-gray-50 border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500"
        value={formData.requiredSkills}
        onChange={handleFormChange}
        required
       />
      </div>

      <div>
       <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
       <input
        type="email"
        id="contactEmail"
        placeholder=""
        className="w-full bg-gray-50 border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500"
        value={formData.contactEmail}
        onChange={handleFormChange}
        required
       />
      </div>

      <div className="pt-4">
       <Button type="submit" variant="primary" className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg shadow-blue-200" disabled={isSubmitting}>
        {isSubmitting ? 'Creating...' : 'Create Idea'}
       </Button>
      </div>
     </form>
    </aside>
   </div>

   {/* Helper for ImageIcon if not imported */}
   <div className="hidden">
    <img alt="preload" />
   </div>
  </div>
 );
};

// Simple Image Icon component helper
const ImageIcon = ({ className }) => (
 <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
 </svg>
);

export default CreatorDashboard;
