<script setup lang="ts">
import { emailValidator, requiredValidator } from '@/utils/validators'
import { useCommentsForm } from '@/composables/home/commentsForm'
import AppAlert from '@/components/common/AppAlert.vue'
import { useDisplay } from 'vuetify'

const props = defineProps(['isDialogVisible', 'topicData', 'commentData', 'listOptions'])

const emit = defineEmits(['update:isDialogVisible', 'listUpdated'])

const { mdAndDown } = useDisplay()

const { formData, formAction, refVForm, isUpdate, fullname, onFormSubmit, onFormReset } =
  useCommentsForm(props, emit)
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
    <v-card prepend-icon="mdi-comment" title="Comment" :subtitle="isUpdate ? fullname : undefined">
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

            <template v-if="!isUpdate">
              <v-col cols="12">
                <v-text-field
                  v-model="formData.first"
                  label="Firstname"
                  :rules="[requiredValidator]"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model="formData.last"
                  label="Lastname"
                  :rules="[requiredValidator]"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  prepend-inner-icon="mdi-email"
                  v-model="formData.email"
                  label="Email"
                  :rules="[requiredValidator, emailValidator]"
                ></v-text-field>
              </v-col>
            </template>
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
            {{ isUpdate ? 'Update Comment' : 'Add Comment' }}
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>
