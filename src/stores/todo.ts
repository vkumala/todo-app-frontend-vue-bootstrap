import { defineStore } from 'pinia'
import axios from 'axios'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    list: [],
    selectedList: {},
    selectedItem: {},
    todos_undone: [],
    todos_done: []
  }),
  getters: {
    getAllLists() {
      return this.list
    },
    getDoneItems() {
      return this.todos_done
    },
    getUndoneItems() {
      return this.todos_undone
    },
    getSeletctedList() {
      return this.selectedList
    },
    getSeletctedItem() {
      return this.selectedItem
    }
  },
  actions: {
    async fetchAll() {
      try {
        const data = await axios.get('http://localhost:8080/list/all')
        this.list = data.data
        this.selectList(this.list[0])
      } catch (error) {
        alert(error)
        console.log(error)
      }
    },
    async addNewList(name: string) {
      const newList = { name: name, color: '#000000' }
      try {
        await axios.post('http://localhost:8080/list/add', newList)
        const data = await axios.get('http://localhost:8080/list/all')
        this.list = data.data
      } catch (error) {
        alert(error)
        console.log(error)
      }
    },
    async selectList(list) {
      this.selectedList = list
      await this.getItems()
    },
    async selectItem(todo) {
      this.selectedItem = todo
    },
    async getItems() {
      const response1 = await axios.get(
        'http://localhost:8080/item/undone/' + this.selectedList['_id']
      )
      this.todos_undone = response1.data
      const response2 = await axios.get(
        'http://localhost:8080/item/done/' + this.selectedList['_id']
      )
      this.todos_done = response2.data
    },
    async toggleDone(todo) {
      await axios.put('http://localhost:8080/item/update/', todo)
      await this.getItems()
    },

    async addTodoItem(todo: String) {
      const newItem = {
        name: todo,
        done: false,
        flagged: false,
        deadline: null,
        reminder_date: null,
        reminder_time: null,
        note: null
      }
      try {
        await axios.post('http://localhost:8080/item/add/' + this.selectedList['_id'], newItem)
        await this.getItems()
      } catch (error) {
        alert(error)
        console.log(error)
      }
    },

    async deleteTodoItem(todo?) {
      try {
        if (todo) {
          this.selectedItem = todo
        }
        await axios.delete('http://localhost:8080/item/delete/' + this.selectedItem['_id'])
        await this.getItems()
      } catch (error) {
        alert(error)
        console.log(error)
      }
    },
    async updateList() {
      try {
        await axios.put('http://localhost:8080/list/update/', this.selectedList)
      } catch (error) {
        alert(error)
        console.log(error)
      }
    },
    async deleteList() {
      try {
        await axios.delete('http://localhost:8080/list/delete/' + this.selectedList['_id'])
        this.fetchAll()
      } catch (error) {
        alert(error)
        console.log(error)
      }
    },
    async updateItem() {
      try {
        console.log('this.selectedItem', this.selectedItem)
        await axios.put('http://localhost:8080/item/update/', this.selectedItem)
      } catch (error) {
        alert(error)
        console.log(error)
      }
    },
    async toogleFlag(todo) {
      this.selectedItem = todo
      this.selectedItem['flagged'] = !this.selectedItem['flagged']
      await axios.put('http://localhost:8080/item/update/', this.selectedItem)
    }
  }
})
