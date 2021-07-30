<template>
  <div class="px-2 py-5 overflow-y-auto card">
    <h2 class="mb-8 text-3xl font-semibold">{{ title }}</h2>
    <ul class="flex flex-wrap w-full">
      <li
        v-for="market in coins"
        :key="market.ath"
        class="w-full h-10 mx-auto my-5 rounded-2xl bg-primary md:w-1/2 lg:w-1/4"
      >
        <h4 class="text-lg">
          {{ market.name }}
          <span class="uppercase">{{ `(${market.symbol})` }}</span>
        </h4>
      </li>
    </ul>
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
