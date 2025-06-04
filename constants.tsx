
import React from 'react';
import { NavItem, FAQItem, PricingTier, ExportCategory, ExportFormat, LogoProject, LogoProjectStatus } from './types';

export const AppLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M16 0L32 9.2376V22.7624L16 32L0 22.7624V9.2376L16 0Z" fill="#1A1A1A"/>
    <path d="M16.0001 5.54248L26.3921 11.5189V17.4811L21.1961 20.4622V14.5L16.0001 17.4811L10.8041 14.5V20.4622L5.60811 17.4811V11.5189L16.0001 5.54248Z" fill="white"/>
    <path d="M21.1961 20.4622L16.0001 23.4433L10.8041 20.4622V14.5L16.0001 17.4811L21.1961 14.5V20.4622Z" fill="white" fillOpacity="0.7"/>
  </svg>
);

export const BirdLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M85,60 A20,20 0 0,1 105,80 Q110,85 115,80 A20,20 0 0,1 135,60 Q140,55 135,50 A20,20 0 0,0 115,30 Q110,25 105,30 A20,20 0 0,0 85,50 Q80,55 85,60 Z M105,45 A5,5 0 1,1 115,45 A5,5 0 1,1 105,45" fill="none" stroke="currentColor" strokeWidth="2"/>
    <path d="M110,30 Q120,10 140,20" fill="none" stroke="currentColor" strokeWidth="2"/>
    <line x1="60" y1="70" x2="85" y2="60" stroke="currentColor" strokeWidth="2"/>
    <line x1="60" y1="70" x2="70" y2="90" stroke="currentColor" strokeWidth="2"/>
    <line x1="60" y1="70" x2="50" y2="90" stroke="currentColor" strokeWidth="2"/>
  </svg>
);


export const PlusIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

export const MinusIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
  </svg>
);

export const ChevronDownIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
  </svg>
);

export const UploadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
  </svg>
);

export const DownloadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
  </svg>
);

export const CheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
  </svg>
);

export const TrashIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12.56 0c1.153 0 2.24.032 3.223.094C7.071 5.838 6.36 6.262 5.964 6.861L4.772 5.79m14.456 0L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0c-.001-.001-.002-.003-.003-.005L19.229 5.786M4.772 5.79L4.771 5.786m0 0A48.971 48.971 0 0 1 12 5.25c1.903 0 3.75.199 5.485.575M4.772 5.79m14.456 0L19.23 5.785" />
  </svg>
);

export const StarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.31h5.408a.563.563 0 0 1 .321.988l-4.203 3.135a.563.563 0 0 0-.182.642l1.51 4.671a.563.563 0 0 1-.815.623l-4.32-3.03a.563.563 0 0 0-.642 0l-4.32 3.03a.563.563 0 0 1-.815-.623l1.51-4.671a.563.563 0 0 0-.182-.642L2.394 9.908a.563.563 0 0 1 .321-.988h5.408a.563.563 0 0 0 .475-.31L11.48 3.5Z" />
  </svg>
);

export const DotsHorizontalIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
  </svg>
);

export const GridIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 8.25 20.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6A2.25 2.25 0 0 1 15.75 3.75h2.25A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25A2.25 2.25 0 0 1 13.5 8.25V6ZM13.5 15.75A2.25 2.25 0 0 1 15.75 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25h-2.25a2.25 2.25 0 0 1-2.25-2.25v-2.25Z" />
  </svg>
);

export const ListIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
  </svg>
);


export const HEADER_NAV_ITEMS: NavItem[] = [
  { name: 'Home', path: '/' },
  { name: 'Free Tool', path: '/free-tool' },
  { name: 'Features', path: '/#features' }, 
  { name: 'Pricing', path: '/pricing' },
];

