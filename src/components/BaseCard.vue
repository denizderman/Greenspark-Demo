<template>
  <div class="card">
    <BaseSpinner v-if="loading" size="20px" color="grey"></BaseSpinner>

    <div v-else class="card__list">
      <div v-for="(goal, index) in goals" :key="goal.id" class="card__wrapper">
        <div
          class="card__header"
          :style="{ backgroundColor: goal.selectedColor || goal.initialColor }"
        >
          <BaseLogo :color="goal.logoColor" />

          <span :style="{ color: goal.logoColor ? goal.logoColor : 'white' }" class="card__info">
            This product collects <br />
            <span class="card__target">{{ goal.amount }} {{ goal.type }}</span>
          </span>
        </div>

        <div class="card__actions">
          <div class="card__action">
            <span>
              Link to Public Profile
              <span
                class="card__info-icon"
                @mouseover="showTooltip(goal)"
                @mouseleave="hideTooltip(goal)"
              >
                <img src="../assets/img/Tooltip.svg" alt="Tooltip svg" />
              </span>

              <BaseTooltip :isTooltipVisible="goal.tooltipVisible" />
            </span>
            <input
              class="card__checkbox"
              :class="{ active: this.$store.getters.links[index] }"
              type="checkbox"
              :checked="this.$store.getters.links[index]"
              @click="linkProfile(index)"
            />
          </div>

          <div class="card__action">
            <span>Badge colour</span>
            <ul class="card__badge-colors">
              <li v-for="color in badgeColors" :key="color">
                <button
                  type="button"
                  :class="{ 'is-active': goal.selectedColor === color }"
                  :style="{ backgroundColor: color }"
                  @click="selectColor(goal, color)"
                ></button>
              </li>
            </ul>
          </div>

          <div class="card__action">
            <span>Active Badge</span>
            <BaseToggle :checked="goal.active" @toggle="(status) => enableDisable(goal, status)" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseSpinner from '../components/BaseSpinner.vue'
import BaseToggle from '../components/BaseToggle.vue'
import BaseLogo from '../components/BaseLogo.vue'
import BaseTooltip from './BaseTooltip.vue'
import getProductWidgets from '../services/WidgetService'

export default {
  components: {
    BaseSpinner,
    BaseToggle,
    BaseLogo,
    BaseTooltip
  },
  data() {
    return {
      loading: false,
      goals: [],
      badgeColors: ['#2E3A8C', '#3B755F', '#F2EBDB', '#FFFFFF', '#212121'],
      pendingRequests: 0,
      changingStatus: []
    }
  },
  mounted() {
    this.getProductWidgets()
  },
  methods: {
    async getProductWidgets() {
      this.loading = true
      try {
        const data = await getProductWidgets()
        this.goals = data.map((goal) => ({ ...goal, initialColor: goal.selectedColor }))
      } catch (err) {
        console.error(err)
      }

      this.loading = false
    },

    selectColor(goal, color) {
      goal.selectedColor = color

      if (goal.selectedColor === '#FFFFFF' || goal.selectedColor === '#F2EBDB') {
        goal.logoColor = '#3B755F'
      } else {
        goal.logoColor = '#FFFFFF'
      }
    },

    enableDisable(goal, enabled) {
      if (this.isChangingStatus(goal)) {
        return
      }

      // so that only one widget can have the active state at a time
      this.goals.forEach((g) => {
        if (g !== goal) {
          g.active = false
        }
      })

      goal.active = enabled

      this.pendingRequests++
      this.changingStatus.push(goal.id)

      setTimeout(() => {
        this.pendingRequests--
        this.removeChangingStatus(goal)
      }, 100)
    },

    isChangingStatus(goal) {
      return this.changingStatus.indexOf(goal.id) !== -1
    },

    removeChangingStatus(goal) {
      const index = this.changingStatus.indexOf(goal.id)

      this.changingStatus.splice(index, 1)
    },

    linkProfile(index) {
      this.$store.dispatch('TOGGLE_LINK', index)
    },

    showTooltip(goal) {
      goal.tooltipVisible = true
    },

    hideTooltip(goal) {
      goal.tooltipVisible = false
    }
  }
}
</script>
