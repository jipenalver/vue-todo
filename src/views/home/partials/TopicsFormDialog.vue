<script setup lang="ts">
import { formActionDefault } from '@/utils/helpers/constants'
import AppAlert from '@/components/common/AppAlert.vue'
import { requiredValidator } from '@/utils/validators'
import { getRandomCode } from '@/utils/helpers/others'
import { useTopicsStore } from '@/stores/topics'
import type { Topic } from '@/types/topics'
import { useDisplay } from 'vuetify'
import { ref, watch } from 'vue'

const props = defineProps(['isDialogVisible', 'itemData'])

const emit = defineEmits(['update:isDialogVisible', 'listUpdated'])

const { mdAndDown } = useDisplay()

const topicsStore = useTopicsStore()

// Load Variables
const formDataDefault = {
  name: '',
  guid: '',
  comments: [],
}
const formData = ref({ ...formDataDefault })
const formAction = ref({ ...formActionDefault })
const refVForm = ref()
const isUpdate = ref(false)

// Monitor itemData if it has data
watch(
  () => props.itemData,
  () => {
    isUpdate.value = props.itemData ? true : false
    formData.value = props.itemData ? { ...props.itemData } : { ...formDataDefault }
  },
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
  }
  // Adding Topic
  else {
    const addData = {
      ...formData.value,
      guid: getRandomCode(8).toLowerCase(),
      comments: [],
    }
    topicsStore.topicsList.unshift(addData)
  }

  emit('listUpdated')

  formAction.value.formMessage = 'Successfully Added Topic.'
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
    <v-card prepend-icon="mdi-information" title="Topic">
      <v-form ref="refVForm" @submit.prevent="onFormSubmit">
        <v-card-text>
          <v-row dense>
            <v-col cols="12">
              <v-textarea
                v-model="formData.name"
                label="Topic"
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
            color="grey-lighten-1"
            type="submit"
            variant="elevated"
            :disabled="formAction.formProcess"
            :loading="formAction.formProcess"
          >
            {{ isUpdate ? 'Update Topic' : 'Add Topic' }}
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>
