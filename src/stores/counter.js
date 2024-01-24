import { ref, computed, shallowRef } from 'vue'
import { defineStore } from 'pinia'

import ToDoLists from '../components/ToDoLists.vue'
import ToDoItems from '../components/ToDoItems.vue'
import ToDoItemDetail from '../components/ToDoItemDetail.vue'
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)

  const currentTab = shallowRef(ToDoLists)
  const tabs = [ToDoLists, ToDoItems, ToDoItemDetail]
  const listId = shallowRef({
    id: '651d6a0a1f79783139f23102'
  })
  function changeTab() {
    currentTab.value = ToDoItems
  }

  return { count, doubleCount, changeTab, currentTab, tabs, listId }
})
