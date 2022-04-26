<script>
  export default {
    props: {
      content: String,
      id: Number,
    },
    methods: {
      onClick(id) {
        this.$emit('output', id)
      }
    }
  }
</script>

<template>
  <div :id="id" @click="onClick(id)">
    <p>
      {{ content }}
    </p>
  </div>
</template>


<style>

</style>