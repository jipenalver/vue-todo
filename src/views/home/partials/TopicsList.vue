<script setup lang="ts">
import ConfirmDialog from '@/components/common/ConfirmDialog.vue'
import { useTopicsAction } from '@/composables/home/topicsAction'
import { useTopicsList } from '@/composables/home/topicsList'
import AppAlert from '@/components/common/AppAlert.vue'
import TopicsFormDialog from './TopicsFormDialog.vue'
import CommentsList from './CommentsList.vue'
import { useDisplay } from 'vuetify'

const { xs } = useDisplay()

const { topicsStore, listOptions, listData, onPageClick, onPerPageChange, onLoadList } =
  useTopicsList()

const {
  formAction,
  isFormDialogVisible,
  isConfirmDelete,
  itemData,
  onAdd,
  onUpdate,
  onDelete,
  onConfirmDelete,
} = useTopicsAction(onLoadList)
</script>

<template>
  <AppAlert
    v-model:is-alert-visible="formAction.formAlert"
    :form-message="formAction.formMessage"
    :form-status="formAction.formStatus"
  ></AppAlert>

  <v-card
    :prepend-icon="xs ? undefined : 'mdi-comment-multiple'"
    :title="xs ? undefined : 'Topics List'"
    :subtitle="`${topicsStore.topicsList.length} Topics`"
  >
    <template #append>
      <div class="d-flex justify-center align-center ga-3">
        <v-btn
          prepend-icon="mdi-pencil-plus"
          variant="elevated"
          color="grey-lighten-1"
          @click="onAdd"
        >
          Add Topic
        </v-btn>

        <v-select
          v-model="listOptions.itemsPerPage"
          width="100px"
          variant="outlined"
          label="Per Page"
          density="compact"
          :items="[5, 10, 20, 50]"
          @update:model-value="onPerPageChange"
          hide-details
        ></v-select>
      </div>
    </template>

    <v-card-text>
      <v-list v-for="item in listData" :key="item.guid">
        <v-list-group value="Actions">
          <template #activator="{ props }">
            <v-list-item v-bind="props" :title="item.name" :subtitle="item.guid" lines="three">
              <template #title>
                <div class="text-wrap">{{ item.name }}</div>
              </template>

              <template #append>
                <div class="d-flex flex-wrap ga-1">
                  <v-btn variant="text" density="compact" icon @click="onUpdate(item)">
                    <v-icon icon="mdi-pencil"></v-icon>
                  </v-btn>

                  <v-btn variant="text" density="compact" icon @click="onDelete(item.guid)">
                    <v-icon icon="mdi-trash-can"></v-icon>
                  </v-btn>
                </div>
              </template>
            </v-list-item>
          </template>

          <CommentsList
            :comments="item.comments"
            :item-data="item"
            @list-updated="onLoadList"
          ></CommentsList>
        </v-list-group>

        <v-divider></v-divider>
      </v-list>

      <v-pagination
        :length="listOptions.noOfPages"
        @update:model-value="onPageClick"
      ></v-pagination>
    </v-card-text>
  </v-card>

  <TopicsFormDialog
    v-model:is-dialog-visible="isFormDialogVisible"
    :item-data="itemData"
    @list-updated="onLoadList"
  ></TopicsFormDialog>

  <ConfirmDialog
    v-model:is-dialog-visible="isConfirmDelete"
    title="Confirm Delete"
    text="Are you sure you want to delete topic?"
    @confirm="onConfirmDelete"
  ></ConfirmDialog>
</template>
