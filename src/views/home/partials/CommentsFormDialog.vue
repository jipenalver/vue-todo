<script setup lang="ts">
import { formActionDefault } from '@/utils/helpers/constants'
import AppAlert from '@/components/common/AppAlert.vue'
import { requiredValidator } from '@/utils/validators'
import { useTopicsStore } from '@/stores/topics'
import type { Comment, Topic } from '@/types/topics'
import { useDisplay } from 'vuetify'
import { ref, watch } from 'vue'

const props = defineProps(['isDialogVisible', 'itemData', 'commentData'])

const emit = defineEmits(['update:isDialogVisible', 'listUpdated'])

const { mdAndDown } = useDisplay()

const topicsStore = useTopicsStore()

// Load Variables
const formDataDefault = {
  comment: '',
  date: '',
  by: 'me',
}
const formData = ref({ ...formDataDefault })
const formAction = ref({ ...formActionDefault })
const refVForm = ref()
const isUpdate = ref(false)

// Monitor itemData if it has data
watch(
  () => props.commentData,
  () => {
    isUpdate.value = props.commentData ? true : false
    formData.value = props.commentData ? { ...props.commentData } : { ...formDataDefault }
  },
)

// Submit Functionality
const onSubmit = async () => {
  formAction.value = { ...formActionDefault, formProcess: true }

  // Find Topic Index
  const index = topicsStore.topicsList.findIndex((item: Topic) => item.guid === props.itemData.guid)
  const comments = topicsStore.topicsList[index].comments

  if (isUpdate.value) {
    // Update Comment
    const commentIndex = comments.findIndex((item: Comment) => item.date === formData.value.date)
    if (commentIndex !== -1) {
      comments[commentIndex] = { ...formData.value }
    }
  } else {
    // Adding Comment
    comments.push({ ...formData.value, date: new Date().toISOString() })
  }

  emit('listUpdated')

  formAction.value.formMessage = 'Successfully Added Comment.'
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
</script>

<template>
  <AppAlert
    v-model:is-alert-visible="formAction.formAlert"
    :form-message="formAction.formMessage"
    :form-status="formAction.formStatus"
  ></AppAlert>

  <v-dialog
    :max-width="mdAndDown ? undefined : '600'"
    :model-value="props.isDialogVisible"
    :fullscreen="mdAndDown"
    persistent
  >
    <v-card prepend-icon="mdi-comment" title="Comment">
      <v-form ref="refVForm" @submit.prevent="onFormSubmit">
        <v-card-text>
          <v-row dense>
            <v-col cols="12">
              <v-textarea
                v-model="formData.comment"
                label="Comment"
                :rules="[requiredValidator]"
                rows="2"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>

          <v-btn text="Close" variant="plain" prepend-icon="mdi-close" @click="onFormReset"></v-btn>

          <v-btn
            prepend-icon="mdi-pencil-plus"
            color="grey-darken-1"
            type="submit"
            variant="elevated"
            :disabled="formAction.formProcess"
            :loading="formAction.formProcess"
          >
            {{ isUpdate ? 'Update Comment' : 'Add Comment' }}
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>
