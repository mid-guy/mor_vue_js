<script>
  export default {
    props: {
      stt: String,
      todo: {
        _id: String,
        title: String,
        status: String,
        level: String,
        createdAt: String,
        description: String
      }
    },
    methods: {
      onClick(id) {
        this.$emit('output', id)
      }
    }
  }
</script>

<template>
  <div :key="todo._id" class="row">
    <p class="td td-id">
      {{ stt + 1 }}
    </p >
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
  </div>
</template>

<style scoped>
  .td {
    padding: 5px 10px;
    box-sizing: border-box;
  }
  .td-id {
    width: 50px;
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
</style>