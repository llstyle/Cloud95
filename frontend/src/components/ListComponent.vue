<template>
  <DirectoryComponent @open-options="setOptions" :option-id="optionId" />
  <FileComponent @open-options="setOptions" :option-id="optionId"/>
</template>
<script lang="ts" setup>
import DirectoryComponent from './DirectoryComponent.vue';
import FileComponent from './FileComponent.vue';
import { ref } from 'vue';

const optionId = ref('');

const setOptions = (id: string) => {
  if (id === optionId.value) {
    optionId.value = '';
  } else {
    optionId.value = id;
  }
}
</script>
<style>
</style>