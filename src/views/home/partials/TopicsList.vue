<script setup lang="ts">
const items = [
  {
    title: 'Brunch this weekend?',
    subtitle: `<span class="text-primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
  },
  {
    title: 'Summer BBQ',
    subtitle: `<span class="text-primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
  },
  {
    title: 'Oui oui',
    subtitle:
      '<span class="text-primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
  },
  {
    title: 'Birthday gift',
    subtitle:
      '<span class="text-primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
  },
  {
    title: 'Recipe to try',
    subtitle:
      '<span class="text-primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
  },
]

const cruds = [
  ['Create', 'mdi-plus-outline'],
  ['Read', 'mdi-file-outline'],
  ['Update', 'mdi-update'],
  ['Delete', 'mdi-delete'],
]
</script>

<template>
  <v-list v-for="item in items" :key="item.title">
    <v-list-group value="Actions">
      <template #activator="{ props }">
        <v-list-item v-bind="props" :title="item.title" lines="three">
          <template #subtitle> <div v-html="item.subtitle"></div> </template>

          <v-list-item-action class="mt-3">
            <v-btn variant="text" density="compact" icon>
              <v-icon icon="mdi-pencil"></v-icon>
            </v-btn>

            <v-btn variant="text" density="compact" icon>
              <v-icon icon="mdi-trash-can"></v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </template>

      <v-list-item
        v-for="([title, icon], i) in cruds"
        :key="i"
        :prepend-icon="icon"
        :title="title"
        :value="title"
      ></v-list-item>
    </v-list-group>
  </v-list>
</template>
