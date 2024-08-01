<script setup lang="ts">
import ErrorComponent from './components/ErrorComponent.vue';
import axios from 'axios';
import { useAuthStore } from './stores/auth';

const authStore = useAuthStore()

const checkToken = async () => {
  try {
    await axios.get('/users/me', { headers: { 'Authorization': `Bearer ${authStore.token}` } })
  } catch (e) {
    if (axios.isAxiosError(e) && e.response?.status === 401) {
      authStore.deleteToken()
    }
  }
}
checkToken()
</script>

<template>
  <RouterView />
  <ErrorComponent />
</template>

<style>
* {
  box-sizing: border-box;
}
body, html {
  margin: 0;
  padding: 0;
  height: 100vh;
}

body {
  background-color: #008080;
  color: #000;
  -webkit-font-smoothing: none;
  -moz-osx-font-smoothing: grayscale;
  font-family: Arial, sans-serif;
}
</style>
