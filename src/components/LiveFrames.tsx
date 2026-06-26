import React, { useState } from 'react';
import {
  CafeConfig,
  PoliticalPosterConfig,
  WeddingInviteConfig,
  SocialMediaConfig,
  RestaurantMenuConfig,
  FitnessConfig,
  StudentProjectConfig,
  DigitalInviteConfig,
} from '../types';

export function CafeWebsiteFrame({ config }: { config: CafeConfig }) {
  return (
    <div className="design m1 relative w-full h-full text-[#2A1D16] bg-[#F3EDE3] select-none">
      <div className="bar flex items-center justify-start h-[11cqw] bg-[#241a14] px-[3cqw] gap-[1.4cqw]">
        <i className="w-[1.8cqw] h-[1.8cqw] rounded-full bg-[#4b3a2e] block"></i>
        <i className="w-[1.8cqw] h-[1.8cqw] rounded-full bg-[#4b3a2e] block"></i>
        <i className="w-[1.8cqw] h-[1.8cqw] rounded-full bg-[#4b3a2e] block"></i>
        <span className="url ml-[2cqw] font-mono text-[2.6cqw] text-[#b9a489] bg-[#160f0a] px-[3cqw] py-[0.8cqw] rounded-full truncate max-w-[50%]">
          {config.domain}
        </span>
      </div>
      <div className="body p-[4cqw] px-[5cqw]">
        <div className="top flex justify-between items-center mb-[5cqw]">
          <span className="br font-serif font-medium text-[4cqw]">{config.brandName}</span>
          <span className="nv flex gap-[3cqw] text-[2.5cqw] text-[#6b5848]">
            <span>{config.menuUrl}</span>
            <span>{config.aboutUrl}</span>
            <span>{config.visitUrl}</span>
          </span>
        </div>
        <div className="eyb font-mono text-[2.3cqw] tracking-[0.2em] text-[#C8742F] mb-[2cqw]">
          {config.categoryName}
        </div>
        <h4 className="font-serif font-medium text-[8.6cqw] leading-[1.02] tracking-[-0.02em] max-w-[16cqw]">
          {config.tagLine}
        </h4>
        <span className="btn mt-[4cqw] inline-block text-white font-semibold text-[2.6cqw] px-[4cqw] py-[2cqw] rounded-full cursor-pointer hover:opacity-90 active:scale-95 transition-all" style={{ backgroundColor: config.discColor }}>
          {config.buttonText}
        </span>
      </div>
      {/* Decorative vinyl disc */}
      <div 
        className="disc absolute right-[-6cqw] bottom-[-6cqw] w-[34cqw] h-[34cqw] rounded-full"
        style={{ background: `radial-gradient(circle at 35% 30%, #E0A268, ${config.discColor})` }}
      ></div>
    </div>
  );
}

export function PoliticalPosterFrame({ config }: { config: PoliticalPosterConfig }) {
  return (
    <div className="design m2 relative w-full h-full text-[#F3F2F7] bg-[#0E1430] flex flex-col justify-between p-[7cqw] px-[6cqw] overflow-hidden select-none">
      <div className="z top flex justify-between font-mono text-[2.6cqw] tracking-[0.1em] text-[#cdd2ea]">
        <span>{config.voteYear}</span>
        <span>{config.wardNumber}</span>
      </div>
      <div className="z mid my-[2cqw]">
        <h4 className="font-display font-bold text-[12.5cqw] leading-[0.92] tracking-[-0.03em] uppercase">
          {config.slogan.split(' ').map((word, idx) => {
            if (word.toUpperCase() === 'BETTER' || word.toUpperCase() === 'PROGRESS' || word.toUpperCase() === 'FUTURE') {
              return <React.Fragment key={idx}><em className="not-italic bg-gradient-to-r from-[#a78bff] to-[#f5b454] bg-clip-text text-transparent">{word}</em>{' '}</React.Fragment>;
            }
            return word + ' ';
          })}
        </h4>
        <div className="name font-serif font-semibold text-[5.2cqw] mt-[2cqw] text-white">
          {config.candidateName}
        </div>
      </div>
      <div className="z bot flex justify-between items-end">
        <span className="dt font-display font-semibold text-[3.4cqw]">{config.pollDate}</span>
        <span className="tk font-mono text-[2.4cqw] border border-white/30 rounded-full px-[3cqw] py-[1.4cqw]">
          {config.hashtag}
        </span>
      </div>
    </div>
  );
}

