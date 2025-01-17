import { formActionDefault } from '@/utils/helpers/constants'
import type { Topic } from '@/types/topics'
import { ref } from 'vue'

// by convention, composable function names start with "use"
export function useTopicsAction() {
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
    itemData.value = item
    isFormDialogVisible.value = true
  }

  const onDelete = (id: string) => {
    deleteId.value = id
    isConfirmDeleteDialog.value = true
  }

  const onConfirmDelete = async () => {
    formAction.value = { ...formActionDefault, formProcess: true }

    // const { error } = await userRolesStore.deleteUserRole(deleteId.value ?? 0)

    // formAction.value.formProcess = false

    // if (error) {
    //   formAction.value.formMessage = error.message
    //   formAction.value.formStatus = 400
    //   formAction.value.formAlert = true
    //   return
    // }

    // formAction.value.formMessage = 'Successfully Deleted User Role.'
    // formAction.value.formAlert = true
    // await userRolesStore.getUserRoles()
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
