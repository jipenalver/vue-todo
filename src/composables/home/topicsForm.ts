import { formActionDefault } from '@/utils/helpers/constants'
import { getRandomCode } from '@/utils/helpers/others'
import { useTopicsStore } from '@/stores/topics'
import type { Topic } from '@/types/topics'
import { ref, watch } from 'vue'

// by convention, composable function names start with "use"
export function useTopicsForm(
  props: {
    isDialogVisible?: boolean
    itemData?: Topic
    listOptions?: { page: number; itemsPerPage: number }
  },
  emit: (event: 'update:isDialogVisible' | 'listUpdated', value: boolean | number) => void,
) {
  const topicsStore = useTopicsStore()

  // Load Variables
  const formDataDefault = {
    name: '',
    guid: '',
    comments: [],
  }
  const formData = ref<Topic>({ ...formDataDefault })
  const formAction = ref({ ...formActionDefault })
  const refVForm = ref()
  const isUpdate = ref(false)

  // Monitor itemData if it has data
  watch(
    () => props.isDialogVisible,
    () => {
      isUpdate.value = !!props.itemData
      formData.value = props.itemData ? { ...props.itemData } : { ...formDataDefault }
    },
    { immediate: true },
  )

  // Submit Functionality
  const onSubmit = async () => {
    formAction.value = { ...formActionDefault, formProcess: true }

    // Update Topic
    if (isUpdate.value) {
      const index = topicsStore.topicsList.findIndex(
        (item: Topic) => item.guid === formData.value.guid,
      )
      topicsStore.topicsList[index] = { ...formData.value }

      if (props.listOptions) emit('listUpdated', props.listOptions.page)
      formAction.value.formMessage = 'Successfully Updated Topic.'
    }
    // Adding Topic
    else {
      const addData = {
        ...formData.value,
        guid: getRandomCode(8).toLowerCase(),
        comments: [],
      }
      topicsStore.topicsList.unshift(addData)

      emit('listUpdated', 1)
      formAction.value.formMessage = 'Successfully Added Topic.'
    }

    formAction.value.formAlert = true

    // Form Reset and Close Dialog
    setTimeout(() => {
      onFormReset()
    }, 1000)
  }

  // Trigger Validators
  const onFormSubmit = () => {
    refVForm.value?.validate().then(({ valid }: { valid: boolean }) => {
      if (valid) onSubmit()
    })
  }

  // Form Reset
  const onFormReset = () => {
    formAction.value = { ...formActionDefault }
    formData.value = { ...formDataDefault }
    emit('update:isDialogVisible', false)
  }

  // expose managed state as return value
  return {
    formData,
    formAction,
    refVForm,
    isUpdate,
    onFormSubmit,
    onFormReset,
  }
}
