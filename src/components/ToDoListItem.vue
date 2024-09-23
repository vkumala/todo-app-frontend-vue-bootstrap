<script setup>
import DataService from '../services/data-service'

const props = defineProps({
  item: { required: true }
})

const emit = defineEmits(['update', 'open'])

function checkItem() {
  DataService.replaceItem(props.item)
  emit('update')
}

function starItem() {
  props.item['starred'] = !props.item['starred']
  DataService.replaceItem(props.item)
  emit('update')
}

function deleteItem(id) {
  DataService.deleteItem(props.item['_id'])
  emit('update')
}

function openDetails() {
  emit('open', props.item['_id'])
}
</script>
<template>
  <div class="d-flex align-items-center column-gap-3">
    <input type="checkbox" v-model="item['checked']" @change="checkItem()" />
    <s v-if="item['checked']"> {{ item.subject }} </s>
    <div v-else>{{ item.subject }}</div>
  </div>
  <div class="d-flex column-gap-3">
    <button v-if="!item.starred" @click="starItem()" type="button" class="btn btn-star">
      <i class="bi bi-star"></i>
    </button>
    <button v-else @click="starItem()" type="button" class="btn btn-star-fill">
      <i class="bi bi-star-fill"></i>
    </button>
    <button @click="deleteItem()" type="button" class="btn btn-outline-danger border-0">
      <i class="bi bi-trash"></i>
    </button>
    <button @click="openDetails()" type="button" class="btn btn-outline-primary border-0">
      <i class="bi bi-eye"></i>
    </button>
  </div>
</template>
