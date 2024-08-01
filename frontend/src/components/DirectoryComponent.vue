<template>
<div v-for="directory in directoryStore.directories" :key="directory.id" class="directory-container" @click="open(directory)">
  <div class="name-container">
    <img src="@/assets/icons/w2k_folder_closed.ico" alt="">
    <label>{{ directory.name }}</label>
  </div>
  <div class="dropdown">
    <button class="dropbtn" @click.stop.prevent="emit('openOptions', directory.id)"></button>
    <div class="dropdown-content" v-if="optionId === directory.id">
      <button @click.stop="edit(directory)">Edit</button >
      <button @click.stop="directoryStore.deleteDir(directory.id)">Delete</button>
    </div>
  </div>
</div>
</template>
<script lang="ts" setup>
import { useDirectoriesStore } from '@/stores/directories';
import type { IDirectory } from '@/utils/interface/directory.inteface';

const directoryStore = useDirectoriesStore();

defineProps<{
  optionId: string,
}>()
const open = (directory: IDirectory) => {
  directoryStore.addPath(directory);
  directoryStore.getCur();
}
const edit = (directory: IDirectory) => {
  directoryStore.editDirectory = directory;
}
const emit = defineEmits<{
  (e: 'openOptions', directoryId: string): void,
  (e: 'edit', directory: IDirectory): void,
  (e: 'delete', directory: IDirectory): void,
}>()
</script>
<style scoped>
.directory-container {
  cursor: pointer;
  margin-bottom: 4px;
  width: 100%;
  height: 20px;
  display: flex;
  justify-content: space-between;
  font-family: Tahoma;
}
label {
  margin-left: 4px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.name-container:active {
  border: 1px black solid;
}
.name-container {
  width: calc(100% - 20px);
  display: flex;
}
.dropdown {
  position: relative;
}
.dropdown button {
  outline:1px solid #000000;
  background:#C0C0C0;
  border-width:1px;
  border-style:solid;
  border-color:#FFFFFF #808080 #808080 #FFFFFF;
  cursor: pointer;
  height: 20px;
  width: 20px;
}
.dropdown-content {
  position: absolute;
  right: 0;
  z-index: 1;
}
.dropdown-content button {
  font-family:"MS Sans Serif";
  font-size:11px;
  padding:4px 10px;
  right: 0;
  width: 80px;
}
</style>