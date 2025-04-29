<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'file-selected', file: File): void
}>()

const fileName = ref('')
const errorMessage = ref('')

function onChange(e: Event) {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (file && file.type === 'application/pdf') {
    fileName.value = file.name.length > 20 ? file.name.slice(0, 17) + '...' : file.name
    emit('file-selected', file)
    errorMessage.value = ''
  } else {
    if (!fileName.value) {
      errorMessage.value = 'Please upload a PDF file'
    }
  }
}
</script>

<template>
  <div class="pdf-uploader">
    <label class="upload-circle" :class="{ 'file-added': fileName }">
      <input type="file" accept="application/pdf" @change="onChange" />
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label=""
        class="h-[18px] w-[18px]"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12 3C12.5523 3 13 3.44772 13 4L13 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13L13 13L13 20C13 20.5523 12.5523 21 12 21C11.4477 21 11 20.5523 11 20L11 13L4 13C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11L11 11L11 4C11 3.44772 11.4477 3 12 3Z"
          fill="currentColor"
        ></path>
      </svg>
    </label>
    <p v-if="fileName" class="file-name">{{ fileName }}</p>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<style scoped>
.pdf-uploader {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.upload-circle {
  width: 30px;
  height: 30px;
  border: 2px dashed #ccc;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: #ccc;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.upload-circle:hover {
  background-color: #f0f0f0;
  border-color: #007bff;
  color: #007bff;
}

.upload-circle input {
  position: absolute;
  width: 0;
  height: 0;
}

.file-added {
  background-color: #007bff;
  border: 2px dashed #007bff;
  color: white;
}

.file-name {
  font-size: 14px;
  color: #333;
}

.error {
  color: red;
  font-size: 12px;
}
</style>
