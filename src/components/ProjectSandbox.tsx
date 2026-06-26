import React from 'react';
import { SandboxState } from '../types';

interface ProjectSandboxProps {
  componentType: 'm1' | 'm2' | 'mw' | 'm4' | 'm5' | 'mf' | 'mi' | 'mn';
  sandboxState: SandboxState;
  setSandboxState: React.Dispatch<React.SetStateAction<SandboxState>>;
}

export default function ProjectSandbox({ componentType, sandboxState, setSandboxState }: ProjectSandboxProps) {
  
  // Helper to update specific sub-config safely
  const updateConfig = (key: string, value: any) => {
    setSandboxState((prev) => ({
      ...prev,
      [componentType]: {
        ...prev[componentType],
        [key]: value,
      },
    }));
  };

  const textInput = (label: string, configKey: string, value: string) => (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-xs font-mono tracking-wider text-[#A29DB8] uppercase">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => updateConfig(configKey, e.target.value)}
        className="w-full bg-[#1B1530] border border-white/10 rounded-lg px-3 py-2 text-sm text-[#F4F2FB] focus:outline-none focus:border-[#7C3AED] transition-colors"
      />
    </div>
  );

  return (
    <div className="w-full bg-[#141021] border border-white/8 rounded-xl p-5 select-none">
      <div className="flex items-center gap-3 mb-4">
        <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
        <h4 className="text-sm font-display font-semibold tracking-wide text-white uppercase">
          Live Design Sandbox
        </h4>
      </div>
      <p className="text-xs text-[#A29DB8] mb-5">
        Modify properties below to update the canvas style and text instantly:
      </p>

      <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
        {componentType === 'm1' && (
          <>
            {textInput('Brand Name', 'brandName', sandboxState.m1.brandName)}
            {textInput('Tagline', 'tagLine', sandboxState.m1.tagLine)}
            {textInput('Category Header', 'categoryName', sandboxState.m1.categoryName)}
            {textInput('Button Call-to-Action', 'buttonText', sandboxState.m1.buttonText)}
            {textInput('Domain URL', 'domain', sandboxState.m1.domain)}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-mono tracking-wider text-[#A29DB8] uppercase">Accent Theme Color</label>
              <div className="flex gap-2">
                {['#C8742F', '#7C3AED', '#A855F7', '#2563EB', '#16A34A', '#DC2626'].map((color) => (
                  <button
                    key={color}
                    onClick={() => updateConfig('discColor', color)}
                    className="w-7 h-7 rounded-full border border-white/20 transition-transform active:scale-90 relative"
                    style={{ backgroundColor: color }}
                  >
                    {sandboxState.m1.discColor === color && (
                      <span className="absolute inset-0 flex items-center justify-center text-[10px] text-white font-bold">✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {componentType === 'm2' && (
          <>
            {textInput('Vote / Event Label', 'voteYear', sandboxState.m2.voteYear)}
            {textInput('Ward / Code Label', 'wardNumber', sandboxState.m2.wardNumber)}
            {textInput('Core Slogan', 'slogan', sandboxState.m2.slogan)}
            {textInput('Candidate / Event Name', 'candidateName', sandboxState.m2.candidateName)}
            {textInput('Poll Date / Time', 'pollDate', sandboxState.m2.pollDate)}
            {textInput('Campaign Hashtag', 'hashtag', sandboxState.m2.hashtag)}
          </>
        )}

        {componentType === 'mw' && (
          <>
            {textInput('Card Header', 'title', sandboxState.mw.title)}
            {textInput('Card Subtitle', 'subtit', sandboxState.mw.subtit)}
            {textInput('Groom Name', 'groom', sandboxState.mw.groom)}
            {textInput('Bride Name', 'bride', sandboxState.mw.bride)}
            {textInput('Date & Venue Location', 'dateVenue', sandboxState.mw.dateVenue)}
          </>
        )}

        {componentType === 'm4' && (
          <>
            {textInput('Quote Card Message', 'quote', sandboxState.m4.quote)}
            {textInput('Rally Timing Label', 'rallyTime', sandboxState.m4.rallyTime)}
            {textInput('Rally Location Label', 'rallyLoc', sandboxState.m4.rallyLoc)}
            {textInput('Tip Value', 'tipNum', sandboxState.m4.tipNum)}
            {textInput('Tip Heading', 'tipText', sandboxState.m4.tipText)}
          </>
        )}

        {componentType === 'm5' && (
          <>
            {textInput('Restaurant Name', 'name', sandboxState.m5.name)}
            {textInput('Cuisine Descriptor', 'subtitle', sandboxState.m5.subtitle)}
            <div className="border-t border-white/5 pt-3 my-2">
              <span className="text-[10px] font-mono text-[#5B5570] block uppercase mb-2">First Starter</span>
              <div className="flex gap-2">
                {textInput('Item', 's1title', sandboxState.m5.s1title)}
                <div className="w-1/3">{textInput('Price', 's1price', sandboxState.m5.s1price)}</div>
              </div>
            </div>
            <div className="border-t border-white/5 pt-3 my-2">
              <span className="text-[10px] font-mono text-[#5B5570] block uppercase mb-2">Second Starter</span>
              <div className="flex gap-2">
                {textInput('Item', 's2title', sandboxState.m5.s2title)}
                <div className="w-1/3">{textInput('Price', 's2price', sandboxState.m5.s2price)}</div>
              </div>
            </div>
            <div className="border-t border-white/5 pt-3 my-2">
              <span className="text-[10px] font-mono text-[#5B5570] block uppercase mb-2">First Main</span>
              <div className="flex gap-2">
                {textInput('Item', 'm1title', sandboxState.m5.m1title)}
                <div className="w-1/3">{textInput('Price', 'm1price', sandboxState.m5.m1price)}</div>
              </div>
            </div>
          </>
        )}

        {componentType === 'mf' && (
          <>
            {textInput('Program Header', 'title', sandboxState.mf.title)}
            {textInput('Challenge Heading', 'duration', sandboxState.mf.duration)}
            {textInput('Motivation Quote', 'quote', sandboxState.mf.quote)}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-mono tracking-wider text-[#A29DB8] uppercase">Completed Days</label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="0"
                  max="75"
                  value={sandboxState.mf.completedDays}
                  onChange={(e) => updateConfig('completedDays', parseInt(e.target.value, 10))}
                  className="flex-1 accent-[#7C3AED]"
                />
                <span className="text-sm font-mono text-white font-medium w-8 text-right">
                  {sandboxState.mf.completedDays}
                </span>
              </div>
            </div>
            {textInput('Bottom Labels', 'labels', sandboxState.mf.labels)}
          </>
        )}

        {componentType === 'mi' && (
          <>
            {textInput('University Dept.', 'department', sandboxState.mi.department)}
            {textInput('Category Badge', 'badge', sandboxState.mi.badge)}
            {textInput('Thesis / Project Title', 'title', sandboxState.mi.title)}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-mono tracking-wider text-[#A29DB8] uppercase">Description</label>
              <textarea
                value={sandboxState.mi.description}
                onChange={(e) => updateConfig('description', e.target.value)}
                rows={3}
                className="w-full bg-[#1B1530] border border-white/10 rounded-lg px-3 py-2 text-sm text-[#F4F2FB] focus:outline-none focus:border-[#7C3AED] transition-colors resize-none"
              />
            </div>
            {textInput('Timeline / Year', 'batch', sandboxState.mi.batch)}
            {textInput('Mentor / Professor', 'guide', sandboxState.mi.guide)}
          </>
        )}

        {componentType === 'mn' && (
          <>
            {textInput('Invitation Header', 'title', sandboxState.mn.title)}
            {textInput('Key Age / Milestone', 'ringText', sandboxState.mn.ringText)}
            {textInput('Primary Event Line', 'heading', sandboxState.mn.heading)}
            {textInput('Date & Time Label', 'dateStr', sandboxState.mn.dateStr)}
            {textInput('RSVP Button Message', 'btnText', sandboxState.mn.btnText)}
          </>
        )}
      </div>
    </div>
  );
}
