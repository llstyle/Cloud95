import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { IFile } from '@/utils/interface/file.interface';
import axios from 'axios';
import { useAuthStore } from './auth';

export const useFilesStore = defineStore('files', () => {
  const files: Ref<IFile[]> = ref([]);
  const file: Ref<IFile | null> = ref(null);
  const editFile: Ref<IFile | null> = ref(null);
  const update = async (id: string, name: string) => {
    const authStore = useAuthStore();
    try {
      const headers = {
        headers: {
          'Authorization': `Bearer ${authStore.token}`,
        },
      };
      const response = await axios.patch(`/file/update`, {id, name}, headers);
      files.value.find((e: IFile) => e.id === id)!.name = response.data.name;
    } catch (e) {
      console.log(e)
    }
  }
  const deleteFile = async (id: string) => {
    const authStore = useAuthStore();
    try {
      const headers = {
        headers: {
          'Authorization': `Bearer ${authStore.token}`,
        },
      };
      const response = await axios.delete(`/file/delete/${id}`, headers);
      files.value = files.value.filter((e: IFile) => e.id !== response.data.id);
    } catch (e) {
      console.log(e)
    }
  }
  return { files, file, editFile, update, deleteFile };
})
