<template>
  <div class="box" v-if="errorStore.message">
      <div class="title">
        <p class="title">
          Error
        </p>
        <button @click="errorStore.close">X</button>
      </div>
      <div class="body">
        <img src="@/assets/icons/msg_error-0.png" alt="">
        <p>{{ errorStore.message }}</p>
      </div>
      <div class="button-container">
        <button @click="errorStore.close">OK</button>
      </div>
  </div>
</template>

<script setup lang="ts">
import { useErrorStore } from '@/stores/error';

const errorStore = useErrorStore();

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
.box{
  width: 300px;
  background:#C0C0C0;
  border-width:1px;
  border-color:#FFFFFF #808080 #808080 #FFFFFF;
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
  display:flex;
  align-items: center;
  justify-content: flex-start;
}
.body p{
  font-family:"MS Sans Serif";
  font-size:16px;
  margin-left: 1px;
}
.button-container {
  display: flex;
  justify-content: center;
  padding: 4px;
}
.button-container button {
  font-family:"MS Sans Serif";
  font-size:11px;
  outline:1px solid #000000;
  background:#C0C0C0;
  border-width:1px;
  border-style:solid;
  border-color:#FFFFFF #808080 #808080 #FFFFFF;
  padding:2px 28px;
  display:block;
  position:relative;
  bottom:0px;
  cursor: pointer;
}
</style>
