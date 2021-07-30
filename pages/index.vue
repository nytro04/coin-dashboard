<template>
  <div class="min-h-screen overflow-y-auto">
    <div
      class="grid grid-cols-1 gap-10 overflow-hidden md:grid-cols-12 main-dash"
    >
      <div class="col-start-1 col-end-1">
        <SidebarLeft />
      </div>
      <div class="col-start-2 col-end-10 space-y-5 overflow-y-auto cards">
        <MarketCard title="Market Leaders" />
        <AllCoins title="All Coins" />
      </div>
      <div class="col-start-10 col-end-13">
        <SidebarRight />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    SidebarLeft: () => import('~/components/dashboardLayout/Sidebar.vue'),
    SidebarRight: () => import('~/components/dashboardLayout/SidebarRight.vue'),
    MarketCard: () => import('~/components/dashboardLayout/MarketCard.vue'),
    AllCoins: () => import('~/components/dashboardLayout/AllCoins.vue'),
  },
}
</script>

<style lang="scss"></style>
