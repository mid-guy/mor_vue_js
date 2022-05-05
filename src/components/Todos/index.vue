<script>
  import moment from 'moment';
  import { ACTION, STATUS, LEVEL_DISPLAY, ICON_MENU, DOT_STATUS, STATUS_UPLOAD } from '../../utils/constants';
  import Text from '../../common/Text/index.vue';
  import Button from '../../common/Button/index.vue';
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
      todos: Array
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
        return moment(time).format('DD/MM/YYYY')
      }
    },
  }
</script>

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

<style lang="scss" scoped>
  @import '../../assets/variables.scss';
  .table-overflow {
    width: 100%;
    padding: 0 0 10px 0;
    box-sizing: border-box;
    overflow: auto;
    border-radius: 5px;
    -webkit-box-shadow: 0px 10px 10px 0px rgba(0,0,0,0.2);
    box-shadow: 0px 10px 10px 0px rgba(0,0,0,0.2);
    .table {
      display: flex;
      flex-direction: column;
      width: 100%;
      max-height: 450px;
    }
    .row {
      border-bottom: 1px solid $--color-border-default;
    }
    .todo_completed {
      opacity: 0.5;
    }
    .table_header_sticky {
      position: sticky;
      top: 0;
      background-color: black;
      width: 1200px;
      color: #FFF;
      .row  > .text {
        padding: 16px;
        font-weight: 600;
        box-sizing: border-box;
      }
    }
    .table_content {
      .row  > .text {
        padding: 16px;
        font-weight: 600;
        box-sizing: border-box;
      }
    }
    .stt {
      width: 60px;
      box-sizing: border-box;
      text-align: center;
    }
    .title {
      width: 250px;
    }
    .status {
      width: 150px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .level {
      width: 100px;
    }
    .date {
      width: 150px;
    }
    .description {
      flex: 1
    }
    .dot-status {
      width: 6px;
      height: 6px;
      border-radius: 3px;
    }
    .action {
      padding: 0 25px; 
    }
    .dot-status--proccesing {
      background-color: $--color-dot-status-processing;
    }
    .dot-status--completed {
      background-color: $--color-dot-status-completed;
    }
    .dot-status--pending {
      background-color: $--color-dot-status-pending;
    }
    .table_content {
      width: 1200px;
      .row  > .text {
        padding: 16px;
      }
    }
    .row {
      display: flex;
      align-items: center;
      box-sizing: border-box;
    }
  }
</style>