export function WeddingInviteFrame({ config }: { config: WeddingInviteConfig }) {
  return (
    <div className="design mw relative w-full h-full text-[#5A4632] bg-gradient-to-br from-[#FBF7EF] to-[#F3E9DA] p-[6cqw] text-center flex flex-col items-center justify-center overflow-hidden select-none">
      <div className="absolute inset-[3cqw] border border-[#B08D57]/45 rounded-[3cqw] pointer-events-none"></div>
      <div className="tg font-mono text-[2.2cqw] tracking-[0.4em] text-[#B08D57] mb-[3cqw]">
        {config.title}
      </div>
      <div className="am font-mono text-[2.4cqw] tracking-[0.3em] text-[#9c8463] mb-[1.5cqw]">
        {config.subtit}
      </div>
      <h4 className="font-serif font-normal text-[9cqw] leading-[1.05] color-[#3f3122]">
        {config.groom}
      </h4>
      <div className="amp font-serif italic text-[6cqw] text-[#B08D57] my-[0.5cqw]">
        &amp;
      </div>
      <h4 className="font-serif font-normal text-[9cqw] leading-[1.05] color-[#3f3122]">
        {config.bride}
      </h4>
      <div className="dt mt-[4cqw] font-mono text-[2.6cqw] tracking-[0.18em] text-[#7a6650] border-y border-[#B08D57]/40 py-[2cqw] w-[80%] uppercase">
        {config.dateVenue}
      </div>
    </div>
  );
}

export function SocialMediaFrame({ config }: { config: SocialMediaConfig }) {
  return (
    <div className="design m4 relative w-full h-full bg-[#161122] p-[4cqw] grid grid-cols-3 gap-[2.4cqw] align-content-center select-none">
      <div className="p p1 bg-gradient-to-br from-[#4338CA] to-[#A855F7] text-white rounded-[2.4cqw] p-[3cqw] flex flex-col justify-between overflow-hidden">
        <span className="k font-mono text-[2cqw] tracking-[0.12em] opacity-85">QUOTE</span>
        <b className="font-serif font-normal text-[5.2cqw] leading-[1.05]">{config.quote}</b>
      </div>
      <div className="p p2 bg-[#F3EDE3] text-[#241634] rounded-[2.4cqw] p-[3cqw] flex flex-col justify-between overflow-hidden">
        <span className="k font-mono text-[2cqw] tracking-[0.12em] opacity-85">RALLY</span>
        <div>
          <div className="big font-display font-bold text-[9cqw] leading-[0.95] text-[#7C3AED]">{config.rallyTime}</div>
          <div className="sm text-[2.4cqw] font-semibold">{config.rallyLoc}</div>
        </div>
      </div>
      <div className="p p3 bg-[#0F0D17] text-[#F3F2F7] border border-[#2a2440] rounded-[2.4cqw] p-[3cqw] flex flex-col justify-between overflow-hidden">
        <span className="k font-mono text-[2cqw] tracking-[0.12em] opacity-85">TIP 03</span>
        <div className="n font-display font-bold text-[7cqw] text-[#A855F7]">{config.tipNum}</div>
        <b className="font-display font-semibold text-[4.4cqw] leading-[1.05]">{config.tipText}</b>
      </div>
    </div>
  );
}

