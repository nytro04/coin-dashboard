<template>
  <div class="card">
    <h2>{{ title }}</h2>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
.card {
  /* height: 95vh; */
  width: 100%;
  @apply rounded-xl bg-sec-dark;
}
</style>
