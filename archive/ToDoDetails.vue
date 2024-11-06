<script setup>
import DataService from '../src/services/data-service'
import { ref, onMounted, computed } from 'vue'
import { Modal } from 'bootstrap'
import moment from 'moment'
const showMenu = ref(false)
const newElement = ref('')
const item = ref({})
const newFile = ref()
const files = ref([])
const emit = defineEmits(['update'])
let reminderModal
let deadlineModal

defineExpose({
  openDetail
})

onMounted(() => {
  reminderModal = new Modal(document.getElementById('reminderModal'))
  deadlineModal = new Modal(document.getElementById('deadlineModal'))
})

function openDetail(param) {
  showMenu.value = true
  DataService.getItemDetail(param).then((response) => {
    item.value = response.data
    loadFiles()
  })
}

function loadFiles() {
  DataService.getFiles(item.value._id).then((response) => {
    files.value = response.data
  })
}

function showOrHideMenu() {
  showMenu.value ? (showMenu.value = false) : (showMenu.value = true)
}

function checkItem() {
  DataService.replaceItem(item.value)
  emit('update')
}

function starItem() {
  item.value['starred'] = !item.value['starred']
  DataService.replaceItem(item.value)
  emit('update')
}

function addElement() {
  if (newElement.value !== '') {
    item.value['elements'].push({ subject: newElement.value, checked: false })
    newElement.value = ''
    DataService.replaceItem(item.value)
  }
}

function deleteElement(index) {
  item.value['elements'].splice(index, 1)
  DataService.replaceItem(item.value)
}

function setReminder(reminder) {
  switch (reminder) {
    case 'today':
      item.value['reminder'] = moment()
      DataService.replaceItem(item.value)
      break
    case 'tomorrow':
      item.value['reminder'] = moment().add(1, 'days')
      DataService.replaceItem(item.value)
      break
    case 'nextWeek':
      item.value['reminder'] = moment().add(7, 'days')
      DataService.replaceItem(item.value)
      break
    default:
      reminderModal.show()
  }
}

function setDeadline(deadline) {
  switch (deadline) {
    case 'today':
      item.value['deadline'] = moment().format('YYYY-MM-DD')
      DataService.replaceItem(item.value)
      break
    case 'tomorrow':
      item.value['deadline'] = moment().add(1, 'days').format('YYYY-MM-DD')
      DataService.replaceItem(item.value)
      break
    case 'nextWeek':
      item.value['deadline'] = moment().add(7, 'days').format('YYYY-MM-DD')
      DataService.replaceItem(item.value)
      break
    default:
      deadlineModal.show()
  }
}
function setRepeat(repeat) {
  item.value['repeat'] = repeat
  DataService.replaceItem(item.value)
}

async function deleteFile(file) {
  await DataService.deleteFile(item.value._id, file)
  loadFiles()
}

function previewFiles(event) {
  //TODO: make upload multiple files
  //TODO: drop files
  if (event.target.files.length > 0) {
    newFile.value = event.target.files[0]
  }
}

async function uploadFile() {
  await DataService.uploadFile(item.value._id, newFile.value)
  loadFiles()
  newFile.value = undefined
}

const correctTimestampCreated = computed({
  get() {
    return moment(item.value.timestamp_created).format('DD.MM.YYYY HH:mm:ss')
  }
})

const correctTimestampModified = computed({
  get() {
    return moment(item.value.timestamp_modified).format('DD.MM.YYYY HH:mm:ss')
  }
})

const reminderLabel = computed({
  get() {
    if (item.value['reminder'] == '') {
      return 'Errinerung'
    } else {
      return moment(item.value.reminder).format('DD.MM.YYYY HH:mm')
    }
  }
})

const deadlineLabel = computed({
  get() {
    if (item.value['deadline'] == '') {
      return 'Fälligkeitsdatum'
    } else {
      return moment(item.value.deadline).format('DD.MM.YYYY')
    }
  }
})
const REPEAT_KEY = {
  daily: 'täglich',
  weekly: 'wöchentlich',
  monthly: 'monatlich',
  yearly: 'jährlich'
}
const repeatLabel = computed({
  get() {
    if (item.value['repeat'] == '') {
      return 'Wiederholung'
    } else {
      return REPEAT_KEY[item.value['repeat']]
    }
  }
})
</script>

