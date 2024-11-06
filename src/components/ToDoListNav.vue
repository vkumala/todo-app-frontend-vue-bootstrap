<script setup>
import { ref, computed } from 'vue'
import { useTodoStore } from '../stores/todo';

const todoStore = useTodoStore()
const todoList = computed(() => todoStore.getAllLists)

const selectedList = computed(() => todoStore.getSeletctedList)
const showNewList = ref(false)
const newList = ref("")

function addNewList() {
  todoStore.addNewList(newList.value)
  newList.value = ""
}

function isListSelected(list) {
  return this.selectedList["_id"] == list["_id"]
}

</script>
<template>
  <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample2">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasScrollingLabel">Select a todo list</h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <div class="list-group list-group-flush">

        <a v-for="(list) in todoList" href="#" class="list-group-item list-group-item-action "
          :class="isListSelected(list) ? 'active' : ''" @click="todoStore.selectList(list)">
          {{ list.name }}
        </a>

        <div v-if="showNewList" class="d-flex">
          <input class="p-2 flex-grow-1" type="text" placeholder="Neue Liste" v-model="newList"
            v-on:keyup.enter="addNewList">
          <button type="button" class="btn btn-secondary p-2" @click="showNewList = false; newList = ''"> <i
              class="bi bi-x-lg"></i></button>
        </div>
        <button type="button" class="btn btn-primary" @click="showNewList = true">
          <i class="bi bi-plus-square pe-3"></i> Neue Liste
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
