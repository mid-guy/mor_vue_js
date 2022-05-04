<script>
import baseAPI from "@/config"
import Todos from '@/components/Todos/index.vue'
import MorInput from '@/common/MorInput/index.vue'
import MorButton from '@/common/MorButton/index.vue'
import Cookies from 'js-cookie';
import { COOKIES } from "../../utils/constants"
import { API_HOME_PAGE, LEVEL, ACTION, ROUTES } from "@/utils/constants"
import Header from "../../components/Header/index.vue"
import Text from "../../common/Text/index.vue"
import Popup from "../../common/Popup/index.vue";
import Menu from "../../common/Menu/index.vue";
import Button from "../../common/Button/index.vue";
export default {
  components: {
    Todos,
    MorInput,
    MorButton,
    Header,
    Text,
    Popup,
    Menu,
    Button
},
  data() {
    return {
      //
      ACTION: ACTION,
      //
      todos: [],
      isLoading: false,
      isModal: false,
      isMenu: false,
      postionOfMenu: {
        bottom: '',
        left: ''
      },
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
    handleToggleMenu(positionOfElement) {
      console.log(positionOfElement)
      this.postionOfMenu = positionOfElement
      this.isMenu = !this.isMenu
    },
    handleCompleteTodo() {
      
    },
    handleViewDetialTodo() {
      
    },
    handleDeleteTodo() {

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
  <Header />
  <div v-if="isLoading"><p>Loading...</p></div>
  <div v-else id="home_page_container">
    <Teleport to="#body">
      <Popup v-if="isModal">
      </Popup>
    </Teleport>
    <Teleport to="#body">
      <Menu v-if="isMenu" :left="postionOfMenu.left" :bottom="postionOfMenu.bottom">
        <Text class="mb-0 fontSizeSmall">View</Text>
        <Text class="mb-0 fontSizeSmall">Completed</Text>
        <Text class="mb-0 color-danger fontSizeSmall">Delete</Text>
      </Menu>
    </Teleport>
    <div class="home_page_content">
      <Text>Todo List</Text>
      <Todos :todos="todos" class="table_grid" @toggle="handleToggleMenu" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  #home_page_container {
    width: 100%;
    height: calc(100vh - 62px - 24px);
    .home_page_content {
      width: 100%;
      max-width: 1216px;
      padding: 32px;
      box-sizing: border-box;
      height: 100%;
      margin-top: 24px;
      margin-left: auto;
      margin-right: auto;
    }
    h1 {
      margin: 0;
    }
    h2 {
      text-align: center;
      margin-top: 0;
      margin-bottom: 10px;
    }
  }
</style>