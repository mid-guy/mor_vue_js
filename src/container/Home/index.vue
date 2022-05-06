<template> 
  <Header />
  <div v-if="isLoading"><p>Loading...</p></div>
  <div v-else id="home_page_container">
    <div class="home_page_content">
      <div class="home_page_content_description_container mb-16">
        <Text fontSizelarge bolder class="mb-0">Todo List</Text>
        <Text>Label todo in this list and complete them</Text>
      </div>
      <div class="mb-16 d-flex gap-8">
        <Input name="searchTodo" :value="searchTodo" />
        <GroupButton @onClickEvent="handleFilterTodo" :countTodo="countTodo" />
        <Button primary @onClickEvent="handleOpenModal(ACTION.CREATE)">New Todo</Button>
      </div>
      <Todos :todos="todos" class="table_grid" @toggle="handleToggleMenu" />
    </div>
    <Teleport to="#body">
      <Popup v-if="isModal">
        <div class="modal_container">
          <div class="modal_header">
            <Text bolder class="mb-0">{{`${ACTION_DISPLAY[selectedTodo_type]}`}} Todo</Text>
            <img 
              class="icon_close" 
              src="@/assets/image/close.png" 
              alt="icon_close"
              @click="handleToggleModal"
            />
          </div>
          <div class="modal_body">
            <div class="mb-16">
              <Text class="mb-8">Title</Text>
              <Input 
                :disabled="selectedTodo_type === ACTION.DELETE" 
                name="title" 
                :value="title" 
                @onChangeValue="handleChange" 
              />
            </div>
            <div class="mb-16">
              <Text class="mb-8">Status</Text>
              <SelectInput 
                :value="STATUS[status]" 
                :disabled="selectedTodo_type === ACTION.DELETE" 
                name="status"
              >
                <template v-slot:option="{ isOpen, onToggle }">
                  <div v-if="isOpen">
                    <Button menu @onClickEvent="handleChangeStatus(STATUS_UPLOAD.PENDING, onToggle)">
                      <Text class="mb-0" fontSizeSmall>{{`${STATUS.PENDING}`}}</Text>
                    </Button>
                    <Button menu @onClickEvent="handleChangeStatus(STATUS_UPLOAD.PROCESSING, onToggle)">
                      <Text class="mb-0" fontSizeSmall>{{`${STATUS.PROCESSING}`}}</Text>
                    </Button>
                    <Button menu @onClickEvent="handleChangeStatus(STATUS_UPLOAD.COMPLETED, onToggle)">
                      <Text class="mb-0" fontSizeSmall>{{`${STATUS.COMPLETED}`}}</Text>
                    </Button>
                  </div>
                </template>
              </SelectInput>
            </div>
            <div class="mb-16">
              <Text class="mb-8">Description</Text>
              <Input 
                mutiline 
                :disabled="selectedTodo_type === ACTION.DELETE"
                name="description" 
                :value="description"
                @onChangeValue="handleChange" 
              />
            </div>
            <Button 
              primary 
              fullWidth 
              textAlignCenter
              @onClickEvent="handleSubmit"
            >
              Save
            </Button>
          </div>
        </div>
      </Popup>
    </Teleport>
    <Teleport to="#body">
      <Menu v-if="isMenu" :left="postionOfMenu.left" :bottom="postionOfMenu.bottom">
        <Button menu @onClickEvent="handleOpenModal(ACTION.EDIT)">
          <Text class="mb-0" fontSizeSmall>Edit</Text>
        </Button>
        <Button menu @onClickEvent="handleOpenModal(ACTION.DELETE)">
          <Text class="mb-0 color-danger" fontSizeSmall>Delete</Text>
        </Button>
      </Menu>
    </Teleport>
  </div>
