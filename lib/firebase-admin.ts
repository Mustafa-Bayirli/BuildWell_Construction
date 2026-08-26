// lib/firebase-admin.ts (Fixed Version)
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  getDoc,
  orderBy,
  query,
  where,
  limit,
  Timestamp 
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject,
  listAll,
  getMetadata // Import getMetadata function
} from 'firebase/storage';
import { db, storage } from './firebase';
import { v4 as uuidv4 } from 'uuid';

export interface Project {
  id?: string;
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

// Helper function to handle errors safely
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'An unknown error occurred';
}

export class ProjectService {
  private collection = 'projects';

  async getAllProjects(): Promise<Project[]> {
    try {
      const q = query(
        collection(db, this.collection),
        orderBy('completedDate', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          completedDate: data.completedDate.toDate(),
          createdAt: data.createdAt.toDate(),
          updatedAt: data.updatedAt.toDate(),
        } as Project;
      });
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw new Error(`Failed to load projects: ${getErrorMessage(error)}`);
    }
  }

  async getFeaturedProjects(): Promise<Project[]> {
    try {
      const q = query(
        collection(db, this.collection),
        where('featured', '==', true),
        orderBy('completedDate', 'desc'),
        limit(6)
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          completedDate: data.completedDate.toDate(),
          createdAt: data.createdAt.toDate(),
          updatedAt: data.updatedAt.toDate(),
        } as Project;
      });
    } catch (error) {
      console.error('Error fetching featured projects:', error);
      throw new Error(`Failed to load featured projects: ${getErrorMessage(error)}`);
    }
  }

  async getProjectById(id: string): Promise<Project | null> {
    try {
      const docRef = doc(db, this.collection, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          ...data,
          completedDate: data.completedDate.toDate(),
          createdAt: data.createdAt.toDate(),
          updatedAt: data.updatedAt.toDate(),
        } as Project;
      }
      return null;
    } catch (error) {
      console.error('Error fetching project:', error);
      throw new Error(`Failed to load project: ${getErrorMessage(error)}`);
    }
  }

  async uploadImage(file: File, projectId?: string): Promise<string> {
    try {
      // Validate file
      if (!file.type.startsWith('image/')) {
        throw new Error('Please upload only image files.');
      }
      if (file.size > 20 * 1024 * 1024) { // 20MB limit
        throw new Error('Image size must be less than 20MB.');
      }

      const fileName = `${uuidv4()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
      const folderPath = projectId ? `projects/${projectId}` : 'projects/temp';
      const storageRef = ref(storage, `${folderPath}/${fileName}`);
      
      console.log(`Uploading to: ${folderPath}/${fileName}`);
      
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      console.log('Upload successful:', downloadURL);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw new Error(`Failed to upload image: ${getErrorMessage(error)}`);
    }
  }

  async deleteImage(imageUrl: string): Promise<void> {
    try {
      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef);
    } catch (error) {
      console.error('Error deleting image:', error);
      throw new Error(`Failed to delete image: ${getErrorMessage(error)}`);
    }
  }

  // Simplified version without the problematic moveImages function
  async createProject(projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const now = Timestamp.now();
      const docData = {
        ...projectData,
        completedDate: Timestamp.fromDate(projectData.completedDate),
        createdAt: now,
        updatedAt: now,
      };

      console.log('Creating project with data:', docData);
      
      const docRef = await addDoc(collection(db, this.collection), docData);
      console.log('Project created with ID:', docRef.id);
      
      return docRef.id;
    } catch (error) {
      console.error('Error creating project:', error);
      throw new Error(`Failed to create project: ${getErrorMessage(error)}`);
    }
  }

  async updateProject(id: string, projectData: Partial<Project>): Promise<void> {
    try {
      const docRef = doc(db, this.collection, id);
      const updateData: any = {
        ...projectData,
        updatedAt: Timestamp.now(),
      };
      
      if (projectData.completedDate) {
        updateData.completedDate = Timestamp.fromDate(projectData.completedDate);
      }
      
      await updateDoc(docRef, updateData);
    } catch (error) {
      console.error('Error updating project:', error);
      throw new Error(`Failed to update project: ${getErrorMessage(error)}`);
    }
  }

  async deleteProject(id: string): Promise<void> {
    try {
      // First get the project to delete associated images
      const project = await this.getProjectById(id);
      if (project && project.images) {
        // Delete all associated images
        for (const imageUrl of project.images) {
          try {
            await this.deleteImage(imageUrl);
          } catch (imageError) {
            console.warn('Error deleting image:', getErrorMessage(imageError));
          }
        }
      }
      
      // Delete the project document
      const docRef = doc(db, this.collection, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting project:', error);
      throw new Error(`Failed to delete project: ${getErrorMessage(error)}`);
    }
  }

  // Simplified cleanup function without metadata check for now
  async cleanupTempImages(): Promise<void> {
    try {
      const tempRef = ref(storage, 'projects/temp');
      const tempFiles = await listAll(tempRef);
      
      console.log(`Found ${tempFiles.items.length} temp files`);
      
      // For now, just log the files - we can implement cleanup logic later
      for (const fileRef of tempFiles.items) {
        try {
          console.log('Temp file found:', fileRef.name);
          // Uncomment the line below if you want to delete all temp files
          // await deleteObject(fileRef);
        } catch (error) {
          console.warn('Could not process temp file:', fileRef.name, getErrorMessage(error));
        }
      }
    } catch (error) {
      console.warn('Error during temp cleanup:', getErrorMessage(error));
    }
  }

  // Helper method to get projects by category
  async getProjectsByCategory(category: string): Promise<Project[]> {
    try {
      const q = query(
        collection(db, this.collection),
        where('category', '==', category),
        orderBy('completedDate', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          completedDate: data.completedDate.toDate(),
          createdAt: data.createdAt.toDate(),
          updatedAt: data.updatedAt.toDate(),
        } as Project;
      });
    } catch (error) {
      console.error('Error fetching projects by category:', error);
      throw new Error(`Failed to load projects by category: ${getErrorMessage(error)}`);
    }
  }

  // Helper method to search projects
  async searchProjects(searchTerm: string): Promise<Project[]> {
    try {
      // Note: Firestore doesn't have full-text search built-in
      // This is a simple implementation - for production, consider using Algolia or similar
      const allProjects = await this.getAllProjects();
      
      const searchLower = searchTerm.toLowerCase();
      return allProjects.filter(project => 
        project.title.toLowerCase().includes(searchLower) ||
        project.description.toLowerCase().includes(searchLower) ||
        project.location.toLowerCase().includes(searchLower) ||
        project.category.toLowerCase().includes(searchLower)
      );
    } catch (error) {
      console.error('Error searching projects:', error);
      throw new Error(`Failed to search projects: ${getErrorMessage(error)}`);
    }
  }
}

export const projectService = new ProjectService();
