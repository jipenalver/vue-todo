<script setup lang="ts">
import AppLayout from '@/components/layout/AppLayout.vue'
import TopicsList from './partials/TopicsList.vue'
</script>

<template>
  <AppLayout>
    <template #content>
      <v-container fluid>
        <v-row class="d-flex justify-center" dense>
          <v-col cols="12" md="6">
            <h1 class="text-center mt-5">Vue Todo App</h1>

            <v-divider thickness="2" class="my-5"></v-divider>

            <TopicsList></TopicsList>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </AppLayout>
</template>
