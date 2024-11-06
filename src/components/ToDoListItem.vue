<script setup>
</script>
<template>
  <div class="d-flex align-items-center column-gap-3 flex-grow-1">
    <input type="checkbox" v-model="todo['done']" @change="todoStore.toogleDone(todo)" />
    <div data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample"
      class="flex-grow-1 " @click="todoStore.selectItem(todo)">
      <s>{{ todo.name }}</s>
    </div>
  </div>
  <div class="d-flex column-gap-3">
    <button type="button" class="btn btn-outline-success border-0">
      <i class="bi bi-star"></i>
    </button>
    <button type="button" class="btn btn-outline-danger border-0" @click="todoStore.deleteTodoItem(todo)">
      <i class="bi bi-trash"></i>
    </button>
  </div>
</template>
<style scoped></style>
