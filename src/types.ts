export interface Model {
  name: string
  description: string
  classifier: boolean
  extractor: boolean
}
export type TaskType = 'classification' | 'extraction'
export type Result = Record<string, unknown>
