<template>
  <div class="sidebar-left">
    <div class="px-2 pt-5 svg-icons">
      <div
        :class="
          board === 'index'
            ? 'p-4 text-center rounded-2xl bg-icon-color mb-5'
            : 'text-center p-4 mb-5'
        "
      >
        <nuxt-link to="/">
          <EqualSvg class="w-5 h-5" />
        </nuxt-link>
      </div>
      <div
        :class="
          board === 'single'
            ? 'p-4 text-center rounded-2xl bg-icon-color'
            : 'text-center p-4'
        "
      >
        <span>
          <LinkSvg class="w-5 h-5" />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import EqualSvg from '~/assets/svgs/equal.svg?inline'
import LinkSvg from '~/assets/svgs/bar-chart.svg?inline'
export default {
  components: {
    EqualSvg,
    LinkSvg,
  },
  props: {
    board: {
      type: String,
      default: '',
    },
  },

  computed: {},
}
</script>

<style lang="scss" scoped>
.sidebar-left {
  height: 92.5vh;
  /* width: 4rem; */
  @apply rounded-2xl bg-sec-dark;
  width: 4rem;
}

.svg-icons {
  svg {
    fill: #fff;
    /* height: 1rem; */
    width: auto;
  }
}
</style>
