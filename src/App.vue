<script setup>
import { ref, computed } from 'vue'
import { useTodoStore } from './stores/todo';
import NavBar from './components/NavBar.vue';
import TodoListNav from './components/TodoListNav.vue';
import TodoDetailsSideBar from './components/TodoDetailsSideBar.vue';
import TodoListItem from './components/TodoListItem.vue';


const newItem = ref("")

const toogleListRename = ref(false)

const todoStore = useTodoStore()
todoStore.fetchAll()

const selectedList = computed(() => todoStore.getSeletctedList)
const todoUndone = computed(() => todoStore.getUndoneItems)
const todoDone = computed(() => todoStore.getDoneItems)



function addNewTodoItem() {
  if (newItem.value)
    todoStore.addTodoItem(newItem.value);
  newItem.value = ""
}


</script>

<template>
  <div class="container">
    <NavBar />

    <!-- List title -->
    <div v-if="!toogleListRename" class="d-flex py-2 ">
      <div class="flex-grow-1 fs-3">{{ selectedList.name }}</div>
      <button type="button" class="btn btn-primary" @click="toogleListRename = !toogleListRename">
        <i class="bi bi-pencil"></i></button>
      <button type="button" class="btn btn-danger" @click="todoStore.deleteList()">
        <i class="bi bi-trash"></i></button>
      <!-- TODO: create modal ask for confirmation -->
    </div>
    <div v-if="toogleListRename" class="d-flex py-2 align-items-center">
      <input type="text" class="flex-grow-1 border-1 rounded form-control " v-model="selectedList.name"
        v-on:keyup.enter="toogleListRename = !toogleListRename; todoStore.updateList()">
      <input type="color" class="form-control form-control-color " v-model="selectedList.color"
        @change="todoStore.updateList()">
      <button type="button" class="btn btn-secondary"
        @click="toogleListRename = !toogleListRename; todoStore.updateList()"><i class="bi bi-check"></i></button>
    </div>

    <!-- New todo -->
    <div class="d-flex my-2">
      <input type="text" class="flex-grow-1 border-1 rounded form-control " v-model="newItem"
        placeholder="Enter new todo here" aria-label="Username" v-on:keyup.enter="addNewTodoItem">
      <button type="button" class="btn btn-secondary" @click="addNewTodoItem"> <i class="bi bi-check"></i></button>
    </div>

    <ul class="list-group">
      <li class="list-group-item d-flex justify-content-between" v-for="(todo) in todoUndone">
        <div class="d-flex align-items-center column-gap-3 flex-grow-1">
          <input type="checkbox" v-model="todo['done']" @change="todoStore.toggleDone(todo)" />
          <div data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample"
            class="flex-grow-1 " @click="todoStore.selectItem(todo)">{{ todo.name }}</div>
        </div>
        <div class="d-flex column-gap-3">
          <button @click="todoStore.toogleFlag(todo)" type="button" class="btn btn-outline-primary border-0 ">
            <i v-if="!todo['flagged']" class="bi bi-flag"></i>
            <i v-else class="bi bi-flag-fill"></i>
          </button>
          <button type="button" class="btn btn-outline-danger border-0" @click="todoStore.deleteTodoItem(todo)">
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </li>
    </ul>

    <div>Done:</div>
    <ul class="list-group">
      <li class="list-group-item d-flex justify-content-between" v-for="(todo) in todoDone">
        <div class="d-flex align-items-center column-gap-3 flex-grow-1">
          <input type="checkbox" v-model="todo['done']" @change="todoStore.toggleDone(todo)" />
          <div data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample"
            class="flex-grow-1 " @click="todoStore.selectItem(todo)">{{ todo.name }}</div>
        </div>
        <div class="d-flex column-gap-3">
          <button @click="todoStore.toogleFlag(todo)" type="button" class="btn btn-outline-primary border-0 ">
            <i v-if="!todo['flagged']" class="bi bi-flag"></i>
            <i v-else class="bi bi-flag-fill"></i>
          </button>
          <button type="button" class="btn btn-outline-danger border-0" @click="todoStore.deleteTodoItem(todo)">
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </li>
    </ul>

    <TodoListNav />
    <TodoDetailsSideBar />

  </div>
</template>

<style>
a {
  text-decoration: none;
}
</style>
