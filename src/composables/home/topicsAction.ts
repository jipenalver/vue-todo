import { formActionDefault } from '@/utils/helpers/constants'
import { useTopicsStore } from '@/stores/topics'
import type { Topic } from '@/types/topics'
import { ref } from 'vue'

// by convention, composable function names start with "use"
export function useTopicsAction(onLoadList: () => void) {
  const topicsStore = useTopicsStore()

  const formAction = ref({ ...formActionDefault })
  const isFormDialogVisible = ref(false)
  const isConfirmDeleteDialog = ref(false)
  const itemData = ref<Topic | null>(null)
  const deleteId = ref<string>('')

  const onAdd = () => {
    itemData.value = null
    isFormDialogVisible.value = true
  }

  const onUpdate = (item: Topic) => {
    console.log(item)
    itemData.value = item
    isFormDialogVisible.value = true
    console.log(itemData.value)
  }

  const onDelete = (id: string) => {
    deleteId.value = id
    isConfirmDeleteDialog.value = true
  }

  const onConfirmDelete = async () => {
    formAction.value = { ...formActionDefault, formProcess: true }

    topicsStore.topicsList = topicsStore.topicsList.filter((item) => item.guid !== deleteId.value)

    formAction.value.formMessage = 'Successfully Deleted Topic.'
    formAction.value.formAlert = true

    onLoadList()
  }

  // expose managed state as return value
  return {
    formAction,
    isFormDialogVisible,
    isConfirmDeleteDialog,
    itemData,
    onAdd,
    onUpdate,
    onDelete,
    onConfirmDelete,
  }
}
