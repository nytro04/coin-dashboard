export const state = () => ({
  coins: []
})

export const mutations = {
  SET_COINS(state, coins) {
    state.coins = coins
  }
}
export const actions = {
  setCoins({ commit }, coins) {
    commit('SET_COINS', coins)
  }
}
export const getters = {
  fetchCoins: (state) => state.coins
}
