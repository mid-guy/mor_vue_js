<template>
  <div class="group-btn d-flex">
    <button class="selected">
      All
    </button>
    <button>
      Pending
    </button>
    <button>
      Completed
    </button>
    <button>
      In progress
    </button>
  </div>
</template>

<script>
export default {
  props: {
    
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