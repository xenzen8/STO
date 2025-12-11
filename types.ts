import { LucideIcon } from 'lucide-react';

export interface Product {
  id: string;
  title: string;
  description: string;
  features: string[];
  image: string;
  category: 'paper' | 'metal' | 'tech' | 'range' | 'custom';
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  avatar: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
}
