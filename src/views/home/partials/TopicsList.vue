<script setup lang="ts">
import { useTopicsList } from '@/composables/home/topicsList'

const { vueDate, listOptions, listData, onPageClick, onPerPageChange } = useTopicsList()
</script>

<template>
  <v-card>
    <template #append>
      <v-select
        v-model="listOptions.itemsPerPage"
        width="100px"
        variant="outlined"
        label="Select"
        :items="[5, 10, 20, 50]"
        @update:model-value="onPerPageChange"
      ></v-select>
    </template>

    <v-card-text>
      <v-list v-for="{ name, guid, comments } in listData" :key="guid">
        <v-list-group value="Actions">
          <template #activator="{ props }">
            <v-list-item v-bind="props" :title="name" :subtitle="guid" lines="three">
              <template #title>
                <div class="text-wrap">{{ name }}</div>
              </template>

              <template #append>
                <v-btn variant="text" density="compact" icon>
                  <v-icon icon="mdi-pencil"></v-icon>
                </v-btn>

                <v-btn variant="text" density="compact" icon>
                  <v-icon icon="mdi-trash-can"></v-icon>
                </v-btn>
              </template>
            </v-list-item>
          </template>

          <v-list-item
            v-for="({ comment, date, by }, i) in comments"
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

            <template #append>
              <v-btn variant="text" density="compact" icon>
                <v-icon icon="mdi-pencil"></v-icon>
              </v-btn>

              <v-btn variant="text" density="compact" icon>
                <v-icon icon="mdi-trash-can"></v-icon>
              </v-btn>
            </template>
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
</template>
