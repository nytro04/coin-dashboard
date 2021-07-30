<template>
  <div class="px-5 py-5 overflow-y-auto card">
    <h2 class="mb-8 text-3xl font-semibold">{{ title }}</h2>
    <div class="flex flex-wrap w-full">
      <div
        v-for="market in coins"
        :key="market.ath"
        class="px-5 my-5 text-2xl  rounded-2xl bg-primary md:w-1/2 lg:my-4 lg:px-4 lg:w-1/4"
      >
        <h4 class="text-lg">
          {{ market.name }}
          <span class="uppercase">{{ `(${market.symbol})` }}</span>
        </h4>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
  },

  data() {
    return {}
  },

  computed: {
    ...mapGetters({
      coins: 'coins/fetchCoins',
    }),
  },

  mounted() {},

  methods: {},
}
</script>

<style lang="scss" scoped>
.card {
  /* height: 95vh; */
  /* width: 100%; */
  @apply rounded-2xl bg-sec-dark;
  flex: 1;
  height: 45vh;
}
</style>
