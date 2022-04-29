<script>
import baseAPI from "@/config"
import Todos from '@/components/Todos/index.vue'
import MorInput from '@/common/MorInput/index.vue'
import MorButton from '@/common/MorButton/index.vue'
import MorPopup from '@/common/MorPopup/index.vue'
import Cookies from 'js-cookie';
import { COOKIES } from "../../utils/constants"
import { API_HOME_PAGE, LEVEL, ACTION, ROUTES } from "@/utils/constants"
export default {
  components: {
    Todos,
    MorInput,
    MorButton,
    MorPopup
  },
  data() {
    return {
      //
      ACTION: ACTION,
      //
      todos: [],
      isLoading: false,
      isModal: false,
      selectedTodo_id: '',
      selectedTodo_type: '',
      title: '',
      description: ''
    }
  },
  created() {
    this.fetchTodo()
  },
  methods: {
    async fetchTodo() {
      this.isLoading = true
      const response = await baseAPI.get(`${API_HOME_PAGE}`)
      this.todos = response.data.posts
      this.isLoading = false
    },
    async createTodo() {
      const body = { title: this.title, description: this.description, level: LEVEL.MEDIUM }
      await baseAPI.post(`${API_HOME_PAGE}`, body)
      this.handleToggle()
      this.cleanInput()
      this.fetchTodo()
    },
    async editTodo() {
      const body = { title: this.title, description: this.description, level: LEVEL.MEDIUM }
      await baseAPI.put(`${API_HOME_PAGE}/${this.selectedTodo_id}`, body)
      this.handleToggle()
      this.cleanInput()
      this.fetchTodo()
    },
    async deleteTodo() {
      await baseAPI.delete(`${API_HOME_PAGE}/${this.selectedTodo_id}`)
      this.handleToggle()
      this.fetchTodo()
    },
    cleanInput() {
      this.selectedTodo_id = ''
      this.selectedTodo_type = ''
      this.title = ''
      this.description = ''
    },
    handleCloseAction() {
      this.cleanInput()
      this.handleToggle()
    },
    handleToggle(data) {
      if ( data === ACTION.CREATE ) {
        this.selectedTodo_type = ACTION.CREATE
      }
      if ( data?.type && data?.type !== ACTION.CREATE ) {
        const { _id, index, type } = data
        //
        this.selectedTodo_id = _id
        this.selectedTodo_type = type
        if ( type === ACTION.EDIT ) {
          this.title = this.todos[index].title
          this.description = this.todos[index].description
        } 
      }
      //
      this.isModal = !this.isModal
    },
    handleChange(data) {
      this[data.name] = data.value
    },
    handleLogout() {
      Cookies.remove(COOKIES.AUTH_TOKEN)
      this.$router.push(`${ROUTES.SIGN_IN}`)
    },
    handleSubmit() {
      if ( this.selectedTodo_type === ACTION.EDIT ) {
        return this.editTodo()
      }
      if ( this.selectedTodo_type === ACTION.DELETE ) {
        return this.deleteTodo()
      }
      if ( this.selectedTodo_type === ACTION.COMPLETE ) {
        return 
      }
      if ( this.selectedTodo_type === ACTION.CREATE ) {
        return this.createTodo()
      }
    }
  },
}
</script>

<template> 
  <div v-if="isLoading"><p>Loading...</p></div>
  <div v-else id="home_page--container">
    <h1>Todo List</h1>
    <MorPopup v-show="isModal">
      <div class="modal_container">
        <h2 v-if="selectedTodo_type === ACTION.CREATE">Create Todo</h2>
        <h2 v-if="selectedTodo_type === ACTION.EDIT">Edit Todo</h2>
        <h2 v-if="selectedTodo_type === ACTION.DELETE">Delete Todo</h2>
        <h2 v-if="selectedTodo_type === ACTION.COMPLETED">Completed Todo</h2>
        <div class="group_input" v-if="selectedTodo_type === ACTION.EDIT || selectedTodo_type === ACTION.CREATE">
          <MorInput 
            name="title"
            :value="title"
            :place="'Title'"
            @onChange="handleChange" 
          />
          <MorInput 
            name="description"
            :value="description"
            :place="'Description'" 
            @onChange="handleChange" 
          />
        </div>
        <div class="group_button">
          <MorButton outlined content="Save" :onClick="handleSubmit" />
          <MorButton standard content="Cancel" :onClick="handleCloseAction" />
        </div>
      </div>
    </MorPopup> 
    <div class="row">
      <MorButton outlined content="Create new todo" :onClick="() => handleToggle(ACTION.CREATE)" />
      <MorButton standard content="Log out" :onClick="() => handleLogout()" />
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
  h1 {
    margin: 0;
  }
  h2 {
    text-align: center;
    margin-top: 0;
    margin-bottom: 10px;
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
    gap: 20px;
    border-radius: 15px;
  }
  .modal_container > button {
    width: 100%;
  }
  .group_input {
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: inherit;
  }
  .group_button {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
</style>