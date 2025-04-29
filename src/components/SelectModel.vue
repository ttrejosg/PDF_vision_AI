<script setup lang="ts">
import { ref } from 'vue'
import type { Model } from '../types'

const props = defineProps<{ models: Model[] | null; disabled: boolean }>()
const emit = defineEmits<{
  (e: 'select', selectModel: Model): void
}>()

console.log('Models:', props.models)

const selectedModel = ref({ name: 'Select a Model', description: '' })
const show = ref(false)

function select(model: Model) {
  toggleDropdown()
  selectedModel.value = model
  emit('select', model)
}

document.addEventListener('click', (event) => {
  const target = event.target as HTMLElement
  if (!target.closest('.dropdown-button')) {
    show.value = false
  }
})

function toggleDropdown() {
  show.value = !show.value
}
</script>

<template>
  <header class="dropdown">
    <button class="dropdown-button" @click="toggleDropdown()" :disabled="props.disabled">
      {{ selectedModel.name }}
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        :class="{ rotated: show }"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M5.29289 9.29289C5.68342 8.90237 6.31658 8.90237 6.70711 9.29289L12 14.5858L17.2929 9.29289C17.6834 8.90237 18.3166 8.90237 18.7071 9.29289C19.0976 9.68342 19.0976 10.3166 18.7071 10.7071L12.7071 16.7071C12.5196 16.8946 12.2652 17 12 17C11.7348 17 11.4804 16.8946 11.2929 16.7071L5.29289 10.7071C4.90237 10.3166 4.90237 9.68342 5.29289 9.29289Z"
          fill="currentColor"
        ></path>
      </svg>
    </button>
    <transition name="dropdown">
      <div class="dropdown-menu" v-if="show">
        <span>Select a Model</span>
        <div
          v-for="model in props.models"
          :key="model.name"
          class="dropdown-item"
          @click="select(model)"
        >
          <h2>{{ model.name }}</h2>
          <p>{{ model.description }}</p>
          <div class="model-tasks">
            <p v-if="model.classifier">✔ Can classify data</p>
            <p v-if="model.extractor">✔ Can extract data</p>
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
  text-align: left;
  padding: 0.8rem;
  width: 100%;
}

.dropdown-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 10px;
  transition: 0.3s;
  font-size: 1.125rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 5px;
}

.dropdown-button:hover,
.dropdown-button:focus {
  background-color: #f0f0f0;
}

.dropdown-button:disabled {
  background-color: #f0f0f0;
  cursor: not-allowed;
  color: #ccc;
}

/* Estilo para el icono de la flecha */
svg {
  transition: transform 0.3s ease;
}

svg.rotated {
  transform: rotate(180deg);
}

/* Transiciones para el dropdown */
.dropdown-enter-active,
.dropdown-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.dropdown-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.dropdown-menu {
  position: absolute;
  margin-top: 0.5rem;
  display: block;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  z-index: 1;
  padding: 10px;
  border-radius: 5px;
  width: 20%;
}

.dropdown-menu span {
  font-size: 0.9rem;
  font-weight: light;
  color: #666;
  padding: 0.5rem;
}

.dropdown-item {
  cursor: pointer;
  width: 100%;
  border-radius: 5px;
  padding: 0.5rem;
  transition: 0.4s;
}

.dropdown-item h2 {
  font-size: 0.9rem;
  font-weight: bold;
  line-height: 1;
}

.dropdown-item p {
  font-size: 0.9rem;
  font-weight: light;
  color: #666;
}

.dropdown-item:hover {
  background-color: #e0e0e0;
}
</style>
