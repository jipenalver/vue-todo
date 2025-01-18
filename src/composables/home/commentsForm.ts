import { formActionDefault } from '@/utils/helpers/constants'
import { getAvatarText } from '@/utils/helpers/others'
import type { Comment, Topic } from '@/types/topics'
import { useTopicsStore } from '@/stores/topics'
import { ref, watch } from 'vue'

// by convention, composable function names start with "use"
export function useCommentsForm(
  props: {
    isDialogVisible?: boolean
    topicData?: Topic
    commentData?: Comment
    listOptions?: { page: number; itemsPerPage: number }
  },
  emit: (event: 'update:isDialogVisible' | 'listUpdated', ...args: boolean[] | number[]) => void,
) {
  const topicsStore = useTopicsStore()

  // Load Variables
  const formDataDefault = {
    comment: '',
    date: '',
    by: '',
  }
  const personDataDefault = {
    first: '',
    last: '',
    guid: '',
    email: '',
  }
  const defaultData = { ...formDataDefault, ...personDataDefault }
  const formData = ref({ ...defaultData })
  const formAction = ref({ ...formActionDefault })
  const refVForm = ref()
  const isUpdate = ref(false)
  const fullname = ref('')

  // Monitor itemData if it has data
  watch(
    () => props.commentData,
    () => {
      isUpdate.value = props.commentData ? true : false

      formData.value = props.commentData
        ? { ...defaultData, ...props.commentData }
        : { ...defaultData }

      // Set Fullname of Commenter
      if (isUpdate.value) {
        const person = topicsStore.personsList.find((item) => item.guid === props.commentData?.by)
        fullname.value = (person?.first || '') + ' ' + (person?.last || '')
      }
    },
  )

  // Submit Functionality
  const onSubmit = async () => {
    formAction.value = { ...formActionDefault, formProcess: true }

    // Find Topic Index
    const index = topicsStore.topicsList.findIndex(
      (item: Topic) => item.guid === props.topicData?.guid,
    )
    const comments = topicsStore.topicsList[index].comments

    if (isUpdate.value) {
      // Update Comment
      const commentIndex = comments.findIndex((item: Comment) => item.date === formData.value.date)
      if (commentIndex !== -1) {
        comments[commentIndex] = { ...formData.value }
      }

      formAction.value.formMessage = 'Successfully Updated Comment.'
    } else {
      const { first, last, email, ...commentData } = formData.value
      // Adding Comment
      comments.push({
        ...commentData,
        date: new Date().toISOString(),
        by: getAvatarText(first + ' ' + last).toLowerCase(),
      })

      // Add Person
      const person = {
        first,
        last,
        email,
        guid: getAvatarText(first + ' ' + last).toLowerCase(),
      }
      topicsStore.personsList.push(person)

      formAction.value.formMessage = 'Successfully Added Comment.'
    }

    if (props.listOptions) emit('listUpdated', props.listOptions.page)
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
    formData.value = { ...defaultData }
    emit('update:isDialogVisible', false)
  }

  // expose managed state as return value
  return {
    topicsStore,
    formData,
    formAction,
    refVForm,
    isUpdate,
    fullname,
    onFormSubmit,
    onFormReset,
  }
}
