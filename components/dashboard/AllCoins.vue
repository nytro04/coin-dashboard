<template>
  <div class="px-2 py-5 overflow-y-auto card">
    <h2 class="mb-8 ml-5 text-3xl font-semibold">{{ title }}</h2>
    <div>
      <li v-if="loading" class="text-center">
        <LoadingSvg />
        <p class="mt-5">Loading...</p>
      </li>

      <ul v-else class="flex flex-wrap w-full">
        <li
          v-for="market in coins"
          :key="market.id"
          class="w-full px-4 py-5 m-4 overflow-hidden  rounded-2xl bg-primary md:w-1/2 lg:w-1/5"
        >
          <nuxt-link :to="market.id" class="overflow-hidden">
            <h4 class="">
              {{ market.name }}
              <span class="uppercase">{{ `(${market.symbol})` }}</span>
            </h4>
          </nuxt-link>
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
  height: 45vh;
}
</style>
