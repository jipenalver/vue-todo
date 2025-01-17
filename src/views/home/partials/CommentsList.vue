<script setup lang="ts">
import { useDate } from 'vuetify'

const props = defineProps(['comments', 'itemData'])

const vueDate = useDate()
</script>

<template>
  <v-list-item
    v-for="({ comment, date, by }, i) in props.comments"
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

  <v-list-item lines="one">
    <template #append>
      <v-btn prepend-icon="mdi-pencil-plus" variant="text"> Add Comment </v-btn>
    </template>
  </v-list-item>
</template>
