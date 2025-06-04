
import React from 'react'; // Added import

export interface NavItem {
  name: string;
  path: string;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
}

export interface ColorEntry {
  id: string;
  hex: string;
  rgb?: string; // Optional, can be derived
}

export interface LinkEntry {
  id: string;
  url: string;
  label?: string;
}

export enum LogoProjectStatus {
  DRAFT = 'Draft',
  PUBLISHED = 'Published',
}

export interface LogoProject {
  id: string;
  clientName: string;
  category: string;
  status: LogoProjectStatus;
  thumbnailUrl?: string; // e.g., https://picsum.photos/100/100
  lastModified: string;
  // Optional fields that might come from NewLogoProjectData
  colors?: ColorEntry[];
  fonts?: string;
  links?: LinkEntry[];
  notes?: string;
  fileName?: string;
}

export interface NewLogoProjectData {
  clientName: string;
  category: string;
  colors: ColorEntry[];
  fonts: string;
  links: LinkEntry[];
  notes: string;
  fileName: string;
  status: 'Draft' | 'Published'; // Specific string literals
}


export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface PricingTier {
  id: string;
  name: string;
  price: string;
  priceFrequency: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  ctaText: string;
  ctaPath: string;
}

export enum ExportCategory {
  SOCIAL = "Social",
  WEB = "Web",
  PRINT = "Print",
  SOURCE = "Source",
}

export interface ExportFormat {
  name: string;
  category: ExportCategory;
  details?: string; // e.g., "@1x, @2x" or "300dpi"
  checked: boolean;
}