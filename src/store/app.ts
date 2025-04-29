import { defineStore } from 'pinia'
import type { Model, TaskType, Result } from '../types'

interface AppState {
  model: Model | null
  file: File | null
  taskType: TaskType | null
  loading: boolean
  result: Result | null
}

/**
 * Global application store.
 */
export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    model: null,
    file: null,
    taskType: null,
    loading: false,
    result: null,
  }),
  actions: {
    setModel(model: Model | null) {
      this.model = model
    },
    setFile(file: File | null) {
      this.file = file
    },
    setTaskType(type: TaskType | null) {
      this.taskType = type
    },
    setLoading(val: boolean) {
      this.loading = val
    },
    setResult(data: Result | null) {
      this.result = data
    },
  },
})
