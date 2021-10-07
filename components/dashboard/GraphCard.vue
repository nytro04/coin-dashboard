<template>
  <div class="px-5 py-5 overflow-y-auto card">
    <h2 class="mb-8 text-3xl font-semibold">{{ title }}</h2>

    <!-- <Chart : /> -->

    <h2>Testing semantic release</h2>
    <h2>Testing semantic release 2</h2>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  components: {
    // Chart: () => import('~/components/dashboard/Chart.vue'),
  },

  props: {
    title: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      loading: false,
      marketLeaders: [],
      params: {
        vs_currency: 'usd',
        sparkline: true
      }
    }
  },

  mounted() {
    this.fetchMartketsLeaders()
  },

  methods: {
    ...mapActions({
      setCoins: 'coins/setCoins'
    }),
    async fetchMartketsLeaders() {
      this.loading = true

      try {
        const res = await this.$axios.$get('/coins/markets', {
          params: this.params
        })

        this.loading = false

        this.marketLeaders = res
        this.setCoins(res)
        console.log(res, 'coins')
      } catch (error) {
        console.log(error, 'error fetching coins')
      }
    }
  }
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
