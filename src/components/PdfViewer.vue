<script setup lang="ts">
import { useAppStore } from '../store'
import { computed } from 'vue'

const store = useAppStore()
const pdfUrl = computed(() => {
  return store.file ? URL.createObjectURL(store.file) : null
})
</script>

<template>
  <div class="pdf-viewer">
    <iframe v-if="pdfUrl" :src="pdfUrl" width="100%" height="600px" frameborder="0"></iframe>
    <p v-else>No PDF file uploaded.</p>
  </div>
</template>

<style scoped>
.pdf-viewer {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
}
</style>
