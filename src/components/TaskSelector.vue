<script setup lang="ts">
import { ref } from 'vue'
defineProps<{
  disabled: boolean
  availableTasks: string[]
}>()

const emit = defineEmits<{
  (e: 'task-selected', task: string): void
}>()

const selectedTask = ref<string | null>(null)

function select(t: string) {
  if (selectedTask.value === t) return
  selectedTask.value = t
  emit('task-selected', t)
}
</script>

<template>
  <div class="task-selector">
    <button
      :class="{ selected: selectedTask === 'classification' }"
      @click="select('classification')"
      :disabled="disabled || !availableTasks.includes('classification')"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="icon"
        width="20"
        height="20"
      >
        <path d="M3 3v18h18"></path>
        <path d="M7 16h3v5H7z"></path>
        <path d="M12 11h3v10h-3z"></path>
        <path d="M17 6h3v15h-3z"></path>
      </svg>
      Classify
    </button>
    <button
      :class="{ selected: selectedTask === 'extraction' }"
      @click="select('extraction')"
      :disabled="disabled || !availableTasks.includes('extraction')"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="icon"
        width="22"
        height="22"
      >
        <path d="M4 4h16v16H4z"></path>
        <path d="M8 10h8"></path>
        <path d="M8 14h5"></path>
        <path d="M12 18l4-4-4-4"></path>
      </svg>
      Extract
    </button>
  </div>
</template>

<style scoped>
.task-selector {
  display: flex;
  gap: 1rem;
}

button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border: 2px solid #ccc;
  border-radius: 999px;
  background-color: white;
  color: #333;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

button:hover {
  background-color: #f0f0f0;
  border-color: #007bff;
  color: #007bff;
}

button.selected {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}

button.selected:hover {
  background-color: #0056b3;
  border-color: #0056b3;
}

button:disabled {
  background-color: #f0f0f0;
  border-color: #ccc;
  color: #ccc;
  cursor: not-allowed;
}
</style>
