

<template>
  <div class="table-overflow">
    <div class="table">
      <div class="table_header_sticky">
        <div class="row">
          <Text class="mb-0 stt">
            Stt
          </Text>
          <Text class="mb-0 title">
            Title
          </Text>
          <Text class="mb-0 status">
            Status
          </Text>
          <Text class="mb-0 level">
            Level
          </Text>
          <Text class="mb-0 date">
            Create at
          </Text>
          <Text class="mb-0 description">
            Description
          </Text> 
        </div>
      </div>
      <div class="table_content">
        <div 
          class="row"
          :class="[ { 'todo_completed': todo.status === STATUS_UPLOAD.COMPLETED }]"
          v-for="todo, index in todos"
          :key="todo._id"
        >
          <Text class="mb-0 stt">
            {{ index + 1 }}
          </Text>
          <Text class="mb-0 title">
            {{ todo.title }}
          </Text>
          <Text class="mb-0 status">
            <div 
              class="dot-status" 
              :class="[DOT_STATUS[todo.status]]"
            />
            {{ STATUS[todo.status] }}
          </Text>
          <Text class="mb-0 level">
            {{ LEVEL_DISPLAY[todo.level] }}
          </Text>
          <Text class="mb-0 date">
            {{ convertDate(todo.createdAt)}}
          </Text>
          <Text class="mb-0 description">
            {{ todo.description }}
          </Text>
          <div 
            class="action" :ref="`position_${todo._id}`"
          >
            <Button 
              singleIcon 
              @onClickEvent="onClick({ 
                element: `position_${todo._id}`,  
                _id: todo._id,
                index: index
              })"
            >
              <img src="@/assets/image/menu.png" alt="icon_menu" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { ACTION, STATUS, LEVEL_DISPLAY, ICON_MENU, DOT_STATUS, STATUS_UPLOAD } from '@/helper/constants';
  import Text from '@/components/common/Text/index.vue';
  import Button from '@/components/common/Button/index.vue';
  import { convertDate } from '../../utils/convertDate';
  export default {
    components: {
    Text,
    Button,
    Image,
},
    data() {
      return {
        ACTION: ACTION,
        STATUS: STATUS,
        STATUS_UPLOAD: STATUS_UPLOAD,
        DOT_STATUS: DOT_STATUS,
        LEVEL_DISPLAY: LEVEL_DISPLAY,
        ICON_MENU: ICON_MENU
      }
    },
    props: {
      todos: Array,
    },
    methods: {
      onClick(data) {
        // position of element what is menu place
        const { element, _id, index } = data
        const position = { 
          bottom: this.$refs[element][0].getBoundingClientRect().bottom,
          left: this.$refs[element][0].getBoundingClientRect().left - 10
        }
        this.$emit('toggle', { position, _id, index })
      },
      convertDate(time) {
        return convertDate(time)
      }
    },
  }
</script>
<style lang="scss" scoped>
  @import "@/style/Home/Todos/style.scss";
</style>