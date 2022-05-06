<template>
  <div class="group-btn d-flex">
    <button :class="{'selected': selectedFilter === ACTION_FILTER.ALL }" @click="onClick(ACTION_FILTER.ALL)">
      All ({{ countAllTodo }})
    </button>
    <button :class="{'selected': selectedFilter === ACTION_FILTER.PENDING }" @click="onClick(ACTION_FILTER.PENDING)">
      Pending ({{ countTodo.pending }})
    </button>
    <button :class="{'selected': selectedFilter === ACTION_FILTER.COMPLETED }" @click="onClick(ACTION_FILTER.COMPLETED)">
      Completed ({{ countTodo.completed }})
    </button>
    <button :class="{'selected': selectedFilter === ACTION_FILTER.PROCESSING }" @click="onClick(ACTION_FILTER.PROCESSING)">
      In progress ({{ countTodo.processing }})
    </button>
  </div>
</template>

<script>
import { ACTION_FILTER } from '@/helper/constants';
export default {
  data() {
    return {
      ACTION_FILTER: ACTION_FILTER,
      selectedFilter: ACTION_FILTER.ALL
    }
  },
  props: {
    countTodo: {
      type: Object,
      default: {
        pending: 0,
        completed: 0,
        processing: 0
      }
    }
  },
  methods: {
    onClick(type) {
      this.selectedFilter = type
      this.$emit('onClickEvent', type)
    }
  },
  computed: {
    countAllTodo() {
      return this.countTodo.pending + this.countTodo.completed + this.countTodo.processing 
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/variables.scss';
  .group-btn {
    border: 1px solid $--color-border-default;
    border-radius: 6px;
    button {
      @include font-apple;
      background: none;
      border: none;
      padding: 5px 16px;
      box-sizing: border-box;
      white-space: nowrap;
      font-weight: 600;
    }
    button:not(:last-child) {
      border-right: 1px solid $--color-border-default;
    }
    button.selected {
      background-color: $--color-group-btn-selected-bg;
    }
  }
</style>