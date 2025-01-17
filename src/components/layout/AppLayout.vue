<script setup lang="ts">
import { ref } from 'vue'

const theme = ref('light')

function onToggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}
</script>

<template>
  <v-responsive>
    <v-app :theme="theme">
      <v-app-bar class="px-3">
        <v-app-bar-title> <h3>Vue Todo</h3> </v-app-bar-title>

        <v-btn
          :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          text="Toggle Theme"
          @click="onToggleTheme"
        ></v-btn>
      </v-app-bar>

      <v-main>
        <slot name="content"></slot>
      </v-main>
    </v-app>
  </v-responsive>
</template>
