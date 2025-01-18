<script setup lang="ts">
import { lengthMaxValidator, requiredValidator } from '@/utils/validators'
import { useTopicsForm } from '@/composables/home/topicsForm'
import AppAlert from '@/components/common/AppAlert.vue'
import { useDisplay } from 'vuetify'

const props = defineProps(['isDialogVisible', 'itemData', 'listOptions'])

const emit = defineEmits(['update:isDialogVisible', 'listUpdated'])

const { mdAndDown } = useDisplay()

const { formData, formAction, refVForm, isUpdate, onFormSubmit, onFormReset } = useTopicsForm(
  props,
  emit,
)
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
                :rules="[requiredValidator, lengthMaxValidator(formData.name, 50)]"
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
