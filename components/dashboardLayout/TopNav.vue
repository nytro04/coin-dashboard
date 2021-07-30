<template>
  <div class="flex mb-5">
    <div class="p-4 text-center w-1/24 rounded-2xl bg-sec-dark svg-icons">
      <EqualSvg />
    </div>
    <div class="relative w-10/12 ml-16 svg-icons">
      <SearchSvg class="absolute h-5 top-4 left-5" />
      <input
        type="text"
        placeholder="search"
        class="w-full py-2 pl-12 rounded-xl"
      />
    </div>
  </div>
</template>

<script>
import EqualSvg from '~/assets/svgs/equal.svg?inline'
import SearchSvg from '~/assets/svgs/search.svg?inline'
export default {
  components: {
    EqualSvg,
    SearchSvg,
  },
}
</script>

<style lang="scss" scoped>
input[type='text'] {
  background-color: #121016;
  border: 0.2px solid #231e29;
  outline: #fff !important;
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
</style>
