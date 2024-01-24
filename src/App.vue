<script setup>
import ToDoListNav from './components/ToDoListNav.vue'
import ToDoList from './components/ToDoList.vue'
import { ref } from 'vue'

const listId = ref("654a9fcbb14a3cb0a76e9c12")

function openTodoList(param) {
  listId.value = param
}

/* function push() {
  //TODO: push content navbar
  console.log("push!")
  x1.value = 400
  x2.value = 300
} */

</script>

<template>
    <div class="row flex-nowrap">
      <ToDoListNav @click="openTodoList" />
      <ToDoList :listId="listId" /> 
    </div>
  <!-- <ToDoList :id="listId" /> -->

  <!--   <div :style="{ margin: `0  ${x2}px 0 ${x1}px` }">
    <ToDoItems :id="listId" />
  </div> -->

  <!-- <div class="offcanvas offcanvas-end " :class="showMenu ? 'show' : ''" tabindex="-1">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasRightLabel">Offcanvas right</h5>
      <button type="button" class="btn-close" @click="showOffcanvasMenu"></button>
    </div>
    <div class="offcanvas-body">

      <ToDoItemDetail :id="itemId" />
      <button type="button" class="btn btn-primary" @click="openModal" data-toggle="modal" data-target="#exampleModal">
        Launch demo modal
      </button>
      
    </div>
  </div> -->
  <!--   <ToDoItems id="" />
  <ToDoItems id="651d6a0a1f79783139f23102" />
  <ToDoItemDetail id="6521c2e8a75793b7aba50a1c" />
  <h1>dynamic component!</h1>
  <component :is="counter.currentTab" @change="callback" v-bind="counter.listId"></component> -->
  <!-- <RouterView />
  <button type="button" class="btn btn-primary"  @click="addNewList">addNewList</button> -->
  <!-- Button trigger modal -->
</template>

<style>
a {
  text-decoration: none;
}

/* 
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
} */
</style>