export const FOOTER_LINKS = {
  company: [
    { name: 'About', path: '/about' },
    { name: 'Careers', path: '/careers' },
    { name: 'Press', path: '/press' },
    { name: 'Blog', path: '/blog' },
  ],
  product: [
    { name: 'Features', path: '/#features' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Free Tool', path: '/free-tool' },
    { name: 'Updates', path: '/updates' },
  ],
  resources: [
    { name: 'Help Center', path: '/help-center' },
    { name: 'API Docs', path: '/api-docs' },
    { name: 'Terms of Service', path: '/terms-of-service' },
    { name: 'Privacy Policy', path: '/privacy-policy' },
  ],
  contact: [
    { name: 'Support', path: '/support' },
    { name: 'Sales', path: '/sales' },
    { name: 'Partners', path: '/partners' },
  ],
};

export const FAQ_ITEMS: FAQItem[] = [
  { id: 'faq1', question: 'What file formats does LogoDrop support for upload?', answer: 'LogoDrop currently supports uploading SVG (Scalable Vector Graphics) files. Once uploaded, it can export to a wide range of formats including PNG, JPG, SVG, and PDF optimized for web, social media, and print.' },
  { id: 'faq2', question: 'What export sizes are available?', answer: 'Exports include standard and @2x resolutions for social media profile/post/story/banner sizes (Instagram, Facebook, YouTube, TikTok, LinkedIn), web formats like PNG horizontal (1200x400), favicon (512px), and print-ready JPG (300dpi) and PDF.' },
  { id: 'faq3', question: 'Can I share logos with clients?', answer: 'Yes, with the Dashboard plan and above, you can generate shareable links for clients to view and download approved logo assets.' },
  { id: 'faq4', question: 'Do I need to install anything?', answer: 'No, LogoDrop is a web-based application. All you need is a modern web browser.' },
  { id: 'faq5', question: 'Is there a free version?', answer: 'Yes, we offer a Free Tool for one-time exports of your SVG logo and a Free plan with limited features for managing logos.' },
  { id: 'faq6', question: 'Can I organize logos for client projects?', answer: 'Absolutely! The Dashboard plan is designed for organizing logos by client, project, or any category you define.' },
  { id: 'faq7', question: 'How do AI features work?', answer: 'Currently, LogoDrop uses AI to help detect dominant colors from your uploaded SVG logo. Other AI-powered features for logo analysis or generation may be considered for future updates.' },
  { id: 'faq8', question: 'Is my data secure?', answer: 'We take data security seriously. All data is encrypted in transit and at rest. Our Enterprise plan offers advanced security and compliance features.' },
];

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'free',
    name: 'Free Plan',
    price: '$0',
    priceFrequency: '/month',
    description: 'For individuals trying out LogoDrop.',
    features: ['Online logo export tool (SVG upload)', 'Limited storage', 'Social & Web formats', 'Basic organization', 'No shareable link'],
    ctaText: 'Try Free Tool',
    ctaPath: '/free-tool',
  },
  {
    id: 'dashboard',
    name: 'Dashboard Plan',
    price: '$12',
    priceFrequency: '/month',
    description: 'Perfect for freelancers and small studios.',
    features: ['All free features, plus:', 'Unlimited logo export tools (SVG upload)', 'Generous storage per project', 'Full export format options', 'Unlimited client project folders', 'Customizable branding on shares', 'Shareable project links for clients', 'Cloud-synced brand assets'],
    isPopular: true,
    ctaText: 'Choose Dashboard',
    ctaPath: '/auth-placeholder?action=signup&plan=dashboard',
  },
  {
    id: 'enterprise',
    name: 'Enterprise Plan',
    price: 'Custom',
    priceFrequency: '',
    description: 'For agencies and teams with advanced needs.',
    features: ['All dashboard features, plus:', 'Custom pricing for your organization', 'Advanced team collaboration features', 'Enhanced security, control, and analytics', 'Dedicated account manager', 'SAML SSO & custom integrations', 'Basic reporting and analytics', 'Priority customer support', 'Basic chat and email support'],
    ctaText: 'Contact Sales',
    ctaPath: '/contact-placeholder?reason=enterprise',
  },
];

export const DEFAULT_EXPORT_FORMATS: ExportFormat[] = [
  // Social
  { name: 'Instagram Profile', category: ExportCategory.SOCIAL, details: '@1x, @2x', checked: true },
  { name: 'Instagram Post/Story', category: ExportCategory.SOCIAL, details: '@1x, @2x', checked: true },
  { name: 'Facebook Profile/Cover', category: ExportCategory.SOCIAL, details: '@1x, @2x', checked: true },
  { name: 'TikTok Profile', category: ExportCategory.SOCIAL, details: '@1x, @2x', checked: true },
  { name: 'YouTube Profile/Banner', category: ExportCategory.SOCIAL, details: '@1x, @2x', checked: true },
  { name: 'LinkedIn Profile/Banner', category: ExportCategory.SOCIAL, details: '@1x, @2x', checked: true },
  // Web
  { name: 'PNG Horizontal', category: ExportCategory.WEB, details: '1200x400px', checked: true },
  { name: 'Favicon', category: ExportCategory.WEB, details: '512x512px PNG', checked: true },
  { name: 'SVG (Web)', category: ExportCategory.WEB, details: 'Scalable', checked: true },
  // Print
  { name: 'JPG 300dpi', category: ExportCategory.PRINT, details: 'High-resolution', checked: true },
  { name: 'PDF (Print)', category: ExportCategory.PRINT, details: 'Vector, CMYK optional', checked: true },
  // Source
  { name: 'Original Uploaded File', category: ExportCategory.SOURCE, details: 'SVG', checked: true },
];

export const DASHBOARD_FILTERS: NavItem[] = [
    { name: 'All', path: '#all' },
    { name: 'Recent', path: '#recent' },
    { name: 'Starred', path: '#starred', icon: StarIcon },
    { name: 'Trash', path: '#trash', icon: TrashIcon },
];

export const MOCK_LOGO_PROJECTS: LogoProject[] = [
    { id: '1', clientName: 'Innovatech Ltd.', category: 'Technology', status: LogoProjectStatus.PUBLISHED, thumbnailUrl: 'https://picsum.photos/seed/proj1/80/80', lastModified: '2 days ago' },
    { id: '2', clientName: 'GreenLeaf Organics', category: 'Retail', status: LogoProjectStatus.DRAFT, thumbnailUrl: 'https://picsum.photos/seed/proj2/80/80', lastModified: '5 hours ago' },
    { id: '3', clientName: 'Summit Solutions', category: 'Consulting', status: LogoProjectStatus.PUBLISHED, thumbnailUrl: 'https://picsum.photos/seed/proj3/80/80', lastModified: '1 week ago' },
    { id: '4', clientName: 'Aperture Studios', category: 'Creative', status: LogoProjectStatus.PUBLISHED, thumbnailUrl: 'https://picsum.photos/seed/proj4/80/80', lastModified: '3 days ago' },
    { id: '5', clientName: 'BuildRight Inc.', category: 'Construction', status: LogoProjectStatus.DRAFT, thumbnailUrl: 'https://picsum.photos/seed/proj5/80/80', lastModified: 'Yesterday' },
    { id: '6', clientName: 'HealthFirst Clinic', category: 'Healthcare', status: LogoProjectStatus.PUBLISHED, thumbnailUrl: 'https://picsum.photos/seed/proj6/80/80', lastModified: '4 days ago' },
];

export const CATEGORY_OPTIONS: string[] = [
  'Technology', 'Retail', 'Consulting', 'Creative', 'Construction', 'Healthcare', 'Finance', 'Education', 'Non-Profit', 'Other'
];