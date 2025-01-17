import type { Person, Topic } from '@/types/topics'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useTopicsStore = defineStore('topics', () => {
  // State
  const topicsList = ref<Topic[]>([])
  const personsList = ref<Person[]>([])

  // Actions
  async function getTopics() {
    const { data } = await axios.get(
      'https://atillc.blob.core.windows.net/data-collector/icode/test-data/topics.json',
    )

    topicsList.value = data.topics
    personsList.value = data.persons
  }

  return { topicsList, personsList, getTopics }
})
