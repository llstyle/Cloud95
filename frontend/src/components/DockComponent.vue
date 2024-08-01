<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';

const userStore = useAuthStore();
</script>
<template>
  <div class="dock">
    <div class="app-container logo" @click="$router.push({name: 'home'})">
      <div class="content">
        <img src="@/assets/icons/logo.ico" alt="">
      </div>
    </div>
    <div v-if="userStore.token" class="group">
      <div :class="$route.name === 'file' ? 'app-container active': 'app-container'" @click="$router.push({name: 'file'})">
        <div class="content">
          <img src="@/assets/icons/w98_computer_explorer.ico" alt="">
          <label>File System</label>
        </div>
      </div>
      <div :class="$route.name === 'profile' ? 'app-container active': 'app-container'" @click="$router.push({name: 'profile'})">
        <div class="content">
          <img src="@/assets/icons/w98_users.ico" alt="">
          <label>Profile</label>
        </div>
      </div>
    </div>
    <div v-else class="group">
      <div :class="$route.name === 'signin' ? 'app-container active': 'app-container'" @click="$router.push({name: 'signin'})">
        <div class="content">
          <img src="@/assets/icons/w98_users.ico" alt="">
          <label>SignIn</label>
        </div>
      </div>
      <div :class="$route.name === 'signup' ? 'app-container active': 'app-container'" @click="$router.push({name: 'signup'})">
        <div class="content">
          <img src="@/assets/icons/w98_users.ico" alt="">
          <label>SignUp</label>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.dock {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 50px;
  background:#C0C0C0;
  border-width:2px;
  border-color:#FFFFFF #808080 #808080 #FFFFFF;
  border-style:solid;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.app-container {
  margin-left: 4px;
  position: relative;
  padding: 4px;
  background:#C0C0C0;
  border-width:2px;
  border-color:#FFFFFF #808080 #808080 #FFFFFF;
  border-style:solid;
  cursor: pointer;
  height: 40px;
}
.content {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.app-container img {
  margin: 0;
  width: 30px;
  width: 30px;
}
.app-container label {
  margin-left: 2px;
  cursor: pointer;
  font-family:Tahoma;
  align-self: center;
}
.active,
.app-container:active  {
  border: 2px inset #fff;
  background: silver;
  color: #424242;
  box-shadow: -1px -1px #000;
}
.group {
  display: flex;
}
@media (max-width:430px) {
  label {
    font-size: 11px;
  }
}
</style>
