<script>
import baseAPI from "@/config"
import Todos from '@/components/Todos/index.vue'
import MorInput from '@/common/MorInput/index.vue'
import MorButton from '@/common/MorButton/index.vue'
import MorPopup from '@/common/MorPopup/index.vue'
export default {
  components: {
    Todos,
    MorInput,
    MorButton,
    MorPopup
  },
  data() {
    return {
      todos: [],
      isLoading: false,
      isModal: false,
      title: {
        edit: '',
        search: '',
        create: ''
      },
      description: {
        edit: '',
        create: ''
      }
    }
  },
  created() {
    this.fetchTodo()
  },
  methods: {
    async fetchTodo() {
      this.isLoading = true
      const response = await baseAPI.get('/api/posts')
      console.log(response.data.posts)
      this.todos = response.data.posts
      this.isLoading = false
    },
    async createTodo() {
      const body = { title: this.title, description: this.description, level: 'MEDIUM' }
      await baseAPI.post('/api/posts', body)
      this.cleanInput()
      this.fetchTodo()
    },
    async editTodo(_id) {
      const body = { title: this.title.edit, description: this.description.edit, level: 'MEDIUM' }
      await baseAPI.put(`/api/post/${id}`, body)
      this.cleanInput()
      this.fetchTodo()
    },
    cleanInput() {
      // this.title = '',
      // this.description = ''
    },
    handleModal() {
      this.isModal = !this.isModal
    },
    handleChange(data) {
      this[data.name] = data.value
    },
    handleSubmit(_id, type = 'create') {
      console.log({_id, type })
      // if ( type === 'edit' ) {
      //   return this.editTodo()
      // }
      // return this.createTodo()
    }
  },
}
</script>

<template> 
  <div v-show="isLoading"><p>Loading...</p></div>
  <div v-show="!isLoading" id="home_page--container">
    <MorPopup v-show="isModal">
      <div class="modal_container">
        <MorInput name="title.edit" :place="'Title'" @onChange="handleChange" />
        <MorInput name="description.edit" :place="'Description'" @onChange="handleChange" />
        <MorButton content="Save" :onClick="handleSubmit" />
      </div>
    </MorPopup> 
    <div class="row">
      <MorInput name="searchTodo" :place="'Search'" @onChange="handleChange" />
      <!-- <MorButton content="Search" :onClick="handleModal" /> -->
      <!-- <MorButton content="Edit" :onClick="handleModal" /> -->
    </div>
    <Todos :todos="todos" class="table_grid" :onClick="handleModal" />
  </div>
</template>

<style scoped>
  #home_page--container {
    width: auto;
    position: relative;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 25px;
    margin: 0 120px;
    background-color: #FFF;
  }
  .row {
    display: flex;
    width: 100%;
    gap: 10px;
    background-color: inherit;
  }
  .row > div:first-child {
    flex-grow: 8;
  }
  .modal_container {
    background-color: #FFF;
    width: 300px;
    padding: 30px 20px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    border-radius: 15px;
  }
  .modal_container > button {
    width: 100%;
  }
</style>