import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import Hero3D from './components/Hero3D';
import WorkGrid from './components/WorkGrid';
import ServicesGrid from './components/ServicesGrid';
import ProjectSandbox from './components/ProjectSandbox';
import DMSimulator from './components/DMSimulator';
import { SandboxState, WorkItem } from './types';
import {
  CafeWebsiteFrame,
  PoliticalPosterFrame,
  WeddingInviteFrame,
  SocialMediaFrame,
  RestaurantMenuFrame,
  FitnessFrame,
  StudentProjectFrame,
  DigitalInviteFrame,
} from './components/LiveFrames';

const DEFAULT_SANDBOX_STATE: SandboxState = {
  m1: {
    brandName: "Brew & Co",
    tagLine: "Mornings, made better.",
    categoryName: "SPECIALTY COFFEE",
    buttonText: "View the menu",
    domain: "brew-co.in",
    menuUrl: "Menu",
    aboutUrl: "About",
    visitUrl: "Visit",
    discColor: "#C8742F",
  },
  m2: {
    voteYear: "VOTE · 2026",
    wardNumber: "WARD 14",
    slogan: "FOR A BETTER FUTURE",
    candidateName: "Priya Sharma",
    pollDate: "Polls · 12 May",
    hashtag: "#ChangeNow",
  },
  mw: {
    title: "SAVE THE DATE",
    subtit: "TOGETHER WITH THEIR FAMILIES",
    groom: "Aarav",
    bride: "Diya",
    dateVenue: "SATURDAY · 14 FEB 2026 · JAIPUR",
  },
  m4: {
    quote: "Vote for progress, not promises.",
    rallyTime: "8PM",
    rallyLoc: "TONIGHT · MAIN GROUND",
    tipNum: "5",
    tipText: "reasons to vote local",
  },
  m5: {
    name: "Saffron",
    subtitle: "KITCHEN & BAR",
    s1title: "Burrata & Heirloom",
    s1price: "320",
    s2title: "Charred Paneer Tikka",
    s2price: "280",
    m1title: "Saffron Risotto",
    m1price: "540",
    m2title: "Dal Makhani Royale",
    m2price: "420",
  },
  mf: {
    title: "TRANSFORMATION PROGRAM",
    duration: "75DAY CHALLENGE",
    quote: "Discipline beats motivation.",
    completedDays: 14,
    totalDays: 75,
    labels: "DIET · WORKOUT · TRACK",
  },
  mi: {
    department: "DEPT. OF COMPUTER SCIENCE & ENGG.",
    badge: "IEEE · FINAL YEAR PROJECT",
    title: "Smart Traffic Flow using Deep Learning",
    description: "A real-time vehicle detection & signal-optimisation system with full report, code and viva support.",
    chips: ["Python", "YOLOv8", "Flask", "OpenCV"],
    batch: "Batch 2025–26",
    guide: "Guide: Prof. R. Mehta",
  },
  mn: {
    title: "YOU'RE INVITED",
    ringText: "21",
    heading: "Aanya turns twenty-one",
    dateStr: "SAT · 20 JUN · 7:00 PM",
    btnText: "Tap to RSVP",
  }
};

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [sandboxState, setSandboxState] = useState<SandboxState>(DEFAULT_SANDBOX_STATE);
  const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null);

  // Scroll event listener for glassmorphism navbar transition
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Escape key handler to close the lightbox modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedWork(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleFitnessDayToggle = (dayIdx: number) => {
    // Dynamically adjust completedDays when user clicks tracker dots on main cards
    const maxDays = sandboxState.mf.totalDays;
    const currentCompleted = sandboxState.mf.completedDays;
    
    // Scale indices out of 20 dots back to maxDays
    const calculatedDays = Math.round(((dayIdx + 1) / 20) * maxDays);
    
    setSandboxState(prev => ({
      ...prev,
      mf: {
        ...prev.mf,
        completedDays: calculatedDays === currentCompleted ? Math.max(0, calculatedDays - 5) : calculatedDays
      }
    }));
  };

  const isPortrait = selectedWork?.componentType === 'm5' || selectedWork?.componentType === 'mi';

  return (
    <div className="min-h-screen bg-[#0B0A12] text-[#F4F2FB] font-sans antialiased relative">
      
      {/* 1. BRAND NAVIGATION HEADER */}
      <nav id="nav" className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between p-4 md:px-12 transition-all duration-400 ${
        scrolled ? 'bg-[#0B0A12]/80 backdrop-blur-xl border-b border-white/8 py-3' : 'bg-transparent border-b border-transparent py-5'
      }`}>
        <a href="#top" className="logo flex items-center gap-2.5 font-display font-semibold text-lg md:text-xl tracking-tight text-[#F4F2FB] hover:opacity-85 transition-opacity">
          <svg className="w-8 md:w-9 h-8 md:h-9">
            <use href="#nxmark" />
          </svg>
          <span>Nex<em className="not-italic bg-gradient-to-r from-[#A855F7] to-[#7C3AED] bg-clip-text text-transparent">Yuva</em></span>
        </a>
        
        <div className="flex items-center gap-6 md:gap-10">
          <div className="hidden md:flex gap-7">
            <a href="#work" className="text-xs font-medium text-[#A29DB8] hover:text-white transition-colors">Work</a>
            <a href="#services" className="text-xs font-medium text-[#A29DB8] hover:text-white transition-colors">Services</a>
            <a href="#studio" className="text-xs font-medium text-[#A29DB8] hover:text-white transition-colors">Studio</a>
            <a href="#contact" className="text-xs font-medium text-[#A29DB8] hover:text-white transition-colors">Contact</a>
          </div>
          
          <a href="https://www.instagram.com/nexyuva/" target="_blank" rel="noopener" className="btn-ig py-2 px-4 md:px-5">
            <svg viewBox="0 0 24 24" className="w-4 h-4">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
            <span className="hidden sm:inline">DM us</span>
          </a>
        </div>
      </nav>

      {/* 2. RESPONSIVE HERO AND 3D INTERACTIVE BG */}
      <header className="relative min-h-[94vh] flex items-center overflow-hidden" id="top">
        <div className="absolute inset-0 bg-radial-gradient from-[#7C3AED]/20 via-transparent to-transparent pointer-events-none z-0" />
        <Hero3D />
        
        <div className="relative z-10 w-full max-w-[1240px] mx-auto px-7 py-24 md:py-32">
          <div className="reveal in">
            <div className="flex items-center gap-3.5 mb-6 animate-pulse">
              <span className="w-10 h-[1px] bg-gradient-to-r from-[#7C3AED] to-[#A855F7]" />
              <span className="mono-label text-[11px] font-mono tracking-[0.16em] uppercase text-[#5B5570]">
                Design · Web · Campaigns
              </span>
            </div>
            
            <h1 className="font-display font-semibold text-4xl sm:text-6xl md:text-8xl leading-[1.04] tracking-tight max-w-4xl text-white mb-6">
              Bold digital work for the <em className="not-italic bg-gradient-to-r from-[#A855F7] to-[#7C3AED] bg-clip-text text-transparent">next generation</em> of brands.
            </h1>
            
            <p className="text-[#A29DB8] text-base md:text-xl max-w-lg leading-relaxed mb-10">
              NexYuva is a creative & tech studio. We build websites, design invitations & posters, run political and fitness campaigns, and ship student & final-year projects — all under one roof.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a href="https://www.instagram.com/nexyuva/" target="_blank" rel="noopener" className="btn-ig flex items-center justify-center gap-2">
                <svg viewBox="0 0 24 24">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
                DM us on Instagram
              </a>
              <a href="#work" className="btn-ghost">
                View our work →
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* 3. INFINITE TEXT MARQUEE */}
      <div className="marquee select-none relative z-10">
        <div className="marquee-track">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="flex items-center">
              <span>Websites</span><span className="d mx-5">/</span>
              <span>Invitation Cards</span><span className="d mx-5">/</span>
              <span>Fitness & Diet Plans</span><span className="d mx-5">/</span>
              <span>Political Campaigns</span><span className="d mx-5">/</span>
              <span>Wedding Invites</span><span className="d mx-5">/</span>
              <span>IEEE Projects</span><span className="d mx-5">/</span>
              <span>Restaurant Sites</span><span className="d mx-5">/</span>
              <span>Social Media</span><span className="d mx-5">/</span>
              <span>Posters</span><span className="d mx-5">/</span>
            </span>
          ))}
        </div>
      </div>

      {/* 4. WORK SECTION GRID */}
      <WorkGrid 
        sandboxState={sandboxState} 
        onSelectWork={setSelectedWork}
        onFitnessDayToggle={handleFitnessDayToggle}
      />

      {/* 5. SERVICES BENTO GRID */}
      <ServicesGrid />

      {/* 6. STUDIO INFORMATION SECTION */}
      <section className="py-24 border-y border-white/8 bg-[#141021]/60 select-none" id="studio">
        <div className="max-w-[1240px] mx-auto px-7 reveal in">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="font-display font-medium text-2xl md:text-4xl leading-tight text-white tracking-tight">
              We're a young, tech-forward studio — but everything ships with a <em className="not-italic bg-gradient-to-r from-[#7C3AED] to-[#A855F7] bg-clip-text text-transparent">human eye for detail.</em>
            </div>
            
            <div className="space-y-6">
              <p className="text-[#A29DB8] text-sm md:text-base leading-relaxed">
                NexYuva pairs the speed of modern tools with real design craft — more options, faster, without the work ever feeling templated.
              </p>
              <p className="text-[#A29DB8] text-sm md:text-base leading-relaxed">
                From a single invitation card to a full website or a final-year project, we treat every job like it carries our name. Because it does.
              </p>
              
              <div className="pt-4">
                <a href="https://www.instagram.com/nexyuva/" target="_blank" rel="noopener" className="btn-ig flex items-center gap-2">
                  <svg viewBox="0 0 24 24" className="w-4 h-4">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                  Follow @nexyuva
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CONTACT / DMSIMULATOR INTEGRATION */}
      <section className="py-28 relative select-none" id="contact">
        <div className="absolute inset-x-0 top-0 h-full bg-radial-gradient from-[#7C3AED]/10 via-transparent to-transparent pointer-events-none z-0" />
        
        <div className="max-w-[1240px] mx-auto px-7 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div className="reveal in space-y-8">
              <h2 className="font-display font-semibold text-3xl md:text-5xl leading-tight text-white tracking-tight">
                Have a project in mind? <br />
                <em className="not-italic bg-gradient-to-r from-[#A855F7] to-[#7C3AED] bg-clip-text text-transparent">Let's build it.</em>
              </h2>
              
              <p className="text-[#A29DB8] text-sm md:text-base leading-relaxed max-w-lg">
                Tell us what you need — a website, an invite, a campaign or a project — and we'll get back fast. The quickest way to reach us is a DM on Instagram.
              </p>

              <div className="flex flex-col gap-4 text-[#A29DB8] font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#A855F7] animate-pulse" />
                  <span>@nexyuva · instagram.com/nexyuva</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
                  <span>Quick turn-around in under 24 hours</span>
                </div>
              </div>

              <div>
                <a href="#services" className="btn-ghost">
                  See all services →
                </a>
              </div>
            </div>

            {/* Interactive DM Box */}
            <div className="reveal in">
              <DMSimulator />
            </div>

          </div>
        </div>
      </section>

      {/* 8. BRAND DIRECTORY FOOTER */}
      <footer className="bg-[#0B0A12] border-t border-white/5 py-16 select-none relative z-10">
        <div className="max-w-[1240px] mx-auto px-7">
          <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
            
            <div className="max-w-xs space-y-4">
              <a href="#top" className="logo flex items-center gap-2.5 font-display font-semibold text-lg tracking-tight text-white hover:opacity-85 transition-opacity">
                <svg className="w-8 h-8">
                  <use href="#nxmark" />
                </svg>
                <span>Nex<em className="not-italic bg-gradient-to-r from-[#A855F7] to-[#7C3AED] bg-clip-text text-transparent">Yuva</em></span>
              </a>
              <p className="text-xs text-[#A29DB8] leading-relaxed">
                A design, web & campaigns studio building the next thing for brands that refuse to look ordinary.
              </p>
              
              <a href="https://www.instagram.com/nexyuva/" target="_blank" rel="noopener" className="btn-ig py-1.5 px-4 text-xs font-semibold">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
                @nexyuva
              </a>
            </div>

            <div className="flex flex-wrap gap-x-16 gap-y-10">
              <div className="space-y-4 min-w-[100px]">
                <h5 className="font-mono text-[10px] tracking-wider text-[#5B5570] uppercase">Build</h5>
                <div className="flex flex-col gap-2.5 text-xs text-[#A29DB8]">
                  <a href="#work" className="hover:text-white transition-colors">Websites</a>
                  <a href="#work" className="hover:text-white transition-colors">Restaurant Sites</a>
                  <a href="#work" className="hover:text-white transition-colors">Student Projects</a>
                  <a href="#work" className="hover:text-white transition-colors">IEEE Projects</a>
                </div>
              </div>

              <div className="space-y-4 min-w-[100px]">
                <h5 className="font-mono text-[10px] tracking-wider text-[#5B5570] uppercase">Design</h5>
                <div className="flex flex-col gap-2.5 text-xs text-[#A29DB8]">
                  <a href="#work" className="hover:text-white transition-colors">Invitation Cards</a>
                  <a href="#work" className="hover:text-white transition-colors">Wedding Invites</a>
                  <a href="#work" className="hover:text-white transition-colors">Posters</a>
                  <a href="#work" className="hover:text-white transition-colors">Social Media</a>
                </div>
              </div>

              <div className="space-y-4 min-w-[100px]">
                <h5 className="font-mono text-[10px] tracking-wider text-[#5B5570] uppercase">Campaigns</h5>
                <div className="flex flex-col gap-2.5 text-xs text-[#A29DB8]">
                  <a href="#work" className="hover:text-white transition-colors">Political Posters</a>
                  <a href="#work" className="hover:text-white transition-colors">Social Management</a>
                  <a href="#work" className="hover:text-white transition-colors">Fitness Programs</a>
                  <a href="#work" className="hover:text-white transition-colors">75-Day Challenge</a>
                </div>
              </div>
            </div>

          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono text-[#5B5570]">
            <span>© NexYuva {new Date().getFullYear()}</span>
            <span>DESIGN · WEB · CAMPAIGNS</span>
          </div>
        </div>
      </footer>

      {/* 9. LIGHTBOX COMPONENT - INTERACTIVE SANDBOX PLAYGROUND OVERLAY */}
      {selectedWork && (
        <div 
          onClick={() => setSelectedWork(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 backdrop-blur-md p-4 sm:p-8 animate-fadeIn select-none"
        >
          <button 
            onClick={() => setSelectedWork(null)}
            className="absolute top-6 right-6 w-11 h-11 rounded-full border border-white/10 bg-[#1B1530]/80 text-[#F4F2FB] text-xl flex items-center justify-center hover:bg-[#7C3AED] hover:border-transparent transition-all cursor-pointer z-50 shadow-2xl"
            aria-label="Close Sandbox"
          >
            ×
          </button>

          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-5xl bg-[#0B0A12] border border-white/10 rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="p-5 border-b border-white/8 bg-[#141021]/40 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-[#A855F7] tracking-wider uppercase block mb-1">
                  Customization Suite
                </span>
                <h3 className="text-base sm:text-lg font-display font-semibold text-white">
                  {selectedWork.title} — Live Editor
                </h3>
              </div>
              <div className="hidden sm:flex items-center gap-2 bg-[#1B1530] border border-white/5 px-3 py-1 rounded-full text-[10px] font-mono text-[#A29DB8]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Responsive Frame</span>
              </div>
            </div>

            {/* Content area */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Visual Stage */}
                <div className="lg:col-span-7 flex flex-col items-center justify-center bg-[#07060A] border border-white/5 rounded-xl p-6 relative group/stage">
                  <div className={`w-full ${selectedWork.image ? 'max-w-xl max-h-[70vh] flex items-center justify-center bg-black/30' : 'max-w-md'} ${selectedWork.image ? '' : isPortrait ? 'aspect-[3/4]' : 'aspect-[4/3]'} relative overflow-hidden shadow-2xl rounded-xl transition-all duration-500 animate-scaleIn`}>
                    {selectedWork.image ? (
                      <img
                        src={selectedWork.image}
                        alt={selectedWork.title}
                        referrerPolicy="no-referrer"
                        className="max-w-full max-h-[70vh] w-auto h-auto object-contain rounded-xl"
                      />
                    ) : (
                      <div className="w-full h-full">
                        {selectedWork.componentType === 'm1' && <CafeWebsiteFrame config={sandboxState.m1} />}
                        {selectedWork.componentType === 'm2' && <PoliticalPosterFrame config={sandboxState.m2} />}
                        {selectedWork.componentType === 'mw' && <WeddingInviteFrame config={sandboxState.mw} />}
                        {selectedWork.componentType === 'm4' && <SocialMediaFrame config={sandboxState.m4} />}
                        {selectedWork.componentType === 'm5' && <RestaurantMenuFrame config={sandboxState.m5} />}
                        {selectedWork.componentType === 'mf' && (
                          <FitnessFrame config={sandboxState.mf} onDayToggle={handleFitnessDayToggle} />
                        )}
                        {selectedWork.componentType === 'mi' && <StudentProjectFrame config={sandboxState.mi} />}
                        {selectedWork.componentType === 'mn' && <DigitalInviteFrame config={sandboxState.mn} />}
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] font-mono text-[#5B5570] mt-4 block text-center">
                    Rendered container scaling verified. Changes propagate live.
                  </span>
                </div>

                {/* Customization controls */}
                <div className="lg:col-span-5 space-y-6">
                  {selectedWork.componentType ? (
                    <ProjectSandbox
                      componentType={selectedWork.componentType}
                      sandboxState={sandboxState}
                      setSandboxState={setSandboxState}
                    />
                  ) : (
                    <div className="bg-[#141021] border border-white/8 rounded-xl p-5 select-none text-center py-12">
                      <Sparkles className="w-8 h-8 text-[#A855F7] mx-auto mb-4 animate-bounce" />
                      <h4 className="text-sm font-display font-semibold text-white uppercase mb-2">
                        Premium Asset Frame
                      </h4>
                      <p className="text-xs text-[#A29DB8] max-w-xs mx-auto leading-relaxed">
                        This work is processed from vector resources. Tap standard text boxes in the simulator or drop us an email for tailored brand kits!
                      </p>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button 
                      onClick={() => setSelectedWork(null)}
                      className="flex-1 btn-ig py-2.5 text-xs text-center justify-center shadow-lg cursor-pointer"
                    >
                      Keep Customize
                    </button>
                    <button 
                      onClick={() => {
                        setSandboxState(DEFAULT_SANDBOX_STATE);
                        setSelectedWork(null);
                      }}
                      className="btn-ghost flex-1 py-2.5 text-xs text-center justify-center cursor-pointer"
                    >
                      Reset Defaults
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
