import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'

export const useErrorStore = defineStore('error', () => {
  const message: Ref<string> = ref('');
  const error = (mes: string) => {
    message.value = mes;
  }
  const close = () => {
    message.value = '';
  }
  return { message, error, close }
})
