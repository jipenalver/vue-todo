<script setup lang="ts">
import { useCommentsAction } from '@/composables/home/commentsAction'
import ConfirmDialog from '@/components/common/ConfirmDialog.vue'
import CommentsFormDialog from './CommentsFormDialog.vue'
import AppAlert from '@/components/common/AppAlert.vue'
import { useDate } from 'vuetify'

const props = defineProps(['comments', 'itemData', 'listOptions'])

const emit = defineEmits(['listUpdated'])

const vueDate = useDate()

const {
  formAction,
  isFormDialogVisible,
  isConfirmDelete,
  commentData,
  onAdd,
  onUpdate,
  onDelete,
  onConfirmDelete,
} = useCommentsAction()

const emitConfirmDelete = () => {
  onConfirmDelete()
  emit('listUpdated', props.listOptions.page)
}

const emitLoadList = () => {
  emit('listUpdated', props.listOptions.page)
}
</script>

<template>
  <AppAlert
    v-model:is-alert-visible="formAction.formAlert"
    :form-message="formAction.formMessage"
    :form-status="formAction.formStatus"
  ></AppAlert>

  <v-list-item
    v-for="(item, i) in props.comments"
    :key="i"
    :subtitle="vueDate.format(item.date, 'fullDateTime')"
    lines="two"
  >
    <template #title>
      <div class="text-wrap">
        {{ item.comment }}
      </div>
    </template>

    <template #prepend>
      <v-avatar color="grey-lighten-1" size="small">
        <span class="text-body-1 font-weight-bold text-uppercase"> {{ item.by }} </span>
      </v-avatar>
    </template>

    <v-list-item-action class="mt-3 d-flex flex-wrap ga-1">
      <v-btn size="small" variant="text" density="compact" icon @click="onUpdate(item)">
        <v-icon icon="mdi-pencil"></v-icon>
      </v-btn>

      <v-btn size="small" variant="text" density="compact" icon @click="onDelete(item.date)">
        <v-icon icon="mdi-trash-can"></v-icon>
      </v-btn>
    </v-list-item-action>
  </v-list-item>

  <v-list-item lines="one">
    <template #append>
      <v-btn prepend-icon="mdi-pencil-plus" variant="text" @click="onAdd"> Add Comment </v-btn>
    </template>
  </v-list-item>

  <CommentsFormDialog
    v-model:is-dialog-visible="isFormDialogVisible"
    :item-data="props.itemData"
    :comment-data="commentData"
    :list-options="props.listOptions"
    @list-updated="emitLoadList"
  ></CommentsFormDialog>

  <ConfirmDialog
    v-model:is-dialog-visible="isConfirmDelete"
    title="Confirm Delete"
    text="Are you sure you want to delete comment?"
    @confirm="emitConfirmDelete"
  ></ConfirmDialog>
</template>
