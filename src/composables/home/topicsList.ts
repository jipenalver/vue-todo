import { useTopicsStore } from '@/stores/topics'
import type { Topic } from '@/types/topics'
import { onMounted, ref } from 'vue'

// by convention, composable function names start with "use"
export function useTopicsList() {
  const topicsStore = useTopicsStore()

  const listOptions = ref({
    page: 1,
    itemsPerPage: 20,
    noOfPages: 0,
    isLoading: false,
  })
  const listData = ref<Topic[]>([])

  const onPageClick = (value: number) => {
    const startIndex = (value - 1) * listOptions.value.itemsPerPage
    const endIndex = startIndex + listOptions.value.itemsPerPage

    listData.value = topicsStore.topicsList.slice(startIndex, endIndex)

    listOptions.value.page = value
  }

  const onPerPageChange = (value: number) => {
    listOptions.value.itemsPerPage = value
    listOptions.value.noOfPages = Math.ceil(
      topicsStore.topicsList.length / listOptions.value.itemsPerPage,
    )
    listOptions.value.page = 1

    listData.value = topicsStore.topicsList.slice(0, value)
  }

  const onLoadList = () => {
    listData.value = topicsStore.topicsList.slice(0, listOptions.value.itemsPerPage)

    listOptions.value.noOfPages = Math.ceil(
      topicsStore.topicsList.length / listOptions.value.itemsPerPage,
    )
  }

  onMounted(async () => {
    if (topicsStore.topicsList.length === 0) await topicsStore.getTopics()

    onLoadList()
  })

  // expose managed state as return value
  return { topicsStore, listOptions, listData, onPageClick, onPerPageChange, onLoadList }
}
