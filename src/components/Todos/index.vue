<script>
  import MorButton from '@/common/MorButton/index.vue';
  import moment from 'moment';
  import { ACTION, STATUS, LEVEL_DISPLAY, ICON_MENU } from '../../utils/constants';
  import Text from '../../common/Text/index.vue';
  import Button from '../../common/Button/index.vue';
// import Image from '../../common/Image/index.vue';
  export default {
    components: {
    MorButton,
    Text,
    Button,
    Image
},
    data() {
      return {
        ACTION: ACTION,
        STATUS: STATUS,
        LEVEL_DISPLAY: LEVEL_DISPLAY,
        ICON_MENU: ICON_MENU
      }
    },
    props: {
      todos: Array,
    },
    methods: {
      onClick(_id, index, type) {
        this.$emit('toggle', { _id, index, type })
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
        <div class="row row--transition"
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
            <div class="dot-status dot-status--completed" />
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
          <div class="action">
            <Button singleIcon>
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
    .dot-status--completed {
      background-color: red;
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