<template>
  <div class="px-2 py-5 overflow-y-auto card">
    <h2 class="mb-8 text-3xl font-semibold">{{ title }}</h2>
    <div>
      <li v-if="loading" class="text-center">
        <LoadingSvg />
        <p class="mt-5">Loading...</p>
      </li>

      <ul v-else class="flex flex-wrap w-full">
        <li
          v-for="market in coins"
          :key="market.id"
          class="w-full h-10 mx-auto my-5 rounded-2xl bg-primary md:w-1/2 lg:w-1/4"
        >
          <h4 class="text-lg">
            {{ market.name }}
            <span class="uppercase">{{ `(${market.symbol})` }}</span>
          </h4>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import LoadingSvg from '~/assets/svgs/loading.svg?inline'

export default {
  components: {
    LoadingSvg,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      loading: false,
      coins: [],
    }
  },

  computed: {
    ...mapGetters({}),
  },

  mounted() {
    this.fetchCoins()
  },

  methods: {
    async fetchCoins() {
      this.loading = true

      try {
        const res = await this.$axios.$get('/coins/list', {
          params: this.params,
        })

        this.loading = false

        this.coins = res
      } catch (error) {
        console.log(error, 'error fetching coins')
      }
    },
  },
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