</template>
<script>
import Todos from '@/components/Todos/index.vue'
import { createTodoRequest, getAllTodoRequest, editTodoRequest, deleteTodoRequest} from '@/service/Home'
import { LEVEL, ACTION, STATUS, STATUS_UPLOAD, ACTION_DISPLAY, ACTION_FILTER } from "@/helper/constants"
import Header from "@/components/Header/index.vue"
import Text from "@/components/common/Text/index.vue"
import Popup from "@/components/common/Popup/index.vue";
import Menu from "@/components/common/Menu/index.vue";
import Button from "@/components/common/Button/index.vue";
import Input from "@/components/common/Input/index.vue";
import SelectInput from "@/components/common/SelectInput/index.vue";
import GroupButton from '@/components/GroupButton/index.vue';
export default {
  components: {
    Todos,
    Header,
    Text,
    Popup,
    Menu,
    Button,
    Input,
    SelectInput,
    GroupButton
},
  data() {
    return {
      ACTION: ACTION,
      STATUS: STATUS,
      STATUS_UPLOAD: STATUS_UPLOAD,
      ACTION_DISPLAY: ACTION_DISPLAY,
      todos: [],
      cacheTodos: [],
      countTodo: {
        pending: 0,
        completed: 0,
        processing: 0
      },
      typeFilterTodos: ACTION_FILTER.ALL,
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
      description: '',
      searchTodo: '',
      status: ''
    }
  },
  created() {
    this.fetchAllTodo()
  },
  methods: {
    async fetchAllTodo() {
      try {
        this.isLoading = true
        const response = await getAllTodoRequest()
        this.todos = response.data.posts
        this.isLoading = false
        this.cacheTodos = this.todos
        this.handleCountTodo(response.data.posts)
      } catch(err) {
        console.log(err)
      }
    },
    async createTodo() {
      const body = { 
        title: this.title, 
        status: this.status, 
        description: this.description, 
        level: LEVEL.MEDIUM 
      }
      try {
        await createTodoRequest(body)
        this.cleanInput()
        this.handleToggleModal()
        this.fetchAllTodo()
      } catch(err) {
        console.log(err)
      }
    },
    async editTodo() {
      const body = { 
        title: this.title, 
        description: this.description, 
        level: LEVEL.MEDIUM, 
        status: this.status
      }
      try {
        await editTodoRequest(body, this.selectedTodo_id)
        this.cleanInput()
        this.handleToggleModal()
        this.fetchAllTodo()
      } catch(err) {
        console.log(err)
      }
    },
    async deleteTodo() {
      try {
        await deleteTodoRequest(this.selectedTodo_id)
        this.handleToggleModal()
        this.fetchAllTodo()
      } catch(err) {
        console.log(err)
      }
    },
    cleanInput() {
      this.selectedTodo_id = ''
      this.title = ''
      this.description = ''
      this.selectedTodo_type = ''
      this.searchTodo = ''
    },
    handleFilterTodo(type) {
      if ( type !== ACTION_FILTER.ALL ) {
        return this.todos = this.cacheTodos.filter((todo) => todo.status === type)
      }
      return this.todos = this.cacheTodos
    },
    handleCountTodo(todos) {
      this.countTodo = todos.reduce((prevValue, nextValue) => {
        if ( nextValue.status === ACTION_FILTER.PENDING ) {
          return { ...prevValue, pending: prevValue.pending + 1 }
        }
        if ( nextValue.status === ACTION_FILTER.COMPLETED ) {
          return { ...prevValue, completed: prevValue.completed + 1 }
        }
        if ( nextValue.status === ACTION_FILTER.PROCESSING ) {
          return { ...prevValue, processing: prevValue.processing + 1 }
        }
        return prevValue
      },this.countTodo)
    },
    handleCloseAction() {
      this.cleanInput()
      this.handleToggleModal()
    },
    handleOpenModal(type) {
      if ( type === ACTION.EDIT ) {
        this.selectedTodo_type = type
      }
      if (  type === ACTION.DELETE ) {
        this.selectedTodo_type = type
      }
      if ( type === ACTION.CREATE ) {
        this.selectedTodo_type = type
      }
      this.handleToggleModal()
      this.isMenu = false
    },
    handleToggleModal() {
      this.isModal = !this.isModal
    },
    handleChangeStatus(value, method) {
      this.status = value
      method()
    },
    handleToggleMenu(data) {
      if ( this.isMenu ) {
        this.cleanInput()
        return this.isMenu = false
      }
      const { _id, index, position } = data
      this.postionOfMenu = position
      this.selectedTodo_id = _id
      this.title = this.todos[index].title
      this.description = this.todos[index].description
      this.status = this.todos[index].status
      this.isMenu = true
    },
    handleChange(data) {
      this[data.name] = data.value
    },
    handleSubmit() {
      if ( this.selectedTodo_type === ACTION.EDIT ) {
        return this.editTodo()
      }
      if ( this.selectedTodo_type === ACTION.DELETE ) {
        return this.deleteTodo()
      }
      if ( this.selectedTodo_type === ACTION.CREATE ) {
        return this.createTodo()
      }
    }
  },
  computed() {

  }
}
</script>

<style lang="scss" scoped>
  @import "@/style/Home/style.scss";
</style>