export function RestaurantMenuFrame({ config }: { config: RestaurantMenuConfig }) {
  return (
    <div className="design portrait m5 relative w-full h-full text-[#EDE6D6] bg-[#14110D] p-[6cqw] px-[7cqw] aspect-[3/4] flex flex-col select-none">
      <div className="hd text-center border-b border-[#C8A24B]/40 pb-[3cqw] mb-[4cqw]">
        <div className="nm font-serif text-[8cqw] tracking-[0.02em]">{config.name}</div>
        <div className="tg font-mono text-[2.4cqw] tracking-[0.3em] text-[#C8A24B] mt-[1cqw] uppercase">{config.subtitle}</div>
      </div>
      
      <div className="sec font-mono text-[2.6cqw] tracking-[0.2em] text-[#C8A24B] my-[3.5cqw] mb-[2cqw]">STARTERS</div>
      
      <div className="it flex items-baseline gap-[1.5cqw] mb-[2.4cqw]">
        <span className="nme font-serif text-[3.6cqw]">{config.s1title}</span>
        <span className="dots flex-1 border-b border-dotted border-white/30 translateY-[-1cqw]"></span>
        <span className="pr font-serif text-[3.6cqw] text-[#C8A24B]">{config.s1price}</span>
      </div>
      
      <div className="it flex items-baseline gap-[1.5cqw] mb-[2.4cqw]">
        <span className="nme font-serif text-[3.6cqw]">{config.s2title}</span>
        <span className="dots flex-1 border-b border-dotted border-white/30 translateY-[-1cqw]"></span>
        <span className="pr font-serif text-[3.6cqw] text-[#C8A24B]">{config.s2price}</span>
      </div>
      
      <div className="sec font-mono text-[2.6cqw] tracking-[0.2em] text-[#C8A24B] my-[3.5cqw] mb-[2cqw]">MAINS</div>
      
      <div className="it flex items-baseline gap-[1.5cqw] mb-[2.4cqw]">
        <span className="nme font-serif text-[3.6cqw]">{config.m1title}</span>
        <span className="dots flex-1 border-b border-dotted border-white/30 translateY-[-1cqw]"></span>
        <span className="pr font-serif text-[3.6cqw] text-[#C8A24B]">{config.m1price}</span>
      </div>
      
      <div className="it flex items-baseline gap-[1.5cqw] mb-[2.4cqw]">
        <span className="nme font-serif text-[3.6cqw]">{config.m2title}</span>
        <span className="dots flex-1 border-b border-dotted border-white/30 translateY-[-1cqw]"></span>
        <span className="pr font-serif text-[3.6cqw] text-[#C8A24B]">{config.m2price}</span>
      </div>
    </div>
  );
}

export function FitnessFrame({ config, onDayToggle }: { config: FitnessConfig; onDayToggle?: (dayIdx: number) => void }) {
  // Generate dots to click and toggle
  const dotsArray = Array.from({ length: 20 });
  const activeDotCount = Math.round((config.completedDays / config.totalDays) * 20);

  return (
    <div className="design mf relative w-full h-full text-[#F3F2F7] bg-[#0C0A18] p-[5cqw] px-[5.5cqw] flex flex-col justify-between overflow-hidden select-none">
      <div className="z">
        <div className="tg font-mono text-[2.4cqw] tracking-[0.24em] text-[#A855F7] uppercase">{config.title}</div>
        <div className="hl flex items-end gap-[2.5cqw] mt-[2cqw]">
          <div className="num font-display font-bold text-[22cqw] leading-[0.8] tracking-[-0.04em] text-transparent bg-gradient-to-r from-[#A855F7] to-[#4338CA] bg-clip-text">
            {config.completedDays}
            <small className="block text-[3cqw] tracking-[0.2em] font-semibold text-[#cdc7e0] fill-none" style={{ WebkitTextFillColor: '#cdc7e0' }}>
              /{config.totalDays} DAYS
            </small>
          </div>
        </div>
        <h4 className="font-serif font-medium text-[6.6cqw] leading-[1.02] max-w-[20cqw] mt-[2cqw]">
          {config.quote}
        </h4>
      </div>
      
      <div className="z">
        <div className="dots flex flex-wrap gap-[1.2cqw] mt-[3cqw]">
          {dotsArray.map((_, i) => {
            const isActive = i < activeDotCount;
            return (
              <i 
                key={i} 
                onClick={(e) => {
                  e.stopPropagation();
                  if (onDayToggle) {
                    onDayToggle(i);
                  }
                }}
                className={`w-[2.4cqw] h-[2.4cqw] rounded-full transition-all duration-300 hover:scale-125 cursor-pointer ${
                  isActive ? 'on bg-gradient-to-r from-[#A855F7] to-[#7C3AED]' : 'bg-[#2a2342]'
                }`}
                title={`Day ${Math.round(((i + 1) / 20) * config.totalDays)} - Click to interact`}
              />
            );
          })}
        </div>
        <div className="row flex justify-between font-mono text-[2.4cqw] text-[#9591b0] border-t border-white/10 pt-[2.5cqw] mt-[3cqw]">
          <span>{config.labels}</span>
          <span>{config.completedDays} / {config.totalDays}</span>
        </div>
      </div>
    </div>
  );
}

