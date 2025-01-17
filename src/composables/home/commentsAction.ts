import { formActionDefault } from '@/utils/helpers/constants'
import { useTopicsStore } from '@/stores/topics'
import type { Comment } from '@/types/topics'
import { ref } from 'vue'

// by convention, composable function names start with "use"
export function useCommentsAction(onLoadList: () => void) {
  const topicsStore = useTopicsStore()

  const formAction = ref({ ...formActionDefault })
  const isFormDialogVisible = ref(false)
  const isConfirmDelete = ref(false)
  const itemData = ref<Comment | null>(null)
  const deleteId = ref<string>('')

  const onAdd = () => {
    itemData.value = null
    isFormDialogVisible.value = true
  }

  const onUpdate = (item: Comment) => {
    itemData.value = item
    isFormDialogVisible.value = true
  }

  const onDelete = (id: string) => {
    deleteId.value = id
    isConfirmDelete.value = true
  }

  const onConfirmDelete = async () => {
    formAction.value = { ...formActionDefault, formProcess: true }

    topicsStore.topicsList = topicsStore.topicsList.map((item) => {
      item.comments = item.comments.filter((comment) => comment.date !== deleteId.value)
      return item
    })

    formAction.value.formMessage = 'Successfully Deleted Comment.'
    formAction.value.formAlert = true

    onLoadList()
  }

  // expose managed state as return value
  return {
    formAction,
    isFormDialogVisible,
    isConfirmDelete,
    itemData,
    onAdd,
    onUpdate,
    onDelete,
    onConfirmDelete,
  }
}
