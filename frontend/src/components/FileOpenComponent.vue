<template>
  <div class="box" v-if="fileStore.file?.id">
      <div class="title">
        <p class="title">
          {{ fileStore.file.name }}
        </p>
        <button @click="close">X</button>
      </div>
      <div class="body">
        <div>
          <img  v-if="fileStore.file.type === Types.image" ref="img" src="" alt="" >
          <video v-else-if="fileStore.file.type === Types.video" ref="video" controls autoplay></video>
          <audio v-else-if="fileStore.file.type === Types.audio" ref="audio" controls autoplay></audio>
          <p v-else-if="fileStore.file.type === Types.text" ref="text"></p>
        </div>
        <a ref="download">download</a>
      </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import axios, { type AxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/stores/auth';
import Types from '@/utils/enum/types.enum';
import { useFilesStore } from '@/stores/files';

const authStore = useAuthStore();
const fileStore = useFilesStore();
const img = ref<HTMLInputElement | null>(null)
const video = ref<HTMLInputElement | null>(null)
const audio = ref<HTMLInputElement | null>(null)
const text = ref<HTMLInputElement | null>(null)
const download = ref<HTMLAnchorElement | null>(null)



const load = async () => {
  if (!fileStore.file?.id) return;
  try {
    const config: AxiosRequestConfig = {
      headers: {
        'Authorization': `Bearer ${authStore.token}`,
      },
      responseType: 'blob',
    };
    const response = await axios.get(`/file/get/${fileStore.file.id}`, config);
    const url = URL.createObjectURL(response.data);
    if (fileStore.file.type === Types.text) {
      text.value!.textContent = await response.data.text(); 
    } else {
      if (fileStore.file.type === Types.image) {
        img.value!.src = url;
      } else if (fileStore.file.type === Types.audio) {
        audio.value!.src = url;
      } else if (fileStore.file.type === Types.video) {
        video.value!.src = url;
      }
    }
    download.value!.href = url;
    download.value!.download = fileStore.file.name;
  } catch (e) {
    console.log(e);
  }
};
const close = () => {
  fileStore.file = null;
}
watch(() => fileStore.file?.id ,() => {
  if (fileStore.file?.id) {
    load();
  }
})

</script>

<style scoped>
input {
    width: 100%;
    border: 2px inset #d5d5d5;
    color: #424242;
    background: #fff;
    box-shadow: -1px -1px 0 0 #828282;
    margin-top: 4px;
    padding-left: 2px;
}
.input-container {
  display: inline-block;
  width: 100%;
}
.input-container label {
  float: left;
}
.input-container input {
  float: right;
}
.submit-button {
  margin-top: 8px;
}
button:focus{
  outline:none;
}
.box{
  width: 300px;
  background:#C0C0C0;
  border-width:2px;
  border-color:#808080;
  border-style:solid;
  position:absolute;
  top:calc(50% - 50px);
  left:50%;
  transform: translate(-50%,-50%);
  padding:1px;
}
div.title{
  height:18px;
  background:#000080;
  color:#FFF;
  display: flex;
  justify-content: space-between;
}
p.title{
  margin:2px 0 0 1px;
  float:left;
  font-family:Tahoma;
  font-weight:bold;
  font-size:11px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.title button{
  margin:2px 2px 2px 0;
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
  padding:13px 12px 12px;
  height:100%;
  width: 100%;
  display:inline-block;
  text-align: center;
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
img, video, audio {
  max-width: 100%;
}
</style>
