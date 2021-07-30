<template>
  <div class="min-h-screen overflow-y-auto">
    <TopNav />
    <div
      class="grid grid-cols-1 gap-10 overflow-hidden md:grid-cols-12 main-dash"
    >
      <div class="col-start-1 col-end-1">
        <SidebarLeft board="index" />
      </div>
      <div class="col-start-2 col-end-10 space-y-5 overflow-y-auto cards">
        <MarketCard title="Market Leaders" />
        <AllCoins title="All Coins" />
      </div>
      <div class="col-start-10 col-end-13">
        <SidebarRight title="Events" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    SidebarLeft: () => import('~/components/dashboardLayout/Sidebar.vue'),
    SidebarRight: () => import('~/components/dashboard/SidebarRight.vue'),
    MarketCard: () => import('~/components/dashboard/MarketCard.vue'),
    AllCoins: () => import('~/components/dashboard/AllCoins.vue'),
    TopNav: () => import('~/components/dashboardLayout/TopNav.vue'),
  },
}
</script>

<style lang="scss"></style>
