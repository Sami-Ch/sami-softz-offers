import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Users, 
  Code2, 
  Smartphone, 
  Layers, 
  Zap, 
  ExternalLink, 
  ChevronDown, 
  ChevronRight, 
  X, 
  Calendar, 
  MessageCircle, 
  Sparkles, 
  FileText, 
  Terminal, 
  Lock, 
  Globe2, 
  Check, 
  Play, 
  Star,
  Award,
  ChevronLeft,
  Sun,
  Moon
} from 'lucide-react';

// ==========================================
// CUSTOM CURSOR HOOK & COMPONENT (DESKTOP ONLY)
// ==========================================
function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only initialize on devices that support hover (non-touch)
    if (window.matchMedia('(hover: none) or (pointer: coarse)').matches) {
      return;
    }

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let animId;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
    };

    const render = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[data-cursor-hover]') ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT'
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  return (
    <>
      <div
        ref={dotRef}
        className={`custom-cursor-dot ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      />
      <div
        ref={ringRef}
        className={`custom-cursor-ring ${isVisible ? 'opacity-100' : 'opacity-0'} ${
          isHovered ? 'cursor-hover' : ''
        }`}
      />
    </>
  );
}

// ==========================================
// CONVERSION MODAL: "TALK TO EXPERT"
// ==========================================
function TalkToExpertModal({ isOpen, onClose, selectedProject = '', theme = 'dark' }) {
  const [activeTab, setActiveTab] = useState('call'); // 'call', 'whatsapp', 'form'
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    projectType: selectedProject || 'Mobile App (iOS / Android)',
    timeline: 'Within 30–60 Days',
    budgetRange: '$5k – $15k',
    description: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#C1121F', '#8A0F18', '#FFFFFF', '#FF4D5A']
    });
  };

  const whatsappMessage = encodeURIComponent(
    `Hi Sami, I reviewed your work on Samisoftz and would like to talk to an expert about building a project (${formData.projectType || 'Software Product'}).`
  );

  return (
    <div className="fixed inset-0 z-[100000] flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className={`relative w-full max-w-2xl border rounded-2xl shadow-2xl overflow-hidden my-auto transition-colors duration-200 ${
          theme === 'dark'
            ? 'bg-[#181818] border-white/10 shadow-black/80'
            : 'bg-white border-neutral-200 shadow-2xl text-neutral-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className={`flex items-center justify-between px-5 py-4 border-b ${
          theme === 'dark' ? 'border-white/10 bg-[#1F1F1F]' : 'border-neutral-200 bg-neutral-50'
        }`}>
          <div className="flex items-center gap-3">
            <div className="h-6 sm:h-7 flex items-center flex-shrink-0">
              <img 
                src={theme === 'dark' ? './logo-white.png' : './logo.png'} 
                alt="Samisoftz" 
                className="h-full w-auto object-contain" 
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className={`font-display font-bold text-base sm:text-lg ${
                  theme === 'dark' ? 'text-white' : 'text-neutral-900'
                }`}>
                  Direct Founder Consultation
                </h3>
                <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Sami Online
                </span>
              </div>
              <p className={`text-xs ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>
                Free 30-Min Strategy Call • No Sales Reps • 100% Code Ownership
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            aria-label="Close modal"
            className={`p-1.5 rounded-lg transition-colors ${
              theme === 'dark'
                ? 'text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10'
                : 'text-neutral-500 hover:text-black bg-neutral-100 hover:bg-neutral-200'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className={`grid grid-cols-3 p-1.5 border-b text-xs sm:text-sm font-medium ${
          theme === 'dark' ? 'bg-[#121212] border-white/5' : 'bg-neutral-100 border-neutral-200'
        }`}>
          <button
            onClick={() => setActiveTab('call')}
            className={`py-2 px-2 text-center rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'call'
                ? 'bg-[#C1121F] text-white shadow-md font-semibold'
                : theme === 'dark' ? 'text-neutral-400 hover:text-white hover:bg-white/5' : 'text-neutral-600 hover:text-black hover:bg-neutral-200'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>30-Min Call</span>
          </button>
          <button
            onClick={() => setActiveTab('whatsapp')}
            className={`py-2 px-2 text-center rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'whatsapp'
                ? 'bg-[#25D366] text-black shadow-md font-semibold'
                : theme === 'dark' ? 'text-neutral-400 hover:text-white hover:bg-white/5' : 'text-neutral-600 hover:text-black hover:bg-neutral-200'
            }`}
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Instant WhatsApp</span>
          </button>
          <button
            onClick={() => setActiveTab('form')}
            className={`py-2 px-2 text-center rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'form'
                ? 'bg-[#C1121F] text-white shadow-md font-semibold'
                : theme === 'dark' ? 'text-neutral-400 hover:text-white hover:bg-white/5' : 'text-neutral-600 hover:text-black hover:bg-neutral-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Quick Scope</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-5 sm:p-6 max-h-[75vh] overflow-y-auto">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className={`text-xl sm:text-2xl font-bold font-display mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-neutral-900'
              }`}>
                Consultation Request Received!
              </h4>
              <p className={`text-sm max-w-md mx-auto mb-6 ${
                theme === 'dark' ? 'text-neutral-300' : 'text-neutral-600'
              }`}>
                Founder Sami will personally review your project scope and reach out within 2 hours during active business hours.
              </p>
              <div className={`p-4 rounded-xl border text-left text-xs space-y-2 mb-6 max-w-sm mx-auto ${
                theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-neutral-50 border-neutral-200'
              }`}>
                <div className={`flex justify-between ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`}>
                  <span>Direct Founder Email:</span>
                  <span className={`font-mono ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>hello@samisoftz.com</span>
                </div>
                <div className={`flex justify-between ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`}>
                  <span>Fast Track:</span>
                  <span className="text-emerald-500 font-medium">WhatsApp Available Now</span>
                </div>
              </div>
              <a
                href={`https://wa.me/923000000000?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] text-black font-semibold rounded-xl text-sm hover:brightness-110 transition-all shadow-lg shadow-emerald-900/30"
              >
                <MessageCircle className="w-4 h-4" />
                Talk to expert
              </a>
            </div>
          ) : activeTab === 'call' ? (
            <div className="space-y-4">
              <div className={`p-4 rounded-xl border ${
                theme === 'dark' 
                  ? 'bg-gradient-to-r from-red-950/40 to-black border-red-500/20' 
                  : 'bg-red-50/70 border-red-200 text-neutral-800'
              }`}>
                <h4 className={`font-bold text-sm sm:text-base mb-1 flex items-center gap-2 ${
                  theme === 'dark' ? 'text-white' : 'text-neutral-900'
                }`}>
                  <Sparkles className="w-4 h-4 text-[#C1121F]" />
                  What happens in this 30-minute session?
                </h4>
                <ul className={`text-xs space-y-1.5 mt-2 ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-600'}`}>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                    Review your core architecture, required stack, and user flows.
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                    Receive an initial, realistic timeline and milestone budget.
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                    Zero sales pressure. Direct talk with technical founder Sami.
                  </li>
                </ul>
              </div>

              {/* Interactive Calendar Selection */}
              <div className={`border rounded-xl p-4 ${
                theme === 'dark' ? 'border-white/10 bg-[#141414]' : 'border-neutral-200 bg-neutral-50'
              }`}>
                <div className={`text-xs font-semibold uppercase tracking-wider mb-3 ${
                  theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'
                }`}>
                  Step 1: Select Your Preferred Time Window (UTC+5 / UK & US East Overlap)
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                  {['Today: 2:00 PM UTC', 'Today: 4:30 PM UTC', 'Tomorrow: 10:00 AM UTC', 'Tomorrow: 2:00 PM UTC', 'Tomorrow: 5:00 PM UTC', 'Custom Time Slot'].map((slot, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setFormData({ ...formData, timeline: slot })}
                      className={`p-2.5 rounded-lg border text-left transition-all ${
                        formData.timeline === slot
                          ? 'border-[#C1121F] bg-[#C1121F]/10 text-[#C1121F] font-bold shadow-sm'
                          : theme === 'dark'
                            ? 'border-white/10 hover:border-white/20 bg-white/5 text-neutral-300'
                            : 'border-neutral-200 hover:border-neutral-300 bg-white text-neutral-700'
                      }`}
                    >
                      <div className="font-medium">{slot.split(':')[0]}</div>
                      <div className={`text-[10px] ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`}>
                        {slot.split(':')[1] ? slot.split(':')[1] + (slot.split(':')[2] ? ':' + slot.split(':')[2] : '') : 'Flexible'}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className={`block text-xs font-medium mb-1 ${
                      theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
                    }`}>Your Name *</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Alex Henderson"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-[#C1121F] transition-colors ${
                        theme === 'dark'
                          ? 'bg-white/5 border-white/10 text-white'
                          : 'bg-neutral-50 border-neutral-300 text-neutral-900 focus:bg-white'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-xs font-medium mb-1 ${
                      theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
                    }`}>Business Email or Phone *</label>
                    <input
                      required
                      type="text"
                      placeholder="alex@company.com or +44..."
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-[#C1121F] transition-colors ${
                        theme === 'dark'
                          ? 'bg-white/5 border-white/10 text-white'
                          : 'bg-neutral-50 border-neutral-300 text-neutral-900 focus:bg-white'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-xs font-medium mb-1 ${
                    theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
                  }`}>Project Focus</label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-[#C1121F] ${
                      theme === 'dark'
                        ? 'bg-[#202020] border-white/10 text-white'
                        : 'bg-neutral-50 border-neutral-300 text-neutral-900'
                    }`}
                  >
                    <option>Mobile App (iOS & Android / React Native)</option>
                    <option>SaaS Web Platform (Next.js / PostgreSQL)</option>
                    <option>Live Marketplace & Payments (Stripe Connect)</option>
                    <option>AI Coaching / OCR Workflow</option>
                    <option>Custom Back-Office / Automation System</option>
                  </select>
                </div>

                {/* CTA Button with EXACT text: Talk to expert */}
                <button
                  type="submit"
                  className="w-full mt-2 py-3 px-6 bg-gradient-to-r from-[#C1121F] to-[#8A0F18] text-white font-bold rounded-xl text-sm hover:brightness-110 transition-all shadow-lg shadow-red-950/50 flex items-center justify-center gap-2 group"
                >
                  <span>Talk to expert</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          ) : activeTab === 'whatsapp' ? (
            <div className="space-y-4 text-center py-2">
              <div className="w-14 h-14 bg-[#25D366]/10 text-[#25D366] rounded-2xl flex items-center justify-center mx-auto border border-[#25D366]/20">
                <MessageCircle className="w-8 h-8" />
              </div>
              <div>
                <h4 className={`font-display font-bold text-lg ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
                  Instant WhatsApp with Founder Sami
                </h4>
                <p className={`text-xs sm:text-sm max-w-md mx-auto mt-1 ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-600'}`}>
                  Prefer a direct, informal conversation? Send your pitch deck, brief, or questions directly to Sami on WhatsApp.
                </p>
              </div>

              <div className={`p-4 border rounded-xl text-left max-w-md mx-auto ${
                theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-neutral-50 border-neutral-200'
              }`}>
                <div className={`text-[11px] uppercase tracking-wider mb-1 font-semibold ${
                  theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'
                }`}>
                  Pre-Configured Opening Message:
                </div>
                <div className={`p-3 rounded-lg text-xs font-mono border ${
                  theme === 'dark' ? 'bg-black/40 text-neutral-200 border-white/5' : 'bg-white text-neutral-800 border-neutral-200'
                }`}>
                  "Hi Sami, I reviewed your work on Samisoftz and would like to talk to an expert about building a project."
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={`https://wa.me/923000000000?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => {
                    confetti({ particleCount: 50, spread: 60 });
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-8 bg-[#25D366] hover:bg-[#22c35e] text-black font-bold rounded-xl text-sm transition-all shadow-lg shadow-emerald-950/40"
                >
                  <MessageCircle className="w-4 h-4" />
                  Talk to expert
                </a>
                <p className={`text-[11px] mt-2 ${theme === 'dark' ? 'text-neutral-500' : 'text-neutral-500'}`}>
                  Typically responds within 15–30 minutes during UK/US working hours.
                </p>
              </div>
            </div>
          ) : (
            /* Quick Scope Form */
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className={`block text-xs font-medium mb-1 ${
                    theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
                  }`}>Your Name *</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Rachel Sterling"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-[#C1121F] ${
                      theme === 'dark'
                        ? 'bg-white/5 border-white/10 text-white'
                        : 'bg-neutral-50 border-neutral-300 text-neutral-900 focus:bg-white'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-xs font-medium mb-1 ${
                    theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
                  }`}>Work Email or WhatsApp *</label>
                  <input
                    required
                    type="text"
                    placeholder="rachel@venture.co"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-[#C1121F] ${
                      theme === 'dark'
                        ? 'bg-white/5 border-white/10 text-white'
                        : 'bg-neutral-50 border-neutral-300 text-neutral-900 focus:bg-white'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className={`block text-xs font-medium mb-1 ${
                  theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
                }`}>Project Category</label>
                <select
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-[#C1121F] ${
                    theme === 'dark'
                      ? 'bg-[#202020] border-white/10 text-white'
                      : 'bg-neutral-50 border-neutral-300 text-neutral-900'
                  }`}
                >
                  <option>Mobile App (iOS & Android / React Native)</option>
                  <option>SaaS Web Platform (Next.js / PostgreSQL)</option>
                  <option>Live Marketplace & Payouts (Stripe Connect)</option>
                  <option>AI Workflows & Document Processing</option>
                  <option>Back-Office & Operational System</option>
                  <option>Codebase Takeover / Modernization</option>
                </select>
              </div>

              <div>
                <label className={`block text-xs font-medium mb-1 ${
                  theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
                }`}>Brief Description / Core Needs</label>
                <textarea
                  rows="3"
                  placeholder="Share a short summary of what you are aiming to build, launch timeline, or specific challenges..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-[#C1121F] text-xs sm:text-sm ${
                    theme === 'dark'
                      ? 'bg-white/5 border-white/10 text-white'
                      : 'bg-neutral-50 border-neutral-300 text-neutral-900 focus:bg-white'
                  }`}
                />
              </div>

              <div className="flex items-center gap-2 text-[11px] py-1">
                <Lock className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                <span className={theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}>
                  Non-disclosure assured. Your IP, idea, and contact are strictly confidential.
                </span>
              </div>

              {/* CTA Button with EXACT text: Talk to expert */}
              <button
                type="submit"
                className="w-full py-3 px-6 bg-gradient-to-r from-[#C1121F] to-[#8A0F18] text-white font-bold rounded-xl text-sm hover:brightness-110 transition-all shadow-lg shadow-red-950/50 flex items-center justify-center gap-2 group"
              >
                <span>Talk to expert</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          )}
        </div>

        {/* Footer Guarantee Strip */}
        <div className={`px-5 py-3 border-t flex flex-wrap items-center justify-between text-[11px] gap-2 ${
          theme === 'dark' ? 'bg-[#111111] border-white/5 text-neutral-400' : 'bg-neutral-50 border-neutral-200 text-neutral-600'
        }`}>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>100% Code Ownership in Your GitHub</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-neutral-400" />
            <span>Dedicated UK & US East Overlap</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// MAIN LANDING PAGE COMPONENT
// ==========================================
export default function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('samisoftz-theme');
      if (saved === 'light' || saved === 'dark') return saved;
    }
    return 'dark'; // default to dark
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [modalProject, setModalProject] = useState('');
  const [activeProjectTab, setActiveProjectTab] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
    localStorage.setItem('samisoftz-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const openTalkModal = (projectName = '') => {
    setModalProject(projectName);
    setModalOpen(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 450) {
        setScrolledPastHero(true);
      } else {
        setScrolledPastHero(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Verified portfolio items from Company Profile
  const portfolioCases = [
    {
      title: "Start On Live",
      category: "Live-Commerce Marketplace",
      badge: "App Store & Play Store Live",
      location: "Lyon, France",
      summary: "Full-scale live video shopping marketplace connecting buyers and sellers in real time with timed cart holds and split payouts.",
      stack: ["React Native", "Next.js", "GetStream", "Stripe Connect", "PayPlus", "MMKV"],
      stats: [
        { label: "Delivery", val: "Full Production" },
        { label: "Platforms", val: "iOS + Android + Web" },
        { label: "Core Feat.", val: "Live Stream + Timed Carts" },
        { label: "Handover", val: "100% Client Code & Docs" }
      ],
      highlights: [
        "Concurrent live streaming with interactive buyer chat & product pinning",
        "Timed inventory reservation algorithms preventing checkout overselling",
        "Stripe Connect split payouts, seller invoices, and gross/net accounting",
        "Local MMKV persistence ensuring continuity across erratic mobile data"
      ]
    },
    {
      title: "InterviewPal",
      category: "AI SaaS Platform",
      badge: "6,000+ Active Users",
      location: "Global",
      summary: "AI interview simulation and career accelerator helping job seekers master company-specific technical interviews.",
      stack: ["Next.js", "TypeScript", "PostgreSQL", "Stripe Subscriptions", "AI Integration", "OAuth"],
      stats: [
        { label: "Scale", val: "~6,000 Active Users" },
        { label: "Monetization", val: "Tiered SaaS Plans" },
        { label: "Engine", val: "Custom Prompt Architecture" },
        { label: "Architecture", val: "Full-Stack Serverless" }
      ],
      highlights: [
        "Company-specific mock interview simulations with tailored AI feedback",
        "Automated resume analysis, ATS scoring, and bullet-point enhancements",
        "OAuth authentication and recurring Stripe subscription billing",
        "Low-latency response handling using Next.js and PostgreSQL"
      ]
    },
    {
      title: "France DUERP",
      category: "Compliance & Risk SaaS",
      badge: "5,000+ Scaled Users",
      location: "France",
      summary: "French-language legal compliance platform guiding employers through mandatory workplace risk documentation.",
      stack: ["Laravel", "PHP", "MySQL", "AI Prompting", "Automated PDF Generation"],
      stats: [
        { label: "User Growth", val: "0 → 5,000 Users" },
        { label: "Output", val: "Custom Legal PDFs" },
        { label: "Pricing", val: "Tiered by Headcount" },
        { label: "Role", val: "Dev + Active Maintenance" }
      ],
      highlights: [
        "Dynamic legal questionnaire mapping enterprise risks across activity categories",
        "Automated generation of structured, audit-ready compliance PDF reports",
        "Subscription billing tied to workforce headcount and periodic renewals",
        "Long-term SLA maintenance driving growth from zero to 5,000 live users"
      ]
    },
    {
      title: "Rocket Statements",
      category: "Financial Document SaaS",
      badge: "Multi-Stage OCR Engine",
      location: "UK / USA",
      summary: "Fintech SaaS converting complex PDF bank statements into clean, structured Excel, CSV, and JSON data formats.",
      stack: ["Next.js", "TypeScript", "PostgreSQL", "Stripe", "Multi-stage OCR"],
      stats: [
        { label: "Input", val: "Scanned & Digital PDFs" },
        { label: "Output", val: "Excel / CSV / JSON" },
        { label: "Payment", val: "Per-Document & Credits" },
        { label: "Audience", val: "Accounting & FinTech Teams" }
      ],
      highlights: [
        "Advanced OCR parsing handles distorted scans, variable bank layouts, and partial pages",
        "Clean export pipelines generating structured financial tables instantly",
        "Secure document vault with encrypted file workflows and privacy protections",
        "Stripe-powered credit system for pay-as-you-go document processing"
      ]
    },
    {
      title: "SliceTube & Driven by Luxury",
      shortTitle: "SliceTube",
      category: "Media Tools & High-Speed Web",
      badge: "4K Media & Performance",
      location: "UK & Global",
      summary: "High-throughput media trimming engine (SliceTube) and ultra-optimized luxury vehicle marketing platform (Driven by Luxury).",
      stack: ["ffmpeg", "Python", "Next.js", "Node Reverse Proxy", "PostgreSQL"],
      stats: [
        { label: "SliceTube", val: "4K Video Exports" },
        { label: "Formats", val: "MP4, MP3, WebM" },
        { label: "Driven by Luxury", val: "Self-Hosted Node Proxy" },
        { label: "Optimization", val: "Server-side Image Pipeline" }
      ],
      highlights: [
        "Browser-based timestamp cutting with zero-watermark high-resolution rendering",
        "ffmpeg and Python pipeline handling high concurrency media transcoding",
        "Driven by Luxury: Self-hosted Node architecture with pre-optimized asset pipelines",
        "Conversion-focused enquiry workflows generating high-ticket UK vehicle bookings"
      ]
    }
  ];

  // FAQ Items addressing all ICP objections
  const faqItems = [
    {
      q: "Who actually builds my product? Will I be handed off to a junior?",
      a: "No. At SamiSoftz, you collaborate directly with founder Sami from initial architecture planning through sprint execution and release. We do not use commission-based sales reps or offshore junior pools. You get senior engineering discipline and direct accountability."
    },
    {
      q: "Who owns the code, intellectual property, and infrastructure?",
      a: "You own 100% of everything. All code is committed directly to your private GitHub organization from Day 1. Cloud infrastructure (AWS, Vercel, Supabase) and developer accounts (Apple App Store, Google Play) are registered under your own legal entity. We never hold code hostage."
    },
    {
      q: "What if my requirements or scope are not fully defined yet?",
      a: "That is completely normal. Instead of guessing with a high-risk fixed bid, we run a focused 1–2 week Discovery Sprint. We produce a complete architecture blueprint, Figma flows, database schemas, and a milestone price. You own the brief completely—you can build with us or take it elsewhere."
    },
    {
      q: "How does the milestone payment model protect me?",
      a: "We break every project into tangible milestones (e.g. Milestone 1: Auth & Database; Milestone 2: Live Video Stream & Cart; Milestone 3: Stripe Payouts). You only approve and fund the next milestone after reviewing and testing working software in your staging environment."
    },
    {
      q: "How do you manage communication across different timezones?",
      a: "We are based in Pakistan (UTC+5), which gives us extensive full-day working overlap with UK and European clients, and a dedicated afternoon/evening window for US East Coast teams. We communicate actively via Slack, WhatsApp, and Google Meet."
    },
    {
      q: "Can you take over and modernize an existing codebase?",
      a: "Yes. Many of our flagship projects—including France DUERP and Start On Live—involved taking over existing requirements, refactoring system architecture, resolving technical debt, and leading the product through successful scale."
    }
  ];

  const isDark = theme === 'dark';

  return (
    <div className={`relative min-h-screen transition-colors duration-300 selection:bg-[#C1121F] selection:text-white ${
      isDark ? 'bg-[#141414] text-white' : 'bg-[#F9FAFB] text-neutral-900'
    }`}>
      {/* Desktop Custom Cursor */}
      <CustomCursor />

      {/* Global Glow Backgrounds */}
      <div className={`fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none radial-glow -z-10 transition-opacity duration-500 ${
        isDark ? 'opacity-100' : 'opacity-25'
      }`} />
      <div className={`fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] pointer-events-none radial-glow-center -z-10 transition-opacity duration-500 ${
        isDark ? 'opacity-100' : 'opacity-20'
      }`} />

      {/* ==========================================
          1. STICKY MICRO-HEADER
      ========================================== */}
      <header className={`sticky top-0 z-50 w-full backdrop-blur-md border-b transition-colors duration-200 ${
        isDark ? 'bg-[#141414]/90 border-white/10' : 'bg-white/90 border-neutral-200 shadow-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          
          {/* Official Samisoftz Logo */}
          <div className="flex items-center gap-3">
            <img 
              src={isDark ? './logo-white.png' : './logo.png'} 
              alt="Samisoftz Logo" 
              className="h-8 sm:h-9 w-auto object-contain hover:opacity-95 transition-opacity" 
            />
            <span className={`hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase border ${
              isDark ? 'bg-white/5 border-white/10 text-neutral-400' : 'bg-neutral-100 border-neutral-200 text-neutral-600'
            }`}>
              Studio
            </span>
          </div>

          {/* Center Status Badge (Desktop & Tablet) */}
          <div className={`hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-medium transition-colors ${
            isDark ? 'bg-white/5 border-white/10 text-neutral-300' : 'bg-neutral-100 border-neutral-200 text-neutral-700'
          }`}>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Founder-Led • Direct Access to Sami</span>
          </div>

          {/* Header Action: Theme Switch + WhatsApp + CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              data-cursor-hover
              aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className={`p-2 sm:p-2.5 rounded-xl border transition-all flex items-center justify-center ${
                isDark 
                  ? 'bg-white/5 hover:bg-white/10 border-white/10 text-amber-400' 
                  : 'bg-neutral-100 hover:bg-neutral-200 border-neutral-300 text-neutral-700'
              }`}
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-neutral-800" />
              )}
            </button>

            <a
              href="https://wa.me/923000000000?text=Hi%20Sami%2C%20I%20want%20to%20talk%20to%20an%20expert%20about%20building%20a%20project."
              target="_blank"
              rel="noreferrer"
              className={`hidden sm:inline-flex items-center justify-center p-2.5 rounded-xl border transition-colors ${
                isDark
                  ? 'bg-white/5 hover:bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200'
              }`}
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>

            <button
              onClick={() => openTalkModal()}
              data-cursor-hover
              className="py-2.5 px-4 sm:px-5 bg-gradient-to-r from-[#C1121F] to-[#8A0F18] text-white font-bold text-xs sm:text-sm rounded-xl hover:brightness-110 active:scale-95 transition-all shadow-md shadow-red-950/40 flex items-center gap-1.5"
            >
              <span>Talk to expert</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* ==========================================
          2. HERO SECTION (HIGH-CONVERTING HOOK)
      ========================================== */}
      <section className="relative pt-8 sm:pt-14 md:pt-20 pb-12 sm:pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-4xl mx-auto text-center">
            
            {/* Top Badge */}
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs mb-6 shadow-sm ${
              isDark 
                ? 'bg-gradient-to-r from-red-950/60 to-black border-red-500/30 text-red-200' 
                : 'bg-red-50 border-red-200 text-[#C1121F] font-semibold'
            }`}>
              <Sparkles className="w-3.5 h-3.5 text-[#C1121F]" />
              <span className="font-medium tracking-wide">FOUNDER-LED STUDIO • UK, EU & US CLIENTS</span>
            </div>

            {/* Main Headline (H1) */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight leading-[1.12] mb-6">
              We Build Production Web & Mobile Apps That Scale.
              <span className={`block mt-2 text-transparent bg-clip-text ${
                isDark 
                  ? 'bg-gradient-to-r from-white via-neutral-200 to-[#C1121F]' 
                  : 'bg-gradient-to-r from-neutral-900 via-neutral-800 to-[#C1121F]'
              }`}>
                Without The Agency Runaround.
              </span>
            </h1>

            {/* Sub-headline */}
            <p className={`text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-10 ${
              isDark ? 'text-neutral-300' : 'text-neutral-600'
            }`}>
              Direct founder engineering with <strong>Sami</strong>. From high-concurrency live marketplaces to AI-powered SaaS platforms scaling past 6,000+ users. 
              <span className={`block mt-1 font-medium ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                100% source code in your GitHub. Milestone approvals. Zero lock-in.
              </span>
            </p>

            {/* Dual Conversion Buttons: Both with EXACT text: Talk to expert */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto mb-8">
              <button
                onClick={() => openTalkModal('General Architecture')}
                data-cursor-hover
                className="w-full sm:w-auto py-3.5 px-8 bg-gradient-to-r from-[#C1121F] to-[#8A0F18] text-white font-display font-bold text-sm sm:text-base rounded-xl hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-red-950/60 flex items-center justify-center gap-2 group"
              >
                <span>Talk to expert</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => openTalkModal('WhatsApp Strategy')}
                data-cursor-hover
                className={`w-full sm:w-auto py-3.5 px-7 border font-display font-semibold text-sm sm:text-base rounded-xl active:scale-95 transition-all flex items-center justify-center gap-2 ${
                  isDark
                    ? 'bg-white/5 hover:bg-white/10 text-white border-white/15'
                    : 'bg-white hover:bg-neutral-50 text-neutral-900 border-neutral-300 shadow-sm'
                }`}
              >
                <MessageCircle className="w-4 h-4 text-emerald-500" />
                <span>Talk to expert</span>
              </button>
            </div>

            {/* De-risking Proof Strip */}
            <div className={`flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm ${
              isDark ? 'text-neutral-400' : 'text-neutral-600'
            }`}>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#C1121F]" />
                <span>Free 30-Min Architecture Session</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#C1121F]" />
                <span>100% Code in Your GitHub</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#C1121F]" />
                <span>No Sales Reps or Subcontractors</span>
              </div>
            </div>

          </div>

          {/* Interactive Live Product Preview Card (Hero Visual) */}
          <div className="mt-12 sm:mt-16 max-w-5xl mx-auto">
            <div className={`relative rounded-2xl p-2 sm:p-4 border transition-colors ${
              isDark 
                ? 'bg-gradient-to-b from-white/10 via-white/5 to-transparent border-white/10 shadow-2xl shadow-black/80' 
                : 'bg-gradient-to-b from-neutral-200 via-neutral-100 to-transparent border-neutral-200 shadow-xl'
            }`}>
              <div className={`rounded-xl overflow-hidden border ${
                isDark ? 'bg-[#181818] border-white/10' : 'bg-white border-neutral-200'
              }`}>
                {/* Simulated App Header */}
                <div className={`px-4 py-3 border-b flex items-center justify-between ${
                  isDark ? 'bg-[#111111] border-white/5' : 'bg-neutral-100 border-neutral-200'
                }`}>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
                    <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
                    <span className={`ml-2 text-xs font-mono hidden sm:inline ${
                      isDark ? 'text-neutral-400' : 'text-neutral-600'
                    }`}>
                      production-release // samisoftz-studio
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="flex items-center gap-1 text-emerald-500 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      Verified Live Apps
                    </span>
                  </div>
                </div>

                {/* Hero Showcase Grid */}
                <div className={`p-4 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 ${
                  isDark ? 'bg-gradient-to-b from-[#181818] to-[#121212]' : 'bg-white'
                }`}>
                  
                  {/* Card 1: Start On Live */}
                  <div className={`p-4 rounded-xl border hover:border-red-500/40 transition-all flex flex-col justify-between ${
                    isDark ? 'bg-white/5 border-white/10' : 'bg-neutral-50 border-neutral-200 shadow-sm'
                  }`}>
                    <div>
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="px-2 py-0.5 rounded bg-red-500/10 text-red-500 font-semibold">Live Marketplace</span>
                        <span className={isDark ? 'text-neutral-400' : 'text-neutral-500'}>Lyon, France</span>
                      </div>
                      <h4 className={`font-display font-bold text-base mb-1 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                        Start On Live
                      </h4>
                      <p className={`text-xs mb-3 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                        iOS & Android React Native app with real-time video streaming, timed cart holds & Stripe Connect.
                      </p>
                    </div>
                    <div className={`pt-3 border-t flex items-center justify-between text-[11px] ${
                      isDark ? 'border-white/5' : 'border-neutral-200'
                    }`}>
                      <span className="text-emerald-500 font-medium">● App Store Released</span>
                      <span className={`font-mono ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>16-Mo Sprint</span>
                    </div>
                  </div>

                  {/* Card 2: InterviewPal */}
                  <div className={`p-4 rounded-xl border hover:border-red-500/40 transition-all flex flex-col justify-between ${
                    isDark ? 'bg-white/5 border-white/10' : 'bg-neutral-50 border-neutral-200 shadow-sm'
                  }`}>
                    <div>
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 font-semibold">AI SaaS</span>
                        <span className={isDark ? 'text-neutral-400' : 'text-neutral-500'}>Scaled Platform</span>
                      </div>
                      <h4 className={`font-display font-bold text-base mb-1 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                        InterviewPal
                      </h4>
                      <p className={`text-xs mb-3 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                        Next.js & PostgreSQL platform with prompt engineering, resume parsing, and Stripe subscriptions.
                      </p>
                    </div>
                    <div className={`pt-3 border-t flex items-center justify-between text-[11px] ${
                      isDark ? 'border-white/5' : 'border-neutral-200'
                    }`}>
                      <span className={`font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>~6,000 Active Users</span>
                      <span className={`font-mono ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>Next.js 14</span>
                    </div>
                  </div>

                  {/* Card 3: France DUERP */}
                  <div className={`p-4 rounded-xl border hover:border-red-500/40 transition-all flex flex-col justify-between ${
                    isDark ? 'bg-white/5 border-white/10' : 'bg-neutral-50 border-neutral-200 shadow-sm'
                  }`}>
                    <div>
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 font-semibold">Compliance SaaS</span>
                        <span className={isDark ? 'text-neutral-400' : 'text-neutral-500'}>France</span>
                      </div>
                      <h4 className={`font-display font-bold text-base mb-1 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                        France DUERP
                      </h4>
                      <p className={`text-xs mb-3 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                        Workplace risk assessment software with dynamic questionnaires and automated legal PDF exports.
                      </p>
                    </div>
                    <div className={`pt-3 border-t flex items-center justify-between text-[11px] ${
                      isDark ? 'border-white/5' : 'border-neutral-200'
                    }`}>
                      <span className={`font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>5,000+ Live Users</span>
                      <span className={`font-mono ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>Laravel/PHP</span>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ==========================================
          3. PROOF OF SCALE & METRICS BAR
      ========================================== */}
      <section className={`py-8 border-y transition-colors ${
        isDark ? 'bg-[#181818] border-white/10' : 'bg-white border-neutral-200 shadow-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            
            <div className="p-3">
              <div className={`text-2xl sm:text-3xl lg:text-4xl font-display font-black mb-1 ${
                isDark ? 'text-white' : 'text-neutral-900'
              }`}>
                6,000<span className="text-[#C1121F]">+</span>
              </div>
              <div className={`text-xs sm:text-sm font-medium ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                Active Users on AI SaaS
              </div>
            </div>

            <div className="p-3">
              <div className={`text-2xl sm:text-3xl lg:text-4xl font-display font-black mb-1 ${
                isDark ? 'text-white' : 'text-neutral-900'
              }`}>
                5,000<span className="text-[#C1121F]">+</span>
              </div>
              <div className={`text-xs sm:text-sm font-medium ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                Users on Compliance Platforms
              </div>
            </div>

            <div className="p-3">
              <div className={`text-2xl sm:text-3xl lg:text-4xl font-display font-black mb-1 ${
                isDark ? 'text-white' : 'text-neutral-900'
              }`}>
                100<span className="text-[#C1121F]">%</span>
              </div>
              <div className={`text-xs sm:text-sm font-medium ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                Client GitHub Ownership
              </div>
            </div>

            <div className="p-3">
              <div className={`text-2xl sm:text-3xl lg:text-4xl font-display font-black mb-1 ${
                isDark ? 'text-white' : 'text-neutral-900'
              }`}>
                UTC+5
              </div>
              <div className={`text-xs sm:text-sm font-medium ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                Full UK & US East Overlap
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==========================================
          4. THE PROBLEM: WHY MOST DEV PROJECTS FAIL
      ========================================== */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-block text-[#C1121F] text-xs font-bold tracking-widest uppercase mb-3">
            THE REALITY OF OUTSOURCING
          </div>
          <h2 className={`text-2xl sm:text-4xl font-display font-bold tracking-tight ${
            isDark ? 'text-white' : 'text-neutral-900'
          }`}>
            Tired of Freelancers Ghosting & Agencies Overcharging?
          </h2>
          <p className={`text-sm sm:text-base mt-3 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
            Here is why 70% of software projects fail with traditional vendors—and how Samisoftz eliminates every point of friction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          
          {/* Trap 1 */}
          <div className={`p-6 sm:p-8 rounded-2xl border hover:border-red-500/30 transition-all flex flex-col justify-between ${
            isDark ? 'bg-[#1A1A1A] border-white/5' : 'bg-white border-neutral-200 shadow-sm hover:shadow-md'
          }`}>
            <div>
              <div className="w-12 h-12 rounded-xl bg-red-500/10 text-[#C1121F] flex items-center justify-center font-mono font-bold text-lg mb-6">
                01
              </div>
              <h3 className={`text-lg font-display font-bold mb-2 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                The Junior Bait-and-Switch
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed mb-6 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                You pitch your vision to a polished senior agency executive, only to have your codebase handed to inexperienced interns or offshore subcontractors you never meet.
              </p>
            </div>
            <div className={`p-3.5 rounded-xl border text-xs ${
              isDark ? 'bg-white/5 border-white/5 text-neutral-300' : 'bg-red-50/70 border-red-100 text-neutral-800'
            }`}>
              <span className="text-[#C1121F] font-bold block mb-1">The Samisoftz Fix:</span>
              You work directly with founder Sami. Senior architectural oversight on every commit.
            </div>
          </div>

          {/* Trap 2 */}
          <div className={`p-6 sm:p-8 rounded-2xl border hover:border-red-500/30 transition-all flex flex-col justify-between ${
            isDark ? 'bg-[#1A1A1A] border-white/5' : 'bg-white border-neutral-200 shadow-sm hover:shadow-md'
          }`}>
            <div>
              <div className="w-12 h-12 rounded-xl bg-red-500/10 text-[#C1121F] flex items-center justify-center font-mono font-bold text-lg mb-6">
                02
              </div>
              <h3 className={`text-lg font-display font-bold mb-2 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                The Codebase Hostage Trap
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed mb-6 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                Agencies keep code in proprietary silos and manage AWS or App Store accounts under their own names, locking you in and preventing future team expansion.
              </p>
            </div>
            <div className={`p-3.5 rounded-xl border text-xs ${
              isDark ? 'bg-white/5 border-white/5 text-neutral-300' : 'bg-red-50/70 border-red-100 text-neutral-800'
            }`}>
              <span className="text-[#C1121F] font-bold block mb-1">The Samisoftz Fix:</span>
              100% of code is committed straight into your own GitHub and developer accounts from day one.
            </div>
          </div>

          {/* Trap 3 */}
          <div className={`p-6 sm:p-8 rounded-2xl border hover:border-red-500/30 transition-all flex flex-col justify-between ${
            isDark ? 'bg-[#1A1A1A] border-white/5' : 'bg-white border-neutral-200 shadow-sm hover:shadow-md'
          }`}>
            <div>
              <div className="w-12 h-12 rounded-xl bg-red-500/10 text-[#C1121F] flex items-center justify-center font-mono font-bold text-lg mb-6">
                03
              </div>
              <h3 className={`text-lg font-display font-bold mb-2 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                Runaway Scopes & Surprise Bills
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed mb-6 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                Vague upfront proposals lead to endless change-orders, delayed launch dates, and blown budgets with zero working software to show for it.
              </p>
            </div>
            <div className={`p-3.5 rounded-xl border text-xs ${
              isDark ? 'bg-white/5 border-white/5 text-neutral-300' : 'bg-red-50/70 border-red-100 text-neutral-800'
            }`}>
              <span className="text-[#C1121F] font-bold block mb-1">The Samisoftz Fix:</span>
              Milestone-based approvals. You approve working software before paying for the next stage.
            </div>
          </div>

        </div>

        {/* Section Mid CTA: EXACT text: Talk to expert */}
        <div className="mt-12 text-center">
          <button
            onClick={() => openTalkModal('Consultation on Scope')}
            data-cursor-hover
            className="py-3 px-8 bg-gradient-to-r from-[#C1121F] to-[#8A0F18] text-white font-bold text-sm rounded-xl hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-red-950/40 inline-flex items-center gap-2"
          >
            <span>Talk to expert</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* ==========================================
          5. CORE CAPABILITIES (WHAT WE BUILD)
      ========================================== */}
      <section className={`py-16 sm:py-20 border-y transition-colors ${
        isDark ? 'bg-[#161616] border-white/5' : 'bg-neutral-100/70 border-neutral-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-12 sm:mb-16">
            <span className="text-[#C1121F] text-xs font-bold tracking-widest uppercase block mb-2">
              SERVICE SCOPE & ENGINEERING
            </span>
            <h2 className={`text-2xl sm:text-4xl font-display font-bold tracking-tight ${
              isDark ? 'text-white' : 'text-neutral-900'
            }`}>
              Full-Stack Digital Products Built to Monetize.
            </h2>
            <p className={`text-sm sm:text-base mt-2 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
              We do not just build pretty screens. We engineer end-to-end user journeys, payment rails, operational back-office dashboards, and scalable cloud infrastructures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Capability 1 */}
            <div className={`p-6 rounded-2xl border hover:border-red-500/30 transition-all group ${
              isDark ? 'bg-[#1C1C1C] border-white/10' : 'bg-white border-neutral-200 shadow-sm hover:shadow-md'
            }`}>
              <div className="w-12 h-12 rounded-xl bg-[#C1121F]/10 text-[#C1121F] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className={`text-lg font-display font-bold mb-2 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                Mobile Applications (iOS & Android)
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed mb-4 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                Cross-platform mobile apps built with React Native. Offline data caching via MMKV, push alerts, app store release preparation, and seamless checkout flows.
              </p>
              <div className={`text-[11px] font-mono ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
                Start On Live // React Native // App Store
              </div>
            </div>

            {/* Capability 2 */}
            <div className={`p-6 rounded-2xl border hover:border-red-500/30 transition-all group ${
              isDark ? 'bg-[#1C1C1C] border-white/10' : 'bg-white border-neutral-200 shadow-sm hover:shadow-md'
            }`}>
              <div className="w-12 h-12 rounded-xl bg-[#C1121F]/10 text-[#C1121F] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Code2 className="w-6 h-6" />
              </div>
              <h3 className={`text-lg font-display font-bold mb-2 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                Full-Stack SaaS & Web Platforms
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed mb-4 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                Scalable web applications built on Next.js, TypeScript, PostgreSQL, and Node.js. Role-based access control, subscription tiers, and sub-second page loads.
              </p>
              <div className={`text-[11px] font-mono ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
                InterviewPal // Next.js // PostgreSQL
              </div>
            </div>

            {/* Capability 3 */}
            <div className={`p-6 rounded-2xl border hover:border-red-500/30 transition-all group ${
              isDark ? 'bg-[#1C1C1C] border-white/10' : 'bg-white border-neutral-200 shadow-sm hover:shadow-md'
            }`}>
              <div className="w-12 h-12 rounded-xl bg-[#C1121F]/10 text-[#C1121F] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className={`text-lg font-display font-bold mb-2 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                Live Commerce & Marketplaces
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed mb-4 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                Interactive livestreaming, real-time chats, timed cart reservation holds, and automated multi-party merchant payouts using Stripe Connect.
              </p>
              <div className={`text-[11px] font-mono ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
                GetStream // WebSockets // Stripe Connect
              </div>
            </div>

            {/* Capability 4 */}
            <div className={`p-6 rounded-2xl border hover:border-red-500/30 transition-all group ${
              isDark ? 'bg-[#1C1C1C] border-white/10' : 'bg-white border-neutral-200 shadow-sm hover:shadow-md'
            }`}>
              <div className="w-12 h-12 rounded-xl bg-[#C1121F]/10 text-[#C1121F] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className={`text-lg font-display font-bold mb-2 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                AI & Document Workflows
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed mb-4 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                Practical, revenue-driving AI integrations: custom prompt engineering, resume coaching, multi-stage OCR PDF extractions, and automated compliance document generation.
              </p>
              <div className={`text-[11px] font-mono ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
                Rocket Statements // France DUERP
              </div>
            </div>

            {/* Capability 5 */}
            <div className={`p-6 rounded-2xl border hover:border-red-500/30 transition-all group ${
              isDark ? 'bg-[#1C1C1C] border-white/10' : 'bg-white border-neutral-200 shadow-sm hover:shadow-md'
            }`}>
              <div className="w-12 h-12 rounded-xl bg-[#C1121F]/10 text-[#C1121F] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Terminal className="w-6 h-6" />
              </div>
              <h3 className={`text-lg font-display font-bold mb-2 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                Custom Back-Office & Admin Tools
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed mb-4 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                Empower your operational staff with customized admin panels to manage catalogue pricing, track gross/fee/net earnings, issue refunds, and generate tax invoices.
              </p>
              <div className={`text-[11px] font-mono ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
                Admin Consoles // Earnings Records
              </div>
            </div>

            {/* Capability 6 */}
            <div className={`p-6 rounded-2xl border hover:border-red-500/30 transition-all group ${
              isDark ? 'bg-[#1C1C1C] border-white/10' : 'bg-white border-neutral-200 shadow-sm hover:shadow-md'
            }`}>
              <div className="w-12 h-12 rounded-xl bg-[#C1121F]/10 text-[#C1121F] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className={`text-lg font-display font-bold mb-2 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                Media Transcoding & Speed
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed mb-4 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                High-throughput media manipulation (ffmpeg, Python) supporting 4K video slicing and self-hosted reverse-proxy web applications with sub-second TTI.
              </p>
              <div className={`text-[11px] font-mono ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
                SliceTube // Driven by Luxury
              </div>
            </div>

          </div>

          {/* Capabilities CTA: EXACT text: Talk to expert */}
          <div className="mt-12 text-center">
            <button
              onClick={() => openTalkModal('Service Capabilities')}
              data-cursor-hover
              className="py-3 px-8 bg-gradient-to-r from-[#C1121F] to-[#8A0F18] text-white font-bold text-sm rounded-xl hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-red-950/40 inline-flex items-center gap-2"
            >
              <span>Talk to expert</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* ==========================================
          6. PROVEN PRODUCTION CASE STUDIES
      ========================================== */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-block text-[#C1121F] text-xs font-bold tracking-widest uppercase mb-3">
            VERIFIED PORTFOLIO EVIDENCE
          </div>
          <h2 className={`text-2xl sm:text-4xl font-display font-bold tracking-tight ${
            isDark ? 'text-white' : 'text-neutral-900'
          }`}>
            Real Software Shipped. Real Users Scaled.
          </h2>
          <p className={`text-sm sm:text-base mt-2 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
            We do not show theoretical Figma concepts. Here is working software built by Samisoftz, running in production right now.
          </p>
        </div>

        {/* ==========================================
            PORTFOLIO CONTROLS (DESKTOP GRID + MOBILE SLIDER)
        ========================================== */}
        <div className="max-w-5xl mx-auto mb-10 px-2 sm:px-4">
          
          {/* Desktop & Tablet: Symmetrical 5-Column Grid Dock (No scrollbar, No clipping!) */}
          <div className={`hidden sm:grid sm:grid-cols-5 gap-2 p-2 rounded-2xl border shadow-xl backdrop-blur-xl transition-colors ${
            isDark 
              ? 'bg-[#181818]/90 border-white/10' 
              : 'bg-white border-neutral-200 shadow-md'
          }`}>
            {portfolioCases.map((item, idx) => {
              const isActive = activeProjectTab === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveProjectTab(idx)}
                  data-cursor-hover
                  className={`w-full py-2.5 px-2 rounded-xl text-xs md:text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 select-none text-center ${
                    isActive
                      ? 'bg-gradient-to-r from-[#C1121F] to-[#8A0F18] text-white shadow-lg shadow-red-950/60 border border-red-500/40 scale-[1.02]'
                      : isDark
                        ? 'text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent'
                        : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 border border-transparent'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                    isActive ? 'bg-white animate-pulse' : isDark ? 'bg-neutral-600' : 'bg-neutral-400'
                  }`} />
                  <span className="truncate">{item.shortTitle || item.title}</span>
                </button>
              );
            })}
          </div>

          {/* Mobile Phone (< 640px): Interactive Slider Bar with Previous/Next Controls */}
          <div className="sm:hidden space-y-2">
            <div className={`p-2 rounded-2xl border shadow-md flex items-center justify-between gap-2 ${
              isDark ? 'bg-[#181818] border-white/10' : 'bg-white border-neutral-200'
            }`}>
              <button
                onClick={() => setActiveProjectTab(prev => (prev === 0 ? portfolioCases.length - 1 : prev - 1))}
                aria-label="Previous Project"
                className={`p-2.5 rounded-xl border transition-colors ${
                  isDark 
                    ? 'bg-white/5 hover:bg-white/10 border-white/10 text-white' 
                    : 'bg-neutral-100 hover:bg-neutral-200 border-neutral-200 text-neutral-800'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="text-center flex-1 min-w-0 px-2">
                <span className="text-[10px] text-[#C1121F] font-bold uppercase tracking-wider block">
                  Project {activeProjectTab + 1} of {portfolioCases.length}
                </span>
                <span className={`text-sm font-bold truncate block ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                  {portfolioCases[activeProjectTab].title}
                </span>
              </div>

              <button
                onClick={() => setActiveProjectTab(prev => (prev === portfolioCases.length - 1 ? 0 : prev + 1))}
                aria-label="Next Project"
                className={`p-2.5 rounded-xl border transition-colors ${
                  isDark 
                    ? 'bg-white/5 hover:bg-white/10 border-white/10 text-white' 
                    : 'bg-neutral-100 hover:bg-neutral-200 border-neutral-200 text-neutral-800'
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Animated Progress Dots */}
            <div className="flex items-center justify-center gap-1.5 pt-1">
              {portfolioCases.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveProjectTab(idx)}
                  aria-label={`Switch to ${item.title}`}
                  className={`transition-all duration-300 rounded-full ${
                    activeProjectTab === idx
                      ? 'w-7 h-2 bg-[#C1121F]'
                      : isDark ? 'w-2 h-2 bg-neutral-700' : 'w-2 h-2 bg-neutral-300'
                  }`}
                />
              ))}
            </div>
          </div>

        </div>

        {/* ==========================================
            ACTIVE CASE STUDY SHOWCASE CARD
        ========================================== */}
        {(() => {
          const current = portfolioCases[activeProjectTab];
          return (
            <div className={`border rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden transition-all duration-500 ${
              isDark 
                ? 'bg-gradient-to-b from-[#1C1C1C] to-[#141414] border-white/10' 
                : 'bg-white border-neutral-200 shadow-xl'
            }`}>
              
              {/* Subtle Ambient Red Glow */}
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#C1121F]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
                
                {/* Left Column: Project Narrative & Specs (7 cols) */}
                <div className="lg:col-span-7 space-y-6">
                  
                  {/* Badges */}
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-500/10 text-red-500 border border-red-500/25">
                      {current.category}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 border border-emerald-500/25 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      {current.badge}
                    </span>
                    <span className={`text-xs ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                      📍 {current.location}
                    </span>
                  </div>

                  {/* Title & Core Value */}
                  <div>
                    <h3 className={`text-2xl sm:text-4xl font-display font-extrabold tracking-tight ${
                      isDark ? 'text-white' : 'text-neutral-900'
                    }`}>
                      {current.title}
                    </h3>
                    <p className={`text-sm sm:text-base leading-relaxed mt-2 ${
                      isDark ? 'text-neutral-300' : 'text-neutral-600'
                    }`}>
                      {current.summary}
                    </p>
                  </div>

                  {/* Architectural Breakthroughs */}
                  <div className="space-y-2.5 pt-1">
                    <div className={`text-xs font-semibold uppercase tracking-wider ${
                      isDark ? 'text-neutral-400' : 'text-neutral-500'
                    }`}>
                      Production Engineering Highlights:
                    </div>
                    {current.highlights.map((h, i) => (
                      <div key={i} className={`flex items-start gap-3 text-xs sm:text-sm ${
                        isDark ? 'text-neutral-200' : 'text-neutral-700'
                      }`}>
                        <div className="w-4 h-4 rounded-full bg-red-500/15 text-[#C1121F] flex items-center justify-center flex-shrink-0 mt-0.5 border border-red-500/30">
                          <Check className="w-3 h-3 stroke-[2.5]" />
                        </div>
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Chips */}
                  <div className="pt-2">
                    <div className={`text-xs font-semibold uppercase tracking-wider mb-2 ${
                      isDark ? 'text-neutral-400' : 'text-neutral-500'
                    }`}>
                      Technologies Delivered:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {current.stack.map((tech, i) => (
                        <span key={i} className={`px-2.5 py-1 rounded-lg border text-xs font-mono transition-colors ${
                          isDark 
                            ? 'bg-white/5 border-white/10 text-neutral-300 hover:border-red-500/30' 
                            : 'bg-neutral-100 border-neutral-200 text-neutral-700 hover:border-red-500/40'
                        }`}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action CTA: EXACT text: Talk to expert */}
                  <div className="pt-3">
                    <button
                      onClick={() => openTalkModal(current.title)}
                      data-cursor-hover
                      className="py-3 px-7 bg-gradient-to-r from-[#C1121F] to-[#8A0F18] text-white font-bold text-xs sm:text-sm rounded-xl hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-red-950/50 inline-flex items-center gap-2 group"
                    >
                      <span>Talk to expert</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                </div>

                {/* Right Column: High-Fidelity Interactive Software Simulator (5 cols) */}
                <div className="lg:col-span-5 space-y-4">
                  
                  {/* Browser/App Window Frame */}
                  <div className={`border rounded-2xl overflow-hidden shadow-2xl transition-colors ${
                    isDark ? 'bg-[#121212] border-white/15' : 'bg-neutral-900 border-neutral-700 text-white'
                  }`}>
                    
                    {/* Simulator Header */}
                    <div className="px-4 py-2.5 bg-[#181818] border-b border-white/10 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                        <span className="ml-2 font-mono text-[11px] text-neutral-400 truncate max-w-[140px] sm:max-w-[180px]">
                          {activeProjectTab === 0 ? 'startonlive.com/app' : activeProjectTab === 1 ? 'interviewpal.com/ai' : activeProjectTab === 2 ? 'franceduerp.fr/audit' : activeProjectTab === 3 ? 'rocketstatements.com/ocr' : 'slicetube.io/4k'}
                        </span>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        LIVE PRODUCTION
                      </span>
                    </div>

                    {/* Simulator Body Content Based on Active Project */}
                    <div className="p-4 sm:p-5 bg-gradient-to-b from-[#141414] to-[#0E0E0E] min-h-[300px] flex flex-col justify-between text-white">
                      
                      {activeProjectTab === 0 && (
                        /* Start On Live Simulator */
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-xs">
                            <span className="px-2 py-0.5 rounded bg-red-600/20 text-red-400 font-bold flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                              LIVE STREAM • 1,420 Watching
                            </span>
                            <span className="text-neutral-400 text-[11px]">Lyon, France</span>
                          </div>

                          <div className="relative rounded-xl overflow-hidden bg-gradient-to-r from-red-950/60 via-black to-neutral-900 p-4 border border-red-500/30">
                            <div className="flex items-start justify-between">
                              <div>
                                <span className="text-[10px] text-red-300 font-mono uppercase tracking-wider">Pinned Item</span>
                                <h4 className="text-white font-bold text-sm">Vintage Leather Bomber</h4>
                                <div className="text-emerald-400 font-bold text-sm mt-0.5">€189.00</div>
                              </div>
                              <span className="px-2 py-1 rounded bg-black/60 border border-white/10 text-[10px] text-neutral-300">
                                ⏱ 04:38 Hold
                              </span>
                            </div>
                            <div className="mt-3 flex items-center gap-2">
                              <div className="flex-1 py-1.5 px-3 bg-[#C1121F] text-white font-bold text-xs rounded-lg text-center shadow-md">
                                Reserve & Checkout
                              </div>
                              <div className="px-2.5 py-1.5 bg-white/10 rounded-lg text-xs font-mono text-neutral-300">
                                Apple Pay
                              </div>
                            </div>
                          </div>

                          <div className="p-3 bg-white/5 rounded-xl border border-white/5 space-y-2 text-xs">
                            <div className="text-[10px] text-neutral-400 uppercase font-semibold">Live Chat Feed (GetStream):</div>
                            <div className="text-neutral-300 flex items-center gap-1.5">
                              <span className="font-semibold text-white">Sophie_L:</span> Size M still in stock?
                            </div>
                            <div className="text-neutral-300 flex items-center gap-1.5">
                              <span className="font-semibold text-emerald-400">OrderBot:</span> Alexandre just ordered from Paris ⚡
                            </div>
                          </div>
                        </div>
                      )}

                      {activeProjectTab === 1 && (
                        /* InterviewPal Simulator */
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-emerald-400 font-bold flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                              AI Interview Coach Active
                            </span>
                            <span className="text-neutral-400 text-[11px]">~6,000 Users</span>
                          </div>

                          <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 via-black to-neutral-900 border border-emerald-500/30">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-semibold text-white">Full-Stack Simulation Score</span>
                              <span className="text-emerald-400 font-bold text-base font-display">94% (Grade A+)</span>
                            </div>
                            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                              <div className="bg-emerald-500 h-full rounded-full w-[94%]" />
                            </div>
                            <p className="text-[11px] text-neutral-300 mt-3 leading-relaxed">
                              "Strong explanation of PostgreSQL index optimization & OAuth workflows. Recommended: elaborate on horizontal caching."
                            </p>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="p-2.5 bg-white/5 rounded-lg border border-white/5">
                              <div className="text-neutral-400 text-[10px]">Resume Score</div>
                              <div className="text-white font-bold mt-0.5">88 / 100 ATS</div>
                            </div>
                            <div className="p-2.5 bg-white/5 rounded-lg border border-white/5">
                              <div className="text-neutral-400 text-[10px]">Billing Model</div>
                              <div className="text-white font-bold mt-0.5">Stripe Monthly</div>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeProjectTab === 2 && (
                        /* France DUERP Simulator */
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-blue-400 font-bold flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                              Document Unique 2026
                            </span>
                            <span className="text-neutral-400 text-[11px]">5,000+ Entreprises</span>
                          </div>

                          <div className="p-4 rounded-xl bg-gradient-to-r from-blue-950/40 via-black to-neutral-900 border border-blue-500/30">
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-xs font-semibold text-white">Conformité Légale DUERP</span>
                              <span className="text-blue-400 font-bold text-sm">100% Validé</span>
                            </div>
                            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden mb-3">
                              <div className="bg-blue-500 h-full rounded-full w-full" />
                            </div>
                            <div className="flex items-center justify-between text-[11px] text-neutral-300">
                              <span>📄 Generation PDF Personnalisé</span>
                              <span className="text-emerald-400 font-mono">Prêt (18 Pages)</span>
                            </div>
                          </div>

                          <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-xs space-y-1.5">
                            <div className="flex justify-between text-neutral-400 text-[11px]">
                              <span>Structure Entreprise:</span>
                              <span className="text-white font-medium">Bâtiment / BTP (20-49 Salariés)</span>
                            </div>
                            <div className="flex justify-between text-neutral-400 text-[11px]">
                              <span>Statut Maintenance:</span>
                              <span className="text-emerald-400 font-medium">SLA Actif par Samisoftz</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeProjectTab === 3 && (
                        /* Rocket Statements Simulator */
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-amber-400 font-bold flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                              Multi-Stage OCR Engine
                            </span>
                            <span className="text-neutral-400 text-[11px]">Fintech Pipeline</span>
                          </div>

                          <div className="p-3.5 rounded-xl bg-black border border-white/10 space-y-2">
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="text-neutral-400">Input: Barclays_Bank_Aug26.pdf</span>
                              <span className="text-emerald-400 font-mono font-bold">99.8% Accuracy</span>
                            </div>
                            <div className="p-2 bg-white/5 rounded font-mono text-[10px] text-neutral-300 space-y-1">
                              <div className="flex justify-between border-b border-white/5 pb-0.5 text-neutral-500">
                                <span>DATE</span><span>DESC</span><span>AMOUNT</span>
                              </div>
                              <div className="flex justify-between">
                                <span>18/08</span><span>STRIPE PAYOUT</span><span className="text-emerald-400">+£4,280.00</span>
                              </div>
                              <div className="flex justify-between">
                                <span>21/08</span><span>AWS CLOUD</span><span className="text-red-400">-£312.40</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between gap-2 text-xs">
                            <span className="text-[11px] text-neutral-400">Instant Clean Exports:</span>
                            <div className="flex gap-1.5">
                              <span className="px-2 py-1 bg-white/10 rounded text-[10px] font-mono text-white">.XLSX</span>
                              <span className="px-2 py-1 bg-white/10 rounded text-[10px] font-mono text-white">.CSV</span>
                              <span className="px-2 py-1 bg-white/10 rounded text-[10px] font-mono text-white">.JSON</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeProjectTab === 4 && (
                        /* SliceTube & Driven by Luxury Simulator */
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-purple-400 font-bold flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse"></span>
                              High-Speed Transcoder
                            </span>
                            <span className="text-neutral-400 text-[11px]">4K Video & Luxury Web</span>
                          </div>

                          <div className="p-3.5 rounded-xl bg-gradient-to-r from-purple-950/40 via-black to-neutral-900 border border-purple-500/30">
                            <div className="flex justify-between text-xs font-semibold text-white mb-2">
                              <span>SliceTube: 4K Trimmer</span>
                              <span className="text-purple-300 font-mono">01:14 → 02:45</span>
                            </div>
                            <div className="w-full bg-white/10 h-3 rounded-lg overflow-hidden flex items-center px-1">
                              <div className="w-1/3 bg-purple-500/30 h-full rounded" />
                              <div className="w-1/2 bg-purple-500 h-full rounded" />
                            </div>
                            <div className="flex justify-between text-[10px] text-neutral-400 mt-2 font-mono">
                              <span>ffmpeg 6.0</span><span>No Watermark</span><span>Fast Export</span>
                            </div>
                          </div>

                          <div className="p-2.5 bg-white/5 rounded-xl border border-white/5 text-xs flex items-center justify-between">
                            <div className="text-[11px]">
                              <div className="text-white font-semibold">Driven by Luxury UK</div>
                              <div className="text-neutral-400 text-[10px]">Self-hosted Node / Fleet enquiry</div>
                            </div>
                            <span className="px-2 py-1 rounded bg-white/10 text-[10px] text-emerald-400 font-mono">
                              Sub-second TTI
                            </span>
                          </div>
                        </div>
                      )}

                    </div>
                  </div>

                  {/* Micro Metrics Grid Below Mockup */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className={`p-3 rounded-xl border ${
                      isDark ? 'bg-white/5 border-white/5' : 'bg-neutral-50 border-neutral-200'
                    }`}>
                      <div className={`text-[10px] uppercase tracking-wider ${
                        isDark ? 'text-neutral-400' : 'text-neutral-500'
                      }`}>{current.stats[0].label}</div>
                      <div className={`text-sm font-bold font-display mt-0.5 ${
                        isDark ? 'text-white' : 'text-neutral-900'
                      }`}>{current.stats[0].val}</div>
                    </div>
                    <div className={`p-3 rounded-xl border ${
                      isDark ? 'bg-white/5 border-white/5' : 'bg-neutral-50 border-neutral-200'
                    }`}>
                      <div className={`text-[10px] uppercase tracking-wider ${
                        isDark ? 'text-neutral-400' : 'text-neutral-500'
                      }`}>{current.stats[1].label}</div>
                      <div className={`text-sm font-bold font-display mt-0.5 ${
                        isDark ? 'text-white' : 'text-neutral-900'
                      }`}>{current.stats[1].val}</div>
                    </div>
                  </div>

                  {/* Client Guarantee Pill */}
                  <div className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
                    isDark ? 'bg-red-950/20 border-red-500/20 text-neutral-300' : 'bg-red-50 border-red-200 text-neutral-800'
                  }`}>
                    <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span><strong>100% Code Handover:</strong> Committed directly to client's private GitHub.</span>
                  </div>

                </div>

              </div>
            </div>
          );
        })()}

      </section>

      {/* ==========================================
          7. THE 5-STEP DE-RISKED ENGAGEMENT MODEL
      ========================================== */}
      <section className={`py-16 sm:py-24 border-y transition-colors ${
        isDark ? 'bg-[#181818] border-white/10' : 'bg-neutral-50 border-neutral-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-[#C1121F] text-xs font-bold tracking-widest uppercase block mb-2">
              HOW WE ENGAGE
            </span>
            <h2 className={`text-2xl sm:text-4xl font-display font-bold tracking-tight ${
              isDark ? 'text-white' : 'text-neutral-900'
            }`}>
              A 5-Step Process Built to Eliminate Risk.
            </h2>
            <p className={`text-sm sm:text-base mt-2 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
              From day one, you retain full ownership of your IP, source code, and cloud infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            
            {/* Step 1 */}
            <div className={`p-5 rounded-xl border relative flex flex-col justify-between ${
              isDark ? 'bg-[#141414] border-white/10' : 'bg-white border-neutral-200 shadow-sm'
            }`}>
              <div>
                <div className="text-2xl font-mono font-bold text-[#C1121F] mb-3">01</div>
                <h4 className={`text-sm font-display font-bold mb-2 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                  Free 30-Min Call
                </h4>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                  Direct talk with founder Sami to review feasibility, technical architecture, and rough cost.
                </p>
              </div>
              <div className={`mt-4 pt-3 border-t text-[11px] text-emerald-500 font-medium ${
                isDark ? 'border-white/5' : 'border-neutral-100'
              }`}>
                ✓ No obligation
              </div>
            </div>

            {/* Step 2 */}
            <div className={`p-5 rounded-xl border relative flex flex-col justify-between shadow-lg ${
              isDark ? 'bg-[#141414] border-red-500/30 shadow-red-950/20' : 'bg-white border-red-300 shadow-red-100 ring-1 ring-red-400/20'
            }`}>
              <div>
                <div className="text-2xl font-mono font-bold text-[#C1121F] mb-3">02</div>
                <h4 className={`text-sm font-display font-bold mb-2 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                  1–2 Wk Discovery
                </h4>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                  For undefined concepts: we deliver a complete architecture brief, user flows, schemas & fixed price.
                </p>
              </div>
              <div className={`mt-4 pt-3 border-t text-[11px] font-semibold ${
                isDark ? 'border-white/5 text-white' : 'border-neutral-100 text-[#C1121F]'
              }`}>
                ★ You own the brief
              </div>
            </div>

            {/* Step 3 */}
            <div className={`p-5 rounded-xl border relative flex flex-col justify-between ${
              isDark ? 'bg-[#141414] border-white/10' : 'bg-white border-neutral-200 shadow-sm'
            }`}>
              <div>
                <div className="text-2xl font-mono font-bold text-[#C1121F] mb-3">03</div>
                <h4 className={`text-sm font-display font-bold mb-2 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                  Milestone Sprints
                </h4>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                  Work is delivered in transparent sprints. You test functional code before paying for the next phase.
                </p>
              </div>
              <div className={`mt-4 pt-3 border-t text-[11px] text-emerald-500 font-medium ${
                isDark ? 'border-white/5' : 'border-neutral-100'
              }`}>
                ✓ Zero lock-in
              </div>
            </div>

            {/* Step 4 */}
            <div className={`p-5 rounded-xl border relative flex flex-col justify-between ${
              isDark ? 'bg-[#141414] border-white/10' : 'bg-white border-neutral-200 shadow-sm'
            }`}>
              <div>
                <div className="text-2xl font-mono font-bold text-[#C1121F] mb-3">04</div>
                <h4 className={`text-sm font-display font-bold mb-2 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                  Deployment & Release
                </h4>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                  We deploy to AWS/Vercel and publish to the Apple App Store and Google Play Console.
                </p>
              </div>
              <div className={`mt-4 pt-3 border-t text-[11px] text-emerald-500 font-medium ${
                isDark ? 'border-white/5' : 'border-neutral-100'
              }`}>
                ✓ 100% In your accounts
              </div>
            </div>

            {/* Step 5 */}
            <div className={`p-5 rounded-xl border relative flex flex-col justify-between ${
              isDark ? 'bg-[#141414] border-white/10' : 'bg-white border-neutral-200 shadow-sm'
            }`}>
              <div>
                <div className="text-2xl font-mono font-bold text-[#C1121F] mb-3">05</div>
                <h4 className={`text-sm font-display font-bold mb-2 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                  Launch Continuity
                </h4>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                  Ongoing maintenance SLA or clean code handover documentation to your continuing internal team.
                </p>
              </div>
              <div className={`mt-4 pt-3 border-t text-[11px] text-emerald-500 font-medium ${
                isDark ? 'border-white/5' : 'border-neutral-100'
              }`}>
                ✓ France DUERP proof
              </div>
            </div>

          </div>

          {/* Process Section CTA: EXACT text: Talk to expert */}
          <div className="mt-12 text-center">
            <button
              onClick={() => openTalkModal('Delivery Process')}
              data-cursor-hover
              className="py-3 px-8 bg-gradient-to-r from-[#C1121F] to-[#8A0F18] text-white font-bold text-sm rounded-xl hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-red-950/40 inline-flex items-center gap-2"
            >
              <span>Talk to expert</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* ==========================================
          8. FOUNDER CREDIBILITY & DIRECT CONTACT
      ========================================== */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`max-w-4xl mx-auto border rounded-3xl p-6 sm:p-12 relative overflow-hidden transition-colors ${
          isDark 
            ? 'bg-gradient-to-r from-red-950/30 via-[#1A1A1A] to-[#141414] border-red-500/20' 
            : 'bg-gradient-to-r from-red-50/70 via-white to-neutral-50 border-red-200 shadow-lg text-neutral-900'
        }`}>
          
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
            
            {/* Founder Avatar / Logo Crest */}
            <div className={`w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-red-500/40 flex-shrink-0 shadow-xl shadow-red-950/50 flex items-center justify-center p-3 ${
              isDark ? 'bg-black' : 'bg-white'
            }`}>
              <img 
                src={isDark ? './logo-white.png' : './logo.png'} 
                alt="Samisoftz Founder" 
                className="w-full h-auto object-contain" 
              />
            </div>

            <div className="space-y-4 text-center sm:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-500 text-xs font-semibold">
                FOUNDER-LED COMMITMENT
              </div>

              <h3 className={`text-2xl sm:text-3xl font-display font-bold ${
                isDark ? 'text-white' : 'text-neutral-900'
              }`}>
                "You Talk Directly With Me. No Account Managers."
              </h3>

              <p className={`text-sm sm:text-base leading-relaxed ${
                isDark ? 'text-neutral-300' : 'text-neutral-700'
              }`}>
                When you hire an agency, you often pay for account executives, overhead, and bloated management layers. At Samisoftz, I lead your product from day one. We map your database schemas together, test staging builds on weekly milestone calls, and push production-ready code directly to your GitHub.
              </p>

              <div className={`pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs ${
                isDark ? 'text-neutral-400' : 'text-neutral-600'
              }`}>
                <span className="flex items-center gap-1.5 font-medium">
                  <Globe2 className="w-4 h-4 text-[#C1121F]" />
                  Dedicated UK & US East Overlap
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <Code2 className="w-4 h-4 text-[#C1121F]" />
                  Clean, Documented Handover
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <Lock className="w-4 h-4 text-[#C1121F]" />
                  Strict NDA & IP Protection
                </span>
              </div>

              {/* Founder Section CTA: EXACT text: Talk to expert */}
              <div className="pt-4">
                <button
                  onClick={() => openTalkModal('Founder Strategy')}
                  data-cursor-hover
                  className="py-3 px-7 bg-gradient-to-r from-[#C1121F] to-[#8A0F18] text-white font-bold text-xs sm:text-sm rounded-xl hover:brightness-110 active:scale-95 transition-all shadow-md shadow-red-950/40 inline-flex items-center gap-2"
                >
                  <span>Talk to expert</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ==========================================
          9. OBJECTION-BUSTING FAQ ACCORDION
      ========================================== */}
      <section className={`py-16 sm:py-24 border-t transition-colors ${
        isDark ? 'bg-[#161616] border-white/5' : 'bg-neutral-100/60 border-neutral-200'
      }`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <span className="text-[#C1121F] text-xs font-bold tracking-widest uppercase block mb-2">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className={`text-2xl sm:text-4xl font-display font-bold tracking-tight ${
              isDark ? 'text-white' : 'text-neutral-900'
            }`}>
              Straight Answers to Common Questions.
            </h2>
          </div>

          <div className="space-y-3">
            {faqItems.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  className={`border rounded-xl overflow-hidden transition-colors ${
                    isDark ? 'border-white/10 bg-[#1C1C1C]' : 'border-neutral-200 bg-white shadow-sm'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    data-cursor-hover
                    className={`w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 text-sm sm:text-base font-medium transition-colors ${
                      isDark ? 'text-white hover:text-red-400' : 'text-neutral-900 hover:text-[#C1121F]'
                    }`}
                  >
                    <span>{item.q}</span>
                    <ChevronDown className={`w-4 h-4 text-neutral-400 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#C1121F]' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className={`px-4 pb-5 sm:px-5 pt-1 text-xs sm:text-sm leading-relaxed border-t ${
                      isDark ? 'text-neutral-300 border-white/5' : 'text-neutral-600 border-neutral-100'
                    }`}>
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* FAQ Bottom CTA: EXACT text: Talk to expert */}
          <div className={`mt-10 p-6 rounded-2xl border text-center flex flex-col sm:flex-row items-center justify-between gap-4 ${
            isDark ? 'bg-white/5 border-white/10' : 'bg-white border-neutral-200 shadow-sm'
          }`}>
            <div className="text-left">
              <div className={`text-sm font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                Have a project with specific constraints?
              </div>
              <div className={`text-xs ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                Let's discuss technical feasibility in a 30-min call.
              </div>
            </div>
            <button
              onClick={() => openTalkModal('FAQ Inquiry')}
              data-cursor-hover
              className="py-2.5 px-6 bg-gradient-to-r from-[#C1121F] to-[#8A0F18] text-white font-bold text-xs sm:text-sm rounded-xl hover:brightness-110 active:scale-95 transition-all shadow-md shadow-red-950/40 flex items-center gap-1.5"
            >
              <span>Talk to expert</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

      {/* ==========================================
          10. FINAL HIGH-CONVERTING DECISION SECTION
      ========================================== */}
      <section className={`py-20 sm:py-28 relative overflow-hidden transition-colors ${
        isDark 
          ? 'bg-gradient-to-b from-[#141414] via-black to-[#0D0D0D]' 
          : 'bg-gradient-to-b from-neutral-50 via-white to-neutral-100 border-t border-neutral-200'
      }`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-500 text-xs font-semibold mb-6">
            READY TO BUILD?
          </div>

          <h2 className={`text-3xl sm:text-5xl font-display font-extrabold tracking-tight leading-tight mb-6 ${
            isDark ? 'text-white' : 'text-neutral-900'
          }`}>
            Stop Waiting on Overpriced Agencies.
            <span className={`block text-transparent bg-clip-text ${
              isDark 
                ? 'bg-gradient-to-r from-red-500 via-neutral-100 to-white' 
                : 'bg-gradient-to-r from-[#C1121F] via-neutral-800 to-neutral-900'
            }`}>
              Let's Build Your Product the Right Way.
            </span>
          </h2>

          <p className={`text-base sm:text-lg max-w-xl mx-auto mb-10 ${
            isDark ? 'text-neutral-300' : 'text-neutral-600'
          }`}>
            Book a free 30-minute technical consultation with founder Sami, or message us on WhatsApp for an instant response.
          </p>

          {/* Dual Final Buttons: Both with EXACT text: Talk to expert */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-8">
            <button
              onClick={() => openTalkModal('Final CTA Session')}
              data-cursor-hover
              className="w-full sm:w-auto py-4 px-8 bg-gradient-to-r from-[#C1121F] to-[#8A0F18] text-white font-display font-bold text-base rounded-xl hover:brightness-110 active:scale-95 transition-all shadow-2xl shadow-red-950/70 flex items-center justify-center gap-2 group"
            >
              <span>Talk to expert</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => openTalkModal('Final WhatsApp Session')}
              data-cursor-hover
              className={`w-full sm:w-auto py-4 px-7 border font-display font-semibold text-base rounded-xl active:scale-95 transition-all flex items-center justify-center gap-2 ${
                isDark
                  ? 'bg-white/5 hover:bg-white/10 text-white border-white/15'
                  : 'bg-white hover:bg-neutral-50 text-neutral-900 border-neutral-300 shadow-sm'
              }`}
            >
              <MessageCircle className="w-4 h-4 text-emerald-500" />
              <span>Talk to expert</span>
            </button>
          </div>

          <div className={`text-xs flex flex-wrap items-center justify-center gap-4 ${
            isDark ? 'text-neutral-400' : 'text-neutral-600'
          }`}>
            <span>✓ No Sales Reps</span>
            <span>✓ 100% Code Ownership</span>
            <span>✓ Milestones & Staging Access</span>
          </div>

        </div>
      </section>

      {/* ==========================================
          11. FOOTER
      ========================================== */}
      <footer className="py-10 bg-[#0E0E0E] border-t border-white/5 text-xs text-neutral-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <img src="./logo-white.png" alt="Samisoftz" className="h-6 w-auto object-contain" />
            <span className="text-neutral-500">| Custom Software & Mobile Product Development</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-neutral-400">
            <span>Pakistan (UTC+5)</span>
            <span>•</span>
            <a href="mailto:hello@samisoftz.com" className="hover:text-white transition-colors">
              hello@samisoftz.com
            </a>
            <span>•</span>
            <span className="text-neutral-400">UK & US Client Coverage</span>
          </div>

        </div>
      </footer>

      {/* ==========================================
          12. MOBILE STICKY BOTTOM BAR (MAX CONVERSION)
      ========================================== */}
      {scrolledPastHero && (
        <div className={`md:hidden fixed bottom-0 left-0 right-0 z-40 backdrop-blur-lg border-t p-3 flex items-center gap-2 shadow-2xl animate-slideUp transition-colors ${
          isDark ? 'bg-[#141414]/95 border-white/10' : 'bg-white/95 border-neutral-200'
        }`}>
          <a
            href="https://wa.me/923000000000?text=Hi%20Sami%2C%20I%20want%20to%20talk%20to%20an%20expert%20about%20building%20a%20project."
            target="_blank"
            rel="noreferrer"
            className="p-3 bg-[#25D366]/15 text-[#25D366] border border-[#25D366]/30 rounded-xl flex items-center justify-center flex-shrink-0"
            title="Chat on WhatsApp"
          >
            <MessageCircle className="w-5 h-5" />
          </a>

          {/* Sticky Mobile CTA: EXACT text: Talk to expert */}
          <button
            onClick={() => openTalkModal('Mobile Sticky Bar')}
            className="flex-1 py-3 px-4 bg-gradient-to-r from-[#C1121F] to-[#8A0F18] text-white font-display font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-red-950/60 active:scale-95 transition-all"
          >
            <span>Talk to expert</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ==========================================
          13. INTERACTIVE CONVERSION MODAL
      ========================================== */}
      <TalkToExpertModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedProject={modalProject}
        theme={theme}
      />
    </div>
  );
}
