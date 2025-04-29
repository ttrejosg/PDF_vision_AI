<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { getAvailableModels, submitTask } from '../services/aiService'
import type { Model, Result, TaskType } from '../types'
import SelectModel from '../components/SelectModel.vue'
import PdfUploader from '../components/PdfUploader.vue'
import TaskSelector from '../components/TaskSelector.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import ResultTable from '../components/ResultTable.vue'
import ResultJson from '../components/ResultJson.vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '../store/app'

const store = useAppStore()
const router = useRouter()
const models = ref<Model[]>([])

onMounted(async () => {
  models.value = await getAvailableModels()
})

function selectModel(m: Model) {
  store.setModel(m)
}
function onFile(f: File) {
  store.setFile(f)
}
function onTask(t: string) {
  store.setTaskType(t as TaskType)
}

const ready = computed(() => !!store.model && !!store.file && !!store.taskType)
const loading = computed(() => store.loading)

async function submit() {
  store.setLoading(true)
  try {
    const res: Result = await submitTask(store.model!.name, store.file!, store.taskType!)
    store.setResult(res)
  } catch (e: unknown) {
    if (e instanceof Error) {
      alert('Error: ' + e.message)
    } else {
      alert('An unknown error occurred')
    }
  } finally {
    store.setLoading(false)
  }
}

const result = computed(() => store.result)
const isTable = computed(() => store.taskType === 'classification')

function reset() {
  store.setFile(null)
  store.setModel(null)
  store.setTaskType(null)
  store.setResult(null)
  router.push('/')
}
</script>

<template>
  <SelectModel @select="selectModel" :models="models" :disabled="loading" />
  <main>
    <section class="start" v-if="!result && !loading">
      <h1>Welcome to the <span style="font-weight: bold">PDF Analyzer</span></h1>
      <p>
        <span style="font-weight: bold">Select a model</span> and
        <span style="font-weight: bold">upload a PDF file</span> to get started.
      </p>
      <p>Once you have selected a model and uploaded a file, you can choose a task type.</p>
      <p>Click the "Submit" button to analyze the PDF file with the selected model.</p>
      <p>After the analysis is complete, the results will be displayed below.</p>

      <div class="controls">
        <PdfUploader @file-selected="onFile" />
        <TaskSelector
          @task-selected="onTask"
          :disabled="!store.model"
          :availableTasks="
            store.model
              ? store.model.classifier && store.model.extractor
                ? ['classification', 'extraction']
                : store.model.classifier
                  ? ['classification']
                  : ['extraction']
              : []
          "
        />
        <button @click="submit" :disabled="!ready">Submit</button>
      </div>
    </section>
    <LoadingSpinner v-if="loading" />
    <section class="start" v-if="result && !loading">
      <h1>Results</h1>
      <p>Here are the results of your analysis:</p>
      <p>
        <strong>Task Type:</strong>
        {{ store.taskType === 'classification' ? 'Classification' : 'Extraction' }}
      </p>
      <!-- <ResultTable v-if="isTable" :data="Array.isArray(result) ? result : [result]" />
      <ResultJson v-else :json="result" /> -->
      <p>
        {{ result }}
      </p>
      <p>Click the button below to analyze another PDF file.</p>
      <button @click="reset" class="another-button">Analyze Another PDF</button>
    </section>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
}

.start {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  p {
    font-size: 1.125rem;
  }
}

.controls {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0.5 rem;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  margin-top: 1rem;
  border-radius: 20px;
  gap: 1rem;
  padding: 1rem;
  button {
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 20px;
    padding: 0.5rem 1rem;
    font-size: 1.125rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  button:hover {
    background-color: #0056b3;
  }
  button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
}

.another-button {
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 0.2rem 0.8rem;
  font-size: 1.125rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 0.5rem;
}
</style>
