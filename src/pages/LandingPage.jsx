import React from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, Zap, Target, Users, Sparkles } from 'lucide-react';
import { Button } from '../components/common/Components';

const NetworkWave = () => (
 <div className="absolute top-0 left-0 w-full h-[1000px] overflow-hidden -z-10 pointer-events-none opacity-40">
  <svg className="w-full h-full" viewBox="0 0 1440 1000" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
   <path d="M-100 450 C 200 600, 400 300, 720 400 C 1040 500, 1240 200, 1540 350 V 0 H -100 V 450 Z" fill="url(#grad1)" fillOpacity="0.08" />
   <path d="M-100 550 C 300 650, 600 350, 920 450 C 1240 550, 1340 250, 1540 400" stroke="url(#grad2)" strokeWidth="2" strokeDasharray="12 12" className="animate-pulse" />
   <path d="M-100 400 C 250 500, 550 200, 870 300 C 1190 400, 1390 100, 1540 250" stroke="url(#grad3)" strokeWidth="1" opacity="0.3" />

   <circle cx="200" cy="530" r="4" fill="#6366f1" className="animate-float" style={{ animationDelay: '0s' }} />
   <circle cx="720" cy="400" r="6" fill="#4f46e5" className="animate-float" style={{ animationDelay: '1s' }} />
   <circle cx="1200" cy="380" r="4" fill="#818cf8" className="animate-float" style={{ animationDelay: '2s' }} />

   <defs>
    <linearGradient id="grad1" x1="0" y1="0" x2="1440" y2="800" gradientUnits="userSpaceOnUse">
     <stop stopColor="#6366f1" />
     <stop offset="1" stopColor="#a5b4fc" />
    </linearGradient>
    <linearGradient id="grad2" x1="0" y1="450" x2="1440" y2="450" gradientUnits="userSpaceOnUse">
     <stop stopColor="#4f46e5" />
     <stop offset="1" stopColor="#818cf8" />
    </linearGradient>
    <linearGradient id="grad3" x1="0" y1="300" x2="1440" y2="300" gradientUnits="userSpaceOnUse">
     <stop stopColor="#c7d2fe" />
     <stop offset="1" stopColor="#e0e7ff" />
    </linearGradient>
   </defs>
  </svg>
 </div>
);

