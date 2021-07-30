<template>
  <div class="min-h-screen overflow-y-auto">
    <div
      class="grid grid-cols-1 gap-10 overflow-hidden md:grid-cols-12 main-dash"
    >
      <!-- {{ coinDetails }} -->
      <div class="col-start-1 col-end-1">
        <SidebarLeft />
      </div>
      <div class="col-start-2 col-end-10 space-y-5 overflow-y-auto cards">
        <div v-if="loading" class="text-center">
          <LoadingSvg />
          <p class="mt-5">Loading...</p>
        </div>
        <div v-if="!loading && coinDetails" class="card">
          <div class="flex pt-5">
            <h2
              v-if="coinDetails.market_data.current_price"
              class="mb-8 ml-8 mr-10 text-3xl font-semibold"
            >
              {{ `$ ${coinDetails.market_data.current_price.usd}` }}
            </h2>
            <h5 v-if="coinDetails" class="pt-1 mr-5 text-lg text-color">
              {{
                `${coinDetails.market_data.market_cap_change_percentage_24h.toFixed(
                  2
                )} %`
              }}
            </h5>
            <span>
              <FallingSvg v-if="char === '-'" />
              <RisingSvg v-else />
            </span>
          </div>
          <trend
            :data="coinDetails.market_data.sparkline_7d.price"
            :gradient="['#fff']"
            :padding="12"
            :radius="12"
            :stroke-width="1"
            auto-draw
            smooth
            class="h-60"
          ></trend>
          <!-- <Chart
            v-if="coinDetails.market_data"
            :data="coinDetails.market_data.sparkline_7d.price"
            :options="options"
          /> -->
        </div>

        <div class="flex justify-between">
          <div class="w-1/2 p-5 mr-5 card">
            <h2 v-if="coinDetails" class="mb-8 mr-10 text-2xl font-semibold">
              Exchange
              <!-- {{ coinDetails }} -->
            </h2>
            <div v-if="coinDetails" class="flex justify-between">
              <div class="flex w-1/2">
                <h5 class="mr-8">Sell</h5>
                <h3>{{ coinDetails.market_data.current_price.usd }}</h3>
              </div>
              <select
                v-model="exchange.sell"
                name="sell"
                class="w-1/2 py-2 pl-2 border rounded outline-none"
                required
              >
                <!-- @change="fetchExchange()" -->
                <option value="USD"></option>
                <option
                  v-for="(sell, index) in coinDetails.tickers"
                  :key="index"
                  :value="sell.target"
                >
                  {{ sell.target }}
                </option>
              </select>
            </div>
          </div>
          <div class="w-1/2 ml-5 card-sm">soool</div>
        </div>
        <!-- <AllCoins title="All Coins" /> -->
      </div>
      <!-- <div class="col-start-10 col-end-13">
        <SidebarRight />
      </div> -->
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import LoadingSvg from '~/assets/svgs/loading.svg?inline'
import RisingSvg from '~/assets/svgs/rise.svg?inline'
import FallingSvg from '~/assets/svgs/fall.svg?inline'
export default {
  components: {
    SidebarLeft: () => import('~/components/dashboardLayout/Sidebar.vue'),
    // SidebarRight: () => import('~/components/dashboard/SidebarRight.vue'),
    // MarketCard: () => import('~/components/dashboard/MarketCard.vue'),
    // AllCoins: () => import('~/components/dashboard/AllCoins.vue'),
    // Chart: () => import('~/components/dashboard/Chart.vue'),
    LoadingSvg,
    RisingSvg,
    FallingSvg,
  },
  props: {},
  data() {
    return {
      loading: false,
      coinDetails: null,
      char: '',
      exchange: {
        sell: 'USD',
      },
      params: {
        sparkline: true,
        localization: true,
        developer_data: false,
      },

      // options: {
      //   labels: [this.coinDetails.market_data.sparkline_7d.price || []],
      // },
    }
  },
  mounted() {
    this.fetchCoin()
  },
  methods: {
    ...mapActions({
      setCoin: 'coins/setCoin',
    }),

    getNeg() {
      const str =
        '' + this.coinDetails.market_data.market_cap_change_percentage_24h
      const char = str[0]

      this.char = char
    },
    async fetchCoin() {
      this.loading = true
      const id = this.$route.params.id

      try {
        const res = await this.$axios.$get(`/coins/${id}`, {
          params: this.params,
        })

        console.log(res, 'res ')

        // this.coinDetails = res?. ?? null
        this.coinDetails = res

        this.getNeg()

        this.loading = false
      } catch (error) {
        console.log(error, 'error fetching single coin')
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
.card-sm {
  /* height: 95vh; */
  /* width: 100%; */
  @apply rounded-2xl bg-sec-dark;

  height: 25vh;
}
</style>
