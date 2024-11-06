<script setup>


import { ref, computed } from 'vue'
import { Offcanvas } from 'bootstrap';
import { useTodoStore } from '../stores/todo';
const todoStore = useTodoStore()

const selectedItem = computed(() => todoStore.getSeletctedItem)
const toogleItemRename = ref(false)
function closeCanvas() {
  todoStore.deleteTodoItem();
  let myOffcanvas = document.getElementById('offcanvasExample')
  let bsOffcanvas = Offcanvas.getInstance(myOffcanvas);
  bsOffcanvas.hide();
}
</script>
<template>
   <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasExample" data-bs-scroll="true">
      <div class="offcanvas-header py-3">
        <div v-if="!toogleItemRename" class="d-flex w-100">
          <div class="flex-grow-1 fs-3">{{ selectedItem.name }}</div>
          <button type="button" class="btn btn-primary" @click="toogleItemRename = !toogleItemRename">
            <i class="bi bi-pencil"></i></button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="offcanvas" aria-label="Close">
            <i class="bi bi-x-lg"></i></button>
        </div>
        <div v-if="toogleItemRename" class="d-flex w-100 align-items-center">
          <input type="text" class="flex-grow-1 border-1 rounded form-control " v-model="selectedItem.name"
            v-on:keyup.enter="toogleItemRename = !toogleItemRename; todoStore.updateItem()">
          <button type="button" class="btn btn-secondary"
            @click="toogleItemRename = !toogleItemRename; todoStore.updateItem()"><i class="bi bi-check"></i></button>
        </div>

      </div>
      <div class="offcanvas-body">
        <div class="form-group">
          <label for="exampleFormControlTextarea1">Notiz</label>
          <textarea class="form-control" placeholder="Notiz hinzufügen" rows="5" v-model="selectedItem['note']"
            @change="todoStore.updateItem()" v-on:keyup.enter="todoStore.updateItem()"></textarea>
        </div>
        <label for="deadline">Fälligkeitsdatum</label>
        <input class="form-control" type="date" v-model="selectedItem['deadline']" @change="todoStore.updateItem()" />
        <label for="deadline">Errinerung</label>
        <div class="row">
          <div class="col">
            <input class="form-control" v-model="selectedItem['reminder_date']" type="date"
              @change="todoStore.updateItem()" />
          </div>
          <div class="col">
            <input class="form-control" v-model="selectedItem['reminder_time']" type="time"
              @change="todoStore.updateItem()" />
          </div>
        </div>
      </div>
      <button type="button" class="btn btn-danger mt-auto p-2 m-2" @click="closeCanvas"><i class="bi bi-trash"></i>
        Delete</button>
    </div>
</template>
<style scoped></style>
