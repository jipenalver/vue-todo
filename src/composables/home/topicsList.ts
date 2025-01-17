import { useTopicsStore } from '@/stores/topics'
import { computed, onMounted, ref } from 'vue'
import type { Topic } from '@/types/topics'

// by convention, composable function names start with "use"
export function useTopicsList() {
  const topicsStore = useTopicsStore()

  // Reactive state for list options and data
  const listOptions = ref({
    page: 1,
    itemsPerPage: 20,
    noOfPages: 0,
  })
  const listData = ref<Topic[]>([])

  // Computed property to calculate the total number of pages dynamically
  const totalPages = computed(() =>
    Math.ceil(topicsStore.topicsList.length / listOptions.value.itemsPerPage),
  )

  // Method to handle per-page change
  const onPerPageChange = (value: number) => {
    listOptions.value.itemsPerPage = value
    listOptions.value.noOfPages = totalPages.value
    listOptions.value.page = 1
    // Update the data for the first page
    updateListData(1)
  }

  // Method to handle page navigation
  const onPageClick = (value: number) => {
    listOptions.value.page = value
    updateListData(value)
  }

  // Method to load list data for the given page
  const updateListData = (page: number) => {
    const startIndex = (page - 1) * listOptions.value.itemsPerPage
    const endIndex = startIndex + listOptions.value.itemsPerPage
    listData.value = topicsStore.topicsList.slice(startIndex, endIndex)
  }

  // Initial load of the list
  const onLoadList = async (page = 1) => {
    if (topicsStore.topicsList.length === 0) await topicsStore.getTopics()
    listOptions.value.noOfPages = totalPages.value
    updateListData(page)
  }

  // Hook into the lifecycle to load data on mount
  onMounted(() => {
    onLoadList()
  })

  // Expose managed state and methods
  return { topicsStore, listOptions, listData, onPageClick, onPerPageChange, onLoadList }
}
