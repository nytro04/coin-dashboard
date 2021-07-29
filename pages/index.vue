<template>
  <div class="min-h-screen">
    <div class="flex justify-between">
      <MarketCard />
      <div class="">main</div>
      <SidebarRight />
    </div>
  </div>
</template>

<script>
export default {
  components: {
    SidebarLeft: () => import('~/components/dashboardLayout/Sidebar.vue'),
    SidebarRight: () => import('~/components/dashboardLayout/SidebarRight.vue'),
    MarketCard: () => import('~/components/dashboardLayout/MarketCard.vue'),
  },
}
</script>

<style lang="scss"></style>
