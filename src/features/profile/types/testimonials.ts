export interface Testimonial {
  id: string;
  clientName: string;
  clientRole: string;
  clientCompany?: string;
  clientAvatar?: string;
  projectName?: string;
  projectLink?: string;
  rating?: number; // 1-5 stars
  content: string;
  date?: string; // YYYY-MM-DD format
}
