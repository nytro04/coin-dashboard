<template>
  <div class="px-5 py-5 overflow-y-auto card">
    <h2 class="mb-8 text-3xl font-semibold">{{ title }}</h2>
    <ul class="">
      <li v-if="loading" class="text-center">
        <LoadingSvg />
        <p class="mt-5">Loading...</p>
      </li>
      <li v-else>
        <nuxt-link
          v-for="market in marketLeaders"
          :key="market.id"
          :to="market.id"
          class="flex justify-between w-full px-8 py-5 my-5 text-2xl rounded-2xl bg-primary"
        >
          <h4 class="w-3/12">
            {{ market.name }}
            <span class="uppercase">{{ `(${market.symbol})` }}</span>
          </h4>
          <trend
            :data="market.sparkline_in_7d.price"
            :gradient="['#fff']"
            :padding="12"
            :radius="12"
            :stroke-width="1"
            auto-draw
            smooth
            class="w-6/12 h-12"
          ></trend>
          <div class="flex items-center justify-end w-3/12">
            <h5 class="text-xs text-color">
              {{
                `${Math.round((market.price_change_24h * 100) / 100).toFixed(
                  2
                )}`
              }}
            </h5>
            <h4 class="ml-5">{{ `$ ${market.current_price}` }}</h4>
          </div>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

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
      marketLeaders: [],
      params: {
        vs_currency: 'usd',
        sparkline: true,
      },
    }
  },

  mounted() {
    this.fetchMartketsLeaders()
  },

  methods: {
    ...mapActions({
      setCoins: 'coins/setCoins',
    }),
    async fetchMartketsLeaders() {
      this.loading = true

      try {
        const res = await this.$axios.$get('/coins/markets', {
          params: this.params,
        })

        this.loading = false

        this.marketLeaders = res
        this.setCoins(res)
        console.log(res, 'coins')
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
