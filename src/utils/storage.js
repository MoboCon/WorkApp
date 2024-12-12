import AsyncStorage from '@react-native-async-storage/async-storage';

const PROJECTS_KEY = '@projects';

export const saveProject = async (project) => {
  try {
    const existingProjects = await getProjects();
    const updatedProjects = [...existingProjects, project];
    await AsyncStorage.setItem(PROJECTS_KEY, JSON.stringify(updatedProjects));
    return true;
  } catch (error) {
    console.error('Error saving project:', error);
    return false;
  }
};

export const getProjects = async () => {
  try {
    const projects = await AsyncStorage.getItem(PROJECTS_KEY);
    return projects ? JSON.parse(projects) : [];
  } catch (error) {
    console.error('Error getting projects:', error);
    return [];
  }
};

// Adaugă și alte funcții utile pentru proiecte
export const deleteProject = async (projectId) => {
  try {
    const existingProjects = await getProjects();
    const updatedProjects = existingProjects.filter(p => p.id !== projectId);
    await AsyncStorage.setItem(PROJECTS_KEY, JSON.stringify(updatedProjects));
    return true;
  } catch (error) {
    console.error('Error deleting project:', error);
    return false;
  }
};

export const updateProject = async (updatedProject) => {
  try {
    const existingProjects = await getProjects();
    const updatedProjects = existingProjects.map(p => 
      p.id === updatedProject.id ? updatedProject : p
    );
    await AsyncStorage.setItem(PROJECTS_KEY, JSON.stringify(updatedProjects));
    return true;
  } catch (error) {
    console.error('Error updating project:', error);
    return false;
  }
};