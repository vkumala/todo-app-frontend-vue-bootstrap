import http from '../http-common'

class DataService {
  getAllLists() {
    return http.get('/list/all')
  }

  getListById(listId) {
    return http.get(`/list/detail/${listId}`)
  }

  addList(newList) {
    return http.post(`/list/add`, newList)
  }

  deleteList(listId) {
    return http.delete(`/list/delete/${listId}`)
  }

  replaceList(newList) {
    return http.post(`/list/replace/`, newList)
  }

  getExistedGroups() {
    return http.get(`/list/existed_groups/`)
  }

  getUncheckedItems(listId) {
    return http.get(`/item/unchecked/${listId}`)
  }

  getCheckedItems(listId) {
    return http.get(`/item/checked/${listId}`)
  }

  getItemDetail(itemId) {
    return http.get(`/item/detail/${itemId}`)
  }

  addItemToList(listId, newSubject) {
    let newItem = {
      subject: '',
      elements: [],
      today: false,
      reminder: '',
      deadline: '',
      repeat: '',
      checked: false,
      starred: false,
      note: '',
      files: []
    }
    newItem['subject'] = newSubject
    return http.post(`/item/add/${listId}`, newItem)
  }

  replaceItem(item) {
    return http.post(`/item/replace/`, item)
  }

  deleteItem(itemId) {
    return http.delete(`/item/delete/${itemId}`)
  }

  uploadFile(itemId, file) {
    let formData = new FormData()
    formData.append('file', file)
    return http.post(`/item/upload_file/${itemId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  getFiles(itemId) {
    return http.get(`/item/files/${itemId}`)
  }

  deleteFile(itemId, file) {
    console.log('file', file)
    return http.post(`/item/delete_file/${itemId}`, { filename: file })
  }
}

export default new DataService()
