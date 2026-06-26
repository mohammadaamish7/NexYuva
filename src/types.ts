export interface CafeConfig {
  brandName: string;
  tagLine: string;
  categoryName: string;
  buttonText: string;
  domain: string;
  menuUrl: string;
  aboutUrl: string;
  visitUrl: string;
  discColor: string;
}

export interface PoliticalPosterConfig {
  voteYear: string;
  wardNumber: string;
  slogan: string;
  candidateName: string;
  pollDate: string;
  hashtag: string;
}

export interface WeddingInviteConfig {
  title: string;
  subtit: string;
  groom: string;
  bride: string;
  dateVenue: string;
}

export interface SocialMediaConfig {
  quote: string;
  rallyTime: string;
  rallyLoc: string;
  tipNum: string;
  tipText: string;
}

export interface RestaurantMenuConfig {
  name: string;
  subtitle: string;
  s1title: string;
  s1price: string;
  s2title: string;
  s2price: string;
  m1title: string;
  m1price: string;
  m2title: string;
  m2price: string;
}

export interface FitnessConfig {
  title: string;
  duration: string;
  quote: string;
  completedDays: number;
  totalDays: number;
  labels: string;
}

export interface StudentProjectConfig {
  department: string;
  badge: string;
  title: string;
  description: string;
  chips: string[];
  batch: string;
  guide: string;
}

export interface DigitalInviteConfig {
  title: string;
  ringText: string;
  heading: string;
  dateStr: string;
  btnText: string;
}

export interface SandboxState {
  m1: CafeConfig;
  m2: PoliticalPosterConfig;
  mw: WeddingInviteConfig;
  m4: SocialMediaConfig;
  m5: RestaurantMenuConfig;
  mf: FitnessConfig;
  mi: StudentProjectConfig;
  mn: DigitalInviteConfig;
}

export interface WorkItem {
  id: string;
  title: string;
  tag: string;
  categories: string[];
  image?: string;
  componentType?: 'm1' | 'm2' | 'mw' | 'm4' | 'm5' | 'mf' | 'mi' | 'mn';
}

export interface ServiceItem {
  id: string;
  num: string;
  title: string;
  description: string;
  iconName: 'fitness' | 'invite' | 'web' | 'student' | 'political' | 'challenge' | 'wedding' | 'restaurant' | 'ieee' | 'social';
}
