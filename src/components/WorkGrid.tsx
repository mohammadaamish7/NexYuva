import React, { useState, useRef } from 'react';
import { WorkItem, SandboxState } from '../types';
import {
  CafeWebsiteFrame,
  PoliticalPosterFrame,
  WeddingInviteFrame,
  SocialMediaFrame,
  RestaurantMenuFrame,
  FitnessFrame,
  StudentProjectFrame,
  DigitalInviteFrame,
} from './LiveFrames';

interface WorkGridProps {
  sandboxState: SandboxState;
  onSelectWork: (item: WorkItem) => void;
  onFitnessDayToggle: (dayIdx: number) => void;
}

const CATEGORIES = [
  'All',
  'Websites',
  'Invitation Cards',
  'Fitness & Diet Plans',
  'Political Campaigns',
  'Wedding Invites',
  'Restaurant Sites',
  'Social Media',
  'Posters',
];

const WORK_ITEMS: WorkItem[] = [
  {
    id: 'fitness-program',
    title: 'Fitness Programs',
    tag: 'Program kit',
    categories: ['Fitness & Diet Plans'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQIEaOxT0P2jfvn2jOBXtEQRS1uaPMHnZpLTp5YjfSwgMfxSibtvAfGS35VVhBEdSNaqHVA-y_gz4la2L6dMTiTQqmpRG3i5IeufjAryvmHMlkQMJb3koTaZAAxBAfO1RvNXQBPNksv05k8dYRVeqehQwwI0E1UIHJF0t0-f8JhZITBrZujR5jJ1UdgirLgc-jSUrtoXwBrPf61nRDUeW2xrlbCWElEmpL_hD7pkoBVAILTBjOB9uITzzua_aTeVZZXfU',
  },
  {
    id: 'invite-suite-img',
    title: 'Invite Suite',
    tag: 'Invite suite',
    categories: ['Invitation Cards'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJnwCKsXMr9C6oGRjxqALW3CQ6HrBSDoX6rW_UJ9Mi6EeMIo13n-PNo7tmKMIQd_H5ZfXqxYZvxGXRXR2AlCmTInWXPGO9dvdMtEtvHnizMvwpwgrUv6mQ2iLa9LCT3FuutQMG1JChrP0dYO3UEtWxHep1VCNZBIwWMvXIZKRSbXxbvvwEJtPP2iFd05IqK9tuTDmtGnMmnfh8yjWCdghqfy-rXQQbKUSV2MAo0z7VVZY9gXj7r9JtYOAE35x1VP7DDQU',
  },
  {
    id: 'restaurant-marketing-img',
    title: 'Restaurant Marketing',
    tag: 'Brand design',
    categories: ['Restaurant Sites', 'Posters'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJCCBnPXq7KkLX1W5Jmj64Zih8i55gzqa-D0nzZYRyS6aS6YDLYggUgenI5txutRkME3-JasfBFmZC93J--KOS4xEbcdWeL00qJak0wuR4TGE8UwQr1ORwN9kMOheHuBu8WoIalnXcVqv_kMxzjUKJxC-ua9FMDjfWYQZb7h5rnsz53CZpHepk6At2Y_qfMuEB0_bk5x-NkmZ2GLRpux2ADMVe26X-3NPt7wSNc2LQ4ZVJfnZyZWwFS_x0GFtN807gmfs',
  },
  {
    id: 'poster-events-img',
    title: 'Poster for Events',
    tag: 'Print design',
    categories: ['Posters'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDoUBew8CnD4UM9PTwnWRVO3TT5IZuRy8cwof_GnCo8SkH3k0KZsU1Nd0PA0hNqBcuwqIkquB-SBz3cDeqtXecSdnPV6uMY6g60V0DVvHpazxASLuRxjJsS5taQ27gxoOY6wRIVbN1JwsFehCbFxN9bNUNmFSNOLCrefTd3zNtV-GvOFnLM2Qv8DibNNaap4X4dBy1eO057QjJe74maIYAm3mO3iXdGS5Z2ft61245n6RkwcPPL0Sph6fnbK2R1gkG_Kvc',
  },
  {
    id: 'cafe-website',
    title: 'Café & Business Website',
    tag: 'Web design',
    categories: ['Websites', 'Restaurant Sites'],
    componentType: 'm1',
  },
  {
    id: 'political-campaign-poster',
    title: 'Political Campaign Poster',
    tag: 'Print + social',
    categories: ['Political Campaigns', 'Posters'],
    componentType: 'm2',
  },
  {
    id: 'wedding-invitation',
    title: 'Wedding Invitation',
    tag: 'Invite suite',
    categories: ['Wedding Invites', 'Invitation Cards'],
    componentType: 'mw',
  },
  {
    id: 'social-media-templates',
    title: 'Social Media Templates',
    tag: 'Post set',
    categories: ['Social Media', 'Political Campaigns'],
    componentType: 'm4',
  },
  {
    id: 'restaurant-menu',
    title: 'Restaurant Menu',
    tag: 'Fine dining',
    categories: ['Restaurant Sites', 'Posters'],
    componentType: 'm5',
  },
  {
    id: 'fitness-challenge',
    title: '75-Day Fitness Challenge',
    tag: 'Program kit',
    categories: ['Fitness & Diet Plans', 'Social Media'],
    componentType: 'mf',
  },
  {
    id: 'final-year-project',
    title: 'IEEE / Final-Year Project',
    tag: 'Student services',
    categories: ['Websites'],
    componentType: 'mi',
  },
  {
    id: 'digital-invitation-card',
    title: 'Digital Invitation Card',
    tag: 'Animated invite',
    categories: ['Invitation Cards', 'Wedding Invites'],
    componentType: 'mn',
  },
];

export default function WorkGrid({ sandboxState, onSelectWork, onFitnessDayToggle }: WorkGridProps) {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredItems = WORK_ITEMS.filter((item) => {
    if (activeCategory === 'All') return true;
    return item.categories.includes(activeCategory);
  });

  return (
    <section className="py-20 select-none" id="work">
      <div className="max-w-[1240px] mx-auto px-7">
        
        {/* Header content with reveal transition classes */}
        <div className="reveal in mb-12">
          <div className="eyebrow flex items-center gap-3.5 mb-6">
            <span className="w-10 h-[1px] bg-gradient-to-r from-[#7C3AED] to-[#A855F7]" />
            <span className="mono-label text-[11px] font-mono tracking-[0.16em] uppercase text-[#5B5570]">
              Selected work
            </span>
          </div>
          <h2 className="font-display font-semibold text-3xl md:text-5xl leading-tight tracking-tight text-white mb-4">
            A look at what we make.
          </h2>
          <p className="text-[#A29DB8] max-w-xl text-sm md:text-base leading-relaxed">
            Sample pieces across web, design and campaigns. Tap any item to unlock customization and zoom inside our live interactive design playground.
          </p>
        </div>

        {/* Category filtering tab navigation */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-y border-white/8 py-6 mb-12 overflow-x-auto scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs font-display font-medium tracking-wide transition-all cursor-pointer relative py-1 ${
                  isActive ? 'text-[#A855F7]' : 'text-[#A29DB8] hover:text-white'
                }`}
              >
                {cat}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-[#A855F7] to-[#7C3AED]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Work Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <WorkCard
              key={item.id}
              item={item}
              sandboxState={sandboxState}
              onSelect={() => onSelectWork(item)}
              onFitnessDayToggle={onFitnessDayToggle}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

interface WorkCardProps {
  key?: string;
  item: WorkItem;
  sandboxState: SandboxState;
  onSelect: () => void;
  onFitnessDayToggle: (dayIdx: number) => void;
}

function WorkCard({ item, sandboxState, onSelect, onFitnessDayToggle }: WorkCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Magnetic 3D tilt hover physics logic
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    // Smooth 3D tilt transformations
    card.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) scale3d(1.01, 1.01, 1.01)`;
  };

  const handlePointerLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = '';
  };

  return (
    <figure 
      onClick={onSelect}
      className="work cursor-pointer flex flex-col group select-none"
    >
      <div 
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="stage aspect-[4/3] border border-white/8 rounded-2xl overflow-hidden flex items-center justify-center bg-[#0F0D17] relative transition-all duration-300 group-hover:border-[#7C3AED]/50 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
      >
        <span className="view absolute right-3 bottom-3 z-10 font-mono text-[10px] tracking-[0.12em] uppercase text-white bg-black/60 backdrop-blur-md border border-white/8 rounded-full px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Sandbox Customize
        </span>

        {/* Dynamic Frame Selector */}
        <div className="w-full h-full flex items-center justify-center relative overflow-hidden transition-all duration-500 group-hover:scale-[1.02]">
          {item.image ? (
            <img
              src={item.image}
              alt={item.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full">
              {item.componentType === 'm1' && <CafeWebsiteFrame config={sandboxState.m1} />}
              {item.componentType === 'm2' && <PoliticalPosterFrame config={sandboxState.m2} />}
              {item.componentType === 'mw' && <WeddingInviteFrame config={sandboxState.mw} />}
              {item.componentType === 'm4' && <SocialMediaFrame config={sandboxState.m4} />}
              {item.componentType === 'm5' && <RestaurantMenuFrame config={sandboxState.m5} />}
              {item.componentType === 'mf' && (
                <FitnessFrame config={sandboxState.mf} onDayToggle={onFitnessDayToggle} />
              )}
              {item.componentType === 'mi' && <StudentProjectFrame config={sandboxState.mi} />}
              {item.componentType === 'mn' && <DigitalInviteFrame config={sandboxState.mn} />}
            </div>
          )}
        </div>
      </div>

      <figcaption className="flex justify-between items-baseline gap-2 mt-3.5 px-0.5">
        <b className="font-display font-medium text-[15px] text-[#F4F2FB] group-hover:text-[#7C3AED] transition-colors">
          {item.title}
        </b>
        <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-[#5B5570]">
          {item.tag}
        </span>
      </figcaption>
    </figure>
  );
}
