import {
  Flame,
  Mail,
  Globe,
  GraduationCap,
  Megaphone,
  Sparkles,
  UtensilsCrossed,
  Code,
  Activity,
  Instagram,
} from 'lucide-react';
import { ServiceItem } from '../types';

const SERVICES: ServiceItem[] = [
  {
    id: 's1',
    num: '01',
    title: 'Fitness & Diet Planning',
    description: 'Custom workout and diet plans, branded program launches and coaching pages.',
    iconName: 'fitness',
  },
  {
    id: 's2',
    num: '02',
    title: 'Invitation Cards',
    description: 'Offline & digital invites for weddings, birthdays and events — print and animated.',
    iconName: 'invite',
  },
  {
    id: 's3',
    num: '03',
    title: 'Website Design & Development',
    description: 'Fast, modern websites for businesses, cafés, clinics and personal brands.',
    iconName: 'web',
  },
  {
    id: 's4',
    num: '04',
    title: 'Student Project Services',
    description: 'End-to-end academic, mini and major projects with documentation and support.',
    iconName: 'student',
  },
  {
    id: 's5',
    num: '05',
    title: 'Political Campaign & Posters',
    description: 'Campaign creatives, posters and rally graphics that move crowds.',
    iconName: 'political',
  },
  {
    id: 's6',
    num: '06',
    title: '75-Day Fitness Challenge',
    description: 'A complete challenge kit — tracker, plan and daily ready-to-post content.',
    iconName: 'challenge',
  },
  {
    id: 's7',
    num: '07',
    title: 'Wedding Invitation Showcase',
    description: 'Premium invite suites — from save-the-dates to RSVP pages and gallery sites.',
    iconName: 'wedding',
  },
  {
    id: 's8',
    num: '08',
    title: 'Restaurant & Café Websites',
    description: 'Menus, ordering pages and brand sites for restaurants and cafés.',
    iconName: 'restaurant',
  },
  {
    id: 's9',
    num: '09',
    title: 'IEEE & Final-Year Projects',
    description: 'IEEE-based final-year projects with code, report and viva preparation.',
    iconName: 'ieee',
  },
  {
    id: 's10',
    num: '10',
    title: 'Political Social Media',
    description: 'Daily social management and content for political leaders and pages.',
    iconName: 'social',
  },
];

const renderIcon = (name: string) => {
  const props = { className: 'w-6 h-6 stroke-[1.4]' };
  switch (name) {
    case 'fitness':
      return <Activity {...props} />;
    case 'invite':
      return <Mail {...props} />;
    case 'web':
      return <Globe {...props} />;
    case 'student':
      return <GraduationCap {...props} />;
    case 'political':
      return <Megaphone {...props} />;
    case 'challenge':
      return <Flame {...props} />;
    case 'wedding':
      return <Sparkles {...props} />;
    case 'restaurant':
      return <UtensilsCrossed {...props} />;
    case 'ieee':
      return <Code {...props} />;
    case 'social':
      return <Instagram {...props} />;
    default:
      return <Sparkles {...props} />;
  }
};

export default function ServicesGrid() {
  return (
    <section className="py-20 select-none" id="services">
      <div className="max-w-[1240px] mx-auto px-7">
        
        <div className="reveal in mb-12">
          <div className="eyebrow flex items-center gap-3.5 mb-6">
            <span className="w-10 h-[1px] bg-gradient-to-r from-[#7C3AED] to-[#A855F7]" />
            <span className="mono-label text-[11px] font-mono tracking-[0.16em] uppercase text-[#5B5570]">
              What we do
            </span>
          </div>
          <h2 className="font-display font-semibold text-3xl md:text-5xl leading-tight tracking-tight text-white mb-4">
            Everything your brand needs, under one roof.
          </h2>
          <p className="text-[#A29DB8] max-w-xl text-sm md:text-base leading-relaxed">
            From physical graphics to high-speed WebGL applications and student support, we unite classic craft with cutting-edge tools.
          </p>
        </div>

        {/* Dense Services Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-[1px] bg-white/5 border border-white/8 rounded-2xl overflow-hidden shadow-2xl">
          {SERVICES.map((svc) => (
            <div
              key={svc.id}
              className="bg-[#0B0A12] p-8 pb-10 hover:bg-[#141021] transition-all duration-300 relative flex flex-col justify-between group"
            >
              <span className="absolute top-6 right-6 font-mono text-xs text-[#5B5570] font-medium">
                {svc.num}
              </span>
              
              <div>
                <div className="w-12 h-12 rounded-xl bg-purple-950/20 border border-purple-500/10 flex items-center justify-center text-[#7C3AED] mb-6 group-hover:text-[#A855F7] group-hover:scale-110 transition-all duration-300">
                  {renderIcon(svc.iconName)}
                </div>
                
                <h3 className="font-display font-medium text-lg text-white mb-3 group-hover:text-[#A855F7] transition-colors leading-snug">
                  {svc.title}
                </h3>
              </div>

              <p className="text-xs text-[#A29DB8] leading-relaxed">
                {svc.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