<template>
  <div class="offcanvas offcanvas-end" :class="showMenu ? 'show' : ''" tabindex="-1">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title">Details</h5>
      <button type="button" class="btn-close" @click="showOrHideMenu"></button>
    </div>
    <div class="offcanvas-body">
      <!-- SUBJECT, CHECK, STAR -->
      <div class="mb-3 d-flex align-item-center">
        <input class="me-2" type="checkbox" v-model="item['checked']" @change="checkItem()" />
        <input
          class="shadow-none form-control"
          type="text"
          v-model="item['subject']"
          @change="checkItem()"
        />
        <button v-if="!item.starred" @click="starItem()" type="button" class="btn btn-star">
          <i class="bi bi-star"></i>
        </button>
        <button v-if="item.starred" @click="starItem()" type="button" class="btn btn-star-fill">
          <i class="bi bi-star-fill"></i>
        </button>
      </div>

      <!-- ELEMENTS -->
      <h6>Schritte:</h6>
      <ul class="list-group mb-3">
        <li
          class="list-group-item d-flex align-items-center"
          v-for="(elem, index) in item.elements"
          :key="index"
        >
          <input class="me-3" type="checkbox" v-model="elem['checked']" @change="checkItem()" />
          {{ elem.subject }}
          <button type="button" class="btn btn-outline-danger border-0 ms-auto">
            <i class="bi bi-trash" @click="deleteElement(index)"></i>
          </button>
        </li>
        <li class="list-group-item d-flex align-items-center">
          <i class="bi bi-plus-lg me-2"></i>
          <input
            class="border-0 shadow-none form-control"
            type="text"
            v-model="newElement"
            @keyup.enter="addElement"
            placeholder="hier neue Todo eintippen und Enter drucken"
          />
        </li>
      </ul>

      <!-- TODAY -->
      <input class="mb-3" type="checkbox" v-model="item['today']" @change="checkItem()" /> Zu meinem
      Tag hinzufügen

      <!-- REMINDER, DEADLINE, REPEAT -->
      <div class="list-group">
        <li
          class="list-group-item list-group-item-action d-flex"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          aria-current="true"
        >
          <i class="bi bi-bell me-2"></i>
          {{ reminderLabel }}
        </li>
        <ul class="dropdown-menu">
          <li class="dropdown-item" @click="setReminder('today')">Heute</li>
          <li class="dropdown-item" @click="setReminder('tomorrow')">Morgen</li>
          <li class="dropdown-item" @click="setReminder('nextWeek')">Nächste Woche</li>
          <li>
            <hr class="dropdown-divider" />
          </li>
          <li class="dropdown-item" @click="setReminder()">Auswählen</li>
        </ul>
        <li
          class="list-group-item list-group-item-action"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          aria-current="true"
        >
          <i class="bi bi-calendar4-week me-2"></i>
          {{ deadlineLabel }}
        </li>
        <ul class="dropdown-menu">
          <li class="dropdown-item" @click="setDeadline('today')">Heute</li>
          <li class="dropdown-item" @click="setDeadline('tomorrow')">Morgen</li>
          <li class="dropdown-item" @click="setDeadline('nextWeek')">Nächste Woche</li>
          <li>
            <hr class="dropdown-divider" />
          </li>
          <li class="dropdown-item" @click="setDeadline()">Auswählen</li>
        </ul>

        <li
          class="list-group-item list-group-item-action"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          aria-current="true"
        >
          <i class="bi bi-repeat me-2"></i>

          {{ repeatLabel }}
        </li>
        <ul class="dropdown-menu">
          <li class="dropdown-item" @click="setRepeat('daily')">Täglich</li>
          <li class="dropdown-item" @click="setRepeat('weekly')">Wöchenlich</li>
          <li class="dropdown-item" @click="setRepeat('monthly')">Monatlich</li>
          <li class="dropdown-item" @click="setRepeat('yearly')">Jährlich</li>
        </ul>
      </div>

      <!-- FILES -->

      <label class="form-label">Files</label>
      <ul class="list-group">
        <li class="list-group-item" v-for="(file, index) in files" :key="index">
          {{ file }}
          <button type="button" class="btn btn-outline-danger border-0">
            <i class="bi bi-trash" @click="deleteFile(file)"></i>
          </button>
        </li>
      </ul>
      <div class="input-group border-0">
        <input type="file" class="form-control" @change="previewFiles" />
        <button class="btn btn-outline-secondary" type="button" @click="uploadFile">Upload</button>
      </div>

      <!-- NOTE -->
      <div>
        <label class="form-label">Notiz</label>
        <textarea class="form-control" v-model="item.note" @change="checkItem(item)"> </textarea>
      </div>
    </div>

    <div class="offcanvas-footer">
      <div>Erstellt am {{ correctTimestampCreated }}</div>
      <div v-if="item.timestamp_modified">Modified am {{ correctTimestampModified }}</div>
    </div>
  </div>

  <div
    class="modal fade"
    id="reminderModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Errinerung</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-outline">
            <label for="datetimepickerExample" class="form-label">Select Date</label>
            <input type="date" class="form-control" id="datePicker" />
            <label for="datetimepickerExample2" class="form-label">Select Time</label>
            <input type="time" class="form-control" id="timePicker" />
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>

  <div
    class="modal fade"
    id="deadlineModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">FÄLLIGKEITSDATUM</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-outline">
            <label for="datetimepickerExample" class="form-label">Select Date</label>
            <input type="date" class="form-control" id="datePicker" />
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
