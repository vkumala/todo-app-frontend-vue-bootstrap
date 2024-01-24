<script setup>
import DataService from "../services/data-service";
import { ref, reactive, onMounted } from 'vue'

import { Modal } from 'bootstrap'
const toDoLists = ref([]);
const groupDropdown = ref([]);
let myModal;
const newList = reactive({ name: "", group: null, color: "#000000" })
const emits = defineEmits(["click"])

onMounted(() => {
    myModal = new Modal(document.getElementById('modal_add_list'));
    loadData();
})

function openModal() {
    getGroupsDropdown()
    myModal.show()
}

function closeModal() {
    myModal.hide()
}

function addNewList() {
    console.log("newList", newList)
    // TODO: condition to add new list (no duplicate, not empty)
    DataService.addList(newList)
    loadData();
    closeModal();
}

function loadData() {
    console.log("loadData")
    DataService.getAllLists().then(response => {
        toDoLists.value = response.data;
    })
}

function listClick(params) {
    emits('click', params)
}

function getGroupsDropdown() {
    DataService.getExistedGroups().then(response => {
        groupDropdown.value = response.data;
    })
}
</script>


<template>
    <div class="col-xl-2 col-md-4 col-sm-6 d-flex flex-column">
        <div><a href="#">
            <h3 class=" p-2"> <i class="bi bi-house"></i> BabiTodo</h3>
        </a></div>
        <div class="accordion accordion-flush bg-dark">
            <div class="accordion-item " v-for="(group, index) in toDoLists">
                <div v-if="group.name !== null">
                    <h2 class="accordion-header" :id="'flush-heading' + index">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse"
                            :data-bs-target="'#flush-collapse' + index" aria-expanded="true"
                            :aria-controls="'flush-collapse-' + index">
                            <i class="bi bi-collection pe-3"></i> {{ group.name }}
                        </button>
                    </h2>
                    <div :id="'flush-collapse' + index" class="accordion-collapse collapse show"
                        :aria-labelledby="'flush-heading' + index">
                        <div class="accordion-body">
                            <ul class="list-group">
                                <li @click="listClick(list._id)" v-for="list in group.lists"
                                    class="list-group-item list-group-item-action d-flex justify-content-between align-items-center border-0"
                                    :href="list.color">
                                    <div><i class="bi bi-card-checklist pe-3 "> </i> {{ list.name }}</div>
                                    <span class="badge text-bg-secondary">{{ list.numberOfItems }}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <ul class="list-group">
                        <li @click="listClick(list._id)" v-for="list in group.lists"
                            class="list-group-item list-group-item-action d-flex justify-content-between align-items-center border-0"
                            :href="list.color">
                            <div><i class="bi bi-card-checklist pe-3 "> </i> {{ list.name }}</div>
                            <span class="badge text-bg-secondary">{{ list.numberOfItems }}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="py-3" style="max-height: 60px; min-height: 60px">
            <div class="d-grid">
                <button @click="openModal" class="btn btn-primary" type="button"><i class="bi bi-plus-square pe-3"></i> Neue
                    Liste</button>
            </div>
        </div>
    </div>
    <div class="modal fade" id="modal_add_list" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Neue Liste</h5>
                    <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Name</label>
                        <input v-model="newList.name" type="text" class="form-control" id="exampleFormControlInput1"
                            required>
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlInput2" class="form-label">Gruppe (optional)</label>
                        <div class="input-group">

                            <select id="exampleFormControlInput2" class="form-select">
                                <option value=""> </option>
                                <option v-for="(group, index) in groupDropdown" :key="index">{{ group }}</option>
                            </select>
                            <span class="input-group-text" id="basic-addon1">oder</span>
                            <input v-model="newList.group" type="text" class="form-control"
                                placeholder="neue Gruppe hinzufügen" aria-label="Recipient's username"
                                aria-describedby="button-addon2">
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="exampleColorInput" class="form-label">Farbe</label>
                        <input type="color" class="form-control form-control-color" id="exampleColorInput"
                            v-model="newList.color" title="Choose your color">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
                    <button type="button" class="btn btn-primary" @click="addNewList">Save changes</button>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
a {
    text-decoration: none;
}

.accordion-button:not(.collapsed) {
    box-shadow: none;
    background-color: var(--bs-light);
}

.accordion-button:focus {
    box-shadow: none;
    background-color: var(--bs-light);
}
</style>