<template>
  <div class="box">
      <div class="title">
        <p class="title">
          New File
        </p>
        <button @click="emit('close')">X</button>
      </div>
      <div class="body">
        <div class="input-container">
          <label for="file">File:</label>
          <input type="file" id="file" @change="selectFile" />
        </div>
        <div class="input-container">
          <label for="name">Name(Optional):</label>
          <input type="text" id="name" v-model="name" />
        </div>
        <button @click="create" class="submit-button">Upload</button>
      </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';
import { useFilesStore } from '@/stores/files';
import { useDirectoriesStore } from '@/stores/directories';
import { useErrorStore } from '@/stores/error';

const name = ref('');
const file: Ref<Blob | null> = ref(null);

const authStore = useAuthStore();
const fileStore = useFilesStore();
const directoryStore = useDirectoriesStore()
const errorStore = useErrorStore()
const emit = defineEmits<{
  (e: 'close'): void,
}>()

const create = async () => {
  try {
    if (!file.value) throw new Error('not file');
    const headers = {
      headers: {
        'Authorization': `Bearer ${authStore.token}`,
      },
    };
    const formData = new FormData();
    formData.append('file', file.value);
    formData.append('name', name.value);
    if(directoryStore.getCurDir) formData.append('directoryId', directoryStore.getCurDir);
    const response = await axios.post(`/file/upload`, formData, headers);
    fileStore.files.push(response.data);
    emit('close');
  } catch (err) {
    if (axios.isAxiosError(err)) {
      errorStore.error(err.response?.data.message)
    }
    console.log(err);
  }
};

const selectFile = (event: any) => {
  name.value = event.target.files[0].name;
  file.value = event.target.files[0];
}
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
  padding:13px 12px 12px;
  height:100%;
  width: 100%;
  display:inline-block;
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
</style>
