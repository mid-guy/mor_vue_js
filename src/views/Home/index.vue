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
    <div class="table-overflow">
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
  </div>
</template>


<style scoped>
  #home_page--container {
    width: auto;
    height: 100vh;
    display: flex;
    margin: 0 120px;
    align-items: center;
    justify-content: center;
  }
  #home_page--container .table-overflow {
    padding: 10px 16px;
    box-sizing: border-box;
    overflow: auto;
  }
  #home_page--container .grid {
    display: flex;
    flex-direction: column;
    width: max-content;
    max-height: 450px;
  }
  #home_page--container .grid .row {
    display: flex;
    align-items: center;
    white-space: nowrap;
    gap: 10px;
    transition: 0.15s ease-in-out;
  }
  #home_page--container .grid .row:hover {
    color: #FFF;
    background-color: rgb(46, 46, 46);
  }
</style>