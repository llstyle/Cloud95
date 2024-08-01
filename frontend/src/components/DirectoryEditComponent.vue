<template>
  <div class="box" v-if="editDirectory?.id">
      <div class="title">
        <p class="title">
          Edit Directory {{ editDirectory.name }}
        </p>
        <button @click="close">X</button>
      </div>
      <div class="body">
        <div class="input-container">
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="name" />
        </div>
        <button @click="update()" class="submit-button">Create</button>
      </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useDirectoriesStore } from '@/stores/directories';
import { storeToRefs } from 'pinia';

const name = ref('');
const directoryStore = useDirectoriesStore();
const { editDirectory } = storeToRefs(directoryStore);
const close = () => editDirectory.value = null;
const update = () => {
  directoryStore.update(editDirectory.value!.id, name.value);
  close();
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
