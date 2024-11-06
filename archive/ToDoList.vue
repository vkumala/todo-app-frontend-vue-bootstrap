<script setup>
import DataService from '../src/services/data-service'
import ToDoListItem from './ToDoListItem.vue'
import ToDoDetails from './ToDoDetails.vue'
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
  listId: { type: String, required: true }
})
const uncheckedItems = ref([])
const checkedItems = ref([])
const detailRef = ref()
const listDetail = ref({})
const newItemSubject = ref('')
const editMode = ref(false)
const showDone = ref(false)

onMounted(() => {
  if (props.listId) {
    loadData()
  }
})

watch(
  () => props.listId,
  (newValue) => {
    if (newValue) {
      loadData()
    }
  }
)

function loadData() {
  DataService.getUncheckedItems(props.listId).then((response) => {
    uncheckedItems.value = response.data
  })
  DataService.getCheckedItems(props.listId).then((response) => {
    checkedItems.value = response.data
  })
  DataService.getListById(props.listId).then((response) => {
    listDetail.value = response.data
  })
}

function addToList() {
  if (newItemSubject.value.length > 0) {
    DataService.addItemToList(props.listId, newItemSubject.value)
    newItemSubject.value = ''
    loadData()
  }
}

function show() {
  showDone.value ? (showDone.value = false) : (showDone.value = true)
}

function openToDoDetail(param) {
  detailRef.value.openDetail(param)
}

function editListTitle(isEditMode) {
  if (isEditMode) {
    editMode.value = true
  } else {
    editMode.value = false
    DataService.replaceList(listDetail.value)
    //TODO: update list navigation
  }
}

function deleteList() {
  //TODO: popup if sure?
  DataService.deleteList(props.listId)
  //TODO: refresh
}
</script>

<template>
  <div class="col py-3">
    <ToDoDetails ref="detailRef" @update="loadData" />
    <div v-if="!editMode">
      <div class="d-flex mb-2">
        <h2 class="me-auto">{{ listDetail.name }}</h2>
        <button @click="editListTitle(true)" type="button" class="btn btn-outline-primary me-1">
          <i class="bi bi-pencil"></i>
        </button>
        <button @click="deleteList()" type="button" class="btn btn-outline-primary">
          <i class="bi bi-trash"></i>
        </button>
      </div>
    </div>
    <div v-else>
      <input
        type="text"
        class="form-control mb-2 input-lg"
        v-model="listDetail.name"
        @keyup.enter="editListTitle(false)"
      />
    </div>

    <input
      type="text"
      class="form-control mb-2"
      v-model="newItemSubject"
      @keyup.enter="addToList"
      placeholder="hier neue Todo eintippen und Enter drucken"
    />
    <ul class="list-group">
      <li
        class="list-group-item d-flex justify-content-between"
        v-for="(item, index) in uncheckedItems"
        :key="index"
      >
        <ToDoListItem :item="item" @update="loadData" @open="openToDoDetail" />
      </li>
    </ul>

    <div class="mt-3 d-flex align-items-center">
      <h5 class="me-2">Erledigt</h5>
      <button type="button" @click="show" class="btn btn-star btn-outline-primary border-0">
        <div v-if="showDone"><i class="bi bi-caret-up"></i></div>
        <div v-else><i class="bi bi-caret-down"></i></div>
      </button>
    </div>
    <div class="collapse" :class="showDone ? 'show' : ''">
      <ul class="list-group">
        <li
          class="list-group-item d-flex justify-content-between"
          v-for="(item, index) in checkedItems"
          :key="index"
        >
          <ToDoListItem :item="item" @update="loadData" @open="openToDoDetail" />
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.input-lg {
  font-size: 1.5rem;
}

.btn-star:hover {
  background-color: rgba(0, 0, 0, 0);
  --bs-btn-color: #000000;
  --bs-btn-border-width: 0;
}

.btn-star:active:focus {
  box-shadow: none;
  background-color: rgba(0, 0, 0, 0);
  --bs-btn-color: #000000;
  --bs-btn-border-width: 0;
}
.btn-star-fill {
  --bs-btn-color: #ffd000;
  --bs-btn-border-width: 0;
  --bs-btn-hover-color: #ffd000;
}

button:hover {
  color: rgb(77, 8, 8);
}
</style>
