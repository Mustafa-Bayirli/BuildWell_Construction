export interface Project {
  id: string;
  title: string;
  description: string;
  location: string;
  category: string;
  images: string[];
  featured: boolean;
  completedDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const projects: Project[] = [
  {
    id: 'yorkville-interior-remodel',
    title: 'Yorkville Interior Remodel',
    description: 'A complete interior transformation with custom finishes and careful attention to detail.',
    location: 'Yorkville, Manhattan',
    category: 'Interior Remodeling',
    images: ['/yorkville.png'],
    featured: true,
    completedDate: new Date('2024-08-15'),
    createdAt: new Date('2024-08-15'),
    updatedAt: new Date('2024-08-15'),
  },
  {
    id: 'custom-cabinet-installation',
    title: 'Custom Cabinet Installation',
    description: 'Built-in cabinetry designed and installed to bring practical storage and character to the space.',
    location: 'Upper West Side, Manhattan',
    category: 'Custom Carpentry',
    images: ['/cabinetinstallation.png'],
    featured: true,
    completedDate: new Date('2024-06-20'),
    createdAt: new Date('2024-06-20'),
    updatedAt: new Date('2024-06-20'),
  },
  {
    id: 'floor-refinishing',
    title: 'Classic Floor Refinishing',
    description: 'Worn hardwood floors restored with precision sanding and a durable new finish.',
    location: 'Brooklyn Heights, Brooklyn',
    category: 'Flooring',
    images: ['/floorsanding.jpeg', '/floorsanding2.jpeg'],
    featured: true,
    completedDate: new Date('2024-04-12'),
    createdAt: new Date('2024-04-12'),
    updatedAt: new Date('2024-04-12'),
  },
  {
    id: 'exterior-fence-painting',
    title: 'Exterior Fence Painting',
    description: 'A refreshed exterior finish that improves curb appeal and protects the wood from the elements.',
    location: 'Queens, New York',
    category: 'Painting',
    images: ['/fencepainting.png'],
    featured: false,
    completedDate: new Date('2024-03-08'),
    createdAt: new Date('2024-03-08'),
    updatedAt: new Date('2024-03-08'),
  },
];

export const projectService = {
  async getAllProjects(): Promise<Project[]> {
    return projects;
  },

  async getFeaturedProjects(): Promise<Project[]> {
    return projects.filter((project) => project.featured);
  },

  async getProjectById(id: string): Promise<Project | null> {
    return projects.find((project) => project.id === id) ?? null;
  },
};
