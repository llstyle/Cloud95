<template>
  <div class="home-container">
    <div class="desktop">
      <div class="window" ref="draggableContainer" v-if="visible">
        <div class="title" @mousedown="dragMouseDown">
          <p class="title">
            YAY!!!
          </p>
          <button @click="visible = false">X</button>
        </div>
        <div class="body">
          <div class="container">
            <img src="@/assets/images/old-man-my-computer.gif" alt="">
            <p>Thank you for using that shit</p>
            <p>inspired by windows 95</p>
            <p>My github: <a href="https://github.com/llstyle">https://github.com/llstyle</a></p>
          </div>
        </div>
      </div>
    </div>
    <Dock />
  </div>
</template>
<script setup lang="ts">
import Dock from '@/components/DockComponent.vue'
import { reactive, ref, type Ref } from 'vue';

const draggableContainer: Ref<HTMLInputElement | null> = ref(null);
const visible = ref(true);
const positions = reactive({
  clientX: 0,
  clientY: 0,
  movementX: 0,
  movementY: 0
})

const dragMouseDown = (event: any) => {
      event.preventDefault()
      positions.clientX = event.clientX
      positions.clientY = event.clientY
      document.onmousemove = elementDrag
      document.onmouseup = closeDragElement
}
const elementDrag = (event: any) => {
  event.preventDefault()
  positions.movementX = positions.clientX - event.clientX
  positions.movementY = positions.clientY - event.clientY
  positions.clientX = event.clientX
  positions.clientY = event.clientY
  draggableContainer.value!.style.top = (draggableContainer.value!.offsetTop - positions.movementY) + 'px'
  draggableContainer.value!.style.left = (draggableContainer.value!.offsetLeft - positions.movementX) + 'px'
}
const closeDragElement =  () => {
  document.onmouseup = null
  document.onmousemove = null
}
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
.window {
  width: 300px;
  height: 300px;
  background:#C0C0C0;
  border-width:1px;
  border-color:#FFFFFF #808080 #808080 #FFFFFF;
  border-style:solid;
  padding:1px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%)
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
.container img {
  width: 100%;
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