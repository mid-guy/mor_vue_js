<script>
  import TodoComp from './components/TodoComp/index.vue'
  import Input from './components/Input/index.vue'
  import ButtonMor from './components/ButtonMor/index.vue'

  let id = 0
  export default {
    components: {
      TodoComp,
      Input,
      ButtonMor
    },
    data() {
      return {
        todoContent: '',
        email: '',
        password: '',
        todos: [
          { id: id++, content: `Content ${id}` },
          { id: id++, content: `Content ${id}` },
          { id: id++, content: `Content ${id}` },
        ]
      }
    },
    methods: {
      output(id) {
        // console.log(id)
      },
      handleChange(data) {
        this[data.name] = data.value
      }
    }
  }
</script>
<template>
  <Input name="email" :place="'Email'" @onChange="handleChange" />
  <Input name="password" :place="'Password'"  @onChange="handleChange" />
  <ButtonMor content="Submit" />
  <div>
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