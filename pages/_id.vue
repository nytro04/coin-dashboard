<template>
  <div>
    <div>fetching individual</div>
    {{ coinDetails }}
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {},
  data() {
    return {
      loading: false,
      coinDetails: null,
    }
  },
  mounted() {
    this.fetchCoin()
  },
  methods: {
    ...mapActions({
      setCoin: 'coins/setCoin',
    }),
    async fetchCoin() {
      const id = this.$route.params.id
      console.log(id, 'id')
      try {
        const res = await this.$axios.$get(`/coins/${id}`)

        this.coinDetails = res
      } catch (error) {
        console.log(error, 'error fetching single coin')
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
