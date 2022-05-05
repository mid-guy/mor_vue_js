<script>
import baseAPI from "@/config"
import Todos from '@/components/Todos/index.vue'
import MorInput from '@/common/MorInput/index.vue'
import MorButton from '@/common/MorButton/index.vue'
import Cookies from 'js-cookie';
import { COOKIES } from "../../utils/constants"
import { API_HOME_PAGE, LEVEL, ACTION, ROUTES, STATUS, STATUS_UPLOAD, ACTION_DISPLAY } from "@/utils/constants"
import Header from "../../components/Header/index.vue"
import Text from "../../common/Text/index.vue"
import Popup from "../../common/Popup/index.vue";
import Menu from "../../common/Menu/index.vue";
import Button from "../../common/Button/index.vue";
import Input from "../../common/Input/index.vue";
import SelectInput from "../../common/SelectInput/index.vue";
export default {
  components: {
    Todos,
    MorInput,
    MorButton,
    Header,
    Text,
    Popup,
    Menu,
    Button,
    Input,
    SelectInput
},
  data() {
    return {
      ACTION: ACTION,
      STATUS: STATUS,
      STATUS_UPLOAD: STATUS_UPLOAD,
      ACTION_DISPLAY: ACTION_DISPLAY,
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
      description: '',
      status: ''
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
      this.cleanInput()
      this.handleToggleModal()
      this.fetchTodo()
    },
    async editTodo() {
      const body = { 
        title: this.title, 
        description: this.description, 
        level: LEVEL.MEDIUM, 
        status: this.status
      }
      await baseAPI.put(`${API_HOME_PAGE}/${this.selectedTodo_id}`, body)
      this.cleanInput()
      this.handleToggleModal()
      this.fetchTodo()
    },
    async deleteTodo() {
      await baseAPI.delete(`${API_HOME_PAGE}/${this.selectedTodo_id}`)
      this.handleToggleModal()
      this.fetchTodo()
    },
    cleanInput() {
      this.selectedTodo_id = ''
      this.title = ''
      this.description = ''
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
    <div class="home_page_content">
      <div class="home_page_content_description_container mb-16">
        <Text fontSizelarge bolder>Label job</Text>
        <Text></Text>
      </div>
      <div class="mb-16">
        <Button primary>New Todo</Button>
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
              <Input name="title" :value="title" @onChangeValue="handleChange" />
            </div>
            <div class="mb-16">
              <Text class="mb-8">Status</Text>
              <SelectInput :value="STATUS[status]" name="status">
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
              <Input mutiline name="description" :value="description"  @onChangeValue="handleChange" />
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

<style lang="scss" scoped>
  @import '../../assets/variables.scss';
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
      .home_page_content_description_container {
        text-align: center;
        padding: 16px;
        box-sizing: border-box;
        border-radius: 6px;
        border: 1px solid $--color-border-default;
      }
      .home_page_content_action_container {
      }
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
  .modal_container {
    background-color: #FFFFFF;
    width: 300px;
    border-radius: 5px;
    .modal_header {
      padding: 8px 16px;
      border-bottom: 1px solid $--color-border-default;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .icon_close {
        width: 12px;
        height: 12px;
      }
    }
    .modal_body {
      display: flex;
      flex-direction: column;
      padding: 0 16px;
      margin: 8px 0;
    }
  }
  #select_menu {
    padding: 5px 12px;
    border-radius: 5px;
    background: none;
    @include font-apple;
  }
</style>