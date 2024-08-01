import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const token: Ref<string | null> = ref(localStorage.getItem('token'))
  const saveToken = (token_save: string) => {
    localStorage.setItem('token', token_save);
    token.value = token_save;
  }
  const deleteToken = () => {
    localStorage.removeItem('token');
    token.value = null;
  }
  return { token, saveToken, deleteToken }
})
