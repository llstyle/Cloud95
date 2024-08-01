<template>
  <div v-for="file in fileStore.files" :key="file.id" class="directory-container" @click="open(file)">
    <div class="name-container">
      <img v-if="file.type === Types.image" src="@/assets/icons/w98_image_old_jpeg.ico">
      <img v-else-if="file.type === Types.video" src="@/assets/icons/w2k_video_clip.ico">
      <img v-else-if="file.type === Types.audio" src="@/assets/icons/w2k_audio_cd.ico">
      <img v-else-if="file.type === Types.text" src="@/assets/icons/w2k_text_document.ico">
      <img v-else src="@/assets/icons/executable-0.png">
      <label>{{ file.name }}</label>
    </div>
    <div class="dropdown">
      <button class="dropbtn" @click.stop.prevent="emit('openOptions', file.id)"></button>
      <div class="dropdown-content" v-if="optionId === file.id">
        <button @click.stop="edit(file)">Edit</button >
        <button @click.stop="fileStore.deleteFile(file.id)">Delete</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { IFile } from '@/utils/interface/file.interface';
import Types from '@/utils/enum/types.enum';
import { useFilesStore } from '@/stores/files';

defineProps<{
  optionId: string,
}>()
const fileStore = useFilesStore();

const emit = defineEmits<{
  (e: 'openOptions', directoryId: string): void,
  (e: 'edit', file: IFile): void,
  (e: 'delete', file: IFile): void,
}>()
const edit = (file: IFile) => {
  fileStore.editFile = file;
}
const open = (file: IFile) => {
  fileStore.file = file;
}
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
  display: flex;
  width: calc(100% - 20px);
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