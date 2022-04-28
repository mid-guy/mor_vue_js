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
      selectedTodo_id: '',
      selectedTodo_type: '',
      titleEdit: '',
      titleSearch: '',
      titleCreate: '',
      descriptionEdit: '',
      descriptionCreate: '',
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
    async editTodo() {
      const body = { title: this.titleEdit, description: this.descriptionEdit, level: 'MEDIUM' }
      await baseAPI.put(`/api/posts/${this.selectedTodo_id}`, body)
      this.handleToggle()
      this.cleanInput()
      this.fetchTodo()
    },
    async deleteTodo() {
      await baseAPI.delete(`/api/posts/${this.selectedTodo_id}`)
      this.handleToggle()
      this.fetchTodo()
    },
    cleanInput() {
      this.title = '',
      this.description = ''
    },
    handleToggle(data) {
      if ( data ) {
        const { _id, index, type } = data
        //
        this.selectedTodo_id = _id
        this.selectedTodo_type = type
        if ( type === 'edit' ) {
          this.titleEdit = this.todos[index].title
          this.descriptionEdit = this.todos[index].description
        } 
      }
      //
      this.isModal = !this.isModal
    },
    handleChange(data) {
      this[data.name] = data.value
    },
    handleSubmit() {
      if ( this.selectedTodo_type === 'edit' ) {
        return this.editTodo()
      }
      if ( this.selectedTodo_type === 'delete' ) {
        return this.deleteTodo()
      }
      if ( this.selectedTodo_type === 'completed' ) {
        return 
      }
      return this.createTodo()
    }
  },
}
</script>

<template> 
  <div v-if="isLoading"><p>Loading...</p></div>
  <div v-else id="home_page--container">
    <MorPopup v-show="isModal">
      <div class="modal_container">
        <MorInput 
          name="titleEdit"
          :value="titleEdit"
          :place="'Title'"
          @onChange="handleChange" 
        />
        <MorInput 
          name="descriptionEdit"
          :value="descriptionEdit"
          :place="'Description'" 
          @onChange="handleChange" 
        />
        <MorButton content="Save" :onClick="handleSubmit" />
      </div>
    </MorPopup> 
    <div class="row">
      <MorInput name="searchTodo" :place="'Search'" @onChange="handleChange" />
      <!-- <MorButton content="Search" :onClick="handleModal" /> -->
      <!-- <MorButton content="Edit" :onClick="handleModal" /> -->
    </div>
    <Todos :todos="todos" class="table_grid" @toggle="handleToggle" />
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