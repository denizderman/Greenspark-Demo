<template>
  <div class="toggle">
    <input :id="id" type="checkbox" :checked="checked" @change="toggle" />
    <label :for="id"></label>
  </div>
</template>

<script>
export default {
  props: {
    checked: {
      type: Boolean,
      default: false
    }
  },
  emits: ['toggle'],
  data() {
    return {
      id: `toggle_switch_${Math.random().toString(36).slice(2, 10)}`
    }
  },
  methods: {
    toggle() {
      this.$emit('toggle', !this.checked)
    }
  }
}
</script>
