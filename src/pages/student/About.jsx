import React from 'react';
import { Lightbulb, Users, MessageCircle, Rocket, Github, Mail, Heart, Sparkles, Target, Zap } from 'lucide-react';

const About = () => {
 const features = [
  {
   icon: Lightbulb,
   title: 'Share Ideas',
   description: 'Post your innovative project ideas and find collaborators who share your passion.',
   color: 'bg-amber-500',
   shadow: 'shadow-amber-200'
  },
  {
   icon: Users,
   title: 'Collaborate',
   description: 'Connect with talented students and build teams based on complementary skills.',
   color: 'bg-blue-500',
   shadow: 'shadow-blue-200'
  },
  {
   icon: MessageCircle,
   title: 'Real-time Chat',
   description: 'Communicate seamlessly with your team members through integrated chat.',
   color: 'bg-emerald-500',
   shadow: 'shadow-emerald-200'
  },
  {
   icon: Rocket,
   title: 'Build Together',
   description: 'Transform ideas into reality by working together on real-world projects.',
   color: 'bg-indigo-500',
   shadow: 'shadow-indigo-200'
  }
 ];

 return (
  <div className="flex-1 bg-gray-50 overflow-y-auto">
   {/* Premium Hero Section */}
   <div className="relative h-[400px] flex items-center justify-center overflow-hidden bg-gray-900 px-8">
    <div className="absolute inset-0 z-0">
     <div className="absolute top-0 -left-20 w-96 h-96 bg-blue-600 rounded-full blur-[120px] opacity-30 animate-pulse"></div>
     <div className="absolute bottom-0 -right-20 w-96 h-96 bg-indigo-600 rounded-full blur-[120px] opacity-30 animate-pulse delay-700"></div>
     <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
    </div>

    <div className="relative z-10 text-center max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
     <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black uppercase tracking-[0.3em] mb-8 backdrop-blur-md">
      <Sparkles className="w-4 h-4" /> The Future of Collaboration
     </div>
     <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
      Idea<span className="text-blue-500">Waves</span>
     </h1>
     <p className="text-xl text-gray-400 font-medium leading-relaxed max-w-2xl mx-auto">
      Where student innovation meets seamless execution. Empowering the next generation of creators to build together.
     </p>
    </div>
   </div>

   {/* Stats Floating Grid */}

   {/* Main Mission Section */}
   <div className="max-w-6xl mx-auto px-8 py-24">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
     <div>
      <h2 className="text-xs font-black text-blue-600 uppercase tracking-[0.3em] mb-4">Our Vision</h2>
      <h3 className="text-4xl font-black text-gray-900 mb-8 leading-tight">Empowering Every <br /> Student to Innovate</h3>
      <p className="text-lg text-gray-600 leading-relaxed mb-8 font-medium">
       We believe that financial barriers or lack of network shouldn't stop a great idea. IdeaWaves is built to bridge the gap between imagination and reality for students worldwide.
      </p>
      <div className="space-y-4">
       {[
        { icon: Target, text: 'Goal-oriented collaboration frameworks' },
        { icon: Zap, text: 'Rapid team formations based on skills' },
        { icon: Heart, text: 'Community-driven project growth' }
       ].map((item, i) => (
        <div key={i} className="flex items-center gap-4 text-gray-700 font-bold">
         <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
          <item.icon className="w-4 h-4" />
         </div>
         {item.text}
        </div>
       ))}
      </div>
     </div>
     <div className="grid grid-cols-2 gap-4">
      {features.map((feature, i) => (
       <div key={i} className={`p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 ${i % 2 !== 0 ? 'mt-8' : ''}`}>
        <div className={`w-12 h-12 rounded-2xl ${feature.color} text-white flex items-center justify-center mb-6 shadow-lg ${feature.shadow}`}>
         <feature.icon className="w-6 h-6" />
        </div>
        <h4 className="font-black text-gray-900 mb-2">{feature.title}</h4>
        <p className="text-xs text-gray-500 font-semibold leading-relaxed">{feature.description}</p>
       </div>
      ))}
     </div>
    </div>
   </div>

   {/* Modern Contact Banner */}
   <div className="max-w-6xl mx-auto px-8 pb-16">
    <div className="bg-gray-900 rounded-[3rem] p-12 relative overflow-hidden flex flex-col items-center text-center">
     <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-20 -mr-32 -mt-32"></div>
     <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600 rounded-full blur-[100px] opacity-20 -ml-32 -mb-32"></div>

     <h2 className="text-3xl font-black text-white mb-4 relative z-10">Have a Question?</h2>
     <p className="text-gray-400 font-medium mb-10 max-w-md relative z-10">We're always looking for feedback and new perspectives to improve IdeaWaves.</p>

     <div className="flex flex-col sm:flex-row gap-4 relative z-10">
      <a href="mailto:support@ideawaves.com" className="flex items-center gap-3 px-10 py-4 bg-white text-gray-900 rounded-2xl font-black hover:bg-blue-50 transition-all active:scale-95 shadow-xl">
       <Mail className="w-5 h-5" /> Contact Support
      </a>
      <a href="https://github.com/ideawaves" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-10 py-4 bg-gray-800 text-white rounded-2xl font-black hover:bg-gray-700 transition-all border border-gray-700 active:scale-95 shadow-xl">
       <Github className="w-5 h-5" /> Open Source
      </a>
     </div>

     <div className="mt-16 flex items-center gap-2 text-gray-500 font-black text-[10px] uppercase tracking-[0.4em]">
      <span>Crafted with</span>
      <Heart className="w-3 h-3 text-red-500 fill-current" />
      <span>by the tech community</span>
     </div>
    </div>
   </div>
  </div>
 );
};

export default About;