export function StudentProjectFrame({ config }: { config: StudentProjectConfig }) {
  return (
    <div className="design portrait mi relative w-full h-full text-[#15233F] bg-white p-[5.5cqw] px-[5cqw] aspect-[3/4] flex flex-col justify-between select-none">
      <div>
        <div className="uni font-mono text-[2.2cqw] tracking-[0.2em] text-[#7C3AED] leading-snug">
          {config.department}
        </div>
        <span className="badge inline-block font-mono text-[2cqw] tracking-[0.16em] bg-[#EDE9FE] text-[#5B21B6] rounded-full px-[3cqw] py-[1cqw] self-start my-[4cqw]">
          {config.badge}
        </span>
        <h4 className="font-display font-semibold text-[6.8cqw] leading-[1.06] tracking-[-0.02em] mt-[1cqw]">
          {config.title}
        </h4>
        <p className="sub text-[2.8cqw] text-[#5b6b86] mt-[2cqw] leading-[1.5]">
          {config.description}
        </p>
      </div>

      <div>
        <div className="chips flex flex-wrap gap-[1.4cqw] my-[4cqw]">
          {config.chips.map((chip, i) => (
            <span key={i} className="chip text-[2.2cqw] bg-[#F1F0F8] text-[#39496a] rounded-full px-[2.6cqw] py-[1cqw]">
              {chip}
            </span>
          ))}
        </div>
        <div className="ft border-t-2 border-[#15233F] pt-[2.4cqw] flex justify-between text-[2.4cqw]">
          <b>{config.batch}</b>
          <span>{config.guide}</span>
        </div>
      </div>
    </div>
  );
}

export function DigitalInviteFrame({ config }: { config: DigitalInviteConfig }) {
  const [rsvpStatus, setRsvpStatus] = useState<'none' | 'submitting' | 'confirmed'>('none');
  const [showConfetti, setShowConfetti] = useState(false);

  const handleRSVP = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (rsvpStatus === 'confirmed') return;
    setRsvpStatus('submitting');
    setTimeout(() => {
      setRsvpStatus('confirmed');
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }, 1200);
  };

  return (
    <div className="design mn relative w-full h-full text-[#F3F2F7] bg-gradient-to-tr from-[#241634] to-[#0F0D17] p-[6cqw] flex flex-col items-center justify-center text-center overflow-hidden select-none">
      <div className="absolute inset-0 bg-[radial-gradient(60% 50% at 50% 20%,rgba(168,85,247,0.4),transparent_60%)] pointer-events-none"></div>
      
      {showConfetti && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className="text-[6cqw] font-bold text-[#C9A8FF] animate-bounce">
            🎉 Confirmed! See you there! 🥳
          </div>
        </div>
      )}

      <div className="z flex flex-col items-center">
        <div className="tg font-mono text-[2.2cqw] tracking-[0.4em] text-[#C9A8FF] mb-[3cqw]">
          {config.title}
        </div>
        <div className="ring w-[14cqw] h-[14cqw] rounded-full border-[1.5px] border-[#C9A8FF]/60 flex items-center justify-center font-serif text-[6cqw] text-white mb-[3cqw] animate-pulse">
          {config.ringText}
        </div>
        <h4 className="font-serif font-normal text-[8.4cqw] leading-[1.04]">
          {config.heading.split(' ').map((word, i) => {
            if (word.toLowerCase() === 'twenty-one' || word.toLowerCase() === 'birthday' || word.toLowerCase() === 'wedding') {
              return <React.Fragment key={i}><em className="not-italic text-[#C9A8FF] font-serif">{word}</em>{' '}</React.Fragment>;
            }
            return word + ' ';
          })}
        </h4>
        <div className="dt mt-[3cqw] font-mono text-[2.5cqw] tracking-[0.2em] text-[#bdb6d6]">
          {config.dateStr}
        </div>
        
        <button 
          onClick={handleRSVP}
          disabled={rsvpStatus === 'submitting'}
          className={`btn mt-[4cqw] font-display font-semibold text-[2.6cqw] text-white px-[5cqw] py-[2cqw] rounded-full cursor-pointer shadow-lg active:scale-95 transition-all duration-300 ${
            rsvpStatus === 'confirmed' 
              ? 'bg-emerald-600 border border-emerald-500/40' 
              : rsvpStatus === 'submitting' 
                ? 'bg-purple-800 animate-pulse' 
                : 'bg-gradient-to-r from-[#7C3AED] to-[#A855F7] hover:brightness-110'
          }`}
        >
          {rsvpStatus === 'confirmed' ? '✓ RSVP Registered' : rsvpStatus === 'submitting' ? 'Registering...' : config.btnText}
        </button>
      </div>
    </div>
  );
}
