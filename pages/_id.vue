<template>
  <div class="min-h-screen overflow-y-auto">
    <div
      class="grid grid-cols-1 gap-10 overflow-hidden md:grid-cols-12 main-dash"
    >
      <!-- {{ coinDetails }} -->
      <div class="col-start-1 col-end-1">
        <SidebarLeft board="single" />
      </div>
      <div class="col-start-2 col-end-10 space-y-5 overflow-y-auto">
        <div v-if="loading" class="text-center card">
          <div class="mt-20">
            <LoadingSvg />
            <p class="mt-5">Loading...</p>
          </div>
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
          <div v-if="loading" class="w-1/2 text-center card">
            <div class="mt-20">
              <LoadingSvg />
              <p class="mt-5">Loading...</p>
            </div>
          </div>
          <div v-if="!loading && coinDetails" class="w-1/2 p-5 mr-5 card">
            <h2 v-if="coinDetails" class="mb-8 mr-10 text-2xl font-semibold">
              Exchange
            </h2>

            <div class="">
              <div v-if="coinDetails" class="flex justify-between">
                <div class="flex w-1/2">
                  <h5 class="mr-8 text-gray-400">Sell</h5>
                  <h3>{{ coinDetails.market_data.current_price.usd }}</h3>
                </div>
                <select
                  v-model="exchange.sell"
                  name="sell"
                  class="w-3/5 py-2 pl-2 border rounded outline-none"
                  required
                >
                  <!-- @change="fetchExchange()" -->
                  <option selected value="" disabled>USD</option>
                  <option
                    v-for="(sell, index) in coinDetails.tickers"
                    :key="index"
                    :value="sell.target"
                  >
                    {{ sell.target }}
                  </option>
                </select>
              </div>

              <div v-if="coinDetails" class="flex justify-between mt-10">
                <div class="flex w-1/2">
                  <h5 class="mr-8 text-gray-400">Buy</h5>
                  <h3>
                    {{
                      coinDetails.market_data.market_cap_change_percentage_24h
                    }}
                  </h3>
                </div>
                <select
                  v-model="exchange.buy"
                  name="buy"
                  class="w-3/5 py-2 pl-2 border rounded outline-none"
                  required
                >
                  <!-- @change="fetchExchange()" -->
                  <option value="" selected disabled>BTC</option>
                  <option
                    v-for="(buy, index) in coinDetails.tickers"
                    :key="index"
                    :value="buy.base"
                  >
                    {{ buy.base }}
                  </option>
                </select>
              </div>

              <div
                v-if="coinDetails"
                class="flex items-center justify-between mt-10 text-gray-400"
              >
                <div class="">
                  <span>
                    <span> 1 BTC </span>
                    <span> = </span>
                  </span>
                  <span>
                    {{ coinDetails.market_data.current_price.usd }} USD
                  </span>
                </div>
                <button
                  class="flex items-center justify-between w-1/2 h-12 px-4 py-2  bg-icon-color rounded-xl"
                >
                  <span class="text-white"> Exchange </span>
                  <span class="">
                    <RightSvg class="h-4" style="fill: white" />
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div class="self-end w-1/2 py-12 ml-5 card-sm">
            <div v-if="loading" class="w-1/2 text-center card">
              <div class="mt-20">
                <LoadingSvg />
                <p class="mt-5">Loading...</p>
              </div>
            </div>
            <div v-if="!loading && coinDetails" class="text-center">
              <h4 class="mb-5 text-2xl text-gray-300">Alexa Rank</h4>
              <h4 class="text-2xl font-semibold text-gray-300">
                {{ coinDetails.public_interest_stats.alexa_rank }}
              </h4>
            </div>
          </div>
        </div>
        <!-- <AllCoins title="All Coins" /> -->
      </div>
      <div class="col-start-10 col-end-13 overflow-y-auto">
        <div
          v-if="loading"
          class="relative overflow-y-auto text-center sidebar-right"
        >
          <div class="mt-20">
            <LoadingSvg />
            <p class="mt-5">Loading...</p>
          </div>
        </div>
        <div
          v-if="!loading && coinDetails"
          class="relative overflow-y-auto sidebar-right"
        >
          <img
            :src="coinDetails.image.thumb"
            :alt="coinDetails.name"
            class="icon"
          />
          <h4 class="relative pt-5 mb-3 ml-5 text-lg font-semibold">
            Info Card
          </h4>
          <div
            class="p-5 m-5 overflow-x-hidden overflow-y-auto  h-36 w-72 rounded-2xl bg-primary"
          >
            Description:
            <p class="ml-5 text-sm text-gray-300">
              {{ coinDetails.description.en }}
            </p>
          </div>

          <div v-if="coinDetails" class="flex justify-between px-5 mt-8">
            <a
              :href="coinDetails.links.homepage[0]"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div class="px-5 py-3 bg-black rounded-lg svg-icons">
                <p class="inline-block text-gray-400">Website</p>

                <WWWSvg class="inline-block w-12 h-12" />
              </div>
            </a>
            <a
              :href="coinDetails.links.subreddit_url"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div class="p-2 bg-black rounded-lg link-svg">
                <RedditSvg class="w-8 h-8" />
              </div>
            </a>
            <a
              :href="coinDetails.links.repos_url.github[0]"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div class="p-2 rounded-lg bg-icon-color link-svg">
                <GithubSvg class="w-8 h-8" />
              </div>
            </a>
          </div>

          <div v-if="coinDetails" class="px-5 mt-5">
            <h4
              class="relative pt-5 pb-3 mb-3 ml-5 text-lg font-semibold border-b-2 border-purple-800 "
            >
              Facts
            </h4>

            <div class="px-5 space-y-8">
              <h4 class="flex justify-between text-gray-300">
                <span>Hashing Algorithm</span>
                <span>{{ coinDetails.hashing_algorithm }}</span>
              </h4>
              <h4 class="flex justify-between text-gray-300">
                <span>Country Origin</span>
                <span>{{ coinDetails.country_origin }}</span>
              </h4>
              <h4 class="flex justify-between text-gray-300">
                <span>Categories</span>
                <span>{{ coinDetails.categories[0] }}</span>
              </h4>
            </div>
          </div>

          <div
            v-if="coinDetails"
            class="p-5 m-5 mt-8 overflow-x-hidden overflow-y-auto  h-36 w-72 rounded-2xl bg-primary"
          >
            <div class="px-5 space-y-5">
              <h4 class="flex justify-between text-gray-300">
                <span>Total Supply</span>
                <span>{{ coinDetails.market_data.total_supply }}</span>
              </h4>
              <h4 class="flex justify-between text-gray-300">
                <span>Max Supply</span>
                <span>{{ coinDetails.market_data.max_supply }}</span>
              </h4>
              <h4 class="flex justify-between text-gray-300">
                <span>Circulating Supply</span>
                <span>{{ coinDetails.market_data.circulating_supply }}</span>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import LoadingSvg from '~/assets/svgs/loading.svg?inline'
import RisingSvg from '~/assets/svgs/rise.svg?inline'
import FallingSvg from '~/assets/svgs/fall.svg?inline'
import RightSvg from '~/assets/svgs/right.svg?inline'
import RedditSvg from '~/assets/svgs/reddit.svg?inline'
import GithubSvg from '~/assets/svgs/github.svg?inline'
import WWWSvg from '~/assets/svgs/www.svg?inline'
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
    RightSvg,
    RedditSvg,
    GithubSvg,
    WWWSvg,
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

  /* height: 25vh; */
}

select option {
  /* margin: 40px; */
  background: #1b1720 !important;
  color: #fff;
  /* text-shadow: 0 1px 0 rgba(0, 0, 0, 0.4); */
}

.svg-icons {
  svg {
    fill: #3d64fa;
    height: 1rem;
    /* top: 0.5rem;
      left: 0.5rem;
      position: absolute; */
  }
}

.sidebar-right {
  height: 92.5vh;
  /* width: 17rem; */
  @apply rounded-2xl bg-sec-dark;
}

.icon {
  position: absolute;
  right: 1.5rem;
  top: 0.5rem;
}
</style>
