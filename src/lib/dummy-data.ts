import data from './data.json';
import { BookOpen, MonitorPlay, Cpu, Award, Users, ChevronRight } from 'lucide-react';

const iconMap: Record<string, any> = { BookOpen, MonitorPlay, Cpu, Award, Users, ChevronRight };

export const navigationLinks = [
  { label: 'Beranda', url: '/' },
  { label: 'Tentang', url: '#about' },
  { label: 'Program', url: '#programs' },
  { label: 'Sertifikasi', url: '#certifications' },
  { label: 'Testimoni', url: '#testimonials' },
  { label: 'Acara', url: '#events' },
];

export const heroStoryFrames = data.heroStoryFrames;

export const aboutData = {
  ...data.aboutData,
  stats: data.aboutData.stats.map((s: any) => ({
    ...s,
    icon: iconMap[s.icon] || Users
  }))
};

export const programsData = data.programsData;
export const certificationsData = data.certificationsData;
export const testimonialsData = data.testimonialsData;
export const eventsData = data.eventsData;
export const categoriesData = data.categoriesData;
