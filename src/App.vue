<script setup>
import ToDoListNav from './components/ToDoListNav.vue'
import ToDoList from './components/ToDoList.vue'
import { ref } from 'vue'

const listId = ref('654a9fcbb14a3cb0a76e9c12')

function openTodoList(param) {
  listId.value = param
}
</script>

<template>
  <div class="container">
    <nav class="navbar">
      <div class="container-fluid">
        <span class="navbar-brand h1">Meine TODO APP</span>
      </div>
    </nav>
    <div class="row flex-nowrap">
      <ToDoListNav @click="openTodoList" />
      <ToDoList :listId="listId" />
    </div>
  </div>
</template>

<style>
a {
  text-decoration: none;
}
</style>
