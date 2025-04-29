<script setup lang="ts">
import { computed } from 'vue'
import type { Result } from '../types'
const props = defineProps<{ data: Array<Result> }>()
const columns = computed(() => Object.keys(props.data[0] || {}))
</script>

<template>
  <table>
    <thead>
      <tr>
        <th v-for="key in columns" :key="key">{{ key }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, idx) in data" :key="idx">
        <td v-for="key in columns" :key="key">{{ row[key] }}</td>
      </tr>
    </tbody>
  </table>
</template>
