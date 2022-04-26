<script>
  import TodoComp from './components/TodoComp/index.vue'
  let id = 0
  export default {
    components: {
      TodoComp
    },
    data() {
      return {
        todoContent: '',
        todos: [
          { id: id++, content: `Content ${id}` },
          { id: id++, content: `Content ${id}` },
          { id: id++, content: `Content ${id}` },
        ]
      }
    },
    methods: {
      output(id) {
        console.log(id)
      }
    }
  }
</script>
<template>
  <input v-model="todoContent" placeholder="Type here" />
  <div
  >
    <TodoComp 
      v-for="todo in todos" 
      :key="todo.id"
      :id="todo.id"
      :content="todo.content"
      @output="output"
    />
  </div>
</template>

<style scoped>
</style>