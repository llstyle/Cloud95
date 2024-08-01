import { computed, ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { IDirectory } from '@/utils/interface/directory.inteface';
import { useAuthStore } from './auth';
import axios from 'axios';
import { useFilesStore } from './files';

export const useDirectoriesStore = defineStore('directories', () => {
  const directories: Ref<IDirectory[]> = ref([]);
  const path: Ref<IDirectory[]> = ref([]);
  const editDirectory: Ref<IDirectory | null> = ref(null);
  const resetPath = () => {
    path.value = [];
  }
  const addPath = (directory: IDirectory) => {
    path.value.push(directory);
  }
  const goBack = () => {
    if (path.value.length > 0) {
      path.value.pop();
    }
  }
  const getPath = computed(() => path.value.map(e => e.name).join('/'))
  const getCurDir = computed(() => {
    return path.value.length > 0 ? path.value[path.value.length - 1].id: null;
  })
  const update = async (id: string, name: string) => {
    const authStore = useAuthStore();
    try {
      const headers = {
        headers: {
          'Authorization': `Bearer ${authStore.token}`,
        },
      };
      const response = await axios.patch(`/directories/update`, {id, name}, headers);
      directories.value.find((e: IDirectory) => e.id === id)!.name = response.data.name;
    } catch (e) {
      console.log(e)
    }
  }
  const deleteDir = async (id: string) => {
    const authStore = useAuthStore();
    try {
      const headers = {
        headers: {
          'Authorization': `Bearer ${authStore.token}`,
        },
      };
      const response = await axios.delete(`/directories/delete/${id}`, headers);
      directories.value = directories.value.filter((e: IDirectory) => e.id !== response.data.id);
    } catch (e) {
      console.log(e)
    }
  }
  const getRoot = async () => {
    const authStore = useAuthStore();
    const fileStore = useFilesStore();
    resetPath();
    try {
      const headers = {
        headers: {
          'Authorization': `Bearer ${authStore.token}`,
        },
      };
      const response = await axios.get(`/directories/get`, headers);
      directories.value = response.data.children;
      fileStore.files = response.data.files;
    } catch (e) {
      console.log(e)
    }
  }
  const getCur = async () => {
    if (!path.value.length) {
      getRoot();
      return;
    }
    const authStore = useAuthStore();
    const fileStore = useFilesStore();
    try {
      const headers = {
        headers: {
          'Authorization': `Bearer ${authStore.token}`,
        },
      };
      const response = await axios.get(`/directories/get/${getCurDir.value}`, headers)
      directories.value = response.data.children;
      fileStore.files = response.data.files;
    } catch (e) {
      console.log(e)
    }
  }

  return { 
    directories, editDirectory, update, deleteDir, path, getRoot, getCur, getCurDir,
     getPath, goBack, addPath
    };
})
