import { onMounted } from 'vue'

// by convention, composable function names start with "use"
export function useTopicActions() {
  onMounted(() => {})

  // expose managed state as return value
  return {}
}
