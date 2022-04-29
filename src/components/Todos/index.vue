<script>
  import MorButton from '@/common/MorButton/index.vue'
  import { ACTION } from '../../utils/constants'
  export default {
    components: {
      MorButton
    },
    data() {
      return {
        ACTION: ACTION
      }
    },
    props: {
      todos: Array,
    },
    methods: {
      onClick(_id, index, type) {
        this.$emit('toggle', { _id: _id, index: index, type: type })
      },
    },
    computed: {
      convertTime(time) {
        return time
      }
    }
  }
</script>

<template>
  <div class="table-overflow">
    <div class="table">
      <div class="table_header--fixed">
        <div class="row">
          <p class="td td-id">
            STT
          </p>
          <p class="td td-title">
            Title
          </p>
          <p class="td td-status">
            Status
          </p>
          <p class="td td-level">
            Level
          </p>
          <p class="td td-createdAt">
            Create at
          </p>
          <p class="td td-description">
            Description
          </p>
        </div>
      </div>
      <div class="table_content">
        <div class="row row--transition"
          v-for="todo, index in todos"
          :key="todo._id"
        >
          <p class="td td-id">
            {{ index + 1 }}
          </p>
          <p class="td td-title">
            {{ todo.title }}
          </p>
          <p class="td td-status">
            {{ todo.status }}
          </p>
          <p class="td td-level">
            {{ todo.level }}
          </p>
          <p class="td td-createdAt">
            {{ todo.createdAt }}
          </p>
          <p class="td td-description">
            {{ todo.description }}
          </p>
          <div class="td td-action">
            <MorButton outlined content="Edit" @onClickEvent="onClick(todo._id, index, ACTION.EDIT)" />
            <MorButton outlined content="Completed" @onClickEvent="onClick(todo._id, index, ACTION.COMPLETED)" />
            <MorButton danger content="Delete" @onClickEvent="onClick(todo._id, index, ACTION.DELETE)" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .table-overflow {
    width: 100%;
    padding: 0 0 10px 0;
    box-sizing: border-box;
    overflow: auto;
    border-radius: 15px;
    -webkit-box-shadow: 0px 10px 10px 0px rgba(0,0,0,0.2);
    box-shadow: 0px 10px 10px 0px rgba(0,0,0,0.2);
  }

  .table {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-height: 450px;
  }

  .table_header--fixed {
    position: sticky;
    top: 0;
    background-color: black;
    min-width: 1200px;
    color: #FFF;
  }

  .table_content {
    min-width: 1200px;
  }

  .row {
    display: flex;
    align-items: center;
    gap: 10px;
    box-sizing: border-box;
  }

  .row--transition {
    transition: 0.15s ease-in-out;
  }

  .row--transition:hover {
    color: #FFF;
    background-color: rgb(46, 46, 46);
  }

  .td {
    padding: 5px 10px;
    box-sizing: border-box;
    white-space: nowrap;
  }
  .td-id {
    width: 60px;
    text-align: center;
  }
  .td-title {
    width: 250px;
  }
  .td-status {
    width: 120px;
    text-align: center;
  }
  .td-level {
    width: 100px;
    text-align: center;
  }
  .td-createdAt {
    width: 190px;
  }
  .td-description {
    flex: 1;
  }

  .td-action {
    width: fit-content;
    display: flex;
    gap: 10px;
  }
</style>