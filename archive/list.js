import { defineStore } from 'pinia'

export const useListSt = defineStore('todo', {
  state: () => {
    return { todos: [] }
  },
  getters: {
    list() {
      return this.todos
    }

  },
  actions: {
    fetchAll() {
      this.todos = item
    }
  }
})
