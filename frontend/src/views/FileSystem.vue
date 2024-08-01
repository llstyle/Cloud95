<template>
  <div class="home-container">
    <div class="desktop">
      <div class="fs-window">
        <div class="title">
          <p class="title">
            File System
          </p>
          <button @click="$router.push({name: 'home'})">X</button>
        </div>
        <div class="body">
          <div class="path-container">
            <label class="path" @click="directoryStore.getRoot">/{{ directoryStore.getPath }}</label>
            <button @click="goBack">&#8679;</button>
          </div>
          <div class="container">
            <ListComponent/>
            <div class="instruments">
              <button @click="newDirectoryModal = true">New Directory</button>
              <button @click="newFileModal = true">New File</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Dock />
    <FileOpenComponent/>
    <FileEditComponent />
    <DirectoryEditComponent />
    <NewFileComponent v-if="newFileModal" @close="newFileModal = false" />
    <NewDirectoryComponent v-if="newDirectoryModal" @close="newDirectoryModal = false"/>
  </div>
</template>
<script setup lang="ts">
import Dock from '@/components/DockComponent.vue'
import NewFileComponent from '@/components/NewFileComponent.vue'
import NewDirectoryComponent from '@/components/NewDirectoryComponent.vue'
import FileOpenComponent from '@/components/FileOpenComponent.vue'
import FileEditComponent from '@/components/FileEditComponent.vue'
import DirectoryEditComponent from '@/components/DirectoryEditComponent.vue'
import { ref } from 'vue';
import ListComponent from '@/components/ListComponent.vue';
import { useDirectoriesStore } from '@/stores/directories';

const newFileModal = ref(false);
const newDirectoryModal = ref(false);
const directoryStore = useDirectoriesStore();

const goBack = () => {
  directoryStore.goBack();
  directoryStore.getCur();
}

directoryStore.getRoot();
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
.path-container {
  height: 20px;
  display: flex;
  justify-content: space-between;
}
.path-container button {
  font-weight: bold;
}
.path-container label {
  box-shadow: -1px -1px #000;
  width: 100%;
  padding: 4px;
  background: #FFFFFF;
  cursor: pointer;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
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
  height: calc(100% - 20px);
  padding: 4px;
  width: 100%;
  position: relative;
}
.body p{
  font-family:"MS Sans Serif";
  font-size:11px;
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
.instruments {
  display: flex;
  width: 100%;
  position: absolute;
  height: 20px;
  bottom: 4px;
}
</style>