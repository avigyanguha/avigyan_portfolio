export interface Project {
  title: string;
  description: string;
  image: string;
  githubUrl: string;
}

export interface Organization {
  name: string;
  role: string;
  period: string;
  description: string;
  logo: string;
  tags: string[];
}

export interface Achievement {
  title: string;
  organization: string;
  date: string;
}