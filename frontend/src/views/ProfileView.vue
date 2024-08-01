<template>
  <div class="home-container">
    <div class="desktop">
      <div class="fs-window">
        <div class="title">
          <p class="title">
            Profile
          </p>
          <button @click="$router.push({name: 'home'})">X</button>
        </div>
        <div class="body">
          <div class="logout">
            <button @click="logout">Logout</button>
          </div>
          <div class="container" v-if="profile">
            <h3>Email:  {{ profile.email }}</h3>
            <h3>Files:  {{ profile._count.files }}</h3>
            <h3>directories:  {{ profile._count.directories }}</h3>
            <h3>sign up at:  {{ profile.createdAt.toString().substring(0, 10) }}</h3>
          </div>
          <div class="progress" v-if="profile">
            <progress id="file" :max="profile.diskSpace" :value="profile.usedSpace"></progress>
            <p>{{ profile.diskSpace / (1024 * 1024) }} / {{ Math.trunc(profile.usedSpace / (1024 * 1024)) }} (Mb)</p>
          </div>
        </div>
      </div>
    </div>
    <Dock />
  </div>
</template>
<script setup lang="ts">
import Dock from '@/components/DockComponent.vue'
import { useAuthStore } from '@/stores/auth';
import type { IProfile } from '@/utils/interface/profile.interface';
import axios from 'axios';
import { ref, type Ref } from 'vue';
import { useRouter } from 'vue-router';

const profile: Ref<IProfile | null> = ref(null);
const authStore = useAuthStore();
const router = useRouter();

const get = async () => {
  try {
    const headers = {
      headers: {
        'Authorization': `Bearer ${authStore.token}`,
      },
    };
    const response = await axios.get('/users/me', headers);
    profile.value = response.data;
  } catch (e) {
    console.log(e);
  }
}
const logout = () => {
  authStore.deleteToken();
  router.push({ name: 'home' });
}
get()
</script>

<style scoped>

.home-container {
  height: 100vh;
}
.desktop {
  padding: 4px;
  height: calc(100vh - 50px);
  width: 100%;
}
.fs-window {
  width: 100%;
  height: 100%;
  background:#C0C0C0;
  border-width:1px;
  border-color:#FFFFFF #808080 #808080 #FFFFFF;
  border-style:solid;
  padding:1px;
}
div.title{
  height:18px;
  width:100%;
  background:#000080;
  color:#FFF;
}
p.title{
  margin:2px 0 0 1px;
  float:left;
  font-family:Tahoma;
  font-weight:bold;
  font-size:11px;
}
.title button{
  margin:2px 2px 2px 0;
  float:right;
  width:14px;
  height:13.5px;
  background:#C0C0C0;
  border-width:1px;
  border-color:#FFFFFF #808080 #808080 #FFFFFF;
  padding:0;
  font-size:9px;
  font-weight:bold;
  font-family:Tahoma;
  text-align:center;
}
.body{
  padding:13px 12px 12px 13px;
  width: 100%;
  height: calc(100% - 18px);  
}
.container {
  color: #424242;
  box-shadow: -1px -1px #000;
  background: #FFFFFF;
  height: calc(100% - 40px);
  padding: 4px;
  width: 100%;
  position: relative;
}
.body p{
  font-family:"MS Sans Serif";
  font-size:11px;
}
.body h3{
  font-family:"MS Sans Serif";
  font-size:16px;
}
.body button{
  font-family:"MS Sans Serif";
  font-size:11px;
  outline:1px solid #000000;
  background:#C0C0C0;
  border-width:1px;
  border-style:solid;
  border-color:#FFFFFF #808080 #808080 #FFFFFF;
  padding:4px 10px;
  display:block;
  position:relative;
  bottom:0px;
  cursor: pointer;
}
.progress {
  display: block;
}
progress {
  border-radius: 0;
  width: 100%;
  height: 12px;
  border: 1px inset #d5d5d5;
  background-clip: content-box;
}
progress::-webkit-progress-bar {
  background-color: #C0C0C0;
}
progress::-webkit-progress-value {
  background-color: #000080;
}
.progress p {
  font-family:"MS Sans Serif";
  font-size:8px;
  margin: 0;
}
.logout {
  height: 20px;
  display: flex;
  justify-content: flex-start;
}
</style>