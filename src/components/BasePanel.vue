<template>
  <div class="panel">
    <h3 class="panel__title">Per product widgets</h3>

    <hr class="panel__line" />

    <div class="panel__body">
      <BaseCard />
    </div>
  </div>
</template>

<script>
import BaseCard from './BaseCard.vue'

export default {
  components: {
    BaseCard
  }
}
</script>
