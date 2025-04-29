import axios from 'axios'
import type { Model, TaskType, Result } from '../types'

const API_BASE = 'http://127.0.0.1:8000/api/v1'

/**
 * Get available IA models.
 */
export async function getAvailableModels(): Promise<Model[]> {
  const res = await axios.get<{ models: Model[] }>(`${API_BASE}/models/`, {
    headers: { accept: 'application/json' },
  })
  return res.data.models
}

/**
 * Submit task with PDF file.
 */
export async function submitTask(
  modelName: string,
  file: File,
  taskType: TaskType,
): Promise<Result> {
  const form = new FormData()
  form.append('file', file)
  const res = await axios.post<Result>(`${API_BASE}/models/${modelName}/${taskType}/`, form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return res.data
}
