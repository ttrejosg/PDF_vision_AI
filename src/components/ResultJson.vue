<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ json: unknown }>()

function renderJson(json: unknown, depth = 0): string {
  if (typeof json !== 'object' || json === null) {
    return JSON.stringify(json)
  }

  const entries = Object.entries(json as Record<string, unknown>)
  const indent = '&nbsp;'.repeat(depth * 4)

  return `{<br>${entries
    .map(
      ([key, value]) =>
        `${indent}&nbsp;&nbsp;<span style="--depth: ${depth}">"${key}"</span>: ${
          typeof value === 'object' && value !== null
            ? renderJson(value, depth + 1)
            : JSON.stringify(value)
        }`,
    )
    .join(',<br>')}<br>${indent}}`
}

const styledJson = computed(() => renderJson(props.json))
</script>

<template>
  <pre class="styled-json" v-html="styledJson"></pre>
</template>

<style>
.styled-json {
  background-color: #2d2d2d;
  color: #f8f8f2;
  font-family: 'Courier New', Courier, monospace;
  font-size: 1rem;
  line-height: 1.5;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow-x: auto;
  border: 1px solid #444;
}

.styled-json span {
  color: hsl(calc(var(--depth) * 80), 70%, 70%);
}
</style>
