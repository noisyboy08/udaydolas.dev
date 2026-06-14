export type Project = {
  id: string;
  title: string;
  period: {
    start: string;
    end?: string;
  };
  link: string;
  live?: string;
  skills: string[];
  description?: string;
  logo?: string;
  isExpanded?: boolean;
};
