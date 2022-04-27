<script>
import baseAPI from "@/config"
import TodoComp from '@/components/TodoComp/index.vue'
export default {
  components: {
    TodoComp
  },
  data() {
    return {
      todos: null,
    }
  },
  created() {
    this.fetchTodo()
  },
  methods: {
    async fetchTodo() {
      this.todoData = null
      const response = await baseAPI.get('/api/posts')
      console.log(response.data.posts)
      this.todos = response.data.posts
    },
    output(id) {
      console.log(id)
    }
  },
}
</script>

<template> 
  <div v-if="!todos"><p>Loading...</p></div>
  <div v-else id="home_page--container">
    <div class="grid">
      <TodoComp 
        v-for="todo, index in todos" 
        :key="todo.id"
        :stt="index"
        :todo="todo"
        @output="output"
      />
    </div>
  </div>
</template>


<style scoped>
  #home_page--container .grid {
    display: table;
    width: 100vw;
    overflow: auto;
  }
  #home_page--container .grid .row {
    display: table-row;
    width: inherit;
  }
</style>