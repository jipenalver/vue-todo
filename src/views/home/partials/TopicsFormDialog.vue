<script setup lang="ts">
import { formActionDefault } from '@/utils/helpers/constants'
import AppAlert from '@/components/common/AppAlert.vue'
import { requiredValidator } from '@/utils/validators'
import { useDisplay } from 'vuetify'
import { ref, watch } from 'vue'

const props = defineProps(['isDialogVisible', 'itemData', 'listOptions'])

const emit = defineEmits(['update:isDialogVisible'])

// Utilize pre-defined vue functions
const { mdAndDown } = useDisplay()

// Load Variables
const formDataDefault = {
  name: '',
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
  // Reset Form Action utils
  formAction.value = { ...formActionDefault, formProcess: true }

  // // Check if isUpdate is true, then do update, if false do add
  // const { data, error } = isUpdate.value
  //   ? await branchesStore.updateBranch(formData.value)
  //   : await branchesStore.addBranch(formData.value)

  // if (error) {
  //   // Add Error Message and Status Code
  //   formAction.value.formErrorMessage = error.message
  //   formAction.value.formStatus = error.status

  //   // Turn off processing
  //   formAction.value.formProcess = false
  // } else if (data) {
  //   // Add Success Message
  //   formAction.value.formSuccessMessage = isUpdate.value
  //     ? 'Successfully Updated Branch Information.'
  //     : 'Successfully Added Branch.'

  //   await branchesStore.getBranchesTable(props.tableOptions, props.tableFilters)
  //   await branchesStore.getBranches()

  // Form Reset and Close Dialog
  //   setTimeout(() => {
  //     onFormReset()
  //   }, 2500)
  // }
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
            color="grey-darken-1"
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
