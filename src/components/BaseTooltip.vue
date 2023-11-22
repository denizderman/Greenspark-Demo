<template>
  <div>
    <Transition name="fade">
      <div class="tooltip" v-if="isTooltipVisible">
        <p class="tooltip__text">
          This widget links directly to your public profile so that you can easily share your impact
          with your customers. Turn it off here if you do not want the badge to link to it.
        </p>
        <a class="tooltip__link" href="#">View Public Profile</a>
      </div>
    </Transition>
  </div>
</template>

<script>
export default {
  props: {
    isTooltipVisible: {
      required: true
    }
  }
}
</script>
