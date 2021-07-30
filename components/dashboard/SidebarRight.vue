<template>
  <div class="relative overflow-x-hidden overflow-y-auto px-auto sidebar-right">
    <h2 class="mb-8 text-3xl font-semibold">{{ title }}</h2>

    <ul>
      <li v-if="loading" class="text-center">
        <LoadingSvg />
        <p class="mt-5">Loading...</p>
      </li>
      <li
        v-for="event in events"
        v-else
        :key="event.title"
        class="relative p-5 m-5 overflow-y-auto h-36 w-72 rounded-2xl bg-primary"
      >
        <h4 class="mb-3 text-base font-semibold">
          {{ event.title }}
        </h4>
        <p class="text-xs ellipses">{{ event.description }}</p>
        <a :href="event.website" target="_blank" rel="noopener noreferrer">
          <div class="w-8 h-8 bg-black rounded-lg link-svg">
            <LinkSvg class="" />
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import LinkSvg from '~/assets/svgs/link.svg?inline'
import LoadingSvg from '~/assets/svgs/loading.svg?inline'

export default {
  components: {
    LinkSvg,
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
      events: [],
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
        const res = await this.$axios.$get('/events')

        this.events = res.data
        this.loading = false
      } catch (error) {
        console.log(error, 'error fetching coins')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.sidebar-right {
  height: 95vh;
  /* width: 17rem; */
  @apply rounded-2xl bg-sec-dark;

  .card {
  }

  .ellipses {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .link-svg {
    position: absolute;
    bottom: 0.3rem;
    right: 0.5rem;

    svg {
      fill: #3d64fa;
      height: 1rem;
      top: 0.5rem;
      left: 0.5rem;
      position: absolute;
    }
  }
}
</style>
