<script setup lang="ts">
import ConfirmDialog from '@/components/common/ConfirmDialog.vue'
import { useTopicsAction } from '@/composables/home/topicsAction'
import { useTopicsList } from '@/composables/home/topicsList'
import AppAlert from '@/components/common/AppAlert.vue'
import TopicsFormDialog from './TopicsFormDialog.vue'
import { useDisplay } from 'vuetify'

const { xs } = useDisplay()

const { vueDate, topicsStore, listOptions, listData, onPageClick, onPerPageChange, onLoadList } =
  useTopicsList()

const {
  formAction,
  isFormDialogVisible,
  isConfirmDeleteDialog,
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
    prepend-icon="mdi-comment-multiple"
    :title="xs ? undefined : 'Topics List'"
    :subtitle="`${topicsStore.topicsList.length} Topics`"
  >
    <template #append>
      <div class="d-flex justify-center align-center ga-3">
        <v-btn prepend-icon="mdi-pencil-plus" variant="elevated" @click="onAdd"> Add Topic </v-btn>

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

          <v-list-item
            v-for="({ comment, date, by }, i) in item.comments"
            :key="i"
            :subtitle="vueDate.format(date, 'fullDateTime')"
            lines="two"
          >
            <template #title>
              <div class="text-wrap">
                {{ comment }}
              </div>
            </template>

            <template #prepend>
              <v-avatar color="grey-darken-1" size="small">
                <span class="text-body-1 font-weight-bold text-uppercase"> {{ by }} </span>
              </v-avatar>
            </template>

            <v-list-item-action class="mt-3 d-flex flex-wrap ga-1">
              <v-btn size="small" variant="text" density="compact" icon>
                <v-icon icon="mdi-pencil"></v-icon>
              </v-btn>

              <v-btn size="small" variant="text" density="compact" icon>
                <v-icon icon="mdi-trash-can"></v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
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
    :list-options="listOptions"
    @list-updated="onLoadList"
  ></TopicsFormDialog>

  <ConfirmDialog
    v-model:is-dialog-visible="isConfirmDeleteDialog"
    title="Confirm Delete"
    text="Are you sure you want to delete topic?"
    @confirm="onConfirmDelete"
  ></ConfirmDialog>
</template>