const LandingPage = () => {
 return (
  <div className="min-h-screen bg-surface-50 font-sans text-surface-900 relative selection:bg-brand-100 selection:text-brand-900">
   <NetworkWave />

   {/* 1. NAVBAR */}
   <nav className="fixed top-0 w-full bg-white/70 backdrop-blur-xl z-50 border-b border-surface-200/50">
    <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
     <div className="flex items-center gap-2 group cursor-pointer font-bold text-2xl tracking-tighter text-surface-900">
      <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-500/20 group-hover:scale-105 transition-transform">
       <Sparkles className="w-6 h-6 fill-current" />
      </div>
      <span>IdeaWaves</span>
     </div>

     <div className="hidden md:flex items-center gap-10 text-sm font-semibold text-surface-600">
      <a href="#how-it-works" className="hover:text-brand-600 transition-colors">How it Works</a>
      <a href="#explore" className="hover:text-brand-600 transition-colors">Explore</a>
      <Link to="/login" className="hover:text-brand-600 transition-colors">Sign In</Link>
      <Link to="/register">
       <Button className="rounded-full px-8 shadow-lg shadow-brand-500/25">
        Join Community
       </Button>
      </Link>
     </div>
    </div>
   </nav>

   {/* 2. HERO SECTION */}
   <section className="pt-48 pb-32 px-6 relative z-10 overflow-hidden">
    <div className="max-w-5xl mx-auto text-center">
     <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 text-brand-700 text-xs font-bold uppercase tracking-widest mb-8 animate-in shadow-sm">
      <Sparkles size={14} className="animate-pulse" />
      The Future of Student Innovation
     </div>

     <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-8 text-surface-900 leading-[1.1] animate-in" style={{ animationDelay: '0.1s' }}>
      Where Ideas Become <br />
      <span className="text-gradient">Impactful Projects</span>
     </h1>

     <p className="text-xl md:text-2xl text-surface-600 mb-12 max-w-3xl mx-auto leading-relaxed animate-in" style={{ animationDelay: '0.2s' }}>
      IdeaWaves is the ultimate collaborative ecosystem where students turn visionary concepts into realized projects with high-performing teams.
     </p>

     <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-in" style={{ animationDelay: '0.3s' }}>
      <Link to="/register">
       <Button className="h-16 px-12 rounded-2xl text-lg shadow-2xl shadow-brand-500/40 hover:-translate-y-1">
        Start Creating <ArrowRight size={20} className="ml-1" />
       </Button>
      </Link>
      <Link to="/login">
       <Button variant="outline" className="h-16 px-12 rounded-2xl text-lg border-surface-200 hover:border-brand-300">
        Explore Ideas
       </Button>
      </Link>
     </div>

    </div>
   </section>

   {/* 3. HOW IT WORKS */}
   <section id="how-it-works" className="py-32 bg-white relative">
    <div className="max-w-7xl mx-auto px-6">
     <div className="text-center mb-24">
      <h2 className="text-4xl md:text-5xl font-black text-surface-900 mb-6">Built for Collaboration</h2>
      <p className="text-surface-500 max-w-2xl mx-auto text-lg">A seamless workflow designed to help you move from concept to completion faster than ever.</p>
     </div>

     <div className="grid md:grid-cols-3 gap-10">
      {[
       {
        icon: <Zap className="w-8 h-8" />,
        title: "Launch Your Vision",
        desc: "Post your project idea, specify the technical stack, and outline the vision for your next big thing."
       },
       {
        icon: <Users className="w-8 h-8" />,
        title: "Assemble Your Team",
        desc: "Review collaboration requests from talented students with the exact skills your project needs."
       },
       {
        icon: <Target className="w-8 h-8" />,
        title: "Execute & Elevate",
        desc: "Real-time communication and progress tracking systems to keep your project moving toward success."
       }
      ].map((item, i) => (
       <div key={i} className="group p-10 rounded-3xl bg-surface-50 border border-surface-200/60 hover:border-brand-200 hover:bg-white hover:shadow-premium transition-all duration-500">
        <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-8 text-brand-600 group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white transition-all duration-500">
         {item.icon}
        </div>
        <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
        <p className="text-surface-500 leading-relaxed italic">"{item.desc}"</p>
       </div>
      ))}
     </div>
    </div>
   </section>

   {/* 5. FOOTER */}
   <footer className="py-20 border-t border-surface-200 bg-white">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12">
     <div className="flex flex-col items-center md:items-start gap-4">
      <div className="flex items-center gap-2 font-bold text-2xl tracking-tighter text-surface-900">
       <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-brand-500/20">
        <Sparkles size={16} fill="currentColor" />
       </div>
       <span>IdeaWaves</span>
      </div>
      <p className="text-surface-400 text-sm font-medium">Empowering the next generation of builders.</p>
     </div>

     <div className="flex flex-wrap justify-center gap-12 text-sm font-bold text-surface-600">
      <Link to="/login" className="hover:text-brand-600 tracking-wide uppercase transition-colors">Login</Link>
      <Link to="/register" className="hover:text-brand-600 tracking-wide uppercase transition-colors">Register</Link>
      <a href="#" className="hover:text-brand-600 tracking-wide uppercase transition-colors">Twitter</a>
      <a href="#" className="hover:text-brand-600 tracking-wide uppercase transition-colors">LinkedIn</a>
     </div>

     <p className="text-surface-300 text-sm font-medium">
      &copy; {new Date().getFullYear()} IdeaWaves. All rights reserved.
     </p>
    </div>
   </footer>
  </div>
 );
};

export default LandingPage;
